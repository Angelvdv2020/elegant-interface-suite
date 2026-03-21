import { useState, useEffect, useCallback, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import type { Section, SectionContent } from "@/components/editor/types";
import type { Json } from "@/integrations/supabase/types";

const defaultSections: Section[] = [
  {
    id: "hero", type: "hero", label: "Герой",
    content: {
      title: "Ваш заголовок здесь",
      description: "Кликните по любому элементу страницы, чтобы его отредактировать.",
      buttonText: "Начать →",
    },
  },
  {
    id: "cards", type: "cards", label: "Карточки",
    content: {
      cards: [
        { bg: "bg-brand-light", label: "Функция 1", description: "Описание" },
        { bg: "bg-success-light", label: "Функция 2", description: "Описание" },
        { bg: "bg-purple-50", label: "Функция 3", description: "Описание" },
      ],
    },
  },
  {
    id: "text", type: "text", label: "Текстовый блок",
    content: {
      title: "О нашем продукте",
      body: "Здесь может быть любой текстовый контент.",
    },
  },
];

async function getOrCreateSiteAndPage() {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  // Get or create default site
  let { data: sites } = await supabase
    .from("sites")
    .select("id")
    .eq("user_id", user.id)
    .limit(1);

  let siteId: string;
  if (!sites || sites.length === 0) {
    const { data: newSite, error } = await supabase
      .from("sites")
      .insert({ name: "Мой сайт", slug: "my-site", user_id: user.id })
      .select("id")
      .single();
    if (error || !newSite) throw error;
    siteId = newSite.id;
  } else {
    siteId = sites[0].id;
  }

  // Get or create default page
  let { data: pages } = await supabase
    .from("pages")
    .select("id")
    .eq("site_id", siteId)
    .order("sort_order")
    .limit(1);

  let pageId: string;
  if (!pages || pages.length === 0) {
    const { data: newPage, error } = await supabase
      .from("pages")
      .insert({ site_id: siteId, title: "Главная", slug: "index" })
      .select("id")
      .single();
    if (error || !newPage) throw error;
    pageId = newPage.id;

    // Seed default sections
    const inserts = defaultSections.map((s, i) => ({
      page_id: pageId,
      type: s.type,
      label: s.label,
      content: s.content as unknown as Json,
      sort_order: i,
    }));
    await supabase.from("sections").insert(inserts);
  } else {
    pageId = pages[0].id;
  }

  return { siteId, pageId };
}

export function useEditorData() {
  const queryClient = useQueryClient();
  const saveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Resolve site + page IDs
  const { data: ids, isLoading: idsLoading } = useQuery({
    queryKey: ["editor-ids"],
    queryFn: getOrCreateSiteAndPage,
    staleTime: Infinity,
  });

  // Load sections from DB
  const { data: dbSections, isLoading: sectionsLoading } = useQuery({
    queryKey: ["editor-sections", ids?.pageId],
    queryFn: async () => {
      if (!ids?.pageId) return null;
      const { data, error } = await supabase
        .from("sections")
        .select("*")
        .eq("page_id", ids.pageId)
        .order("sort_order");
      if (error) throw error;
      return data.map((row) => ({
        id: row.id,
        type: row.type as Section["type"],
        label: row.label,
        content: row.content as unknown as SectionContent,
      })) as Section[];
    },
    enabled: !!ids?.pageId,
  });

  // Local state for editing (initialized from DB or defaults)
  const [sections, setSections] = useState<Section[]>(defaultSections);
  const [initialized, setInitialized] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"saved" | "saving" | "unsaved">("saved");

  useEffect(() => {
    if (dbSections && !initialized) {
      setSections(dbSections.length > 0 ? dbSections : defaultSections);
      setInitialized(true);
    }
  }, [dbSections, initialized]);

  // Save mutation
  const saveMutation = useMutation({
    mutationFn: async (sectionsToSave: Section[]) => {
      if (!ids?.pageId) return;
      setSaveStatus("saving");

      // Delete existing sections and re-insert
      await supabase.from("sections").delete().eq("page_id", ids.pageId);

      const inserts = sectionsToSave.map((s, i) => ({
        page_id: ids.pageId,
        type: s.type,
        label: s.label,
        content: s.content as unknown as Json,
        sort_order: i,
      }));
      const { error } = await supabase.from("sections").insert(inserts);
      if (error) throw error;
    },
    onSuccess: () => {
      setSaveStatus("saved");
    },
    onError: (err: Error) => {
      setSaveStatus("unsaved");
      toast.error("Ошибка сохранения: " + err.message);
    },
  });

  // Debounced auto-save (1.5s after last change)
  const debouncedSave = useCallback((newSections: Section[]) => {
    setSaveStatus("unsaved");
    if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    saveTimerRef.current = setTimeout(() => {
      saveMutation.mutate(newSections);
    }, 1500);
  }, [saveMutation]);

  const updateSections = useCallback((newSections: Section[]) => {
    setSections(newSections);
    debouncedSave(newSections);
  }, [debouncedSave]);

  const isLoading = idsLoading || sectionsLoading || !initialized;
  const isAuthenticated = !!ids;

  return {
    sections,
    setSections: updateSections,
    siteId: ids?.siteId ?? null,
    pageId: ids?.pageId ?? null,
    isLoading,
    isAuthenticated,
    saveStatus,
    saveMutation,
  };
}
