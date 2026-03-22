import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";
import type { Section, SectionContent } from "@/components/editor/types";
import EditorCanvas from "@/components/editor/EditorCanvas";

interface SiteData {
  id: string;
  name: string;
  slug: string;
  settings: Record<string, any>;
}

interface PageData {
  id: string;
  title: string;
  slug: string;
  sort_order: number;
}

const PublicSitePage = () => {
  const { siteSlug, pageSlug } = useParams();
  const [site, setSite] = useState<SiteData | null>(null);
  const [pages, setPages] = useState<PageData[]>([]);
  const [sections, setSections] = useState<Section[]>([]);
  const [currentPage, setCurrentPage] = useState<PageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    loadSite();
  }, [siteSlug]);

  useEffect(() => {
    if (pages.length > 0) {
      const target = pageSlug
        ? pages.find(p => p.slug === pageSlug)
        : pages.find(p => p.slug === "index") || pages[0];
      if (target) {
        setCurrentPage(target);
        loadSections(target.id);
      } else {
        setNotFound(true);
      }
    }
  }, [pages, pageSlug]);

  const loadSite = async () => {
    setLoading(true);
    const { data: siteData } = await supabase
      .from("sites")
      .select("id, name, slug, settings")
      .eq("slug", siteSlug!)
      .eq("is_published", true)
      .single();

    if (!siteData) {
      setNotFound(true);
      setLoading(false);
      return;
    }

    setSite(siteData as SiteData);

    const { data: pagesData } = await supabase
      .from("pages")
      .select("id, title, slug, sort_order")
      .eq("site_id", siteData.id)
      .order("sort_order");

    if (pagesData) setPages(pagesData);
    setLoading(false);
  };

  const loadSections = async (pageId: string) => {
    const { data } = await supabase
      .from("sections")
      .select("*")
      .eq("page_id", pageId)
      .eq("is_visible", true)
      .order("sort_order");

    if (data) {
      setSections(data.map(s => ({
        id: s.id,
        type: s.type as Section["type"],
        label: s.label,
        content: s.content as unknown as SectionContent,
      })));
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (notFound || !site) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-background gap-4">
        <div className="text-6xl">🔍</div>
        <h1 className="text-2xl font-bold text-foreground">Сайт не найден</h1>
        <p className="text-muted-foreground">Возможно, он ещё не опубликован или URL неверный.</p>
        <Link to="/" className="text-primary hover:underline text-sm mt-2">← На главную</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation between pages */}
      {pages.length > 1 && (
        <nav className="border-b border-border bg-background/95 backdrop-blur sticky top-0 z-40">
          <div className="mx-auto max-w-5xl px-4 flex items-center h-12 gap-1 overflow-x-auto">
            <span className="text-sm font-semibold text-foreground mr-4 shrink-0">{site.name}</span>
            {pages.map(p => (
              <Link
                key={p.id}
                to={`/site/${site.slug}${p.slug === "index" ? "" : `/${p.slug}`}`}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors shrink-0 ${
                  currentPage?.id === p.id
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                }`}
              >
                {p.title}
              </Link>
            ))}
          </div>
        </nav>
      )}

      {/* Render sections in preview mode */}
      <main className="mx-auto max-w-4xl">
        <div className="bg-background">
          {sections.map(section => (
            <EditorCanvas
              key={`${currentPage?.id}-${section.id}`}
              device="desktop"
              sections={[section]}
              selected=""
              setSelected={() => {}}
              onSectionsReorder={() => {}}
              onSectionContentChange={() => {}}
              onDeleteSection={() => {}}
              previewMode
            />
          ))}
          {sections.length === 0 && (
            <div className="py-24 text-center text-muted-foreground">
              Эта страница пока пуста.
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default PublicSitePage;
