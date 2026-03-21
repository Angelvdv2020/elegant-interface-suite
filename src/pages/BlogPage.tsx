import { useState, useEffect, useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import { useAuth } from "@/contexts/AuthContext";
import { blogService } from "@/api/services";
import type { BlogTopic, BlogCategory } from "@/api/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter,
} from "@/components/ui/dialog";
import {
  Search, Loader2, Plus, Pin, Lock, Eye, Image, ArrowRight, Upload, X,
} from "lucide-react";


/* ── helpers ── */
const BADGE_STYLES = [
  "bg-[#00ff88]/15 border border-[#00ff88]/35 text-[#00ff88]",
  "bg-[#00cfff]/15 border border-[#00cfff]/35 text-[#00cfff]",
  "bg-[#ffaa00]/15 border border-[#ffaa00]/35 text-[#ffaa00]",
];
const TAGS = ["VLESS", "Reality", "Hysteria2", "OpenWrt", "WireGuard", "DD-WRT", "Xray", "Firewall", "DNS", "Роутер", "Обход блокировок", "Xiaomi"];

const ARTICLES_PER_PAGE = 10;

const BlogPage = () => {
  const { user } = useAuth();
  const [topics, setTopics] = useState<BlogTopic[]>([]);
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeCat, setActiveCat] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const [showCreate, setShowCreate] = useState(false);
  const [createTitle, setCreateTitle] = useState("");
  const [createContent, setCreateContent] = useState("");
  const [createCatId, setCreateCatId] = useState<number | null>(null);
  const [createCover, setCreateCover] = useState("");
  const [creating, setCreating] = useState(false);
  const [createError, setCreateError] = useState("");
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const loadTopics = useCallback(async (categoryId?: number | null) => {
    setLoading(true);
    try {
      const params: { category_id?: number; limit?: number } = { limit: 50 };
      if (categoryId) params.category_id = categoryId;
      const data = await blogService.getTopics(params);
      setTopics(data);
    } catch { setTopics([]); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => {
    blogService.getCategories().then(setCategories).catch(() => {});
    loadTopics();
  }, [loadTopics]);

  const handleCategoryChange = (catId: number | null) => {
    setActiveCat(catId);
    setCurrentPage(1);
    loadTopics(catId);
  };

  const handleUploadFile = async (file: File) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
    if (!allowedTypes.includes(file.type)) {
      setCreateError("Недопустимый тип файла. Разрешены: jpg, png, webp, gif");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setCreateError("Файл слишком большой. Максимум: 5 МБ");
      return;
    }
    setUploading(true);
    setCreateError("");
    try {
      const result = await blogService.uploadImage(file);
      setCreateCover(result.url);
    } catch (err: any) {
      setCreateError(err.message || "Не удалось загрузить изображение");
    } finally {
      setUploading(false);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleUploadFile(file);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleUploadFile(file);
  };

  const handleCreate = async () => {
    if (!createTitle.trim() || !createContent.trim()) return;
    setCreating(true);
    setCreateError("");
    try {
      const availableCats = categories.filter(c => !c.admin_only);
      const categoryId = createCatId || (availableCats.length > 0 ? availableCats[0].id : null);
      if (!categoryId) {
        setCreateError("Нет доступных категорий для публикации");
        setCreating(false);
        return;
      }
      const content = createCover
        ? `![cover](${createCover})\n\n${createContent.trim()}`
        : createContent.trim();
      await blogService.createTopic({ category_id: categoryId, title: createTitle.trim(), content });
      setShowCreate(false);
      setCreateTitle(""); setCreateContent(""); setCreateCover(""); setCreateCatId(null);
      loadTopics(activeCat);
    } catch (err: any) { setCreateError(err.message || "Не удалось создать статью"); }
    finally { setCreating(false); }
  };

  const filtered = search
    ? topics.filter(t => t.title.toLowerCase().includes(search.toLowerCase()) || t.content.toLowerCase().includes(search.toLowerCase()))
    : topics;

  const fmtDate = (d: string | null) => {
    if (!d) return "";
    return new Date(d).toLocaleDateString("ru-RU", { day: "numeric", month: "short", year: "numeric" });
  };

  const extractCover = (content: string): string | null => {
    const mdImg = content.match(/!\[.*?\]\((https?:\/\/[^\s)]+)\)/);
    if (mdImg) return mdImg[1];
    const urlImg = content.match(/(https?:\/\/\S+\.(?:jpg|jpeg|png|webp|gif))/i);
    return urlImg ? urlImg[1] : null;
  };

  const getCatName = (catId: number) => {
    const cat = categories.find(c => c.id === catId);
    return cat ? cat.name : "";
  };

  const getReadTime = (content: string) => {
    const words = content.split(/\s+/).length;
    return Math.max(1, Math.round(words / 200));
  };

  /* Determine featured article: first pinned or first in list */
  const featuredArticle = filtered.find(t => t.is_pinned) || filtered[0] || null;
  const listArticles = filtered.filter(t => t !== featuredArticle);

  /* Pagination */
  const totalPages = Math.max(1, Math.ceil(listArticles.length / ARTICLES_PER_PAGE));
  const paginatedArticles = listArticles.slice(
    (currentPage - 1) * ARTICLES_PER_PAGE,
    currentPage * ARTICLES_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 200, behavior: "smooth" });
  };

  return (
    <PageLayout>
      {/* Breadcrumb */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 pt-5 flex items-center gap-2 text-xs text-muted-foreground">
        <Link to="/" className="text-primary hover:underline">Главная</Link>
        <span>/</span>
        <span>Блог</span>
      </div>

      {/* ── MAIN LAYOUT ── */}
      <section className="relative z-[1] pb-12">
        <div className="max-w-[1400px] mx-auto grid gap-6 lg:grid-cols-[200px_1fr] px-6 md:px-12 pt-5">

          {/* ──────── LEFT SIDEBAR ──────── */}
          <aside className="hidden lg:block space-y-1">
            {/* Search */}
            <div className="relative mb-3">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Поиск..."
                value={search}
                onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
                className="w-full rounded-lg border border-border bg-card pl-9 pr-3 py-2.5 text-sm text-foreground outline-none placeholder:text-muted-foreground"
              />
            </div>
            {/* Categories */}
            <button
              onClick={() => handleCategoryChange(null)}
              className={`flex w-full items-center justify-between rounded-lg px-4 py-3 text-sm font-medium transition-all ${
                activeCat === null ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              }`}
            >
              Все
              <span className="text-[10px] font-bold bg-primary/10 text-primary px-1.5 py-0.5 rounded">{topics.length}</span>
            </button>
            {categories.filter(c => !c.admin_only).map(c => (
              <button
                key={c.id}
                onClick={() => handleCategoryChange(c.id)}
                className={`flex w-full items-center justify-between rounded-lg px-4 py-3 text-sm font-medium transition-all ${
                  activeCat === c.id ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                }`}
              >
                {c.icon ? `${c.icon} ` : ""}{c.name}
                <span className="text-[10px] font-bold bg-primary/10 text-primary px-1.5 py-0.5 rounded">{c.topics_count}</span>
              </button>
            ))}
            {/* Write button */}
            {user && (
              <button
                onClick={() => setShowCreate(true)}
                className="flex w-full items-center justify-center gap-1.5 rounded-lg bg-primary px-4 py-3 mt-4 text-sm font-bold text-primary-foreground hover:brightness-110 transition-all"
              >
                <Plus className="h-4 w-4" /> Написать
              </button>
            )}
          </aside>

          {/* Mobile: search + categories */}
          <div className="lg:hidden space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
              <input
                type="text" placeholder="Поиск..." value={search}
                onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
                className="w-full rounded-lg border border-border bg-card pl-9 pr-3 py-2.5 text-sm text-foreground outline-none placeholder:text-muted-foreground"
              />
            </div>
            <div className="flex gap-1.5 overflow-x-auto rounded-lg border border-border bg-card p-1">
              <button onClick={() => handleCategoryChange(null)}
                className={`whitespace-nowrap rounded-md px-3 py-2 text-sm font-medium transition-all ${activeCat === null ? "bg-primary/10 text-primary" : "text-muted-foreground"}`}>
                Все
              </button>
              {categories.filter(c => !c.admin_only).map(c => (
                <button key={c.id} onClick={() => handleCategoryChange(c.id)}
                  className={`whitespace-nowrap rounded-md px-3 py-2 text-sm font-medium transition-all ${activeCat === c.id ? "bg-primary/10 text-primary" : "text-muted-foreground"}`}>
                  {c.name}
                </button>
              ))}
            </div>
          </div>

          {/* ──────── CONTENT ──────── */}
          <main className="min-w-0">

            {/* Content area */}
            {loading ? (
              <div className="flex justify-center py-10">
                <Loader2 className="h-5 w-5 animate-spin text-[#00ff88]" />
              </div>
            ) : filtered.length === 0 ? (
              <div className="border border-dashed border-[#00ff88]/15 rounded-lg p-8 text-center bg-[#00ff88]/[0.02]">
                <div className="text-2xl mb-2 opacity-40">&#9997;&#65039;</div>
                <div className="font-bold text-[13px] text-white/30 mb-1.5" style={{ fontFamily: "'Unbounded', sans-serif" }}>
                  {search ? "Ничего не найдено" : "Новые статьи в работе"}
                </div>
                <div className="text-[11px] text-white/25 mb-4">
                  {search ? "Попробуйте другой запрос" : "Подписывайтесь на Telegram"}
                </div>
                {!search && (
                  <a
                    href="https://t.me/northlinevpn"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 bg-[#00cfff]/10 border border-[#00cfff]/30 text-[#00cfff] px-4 py-2 rounded-md text-[11px] font-semibold transition-all hover:bg-[#00cfff]/[0.18]"
                  >
                    Telegram
                  </a>
                )}
                {user && !search && (
                  <button
                    onClick={() => setShowCreate(true)}
                    className="inline-flex items-center gap-1.5 bg-[#00ff88] text-[#040d08] px-4 py-2 rounded-md text-[11px] font-bold ml-2"
                  >
                    <Plus className="h-3 w-3" /> Написать
                  </button>
                )}
              </div>
            ) : (
              <>
                {/* ── FEATURED CARD (compact) ── */}
                {featuredArticle && (
                  <Link
                    to={`/blog/${featuredArticle.id}`}
                    className="group block bg-[rgba(0,0,0,0.3)] shadow-glow border border-[#00ff88]/15 rounded-lg overflow-hidden mb-4 transition-all hover:border-[#00ff88]/40"
                  >
                    <div className="flex items-stretch">
                      {/* Left: compact image area */}
                      {(() => {
                        const cover = extractCover(featuredArticle.content);
                        return cover ? (
                          <div className="hidden sm:block w-[160px] shrink-0 relative overflow-hidden bg-gradient-to-br from-[#0a1f14] to-[#061610]">
                            <img src={cover} alt="" className="absolute inset-0 w-full h-full object-cover opacity-70" />
                          </div>
                        ) : null;
                      })()}
                      {/* Right: Content */}
                      <div className="p-4 flex-1 min-w-0 flex flex-col justify-center">
                        <div className="flex items-center gap-2 mb-1.5">
                          <span className="font-mono text-[9px] font-bold text-[#00ff88] bg-[#00ff88]/10 px-2 py-0.5 rounded tracking-[1px] uppercase">
                            {featuredArticle.is_pinned ? "Закреплено" : "Главная"}
                          </span>
                          <span className="font-mono text-[9px] text-white/25">
                            {getCatName(featuredArticle.category_id)}
                          </span>
                        </div>
                        <h3 className="font-bold text-[14px] text-white leading-[1.3] mb-1.5 group-hover:text-[#00ff88] transition-colors line-clamp-1" style={{ fontFamily: "'Unbounded', sans-serif" }}>
                          {featuredArticle.title}
                        </h3>
                        <p className="text-[12px] text-white/40 leading-[1.5] mb-2 line-clamp-2">
                          {featuredArticle.content.replace(/!\[.*?\]\(.*?\)/g, "").slice(0, 200)}
                        </p>
                        <div className="flex items-center gap-3 text-[10px] text-white/25">
                          {featuredArticle.created_at && (
                            <span>{fmtDate(featuredArticle.created_at)}</span>
                          )}
                          <span>{getReadTime(featuredArticle.content)} мин</span>
                          <span className="flex items-center gap-1">
                            <Eye className="h-2.5 w-2.5" /> {featuredArticle.views_count}
                          </span>
                          <span className="ml-auto text-[11px] font-semibold text-[#00ff88] flex items-center gap-1 group-hover:gap-1.5 transition-all">
                            Читать <ArrowRight className="h-3 w-3" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                )}

                {/* ── ARTICLES LIST ── */}
                <div className="flex flex-col gap-[6px] mb-5">
                  {paginatedArticles.map((t, i) => {
                    const cover = extractCover(t.content);
                    const globalIdx = (currentPage - 1) * ARTICLES_PER_PAGE + i;
                    const badgeIdx = globalIdx % BADGE_STYLES.length;

                    return (
                      <Link
                        key={t.id}
                        to={`/blog/${t.id}`}
                        className="group bg-[rgba(0,0,0,0.3)] shadow-glow border border-white/[0.1] rounded-lg overflow-hidden flex items-stretch transition-all hover:border-[#00ff88]/20"
                      >
                        {/* Compact thumbnail */}
                        {cover && (
                          <div className="hidden sm:block w-[100px] shrink-0 relative overflow-hidden">
                            <img src={cover} alt="" className="absolute inset-0 w-full h-full object-cover" />
                          </div>
                        )}

                        {/* Body */}
                        <div className="p-3 flex-1 min-w-0 flex flex-col justify-center">
                          <div className="flex items-center gap-2 mb-1">
                            <span className={`font-mono text-[8px] font-bold px-[7px] py-[2px] rounded tracking-[1px] uppercase ${BADGE_STYLES[badgeIdx]}`}>
                              {getCatName(t.category_id) || "Статья"}
                            </span>
                            {t.is_pinned && <Pin className="h-2.5 w-2.5 text-[#00ff88]" />}
                            {t.is_locked && <Lock className="h-2.5 w-2.5 text-red-500" />}
                          </div>
                          <h3 className="font-semibold text-[13px] text-white leading-[1.3] mb-1 group-hover:text-[#00ff88] transition-colors line-clamp-1">
                            {t.title}
                          </h3>
                          <p className="text-[11px] text-white/35 leading-[1.4] line-clamp-1">
                            {t.content.replace(/!\[.*?\]\(.*?\)/g, "").slice(0, 150)}
                          </p>
                        </div>

                        {/* Right meta */}
                        <div className="hidden sm:flex flex-col items-end justify-center px-3 py-3 shrink-0 gap-1 min-w-[100px]">
                          <span className="font-mono text-[10px] text-white/20">
                            {fmtDate(t.created_at)}
                          </span>
                          <span className="text-[10px] text-white/20 flex items-center gap-1">
                            <Eye className="h-2.5 w-2.5" /> {t.views_count}
                          </span>
                          <span className="text-[10px] text-white/20">
                            {getReadTime(t.content)} мин
                          </span>
                        </div>
                      </Link>
                    );
                  })}
                </div>

                {/* ── PAGINATION ── */}
                {totalPages > 1 && (
                  <div className="flex gap-1.5 items-center">
                    {Array.from({ length: Math.min(totalPages, 3) }, (_, i) => i + 1).map(page => (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`w-7 h-7 rounded-md flex items-center justify-center text-[11px] font-medium border transition-all ${
                          currentPage === page
                            ? "bg-[#00ff88]/[0.12] border-[#00ff88]/20 text-[#00ff88]"
                            : "border-white/[0.1] text-white/35 hover:border-[#00ff88]/20 hover:text-[#00ff88]"
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                    {totalPages > 4 && <span className="text-white/20 text-[11px]">...</span>}
                    {totalPages > 3 && (
                      <button
                        onClick={() => handlePageChange(totalPages)}
                        className={`w-7 h-7 rounded-md flex items-center justify-center text-[11px] font-medium border transition-all ${
                          currentPage === totalPages
                            ? "bg-[#00ff88]/[0.12] border-[#00ff88]/20 text-[#00ff88]"
                            : "border-white/[0.1] text-white/35 hover:border-[#00ff88]/20 hover:text-[#00ff88]"
                        }`}
                      >
                        {totalPages}
                      </button>
                    )}
                  </div>
                )}
              </>
            )}
          </main>


        </div>
      </section>

      {/* ── CREATE ARTICLE MODAL ── */}
      <Dialog open={showCreate} onOpenChange={setShowCreate}>
        <DialogContent className="sm:max-w-xl">
          <DialogHeader>
            <DialogTitle>Новая статья</DialogTitle>
            <DialogDescription>Заголовок, обложка и содержание</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            {categories.length > 0 && (
              <div>
                <label className="text-sm font-medium mb-1.5 block">Категория</label>
                <div className="flex flex-wrap gap-2">
                  {categories.filter(c => !c.admin_only).map(c => (
                    <button key={c.id} type="button" onClick={() => setCreateCatId(c.id)}
                      className={`rounded-full px-3 py-1.5 text-sm font-medium transition-all ${
                        createCatId === c.id ? "bg-primary text-primary-foreground" : "bg-card shadow-glow border border-border text-muted-foreground hover:text-foreground"
                      }`}>
                      {c.icon ? `${c.icon} ` : ""}{c.name}
                    </button>
                  ))}
                </div>
              </div>
            )}
            <div>
              <label className="text-sm font-medium mb-1.5 block">Заголовок</label>
              <Input placeholder="Заголовок статьи" value={createTitle} onChange={e => setCreateTitle(e.target.value)} className="min-h-[42px]" maxLength={200} />
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">
                <Image className="h-3.5 w-3.5 inline mr-1" /> Обложка
              </label>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif"
                onChange={handleFileInput}
                className="hidden"
              />
              {createCover ? (
                <div className="relative rounded-lg overflow-hidden h-36 border border-border bg-card">
                  <img
                    src={createCover}
                    alt="Обложка"
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => setCreateCover("")}
                    className="absolute top-2 right-2 p-1 rounded-full bg-black/60 hover:bg-black/80 transition-colors"
                  >
                    <X className="h-4 w-4 text-white" />
                  </button>
                </div>
              ) : (
                <div
                  onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed p-6 cursor-pointer transition-colors ${
                    dragOver
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/40 hover:bg-card/50"
                  }`}
                >
                  {uploading ? (
                    <Loader2 className="h-6 w-6 animate-spin text-primary" />
                  ) : (
                    <Upload className="h-6 w-6 text-muted-foreground" />
                  )}
                  <span className="text-sm text-muted-foreground text-center">
                    {uploading ? "Загрузка..." : "Нажмите или перетащите изображение"}
                  </span>
                  <span className="text-xs text-muted-foreground/60">
                    JPG, PNG, WebP, GIF до 5 МБ
                  </span>
                </div>
              )}
              {/* Fallback: manual URL input */}
              <div className="mt-2">
                <Input
                  placeholder="или вставьте URL: https://..."
                  value={createCover}
                  onChange={e => setCreateCover(e.target.value)}
                  className="min-h-[36px] text-xs"
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">Содержание</label>
              <Textarea placeholder="Текст статьи... Markdown: **жирный**, ## заголовок, - список" value={createContent} onChange={e => setCreateContent(e.target.value)} className="min-h-[180px]" />
            </div>
            {createError && <p className="text-sm text-destructive">{createError}</p>}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCreate(false)} disabled={creating}>Отмена</Button>
            <Button onClick={handleCreate} disabled={creating || uploading || !createTitle.trim() || !createContent.trim()}>
              {creating ? <Loader2 className="h-4 w-4 animate-spin mr-1.5" /> : <Plus className="h-4 w-4 mr-1.5" />}
              Опубликовать
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </PageLayout>
  );
};

export default BlogPage;
