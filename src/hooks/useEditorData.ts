import { useState, useEffect, useCallback, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import type { Section, SectionContent } from "@/components/editor/types";
import type { Json } from "@/integrations/supabase/types";
import type { SiteSettings } from "@/lib/presets/seoDefaults";
import { defaultSiteSettings } from "@/lib/presets/seoDefaults";

const defaultSections: Section[] = [
  {
    id: "hero", type: "hero", label: "Герой",
    content: { title: "Ваш заголовок здесь", description: "Кликните по любому элементу страницы, чтобы его отредактировать.", buttonText: "Начать →" },
  },
  {
    id: "cards", type: "cards", label: "Карточки",
    content: { cards: [
      { bg: "bg-blue-50", label: "Функция 1", description: "Описание" },
      { bg: "bg-green-50", label: "Функция 2", description: "Описание" },
      { bg: "bg-purple-50", label: "Функция 3", description: "Описание" },
    ] },
  },
  {
    id: "text", type: "text", label: "Текстовый блок",
    content: { title: "О нашем продукте", body: "Здесь может быть любой текстовый контент." },
  },
];

export interface PageInfo {
  id: string;
  title: string;
  slug: string;
  sort_order: number;
}

async function resolveSiteAndPages(siteId: string | null) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  let resolvedSiteId = siteId;

  if (!resolvedSiteId) {
    const { data: sites } = await supabase.from("sites").select("id").eq("user_id", user.id).limit(1);
    if (!sites || sites.length === 0) {
      const { data: newSite, error } = await supabase.from("sites").insert({ name: "Мой сайт", slug: "my-site", user_id: user.id }).select("id").single();
      if (error || !newSite) throw error;
      resolvedSiteId = newSite.id;
    } else {
      resolvedSiteId = sites[0].id;
    }
  }

  // Load settings
  const { data: siteRow } = await supabase.from("sites").select("settings").eq("id", resolvedSiteId).single();
  const settings: SiteSettings = siteRow?.settings && typeof siteRow.settings === "object" && !Array.isArray(siteRow.settings)
    ? { ...defaultSiteSettings, ...(siteRow.settings as unknown as Partial<SiteSettings>) }
    : { ...defaultSiteSettings };

  const { data: pages } = await supabase.from("pages").select("id, title, slug, sort_order").eq("site_id", resolvedSiteId).order("sort_order");

  if (!pages || pages.length === 0) {
    const { data: newPage, error } = await supabase.from("pages").insert({ site_id: resolvedSiteId, title: "Главная", slug: "index" }).select("id, title, slug, sort_order").single();
    if (error || !newPage) throw error;
    const inserts = defaultSections.map((s, i) => ({ page_id: newPage.id, type: s.type, label: s.label, content: s.content as unknown as Json, sort_order: i }));
    await supabase.from("sections").insert(inserts);
    return { siteId: resolvedSiteId, pages: [newPage] as PageInfo[], settings };
  }

  return { siteId: resolvedSiteId, pages: pages as PageInfo[], settings };
}

