import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Plus, ExternalLink, Settings, MoreHorizontal } from "lucide-react";

const sites = [
  { name: "Мой стартап", pages: 5, plan: "Pro", updated: "2 часа назад" },
  { name: "Портфолио", pages: 2, plan: "Starter", updated: "3 дня назад" },
];

const DashboardPage = () => (
  <div className="min-h-screen bg-background">
    <header className="border-b border-border">
      <div className="mx-auto max-w-5xl flex items-center justify-between px-4 sm:px-6 h-14">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-brand text-[11px] font-bold text-brand-light">V</div>
          <span className="text-[15px] font-semibold">Visually</span>
        </Link>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm"><Settings className="h-4 w-4 mr-1" /> Настройки</Button>
          <div className="w-7 h-7 rounded-full bg-brand text-brand-light flex items-center justify-center text-[11px] font-bold">U</div>
        </div>
      </div>
    </header>
    <main className="mx-auto max-w-5xl px-4 sm:px-6 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold">Мои сайты</h1>
          <p className="text-sm text-muted-foreground">Управляйте проектами</p>
        </div>
        <Button size="sm" className="gap-1.5"><Plus className="h-4 w-4" /> Новый сайт</Button>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {sites.map((s) => (
          <div key={s.name} className="rounded-xl border border-border p-5 hover:shadow-soft transition-all">
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="text-[14px] font-semibold">{s.name}</div>
                <div className="text-[12px] text-muted-foreground mt-0.5">{s.pages} стр. · {s.updated}</div>
              </div>
              <button className="p-1 rounded text-muted-foreground hover:bg-secondary"><MoreHorizontal className="h-4 w-4" /></button>
            </div>
            <div className="flex items-center gap-2 mb-4">
              <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${s.plan === "Pro" ? "bg-brand-light text-brand" : "bg-secondary text-muted-foreground"}`}>{s.plan}</span>
              <span className="rounded-full px-2 py-0.5 text-[10px] bg-success-light text-success font-medium">Активен</span>
            </div>
            <div className="flex gap-2">
              <Button size="sm" asChild className="flex-1"><Link to="/editor">Редактировать</Link></Button>
              <Button variant="outline" size="sm"><ExternalLink className="h-3.5 w-3.5" /></Button>
            </div>
          </div>
        ))}
        <div className="rounded-xl border-2 border-dashed border-border p-5 flex flex-col items-center justify-center cursor-pointer hover:border-brand/30 transition-colors min-h-[180px]">
          <Plus className="h-8 w-8 text-muted-foreground mb-2" />
          <div className="text-sm font-medium text-muted-foreground">Добавить сайт</div>
        </div>
      </div>
    </main>
  </div>
);

export default DashboardPage;
