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

  // SEO meta-tags
  useEffect(() => {
    if (!site) return;
    const seo = site.settings?.seo;
    const siteName = site.name;

    // Title
    const pageTitle = currentPage?.title;
    const seoTitle = seo?.title;
    document.title = seoTitle ? `${seoTitle} — ${pageTitle ?? siteName}` : pageTitle ? `${pageTitle} — ${siteName}` : siteName;

    // Meta tags
    const setMeta = (name: string, content: string, property = false) => {
      if (!content) return;
      const attr = property ? "property" : "name";
      let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.content = content;
    };

    if (seo?.description) setMeta("description", seo.description);
    if (seo?.keywords) setMeta("keywords", seo.keywords);
    if (seo?.author) setMeta("author", seo.author);
    if (seo?.robots) setMeta("robots", seo.robots);
    if (seo?.language) {
      document.documentElement.lang = seo.language;
      setMeta("og:locale", seo.language === "ru" ? "ru_RU" : "en_US", true);
    }

    // OG tags
    setMeta("og:title", seoTitle || siteName, true);
    if (seo?.description) setMeta("og:description", seo.description, true);
    if (seo?.ogImage) setMeta("og:image", seo.ogImage, true);
    setMeta("og:type", "website", true);
    setMeta("og:url", window.location.href, true);

    // Favicon
    if (seo?.favicon) {
      let link = document.querySelector('link[rel="icon"]') as HTMLLinkElement | null;
      if (!link) {
        link = document.createElement("link");
        link.rel = "icon";
        document.head.appendChild(link);
      }
      link.href = seo.favicon;
    }

    return () => {
      document.title = "Visually";
    };
  }, [site, currentPage]);

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

  const siteStyles = site.settings ? {
    fonts: site.settings.fonts,
    colors: site.settings.colors,
    spacing: site.settings.spacing,
    effects: site.settings.effects,
  } : undefined;

  return (
    <div
      className="min-h-screen"
      style={{
        fontFamily: siteStyles?.fonts?.body ? `'${siteStyles.fonts.body}', sans-serif` : undefined,
        color: siteStyles?.colors?.foreground ? `hsl(${siteStyles.colors.foreground})` : undefined,
        backgroundColor: siteStyles?.colors?.background ? `hsl(${siteStyles.colors.background})` : undefined,
      }}
    >
      {/* Navigation between pages */}
      {pages.length > 1 && (
        <nav
          className="border-b bg-background/95 backdrop-blur sticky top-0 z-40"
          style={{
            borderColor: siteStyles?.colors?.muted ? `hsl(${siteStyles.colors.muted} / 0.2)` : undefined,
          }}
        >
          <div className="mx-auto px-4 flex items-center h-12 gap-1 overflow-x-auto" style={{ maxWidth: siteStyles?.spacing?.containerWidth ?? 1200 }}>
            <span className="text-sm font-semibold mr-4 shrink-0" style={{ fontFamily: siteStyles?.fonts?.heading ? `'${siteStyles.fonts.heading}', sans-serif` : undefined }}>{site.name}</span>
            {pages.map(p => (
              <Link
                key={p.id}
                to={`/site/${site.slug}${p.slug === "index" ? "" : `/${p.slug}`}`}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors shrink-0 ${
                  currentPage?.id === p.id
                    ? "font-semibold"
                    : "opacity-60 hover:opacity-100"
                }`}
                style={{
                  borderRadius: siteStyles?.spacing?.borderRadius ? `${siteStyles.spacing.borderRadius}px` : undefined,
                  ...(currentPage?.id === p.id ? { backgroundColor: siteStyles?.colors?.primary ? `hsl(${siteStyles.colors.primary} / 0.1)` : undefined, color: siteStyles?.colors?.primary ? `hsl(${siteStyles.colors.primary})` : undefined } : {}),
                }}
              >
                {p.title}
              </Link>
            ))}
          </div>
        </nav>
      )}

      {/* Render sections */}
      <main className="mx-auto" style={{ maxWidth: siteStyles?.spacing?.containerWidth ?? 1200 }}>
        <div>
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
              siteStyles={siteStyles}
            />
          ))}
          {sections.length === 0 && (
            <div className="py-24 text-center" style={{ color: siteStyles?.colors?.muted ? `hsl(${siteStyles.colors.muted})` : undefined }}>
              Эта страница пока пуста.
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default PublicSitePage;
