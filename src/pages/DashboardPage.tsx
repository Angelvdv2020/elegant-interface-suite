import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, ExternalLink, LogOut, Loader2, Trash2, X, Globe, BookTemplate } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { siteTemplates } from "@/lib/siteTemplates";
import type { Json } from "@/integrations/supabase/types";

interface SiteRow {
  id: string;
  name: string;
  slug: string;
  plan: string;
  is_published: boolean;
  updated_at: string;
  page_count?: number;
}

const DashboardPage = () => {
  const { user, signOut, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [sites, setSites] = useState<SiteRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);
  const [newName, setNewName] = useState("");
  const [userTemplates, setUserTemplates] = useState<any[]>([]);
  const [templateTab, setTemplateTab] = useState<"builtin" | "my">("builtin");

  useEffect(() => {
    if (!authLoading && !user) navigate("/login");
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (user) { loadSites(); loadUserTemplates(); }
  }, [user]);

  const loadSites = async () => {
    const { data } = await supabase
      .from("sites")
      .select("*, pages(count)")
      .eq("user_id", user!.id)
      .order("updated_at", { ascending: false });
    if (data) {
      setSites(data.map((s: any) => ({ ...s, page_count: s.pages?.[0]?.count ?? 0 })));
    }
    setLoading(false);
  };

  const loadUserTemplates = async () => {
    const { data } = await supabase.from("templates").select("*").order("created_at", { ascending: false });
    if (data) setUserTemplates(data);
  };

  const handleCreateFromTemplate = async (templateId: string, name: string) => {
    if (!name.trim()) return;
    setCreating(true);
    const template = siteTemplates.find(t => t.id === templateId)!;
    const slug = name.toLowerCase().replace(/[^a-zа-яё0-9]+/gi, "-").replace(/(^-|-$)/g, "") || "site";

    // Create site
    const { data: newSite, error: siteErr } = await supabase.from("sites").insert({
      name, slug, user_id: user!.id,
    }).select("id").single();

    if (siteErr || !newSite) {
      toast.error(siteErr?.message ?? "Ошибка создания");
      setCreating(false);
      return;
    }

    // Create pages with sections
    for (let pi = 0; pi < template.pages.length; pi++) {
      const pageTmpl = template.pages[pi];
      const { data: newPage, error: pageErr } = await supabase.from("pages").insert({
        site_id: newSite.id,
        title: pageTmpl.title,
        slug: pageTmpl.slug,
        sort_order: pi,
      }).select("id").single();

      if (pageErr || !newPage) continue;

      const sectionInserts = pageTmpl.sections.map((s, si) => ({
        page_id: newPage.id,
        type: s.type,
        label: s.label,
        content: s.content as unknown as Json,
        sort_order: si,
      }));
      await supabase.from("sections").insert(sectionInserts);
    }

    setNewName("");
    setShowTemplates(false);
    await loadSites();
    toast.success(`Сайт «${name}» создан из шаблона «${template.name}»`);
    navigate(`/editor?site=${newSite.id}`);
    setCreating(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Удалить сайт и все его страницы?")) return;
    await supabase.from("sites").delete().eq("id", id);
    await loadSites();
    toast.success("Сайт удалён");
  };

  const handleTogglePublish = async (site: SiteRow) => {
    const newState = !site.is_published;
    await supabase.from("sites").update({
      is_published: newState,
      published_at: newState ? new Date().toISOString() : null,
    }).eq("id", site.id);
    await loadSites();
    toast.success(newState ? "Сайт опубликован!" : "Сайт снят с публикации");
  };

  const handleSignOut = async () => { await signOut(); navigate("/"); };

  const timeAgo = (date: string) => {
    const diff = Date.now() - new Date(date).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return "только что";
    if (mins < 60) return `${mins} мин. назад`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs} ч. назад`;
    return `${Math.floor(hrs / 24)} дн. назад`;
  };

  if (authLoading || loading) {
    return <div className="flex items-center justify-center min-h-screen"><Loader2 className="h-8 w-8 animate-spin text-muted-foreground" /></div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="mx-auto max-w-5xl flex items-center justify-between px-4 sm:px-6 h-14">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary text-[11px] font-bold text-primary-foreground">V</div>
            <span className="text-[15px] font-semibold">Visually</span>
          </Link>
          <div className="flex items-center gap-2">
            <span className="text-[12px] text-muted-foreground hidden sm:inline">{user?.email}</span>
            <button onClick={handleSignOut} className="p-2 rounded text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors">
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 sm:px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-bold">Мои сайты</h1>
            <p className="text-sm text-muted-foreground">Управляйте проектами</p>
          </div>
          <Button onClick={() => setShowTemplates(true)} size="sm" className="gap-1.5">
            <Plus className="h-4 w-4" /> Новый сайт
          </Button>
        </div>

        {/* Site grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sites.map((s) => (
            <div key={s.id} className="rounded-xl border border-border p-5 hover:shadow-md transition-all group">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="text-[14px] font-semibold">{s.name}</div>
                  <div className="text-[12px] text-muted-foreground mt-0.5">{s.page_count} стр. · {timeAgo(s.updated_at)}</div>
                </div>
                <button onClick={() => handleDelete(s.id)} className="p-1 rounded text-muted-foreground hover:text-destructive hover:bg-destructive/10 opacity-0 group-hover:opacity-100 transition-all">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              <div className="flex items-center gap-2 mb-4">
                <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${s.plan === "pro" ? "bg-primary/10 text-primary" : "bg-secondary text-muted-foreground"}`}>{s.plan}</span>
                <button
                  onClick={() => handleTogglePublish(s)}
                  className={`rounded-full px-2 py-0.5 text-[10px] font-medium cursor-pointer transition-colors ${s.is_published ? "bg-green-50 text-green-700 hover:bg-green-100" : "bg-secondary text-muted-foreground hover:bg-secondary/80"}`}
                >
                  {s.is_published ? "Опубликован" : "Черновик"}
                </button>
              </div>
              <div className="flex gap-2">
                <Button size="sm" asChild className="flex-1"><Link to={`/editor?site=${s.id}`}>Редактировать</Link></Button>
                {s.is_published && (
                  <Button size="sm" variant="outline" asChild>
                    <Link to={`/site/${s.slug}`} target="_blank" className="gap-1">
                      <Globe className="h-3.5 w-3.5" />
                    </Link>
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>

        {sites.length === 0 && !showTemplates && (
          <div className="text-center py-16">
            <div className="text-4xl mb-4">🎨</div>
            <h2 className="text-lg font-semibold mb-2">Нет сайтов</h2>
            <p className="text-sm text-muted-foreground mb-6">Создайте первый сайт из шаблона</p>
            <Button onClick={() => setShowTemplates(true)} className="gap-1.5"><Plus className="h-4 w-4" /> Создать сайт</Button>
          </div>
        )}

        {/* Template picker modal */}
        {showTemplates && (
          <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={() => setShowTemplates(false)}>
            <div className="bg-background rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
              <div className="flex items-center justify-between p-6 border-b border-border">
                <div>
                  <h2 className="text-lg font-bold">Выберите шаблон</h2>
                  <p className="text-sm text-muted-foreground">Готовые многостраничные сайты</p>
                </div>
                <button onClick={() => setShowTemplates(false)} className="p-2 rounded-lg hover:bg-secondary"><X className="h-5 w-5" /></button>
              </div>

              <div className="p-6">
                <Input
                  placeholder="Название вашего сайта"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="mb-6 h-10"
                />

                <div className="grid gap-3 sm:grid-cols-2">
                  {siteTemplates.map((tmpl) => (
                    <button
                      key={tmpl.id}
                      disabled={creating || !newName.trim()}
                      onClick={() => handleCreateFromTemplate(tmpl.id, newName)}
                      className="text-left rounded-xl border border-border p-5 hover:border-primary/40 hover:bg-primary/5 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-2xl">{tmpl.icon}</span>
                        <div>
                          <div className="text-[14px] font-semibold">{tmpl.name}</div>
                          <div className="text-[11px] text-muted-foreground">{tmpl.pages.length} {tmpl.pages.length === 1 ? "страница" : tmpl.pages.length < 5 ? "страницы" : "страниц"}</div>
                        </div>
                      </div>
                      <p className="text-[12px] text-muted-foreground leading-relaxed">{tmpl.description}</p>
                      <div className="mt-3 flex flex-wrap gap-1">
                        {tmpl.pages.map(p => (
                          <span key={p.slug} className="px-2 py-0.5 rounded-full bg-secondary text-[10px] text-muted-foreground">{p.title}</span>
                        ))}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default DashboardPage;
