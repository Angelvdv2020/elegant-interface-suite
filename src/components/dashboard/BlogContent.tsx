import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { Search, Loader2, Eye, ArrowRight, Plus } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { blogService } from "@/api/services";
import type { BlogTopic, BlogCategory } from "@/api/types";

const css = { green: "#00ff88", cyan: "#00cfff", textDim: "rgba(232,240,232,0.72)", textMuted: "rgba(232,240,232,0.45)", border: "rgba(255,255,255,0.07)" };
const BADGE_STYLES = ["bg-[#00ff88]/15 border border-[#00ff88]/35 text-[#00ff88]", "bg-[#00cfff]/15 border border-[#00cfff]/35 text-[#00cfff]", "bg-[#ffaa00]/15 border border-[#ffaa00]/35 text-[#ffaa00]"];
const ARTICLES_PER_PAGE = 8;

const BlogContent = () => {
  const { user } = useAuth();
  const [topics, setTopics] = useState<BlogTopic[]>([]);
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeCat, setActiveCat] = useState<number | null>(null);

  useEffect(() => {
    Promise.all([blogService.getTopics(), blogService.getCategories()])
      .then(([t, c]) => { setTopics(Array.isArray(t) ? t : []); setCategories(Array.isArray(c) ? c : []); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const getCatName = (id?: number) => categories.find(c => c.id === id)?.name || "";

  const filtered = topics.filter(t => {
    if (activeCat && t.category_id !== activeCat) return false;
    if (search && !t.title.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const fmtDate = (d?: string) => d ? new Date(d).toLocaleDateString("ru-RU", { day: "numeric", month: "short" }) : "";

  return (
    <div className="space-y-5">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex gap-1 overflow-x-auto rounded-[14px] p-1" style={{ background: "#0B1220", border: "1px solid rgba(255,255,255,0.06)" }}>
          <button onClick={() => setActiveCat(null)}
            className="flex items-center gap-1.5 whitespace-nowrap rounded-[10px] px-3 py-2 text-[12px] font-medium transition-all"
            style={{ background: activeCat === null ? "#111827" : "transparent", color: activeCat === null ? "#FFFFFF" : "#9CA3AF", border: activeCat === null ? "1px solid #10B981" : "1px solid transparent" }}>
            Все <span className="text-[10px] font-bold rounded px-1.5 py-0.5" style={{ background: activeCat === null ? "rgba(16,185,129,0.15)" : "rgba(255,255,255,0.06)", color: activeCat === null ? "#10B981" : "#6B7280" }}>{topics.length}</span>
          </button>
          {categories.filter(c => !c.admin_only).map(c => (
            <button key={c.id} onClick={() => setActiveCat(c.id)}
              className="flex items-center gap-1.5 whitespace-nowrap rounded-[10px] px-3 py-2 text-[12px] font-medium transition-all"
              style={{ background: activeCat === c.id ? "#111827" : "transparent", color: activeCat === c.id ? "#FFFFFF" : "#9CA3AF", border: activeCat === c.id ? "1px solid #10B981" : "1px solid transparent" }}>
              {c.name}
            </button>
          ))}
        </div>
        <div className="relative flex-1 max-w-[280px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5" style={{ color: "#6B7280" }} />
          <input placeholder="Поиск..." value={search} onChange={e => setSearch(e.target.value)}
            className="w-full rounded-[12px] pl-9 pr-3 py-2.5 text-[12px] outline-none"
            style={{ background: "#0F172A", border: "1px solid rgba(255,255,255,0.08)", color: "#FFFFFF" }} />
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex justify-center py-10"><Loader2 className="h-5 w-5 animate-spin" style={{ color: css.green }} /></div>
      ) : filtered.length === 0 ? (
        <div className="rounded-[18px] p-10 text-center" style={{ background: "#0B1220", border: `1px solid ${css.border}` }}>
          <div className="text-2xl mb-2 opacity-40">✍️</div>
          <div className="font-bold text-[13px] text-white/30 mb-1">
            {search ? "Ничего не найдено" : "Новые статьи в работе"}
          </div>
          <div className="text-[11px] text-white/25">{search ? "Попробуйте другой запрос" : "Следите за обновлениями"}</div>
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.slice(0, ARTICLES_PER_PAGE).map((t, i) => (
            <Link key={t.id} to={`/blog/${t.id}`}
              className="group flex items-stretch rounded-[16px] overflow-hidden transition-all no-underline hover:translate-y-[-1px]"
              style={{ background: "#0B1220", border: `1px solid ${css.border}` }}>
              <div className="p-4 flex-1 min-w-0 flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className={`font-mono text-[8px] font-bold px-[7px] py-[2px] rounded tracking-[1px] uppercase ${BADGE_STYLES[i % BADGE_STYLES.length]}`}>
                    {getCatName(t.category_id) || "Статья"}
                  </span>
                </div>
                <h3 className="font-semibold text-[13px] text-white leading-[1.3] mb-1 group-hover:text-[#00ff88] transition-colors truncate">{t.title}</h3>
                <div className="flex items-center gap-3 text-[10px]" style={{ color: "rgba(255,255,255,0.25)" }}>
                  {t.created_at && <span>{fmtDate(t.created_at)}</span>}
                  <span className="flex items-center gap-1"><Eye className="h-2.5 w-2.5" /> {t.views_count}</span>
                </div>
              </div>
              <div className="hidden sm:flex items-center px-4" style={{ color: css.green }}>
                <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogContent;