export function useEditorData() {
  const queryClient = useQueryClient();
  const saveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [searchParams] = useSearchParams();
  const urlSiteId = searchParams.get("site");

  // Resolve site + pages
  const { data: siteData, isLoading: siteLoading } = useQuery({
    queryKey: ["editor-site", urlSiteId],
    queryFn: () => resolveSiteAndPages(urlSiteId),
    staleTime: Infinity,
  });

  const [activePageId, setActivePageId] = useState<string | null>(null);

  // Set initial active page
  useEffect(() => {
    if (siteData?.pages && siteData.pages.length > 0 && !activePageId) {
      setActivePageId(siteData.pages[0].id);
    }
  }, [siteData, activePageId]);

  const currentPageId = activePageId;

  // Load sections for active page
  const { data: dbSections, isLoading: sectionsLoading } = useQuery({
    queryKey: ["editor-sections", currentPageId],
    queryFn: async () => {
      if (!currentPageId) return null;
      const { data, error } = await supabase.from("sections").select("*").eq("page_id", currentPageId).order("sort_order");
      if (error) throw error;
      return data.map((row) => ({
        id: row.id,
        type: row.type as Section["type"],
        label: row.label,
        content: row.content as unknown as SectionContent,
      })) as Section[];
    },
    enabled: !!currentPageId,
  });

  const [sections, setSectionsState] = useState<Section[]>(defaultSections);
  const [initialized, setInitialized] = useState<string | null>(null);
  const [saveStatus, setSaveStatus] = useState<"saved" | "saving" | "unsaved">("saved");
  const [siteSettings, setSiteSettingsState] = useState<SiteSettings>(defaultSiteSettings);
  const [settingsInitialized, setSettingsInitialized] = useState(false);

  // Sync settings from DB
  useEffect(() => {
    if (siteData && siteData.settings && !settingsInitialized) {
      setSiteSettingsState(siteData.settings);
      setSettingsInitialized(true);
    }
  }, [siteData, settingsInitialized]);

  useEffect(() => {
    if (dbSections && initialized !== currentPageId) {
      setSectionsState(dbSections.length > 0 ? dbSections : defaultSections);
      setInitialized(currentPageId);
    }
  }, [dbSections, initialized, currentPageId]);

  // Save mutation
  const saveMutation = useMutation({
    mutationFn: async (sectionsToSave: Section[]) => {
      if (!currentPageId) return;
      setSaveStatus("saving");
      await supabase.from("sections").delete().eq("page_id", currentPageId);
      const inserts = sectionsToSave.map((s, i) => ({
        page_id: currentPageId,
        type: s.type,
        label: s.label,
        content: s.content as unknown as Json,
        sort_order: i,
      }));
      const { error } = await supabase.from("sections").insert(inserts);
      if (error) throw error;
    },
    onSuccess: () => setSaveStatus("saved"),
    onError: (err: Error) => { setSaveStatus("unsaved"); toast.error("Ошибка сохранения: " + err.message); },
  });

  const debouncedSave = useCallback((newSections: Section[]) => {
    setSaveStatus("unsaved");
    if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    saveTimerRef.current = setTimeout(() => { saveMutation.mutate(newSections); }, 1500);
  }, [saveMutation]);

  const updateSections = useCallback((newSections: Section[]) => {
    setSectionsState(newSections);
    debouncedSave(newSections);
  }, [debouncedSave]);

  // Page management
  const switchPage = useCallback((pageId: string) => {
    // Force save current before switching
    if (saveTimerRef.current) { clearTimeout(saveTimerRef.current); saveMutation.mutate(sections); }
    setInitialized(null);
    setActivePageId(pageId);
    queryClient.invalidateQueries({ queryKey: ["editor-sections", pageId] });
  }, [saveMutation, sections, queryClient]);

  const addPage = useCallback(async (title: string) => {
    if (!siteData?.siteId) return;
    const slug = title.toLowerCase().replace(/[^a-zа-яё0-9]+/gi, "-").replace(/(^-|-$)/g, "") || "page";
    const sortOrder = (siteData.pages?.length ?? 0);
    const { data: newPage, error } = await supabase.from("pages").insert({
      site_id: siteData.siteId, title, slug, sort_order: sortOrder,
    }).select("id, title, slug, sort_order").single();
    if (error) { toast.error(error.message); return; }
    queryClient.invalidateQueries({ queryKey: ["editor-site"] });
    toast.success(`Страница «${title}» создана`);
    return newPage as PageInfo;
  }, [siteData, queryClient]);

  const deletePage = useCallback(async (pageId: string) => {
    if (!siteData || siteData.pages.length <= 1) { toast.error("Нельзя удалить последнюю страницу"); return; }
    await supabase.from("sections").delete().eq("page_id", pageId);
    await supabase.from("pages").delete().eq("id", pageId);
    queryClient.invalidateQueries({ queryKey: ["editor-site"] });
    if (activePageId === pageId) {
      const remaining = siteData.pages.filter(p => p.id !== pageId);
      setActivePageId(remaining[0]?.id ?? null);
      setInitialized(null);
    }
    toast.success("Страница удалена");
  }, [siteData, activePageId, queryClient]);

  const updateSiteSettings = useCallback(async (newSettings: SiteSettings) => {
    setSiteSettingsState(newSettings);
    if (!siteData?.siteId) return;
    await supabase.from("sites").update({ settings: newSettings as unknown as Json }).eq("id", siteData.siteId);
  }, [siteData?.siteId]);

  const isLoading = siteLoading || sectionsLoading || initialized !== currentPageId;
  const isAuthenticated = !!siteData;

  return {
    sections,
    setSections: updateSections,
    siteId: siteData?.siteId ?? null,
    pageId: currentPageId,
    pages: siteData?.pages ?? [],
    activePageId,
    switchPage,
    addPage,
    deletePage,
    isLoading,
    isAuthenticated,
    saveStatus,
    saveMutation,
    siteSettings,
    updateSiteSettings,
  };
}
