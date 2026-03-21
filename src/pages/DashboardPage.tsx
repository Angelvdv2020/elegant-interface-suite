import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, ExternalLink, Settings, MoreHorizontal, LogOut, Loader2, Trash2 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

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
  const [newName, setNewName] = useState("");

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/login");
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (!user) return;
    loadSites();
  }, [user]);

  const loadSites = async () => {
    const { data } = await supabase
      .from("sites")
      .select("*, pages(count)")
      .eq("user_id", user!.id)
      .order("updated_at", { ascending: false });

    if (data) {
      setSites(data.map((s: any) => ({
        ...s,
        page_count: s.pages?.[0]?.count ?? 0,
      })));
    }
    setLoading(false);
  };

  const handleCreate = async () => {
    if (!newName.trim()) return;
    setCreating(true);
    const slug = newName.toLowerCase().replace(/[^a-zа-я0-9]+/gi, "-").replace(/(^-|-$)/g, "");
    const { error } = await supabase.from("sites").insert({
      name: newName, slug: slug || "site", user_id: user!.id,
    });
    if (error) {
      toast.error(error.message);
    } else {
      setNewName("");
      await loadSites();
      toast.success("Сайт создан");
    }
    setCreating(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Удалить сайт и все его страницы?")) return;
    await supabase.from("sites").delete().eq("id", id);
    await loadSites();
    toast.success("Сайт удалён");
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const timeAgo = (date: string) => {
    const diff = Date.now() - new Date(date).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return "только что";
    if (mins < 60) return `${mins} мин. назад`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs} ч. назад`;
    const days = Math.floor(hrs / 24);
    return `${days} дн. назад`;
  };

  if (authLoading || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="mx-auto max-w-5xl flex items-center justify-between px-4 sm:px-6 h-14">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-brand text-[11px] font-bold text-brand-light">V</div>
            <span className="text-[15px] font-semibold">Visually</span>
          </Link>
          <div className="flex items-center gap-2">
            <span className="text-[12px] text-muted-foreground hidden sm:inline">{user?.email}</span>
            <button onClick={handleSignOut} className="p-2 rounded text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors" title="Выйти">
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
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {sites.map((s) => (
            <div key={s.id} className="rounded-xl border border-border p-5 hover:shadow-soft transition-all group">
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
                <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${s.plan === "pro" ? "bg-brand-light text-brand" : "bg-secondary text-muted-foreground"}`}>
                  {s.plan}
                </span>
                <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${s.is_published ? "bg-success-light text-success" : "bg-secondary text-muted-foreground"}`}>
                  {s.is_published ? "Опубликован" : "Черновик"}
                </span>
              </div>
              <div className="flex gap-2">
                <Button size="sm" asChild className="flex-1"><Link to="/editor">Редактировать</Link></Button>
                <Button variant="outline" size="sm"><ExternalLink className="h-3.5 w-3.5" /></Button>
              </div>
            </div>
          ))}

          {/* New site card */}
          <div className="rounded-xl border-2 border-dashed border-border p-5 flex flex-col items-center justify-center min-h-[180px]">
            <Plus className="h-8 w-8 text-muted-foreground mb-3" />
            <div className="w-full max-w-[200px] space-y-2">
              <Input
                placeholder="Название сайта"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleCreate()}
                className="h-8 text-sm text-center"
              />
              <Button size="sm" className="w-full" onClick={handleCreate} disabled={creating || !newName.trim()}>
                {creating ? <Loader2 className="h-4 w-4 animate-spin" /> : "Создать"}
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
