import { useState, useCallback, useRef, useEffect } from "react";
import { Plus, Trash2, Copy } from "lucide-react";
import EditableText from "./EditableText";
import type {
  Section, HeroContent, CardsContent, TextContent, GalleryContent, FormContent,
  SeparatorContent, CTAContent, NavbarContent, FooterContent, PricingContent,
  TestimonialsContent, FAQContent, VideoContent, StatsContent, TeamContent,
  ColumnsContent, HTMLContent, LogosContent, TimelineContent, BannerContent,
} from "./types";

interface SiteStyleSettings {
  fonts?: { heading: string; body: string };
  colors?: { primary: string; secondary: string; accent: string; background: string; foreground: string; muted: string };
  spacing?: { borderRadius: number; sectionGap: number; containerWidth: number };
  effects?: { shadow: string; animation: string; hoverScale: boolean };
}

interface EditorCanvasProps {
  device: "desktop" | "tablet" | "mobile";
  sections: Section[];
  selected: string;
  setSelected: (id: string) => void;
  onSectionsReorder: (sections: Section[]) => void;
  onSectionContentChange: (sectionId: string, content: Section["content"]) => void;
  onDeleteSection: (sectionId: string) => void;
  onDuplicateSection?: (sectionId: string) => void;
  previewMode?: boolean;
  siteStyles?: SiteStyleSettings;
}

const DragHandle = () => (
  <div className="absolute top-1/2 -left-5 -translate-y-1/2 flex flex-col items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity cursor-grab active:cursor-grabbing">
    {[...Array(6)].map((_, i) => (
      <div key={i} className="w-1 h-1 rounded-full bg-muted-foreground/40" />
    ))}
  </div>
);

const SectionControls = ({ onDelete, onDuplicate }: { onDelete: () => void; onDuplicate?: () => void }) => (
  <div className="absolute top-2 right-2 flex gap-1 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
    {onDuplicate && (
      <span
        className="px-1.5 py-0.5 rounded bg-background border border-border text-[10px] text-muted-foreground shadow-sm cursor-pointer hover:bg-secondary flex items-center gap-0.5"
        onClick={(e) => { e.stopPropagation(); onDuplicate(); }}
        title="Дублировать"
      >
        <Copy className="h-3 w-3" />
      </span>
    )}
    <span className="px-1.5 py-0.5 rounded bg-background border border-border text-[10px] text-muted-foreground shadow-sm cursor-pointer hover:bg-secondary">✎</span>
    <span
      className="px-1.5 py-0.5 rounded bg-background border border-border text-[10px] text-destructive shadow-sm cursor-pointer hover:bg-destructive/10"
      onClick={(e) => { e.stopPropagation(); onDelete(); }}
    >✕</span>
  </div>
);

const ItemControls = ({ onAdd, onRemove, canRemove = true }: { onAdd: () => void; onRemove?: () => void; canRemove?: boolean }) => (
  <div className="flex gap-1 mt-2">
    <button
      onClick={(e) => { e.stopPropagation(); onAdd(); }}
      className="flex items-center gap-1 px-2 py-1 rounded border border-dashed border-border text-[10px] text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
    >
      <Plus className="h-3 w-3" /> Добавить
    </button>
    {onRemove && canRemove && (
      <button
        onClick={(e) => { e.stopPropagation(); onRemove(); }}
        className="flex items-center gap-1 px-2 py-1 rounded border border-dashed border-destructive/30 text-[10px] text-destructive/70 hover:bg-destructive/10 transition-colors"
      >
        <Trash2 className="h-3 w-3" /> Последний
      </button>
    )}
  </div>
);

const EditorCanvas = ({
  device, sections, selected, setSelected,
  onSectionsReorder, onSectionContentChange, onDeleteSection,
  onDuplicateSection,
  previewMode = false,
}: EditorCanvasProps) => {
  const canvasWidth = device === "desktop" ? "max-w-[720px]" : device === "tablet" ? "max-w-[480px]" : "max-w-[320px]";
  const [dragOverId, setDragOverId] = useState<string | null>(null);
  const dragItem = useRef<string | null>(null);

  const handleDragStart = useCallback((e: React.DragEvent, id: string) => {
    dragItem.current = id;
    e.dataTransfer.effectAllowed = "move";
    (e.target as HTMLElement).style.opacity = "0.4";
  }, []);

  const handleDragEnd = useCallback((e: React.DragEvent) => {
    (e.target as HTMLElement).style.opacity = "1";
    setDragOverId(null);
    dragItem.current = null;
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent, id: string) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    if (dragItem.current && dragItem.current !== id) setDragOverId(id);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    setDragOverId(null);
    if (!dragItem.current || dragItem.current === targetId) return;
    const fromIndex = sections.findIndex(s => s.id === dragItem.current);
    const toIndex = sections.findIndex(s => s.id === targetId);
    if (fromIndex === -1 || toIndex === -1) return;
    const reordered = [...sections];
    const [moved] = reordered.splice(fromIndex, 1);
    reordered.splice(toIndex, 0, moved);
    onSectionsReorder(reordered);
    dragItem.current = null;
  }, [sections, onSectionsReorder]);

  const cls = (id: string) =>
    previewMode
      ? "p-6"
      : `relative p-6 border-2 border-dashed cursor-pointer transition-all ${
          selected === id ? "border-primary/50 bg-primary/5" : "border-transparent hover:border-primary/15"
        } ${dragOverId === id ? "border-primary/70 bg-primary/5" : ""}`;

  const sc = (s: Section) => (
    <SectionControls onDelete={() => onDeleteSection(s.id)} onDuplicate={onDuplicateSection ? () => onDuplicateSection(s.id) : undefined} />
  );

  // ─── Renderers ───

  const renderNavbar = (s: Section) => {
    const c = s.content as NavbarContent;
    return (
      <div className={cls(s.id)} onClick={() => setSelected(s.id)}>
        {!previewMode && sc(s)}
        <div className="flex items-center justify-between">
          <EditableText value={c.logo} onChange={(v) => onSectionContentChange(s.id, { ...c, logo: v })} as="span" className="text-[15px] font-bold text-foreground" disabled={previewMode} />
          <div className="flex items-center gap-4">
            {c.links.map((link, i) => (
              <div key={i} className="relative group/link">
                <EditableText value={link.label} onChange={(v) => {
                  const links = [...c.links]; links[i] = { ...links[i], label: v };
                  onSectionContentChange(s.id, { ...c, links });
                }} as="span" className="text-[13px] text-muted-foreground hover:text-foreground" disabled={previewMode} />
                {!previewMode && (
                  <button
                    className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-destructive text-destructive-foreground text-[8px] flex items-center justify-center opacity-0 group-hover/link:opacity-100 transition-opacity"
                    onClick={(e) => { e.stopPropagation(); const links = c.links.filter((_, j) => j !== i); onSectionContentChange(s.id, { ...c, links }); }}
                  >✕</button>
                )}
              </div>
            ))}
            <span className="px-3 py-1.5 bg-primary text-primary-foreground rounded-md text-[12px] font-medium">{c.buttonText}</span>
          </div>
        </div>
        {!previewMode && (
          <ItemControls
            onAdd={() => onSectionContentChange(s.id, { ...c, links: [...c.links, { label: "Ссылка", url: "#" }] })}
            canRemove={false}
          />
        )}
      </div>
    );
  };

  const renderHero = (s: Section) => {
    const c = s.content as HeroContent;
    return (
      <div className={cls(s.id)} onClick={() => setSelected(s.id)}>
        {!previewMode && sc(s)}
        <div className="w-full h-24 rounded-lg bg-gradient-to-r from-primary to-primary/70 flex items-center justify-center mb-4">
          <span className="text-[11px] text-primary-foreground/70">Кликните чтобы заменить</span>
        </div>
        <EditableText value={c.title} onChange={(v) => onSectionContentChange(s.id, { ...c, title: v })} as="h2" className="text-xl font-semibold text-foreground mb-2" disabled={previewMode} />
        <EditableText value={c.description} onChange={(v) => onSectionContentChange(s.id, { ...c, description: v })} className="text-[13px] text-muted-foreground leading-relaxed mb-4" disabled={previewMode} />
        <div className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-lg text-[13px] font-medium">
          <EditableText value={c.buttonText} onChange={(v) => onSectionContentChange(s.id, { ...c, buttonText: v })} as="span" className="text-primary-foreground" disabled={previewMode} />
        </div>
      </div>
    );
  };

  const renderCards = (s: Section) => {
    const c = s.content as CardsContent;
    const bgs = ["bg-blue-50", "bg-green-50", "bg-purple-50", "bg-amber-50", "bg-rose-50", "bg-teal-50"];
    return (
      <div className={cls(s.id)} onClick={() => setSelected(s.id)}>
        {!previewMode && sc(s)}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {c.cards.map((card, i) => (
            <div key={i} className="border border-border rounded-lg p-4 relative group/card">
              <div className={`w-7 h-7 rounded-md ${card.bg} mb-3`} />
              <EditableText value={card.label} onChange={(v) => {
                const cards = [...c.cards]; cards[i] = { ...cards[i], label: v };
                onSectionContentChange(s.id, { cards });
              }} className="text-[13px] font-medium text-foreground mb-1" as="div" disabled={previewMode} />
              <EditableText value={card.description} onChange={(v) => {
                const cards = [...c.cards]; cards[i] = { ...cards[i], description: v };
                onSectionContentChange(s.id, { cards });
              }} className="text-[12px] text-muted-foreground leading-relaxed" as="div" disabled={previewMode} />
              {!previewMode && (
                <button
                  className="absolute top-1 right-1 w-5 h-5 rounded-full bg-destructive/80 text-destructive-foreground text-[9px] flex items-center justify-center opacity-0 group-hover/card:opacity-100 transition-opacity"
                  onClick={(e) => { e.stopPropagation(); if (c.cards.length > 1) { const cards = c.cards.filter((_, j) => j !== i); onSectionContentChange(s.id, { cards }); } }}
                >✕</button>
              )}
            </div>
          ))}
        </div>
        {!previewMode && (
          <ItemControls
            onAdd={() => onSectionContentChange(s.id, { cards: [...c.cards, { bg: bgs[c.cards.length % bgs.length], label: `Пункт ${c.cards.length + 1}`, description: "Описание" }] })}
            canRemove={false}
          />
        )}
      </div>
    );
  };

  const renderText = (s: Section) => {
    const c = s.content as TextContent;
    return (
      <div className={cls(s.id)} onClick={() => setSelected(s.id)}>
        {!previewMode && sc(s)}
        <EditableText value={c.title} onChange={(v) => onSectionContentChange(s.id, { ...c, title: v })} as="h3" className="text-lg font-semibold text-foreground mb-2" disabled={previewMode} />
        <EditableText value={c.body} onChange={(v) => onSectionContentChange(s.id, { ...c, body: v })} className="text-[13px] text-muted-foreground leading-relaxed" disabled={previewMode} />
      </div>
    );
  };

  const renderColumns = (s: Section) => {
    const c = s.content as ColumnsContent;
    return (
      <div className={cls(s.id)} onClick={() => setSelected(s.id)}>
        {!previewMode && sc(s)}
        <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${c.count}, 1fr)` }}>
          {c.columns.map((col, i) => (
            <div key={i} className="border border-border/50 rounded-lg p-4 relative group/col">
              <EditableText value={col.title} onChange={(v) => {
                const cols = [...c.columns]; cols[i] = { ...cols[i], title: v };
                onSectionContentChange(s.id, { ...c, columns: cols });
              }} as="h4" className="text-[14px] font-semibold text-foreground mb-2" disabled={previewMode} />
              <EditableText value={col.body} onChange={(v) => {
                const cols = [...c.columns]; cols[i] = { ...cols[i], body: v };
                onSectionContentChange(s.id, { ...c, columns: cols });
              }} className="text-[12px] text-muted-foreground leading-relaxed" disabled={previewMode} />
              {!previewMode && c.columns.length > 1 && (
                <button
                  className="absolute top-1 right-1 w-5 h-5 rounded-full bg-destructive/80 text-destructive-foreground text-[9px] flex items-center justify-center opacity-0 group-hover/col:opacity-100 transition-opacity"
                  onClick={(e) => { e.stopPropagation(); const cols = c.columns.filter((_, j) => j !== i); onSectionContentChange(s.id, { ...c, columns: cols, count: cols.length }); }}
                >✕</button>
              )}
            </div>
          ))}
        </div>
        {!previewMode && (
          <ItemControls
            onAdd={() => {
              const cols = [...c.columns, { title: `Колонка ${c.columns.length + 1}`, body: "Содержание" }];
              onSectionContentChange(s.id, { ...c, columns: cols, count: cols.length });
            }}
            canRemove={false}
          />
        )}
      </div>
    );
  };

  const renderGallery = (s: Section) => {
    const c = s.content as GalleryContent;
    return (
      <div className={cls(s.id)} onClick={() => setSelected(s.id)}>
        {!previewMode && sc(s)}
        {c.images.length === 0 ? (
          <div className="grid grid-cols-3 gap-2">
            {[1, 2, 3].map(i => (
              <div key={i} className="aspect-square rounded-lg bg-muted/50 border-2 border-dashed border-border flex items-center justify-center text-[11px] text-muted-foreground">+ Фото</div>
            ))}
          </div>
        ) : (
          <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${c.columns}, 1fr)` }}>
            {c.images.map((img, i) => (
              <div key={i} className="relative group/img">
                <img src={img.url} alt={img.alt} className="aspect-square rounded-lg object-cover" />
                {!previewMode && (
                  <button
                    className="absolute top-1 right-1 w-5 h-5 rounded-full bg-destructive/80 text-destructive-foreground text-[9px] flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity"
                    onClick={(e) => { e.stopPropagation(); const images = c.images.filter((_, j) => j !== i); onSectionContentChange(s.id, { ...c, images }); }}
                  >✕</button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const renderVideo = (s: Section) => {
    const c = s.content as VideoContent;
    const isYoutube = c.url?.includes("youtube") || c.url?.includes("youtu.be");
    const isVimeo = c.url?.includes("vimeo");
    const isDirect = !isYoutube && !isVimeo;
    return (
      <div className={cls(s.id)} onClick={() => setSelected(s.id)}>
        {!previewMode && sc(s)}
        <EditableText value={c.title} onChange={(v) => onSectionContentChange(s.id, { ...c, title: v })} as="h3" className="text-lg font-semibold text-foreground mb-2" disabled={previewMode} />
        <EditableText value={c.description} onChange={(v) => onSectionContentChange(s.id, { ...c, description: v })} className="text-[13px] text-muted-foreground mb-4" disabled={previewMode} />
        <div className="aspect-video rounded-lg bg-muted/30 border border-border overflow-hidden">
          {previewMode ? (
            isDirect ? (
              <video
                src={c.url}
                className="w-full h-full object-cover"
                autoPlay={c.autoplay ?? false}
                loop={c.loop ?? false}
                muted={c.muted ?? true}
                playsInline
                controls
                poster={c.poster}
              />
            ) : (
              <iframe src={c.url} className="w-full h-full" frameBorder="0" allowFullScreen allow="autoplay; fullscreen" />
            )
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground text-[12px] gap-2">
              <span className="text-2xl">▶</span>
              <span>{isYoutube ? "YouTube" : isVimeo ? "Vimeo" : "Видео"}: {c.url}</span>
              {isDirect && (
                <div className="flex gap-2 text-[10px]">
                  {c.autoplay && <span className="px-1.5 py-0.5 rounded bg-primary/10 text-primary">Autoplay</span>}
                  {c.loop && <span className="px-1.5 py-0.5 rounded bg-primary/10 text-primary">Loop</span>}
                  {c.muted && <span className="px-1.5 py-0.5 rounded bg-primary/10 text-primary">Muted</span>}
                </div>
              )}
            </div>
          )}
        </div>
        {!previewMode && isDirect && (
          <div className="flex gap-2 mt-2 flex-wrap">
            {[
              { key: "autoplay", label: "Автовоспр.", val: c.autoplay },
              { key: "loop", label: "Цикл", val: c.loop },
              { key: "muted", label: "Без звука", val: c.muted },
            ].map(opt => (
              <button
                key={opt.key}
                onClick={(e) => { e.stopPropagation(); onSectionContentChange(s.id, { ...c, [opt.key]: !opt.val }); }}
                className={`px-2 py-1 rounded text-[10px] transition-colors ${
                  opt.val ? "bg-primary/10 text-primary border border-primary/20" : "border border-border text-muted-foreground hover:bg-secondary"
                }`}
              >{opt.label}</button>
            ))}
          </div>
        )}
      </div>
    );
  };

  const renderStats = (s: Section) => {
    const c = s.content as StatsContent;
    return (
      <div className={cls(s.id)} onClick={() => setSelected(s.id)}>
        {!previewMode && sc(s)}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {c.items.map((item, i) => (
            <div key={i} className="text-center p-4 relative group/stat">
              <EditableText value={item.value} onChange={(v) => {
                const items = [...c.items]; items[i] = { ...items[i], value: v };
                onSectionContentChange(s.id, { items });
              }} as="div" className="text-2xl font-bold text-foreground mb-1 tabular-nums" disabled={previewMode} />
              <EditableText value={item.label} onChange={(v) => {
                const items = [...c.items]; items[i] = { ...items[i], label: v };
                onSectionContentChange(s.id, { items });
              }} as="div" className="text-[12px] text-muted-foreground" disabled={previewMode} />
              {!previewMode && c.items.length > 1 && (
                <button
                  className="absolute top-0 right-0 w-4 h-4 rounded-full bg-destructive/80 text-destructive-foreground text-[8px] flex items-center justify-center opacity-0 group-hover/stat:opacity-100 transition-opacity"
                  onClick={(e) => { e.stopPropagation(); onSectionContentChange(s.id, { items: c.items.filter((_, j) => j !== i) }); }}
                >✕</button>
              )}
            </div>
          ))}
        </div>
        {!previewMode && (
          <ItemControls
            onAdd={() => onSectionContentChange(s.id, { items: [...c.items, { value: "0", label: "Метрика" }] })}
            canRemove={false}
          />
        )}
      </div>
    );
  };

  const renderPricing = (s: Section) => {
    const c = s.content as PricingContent;
    return (
      <div className={cls(s.id)} onClick={() => setSelected(s.id)}>
        {!previewMode && sc(s)}
        <EditableText value={c.title} onChange={(v) => onSectionContentChange(s.id, { ...c, title: v })} as="h3" className="text-xl font-bold text-foreground text-center mb-1" disabled={previewMode} />
        <EditableText value={c.description} onChange={(v) => onSectionContentChange(s.id, { ...c, description: v })} className="text-[13px] text-muted-foreground text-center mb-6" disabled={previewMode} />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {c.plans.map((plan, i) => (
            <div key={i} className={`rounded-xl border p-5 relative group/plan ${plan.highlighted ? "border-primary bg-primary/5 shadow-md" : "border-border"}`}>
              {!previewMode && c.plans.length > 1 && (
                <button
                  className="absolute top-1 right-1 w-5 h-5 rounded-full bg-destructive/80 text-destructive-foreground text-[9px] flex items-center justify-center opacity-0 group-hover/plan:opacity-100 transition-opacity"
                  onClick={(e) => { e.stopPropagation(); onSectionContentChange(s.id, { ...c, plans: c.plans.filter((_, j) => j !== i) }); }}
                >✕</button>
              )}
              <EditableText value={plan.name} onChange={(v) => {
                const plans = [...c.plans]; plans[i] = { ...plans[i], name: v };
                onSectionContentChange(s.id, { ...c, plans });
              }} as="div" className="text-[14px] font-semibold text-foreground mb-2" disabled={previewMode} />
              <div className="flex items-baseline gap-0.5 mb-3">
                <EditableText value={plan.price} onChange={(v) => {
                  const plans = [...c.plans]; plans[i] = { ...plans[i], price: v };
                  onSectionContentChange(s.id, { ...c, plans });
                }} as="span" className="text-2xl font-bold text-foreground" disabled={previewMode} />
                <span className="text-[12px] text-muted-foreground">{plan.period}</span>
              </div>
              <ul className="space-y-1.5 mb-4">
                {plan.features.map((f, fi) => (
                  <li key={fi} className="text-[12px] text-muted-foreground flex items-start gap-1.5 group/feat">
                    <span className="text-primary mt-0.5">✓</span>
                    <span className="flex-1">{f}</span>
                    {!previewMode && plan.features.length > 1 && (
                      <button
                        className="w-3.5 h-3.5 rounded-full bg-destructive/60 text-destructive-foreground text-[7px] flex items-center justify-center opacity-0 group-hover/feat:opacity-100 shrink-0"
                        onClick={(e) => {
                          e.stopPropagation();
                          const plans = [...c.plans];
                          plans[i] = { ...plans[i], features: plan.features.filter((_, j) => j !== fi) };
                          onSectionContentChange(s.id, { ...c, plans });
                        }}
                      >✕</button>
                    )}
                  </li>
                ))}
              </ul>
              {!previewMode && (
                <button
                  className="w-full text-center text-[10px] text-muted-foreground border border-dashed border-border rounded py-1 mb-2 hover:bg-secondary transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    const plans = [...c.plans];
                    plans[i] = { ...plans[i], features: [...plan.features, "Новая функция"] };
                    onSectionContentChange(s.id, { ...c, plans });
                  }}
                >+ Функция</button>
              )}
              <button className={`w-full py-2 rounded-lg text-[12px] font-medium ${plan.highlighted ? "bg-primary text-primary-foreground" : "border border-border text-foreground hover:bg-secondary"}`}>
                {plan.buttonText}
              </button>
            </div>
          ))}
        </div>
        {!previewMode && (
          <ItemControls
            onAdd={() => onSectionContentChange(s.id, { ...c, plans: [...c.plans, { name: "Новый план", price: "$0", period: "/мес", features: ["Базовая функция"], buttonText: "Выбрать", highlighted: false }] })}
            canRemove={false}
          />
        )}
      </div>
    );
  };

  const renderTestimonials = (s: Section) => {
    const c = s.content as TestimonialsContent;
    return (
      <div className={cls(s.id)} onClick={() => setSelected(s.id)}>
        {!previewMode && sc(s)}
        <EditableText value={c.title} onChange={(v) => onSectionContentChange(s.id, { ...c, title: v })} as="h3" className="text-xl font-bold text-foreground text-center mb-6" disabled={previewMode} />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {c.items.map((item, i) => (
            <div key={i} className="border border-border rounded-xl p-5 relative group/test">
              {!previewMode && c.items.length > 1 && (
                <button
                  className="absolute top-1 right-1 w-5 h-5 rounded-full bg-destructive/80 text-destructive-foreground text-[9px] flex items-center justify-center opacity-0 group-hover/test:opacity-100 transition-opacity"
                  onClick={(e) => { e.stopPropagation(); onSectionContentChange(s.id, { ...c, items: c.items.filter((_, j) => j !== i) }); }}
                >✕</button>
              )}
              <EditableText value={item.quote} onChange={(v) => {
                const items = [...c.items]; items[i] = { ...items[i], quote: v };
                onSectionContentChange(s.id, { ...c, items });
              }} className="text-[13px] text-foreground italic leading-relaxed mb-3" disabled={previewMode} />
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-[11px] font-bold text-primary">
                  {item.author.charAt(0)}
                </div>
                <div>
                  <EditableText value={item.author} onChange={(v) => {
                    const items = [...c.items]; items[i] = { ...items[i], author: v };
                    onSectionContentChange(s.id, { ...c, items });
                  }} as="div" className="text-[12px] font-medium text-foreground" disabled={previewMode} />
                  <EditableText value={item.role} onChange={(v) => {
                    const items = [...c.items]; items[i] = { ...items[i], role: v };
                    onSectionContentChange(s.id, { ...c, items });
                  }} as="div" className="text-[11px] text-muted-foreground" disabled={previewMode} />
                </div>
              </div>
            </div>
          ))}
        </div>
        {!previewMode && (
          <ItemControls
            onAdd={() => onSectionContentChange(s.id, { ...c, items: [...c.items, { quote: "Новый отзыв", author: "Имя", role: "Должность" }] })}
            canRemove={false}
          />
        )}
      </div>
    );
  };

  const renderTeam = (s: Section) => {
    const c = s.content as TeamContent;
    return (
      <div className={cls(s.id)} onClick={() => setSelected(s.id)}>
        {!previewMode && sc(s)}
        <EditableText value={c.title} onChange={(v) => onSectionContentChange(s.id, { ...c, title: v })} as="h3" className="text-xl font-bold text-foreground text-center mb-6" disabled={previewMode} />
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {c.members.map((m, i) => (
            <div key={i} className="text-center relative group/member">
              {!previewMode && c.members.length > 1 && (
                <button
                  className="absolute top-0 right-0 w-5 h-5 rounded-full bg-destructive/80 text-destructive-foreground text-[9px] flex items-center justify-center opacity-0 group-hover/member:opacity-100 transition-opacity z-10"
                  onClick={(e) => { e.stopPropagation(); onSectionContentChange(s.id, { ...c, members: c.members.filter((_, j) => j !== i) }); }}
                >✕</button>
              )}
              <div className="w-16 h-16 rounded-full bg-primary/10 mx-auto mb-3 flex items-center justify-center text-lg font-bold text-primary">
                {m.name.charAt(0)}
              </div>
              <EditableText value={m.name} onChange={(v) => {
                const members = [...c.members]; members[i] = { ...members[i], name: v };
                onSectionContentChange(s.id, { ...c, members });
              }} as="div" className="text-[13px] font-medium text-foreground mb-0.5" disabled={previewMode} />
              <EditableText value={m.role} onChange={(v) => {
                const members = [...c.members]; members[i] = { ...members[i], role: v };
                onSectionContentChange(s.id, { ...c, members });
              }} as="div" className="text-[11px] text-muted-foreground" disabled={previewMode} />
            </div>
          ))}
        </div>
        {!previewMode && (
          <ItemControls
            onAdd={() => onSectionContentChange(s.id, { ...c, members: [...c.members, { name: "Новый член", role: "Роль", avatar: "" }] })}
            canRemove={false}
          />
        )}
      </div>
    );
  };

  const renderFAQ = (s: Section) => {
    const c = s.content as FAQContent;
    return (
      <div className={cls(s.id)} onClick={() => setSelected(s.id)}>
        {!previewMode && sc(s)}
        <EditableText value={c.title} onChange={(v) => onSectionContentChange(s.id, { ...c, title: v })} as="h3" className="text-xl font-bold text-foreground mb-4" disabled={previewMode} />
        <div className="space-y-3 max-w-lg">
          {c.items.map((item, i) => (
            <div key={i} className="border border-border rounded-lg p-4 relative group/faq">
              {!previewMode && c.items.length > 1 && (
                <button
                  className="absolute top-1 right-1 w-5 h-5 rounded-full bg-destructive/80 text-destructive-foreground text-[9px] flex items-center justify-center opacity-0 group-hover/faq:opacity-100 transition-opacity"
                  onClick={(e) => { e.stopPropagation(); onSectionContentChange(s.id, { ...c, items: c.items.filter((_, j) => j !== i) }); }}
                >✕</button>
              )}
              <EditableText value={item.question} onChange={(v) => {
                const items = [...c.items]; items[i] = { ...items[i], question: v };
                onSectionContentChange(s.id, { ...c, items });
              }} as="div" className="text-[13px] font-semibold text-foreground mb-1" disabled={previewMode} />
              <EditableText value={item.answer} onChange={(v) => {
                const items = [...c.items]; items[i] = { ...items[i], answer: v };
                onSectionContentChange(s.id, { ...c, items });
              }} className="text-[12px] text-muted-foreground leading-relaxed" disabled={previewMode} />
            </div>
          ))}
        </div>
        {!previewMode && (
          <ItemControls
            onAdd={() => onSectionContentChange(s.id, { ...c, items: [...c.items, { question: "Новый вопрос?", answer: "Ответ на вопрос." }] })}
            canRemove={false}
          />
        )}
      </div>
    );
  };

  const renderLogos = (s: Section) => {
    const c = s.content as LogosContent;
    return (
      <div className={cls(s.id)} onClick={() => setSelected(s.id)}>
        {!previewMode && sc(s)}
        <EditableText value={c.title} onChange={(v) => onSectionContentChange(s.id, { ...c, title: v })} as="h3" className="text-[14px] font-medium text-muted-foreground text-center mb-4" disabled={previewMode} />
        {c.logos.length === 0 ? (
          <div className="flex gap-4 justify-center">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="w-20 h-10 rounded border-2 border-dashed border-border flex items-center justify-center text-[9px] text-muted-foreground">Logo</div>
            ))}
          </div>
        ) : (
          <div className="flex gap-6 justify-center flex-wrap items-center">
            {c.logos.map((l, i) => (
              <div key={i} className="relative group/logo">
                <img src={l.url} alt={l.alt} className="h-8 object-contain opacity-60 grayscale hover:opacity-100 hover:grayscale-0 transition-all" />
                {!previewMode && (
                  <button
                    className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-destructive/80 text-destructive-foreground text-[8px] flex items-center justify-center opacity-0 group-hover/logo:opacity-100 transition-opacity"
                    onClick={(e) => { e.stopPropagation(); onSectionContentChange(s.id, { ...c, logos: c.logos.filter((_, j) => j !== i) }); }}
                  >✕</button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const renderTimeline = (s: Section) => {
    const c = s.content as TimelineContent;
    return (
      <div className={cls(s.id)} onClick={() => setSelected(s.id)}>
        {!previewMode && sc(s)}
        <EditableText value={c.title} onChange={(v) => onSectionContentChange(s.id, { ...c, title: v })} as="h3" className="text-xl font-bold text-foreground mb-6" disabled={previewMode} />
        <div className="relative pl-6 space-y-6">
          <div className="absolute left-[7px] top-2 bottom-2 w-px bg-border" />
          {c.items.map((item, i) => (
            <div key={i} className="relative group/tl">
              <div className="absolute -left-6 top-1 w-3.5 h-3.5 rounded-full border-2 border-primary bg-background" />
              {!previewMode && c.items.length > 1 && (
                <button
                  className="absolute top-0 right-0 w-4 h-4 rounded-full bg-destructive/80 text-destructive-foreground text-[8px] flex items-center justify-center opacity-0 group-hover/tl:opacity-100 transition-opacity"
                  onClick={(e) => { e.stopPropagation(); onSectionContentChange(s.id, { ...c, items: c.items.filter((_, j) => j !== i) }); }}
                >✕</button>
              )}
              <EditableText value={item.date} onChange={(v) => {
                const items = [...c.items]; items[i] = { ...items[i], date: v };
                onSectionContentChange(s.id, { ...c, items });
              }} as="div" className="text-[11px] text-primary font-medium mb-0.5" disabled={previewMode} />
              <EditableText value={item.title} onChange={(v) => {
                const items = [...c.items]; items[i] = { ...items[i], title: v };
                onSectionContentChange(s.id, { ...c, items });
              }} as="div" className="text-[14px] font-semibold text-foreground mb-1" disabled={previewMode} />
              <EditableText value={item.description} onChange={(v) => {
                const items = [...c.items]; items[i] = { ...items[i], description: v };
                onSectionContentChange(s.id, { ...c, items });
              }} className="text-[12px] text-muted-foreground leading-relaxed" disabled={previewMode} />
            </div>
          ))}
        </div>
        {!previewMode && (
          <ItemControls
            onAdd={() => onSectionContentChange(s.id, { ...c, items: [...c.items, { title: "Событие", description: "Описание", date: "2025" }] })}
            canRemove={false}
          />
        )}
      </div>
    );
  };

  const renderBanner = (s: Section) => {
    const c = s.content as BannerContent;
    return (
      <div className={cls(s.id)} onClick={() => setSelected(s.id)}>
        {!previewMode && sc(s)}
        <div className={`${c.bgColor} rounded-lg px-6 py-3 flex items-center justify-between`}>
          <EditableText value={c.text} onChange={(v) => onSectionContentChange(s.id, { ...c, text: v })} as="span" className="text-[13px] text-foreground font-medium" disabled={previewMode} />
          <span className="px-3 py-1 bg-foreground text-background rounded-md text-[12px] font-medium shrink-0">{c.buttonText}</span>
        </div>
      </div>
    );
  };

  const renderForm = (s: Section) => {
    const c = s.content as FormContent;
    return (
      <div className={cls(s.id)} onClick={() => setSelected(s.id)}>
        {!previewMode && sc(s)}
        <EditableText value={c.title} onChange={(v) => onSectionContentChange(s.id, { ...c, title: v })} as="h3" className="text-lg font-semibold text-foreground mb-4" disabled={previewMode} />
        <div className="space-y-3 max-w-md">
          {c.fields.map((f, i) => (
            <div key={i} className="relative group/field">
              <label className="block text-[12px] font-medium text-foreground mb-1">
                {f.label} {f.required && <span className="text-destructive">*</span>}
              </label>
              {f.type === "textarea" ? (
                <textarea className="w-full h-20 rounded-md border border-input bg-background px-3 py-2 text-sm" placeholder={f.placeholder} readOnly />
              ) : (
                <input type={f.type} className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm" placeholder={f.placeholder} readOnly />
              )}
              {!previewMode && c.fields.length > 1 && (
                <button
                  className="absolute top-0 right-0 w-4 h-4 rounded-full bg-destructive/80 text-destructive-foreground text-[8px] flex items-center justify-center opacity-0 group-hover/field:opacity-100 transition-opacity"
                  onClick={(e) => { e.stopPropagation(); onSectionContentChange(s.id, { ...c, fields: c.fields.filter((_, j) => j !== i) }); }}
                >✕</button>
              )}
            </div>
          ))}
          {!previewMode && (
            <ItemControls
              onAdd={() => onSectionContentChange(s.id, { ...c, fields: [...c.fields, { label: "Новое поле", type: "text", placeholder: "Введите...", required: false }] })}
              canRemove={false}
            />
          )}
          <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-[13px] font-medium">{c.buttonText}</button>
        </div>
      </div>
    );
  };

  const renderSeparator = (s: Section) => {
    const c = s.content as SeparatorContent;
    return (
      <div className={cls(s.id)} onClick={() => setSelected(s.id)}>
        {!previewMode && sc(s)}
        <div style={{ height: c.height }} className="flex items-center justify-center">
          {c.style === "line" && <div className="w-full h-px bg-border" />}
          {c.style === "dots" && (
            <div className="flex gap-2">{[1, 2, 3].map(i => <div key={i} className="w-1.5 h-1.5 rounded-full bg-muted-foreground/30" />)}</div>
          )}
        </div>
      </div>
    );
  };

  const renderCTA = (s: Section) => {
    const c = s.content as CTAContent;
    return (
      <div className={cls(s.id)} onClick={() => setSelected(s.id)}>
        {!previewMode && sc(s)}
        <div className={`${c.bgColor} rounded-xl p-8 text-center`}>
          <EditableText value={c.title} onChange={(v) => onSectionContentChange(s.id, { ...c, title: v })} as="h3" className="text-xl font-bold text-primary-foreground mb-2" disabled={previewMode} />
          <EditableText value={c.description} onChange={(v) => onSectionContentChange(s.id, { ...c, description: v })} className="text-sm text-primary-foreground/80 mb-4" disabled={previewMode} />
          <button className="px-5 py-2.5 bg-white text-primary rounded-lg text-sm font-semibold hover:bg-white/90 transition-colors">{c.buttonText}</button>
        </div>
      </div>
    );
  };

  const renderHTML = (s: Section) => {
    const c = s.content as HTMLContent;
    return (
      <div className={cls(s.id)} onClick={() => setSelected(s.id)}>
        {!previewMode && sc(s)}
        {previewMode ? (
          <div dangerouslySetInnerHTML={{ __html: c.code }} />
        ) : (
          <div className="border border-border rounded-lg p-3">
            <div className="text-[10px] text-muted-foreground mb-1 font-mono">HTML</div>
            <textarea
              className="w-full h-24 rounded border border-border bg-background p-2 text-[11px] font-mono resize-y"
              value={c.code}
              onChange={(e) => onSectionContentChange(s.id, { code: e.target.value })}
            />
          </div>
        )}
      </div>
    );
  };

  const renderFooter = (s: Section) => {
    const c = s.content as FooterContent;
    return (
      <div className={cls(s.id)} onClick={() => setSelected(s.id)}>
        {!previewMode && sc(s)}
        <div className="bg-secondary/50 rounded-lg p-6">
          <div className="flex flex-wrap gap-8 mb-4">
            <div>
              <EditableText value={c.logo} onChange={(v) => onSectionContentChange(s.id, { ...c, logo: v })} as="div" className="text-[14px] font-bold text-foreground mb-2" disabled={previewMode} />
            </div>
            {c.columns.map((col, i) => (
              <div key={i} className="relative group/fcol">
                {!previewMode && c.columns.length > 1 && (
                  <button
                    className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-destructive/80 text-destructive-foreground text-[8px] flex items-center justify-center opacity-0 group-hover/fcol:opacity-100 transition-opacity z-10"
                    onClick={(e) => { e.stopPropagation(); onSectionContentChange(s.id, { ...c, columns: c.columns.filter((_, j) => j !== i) }); }}
                  >✕</button>
                )}
                <EditableText value={col.title} onChange={(v) => {
                  const cols = [...c.columns]; cols[i] = { ...cols[i], title: v };
                  onSectionContentChange(s.id, { ...c, columns: cols });
                }} as="div" className="text-[12px] font-semibold text-foreground mb-2" disabled={previewMode} />
                <div className="space-y-1">
                  {col.links.map((link, li) => (
                    <div key={li} className="flex items-center gap-1 group/flink">
                      <EditableText value={link.label} onChange={(v) => {
                        const cols = [...c.columns];
                        const links = [...cols[i].links]; links[li] = { ...links[li], label: v };
                        cols[i] = { ...cols[i], links };
                        onSectionContentChange(s.id, { ...c, columns: cols });
                      }} as="div" className="text-[12px] text-muted-foreground hover:text-foreground" disabled={previewMode} />
                      {!previewMode && col.links.length > 1 && (
                        <button
                          className="w-3.5 h-3.5 rounded-full bg-destructive/60 text-destructive-foreground text-[7px] flex items-center justify-center opacity-0 group-hover/flink:opacity-100 shrink-0"
                          onClick={(e) => {
                            e.stopPropagation();
                            const cols = [...c.columns];
                            cols[i] = { ...cols[i], links: col.links.filter((_, j) => j !== li) };
                            onSectionContentChange(s.id, { ...c, columns: cols });
                          }}
                        >✕</button>
                      )}
                    </div>
                  ))}
                  {!previewMode && (
                    <button
                      className="text-[10px] text-muted-foreground hover:text-foreground"
                      onClick={(e) => {
                        e.stopPropagation();
                        const cols = [...c.columns];
                        cols[i] = { ...cols[i], links: [...col.links, { label: "Ссылка", url: "#" }] };
                        onSectionContentChange(s.id, { ...c, columns: cols });
                      }}
                    >+ ссылка</button>
                  )}
                </div>
              </div>
            ))}
          </div>
          {!previewMode && (
            <ItemControls
              onAdd={() => onSectionContentChange(s.id, { ...c, columns: [...c.columns, { title: "Раздел", links: [{ label: "Ссылка", url: "#" }] }] })}
              canRemove={false}
            />
          )}
          <div className="border-t border-border pt-3">
            <EditableText value={c.copyright} onChange={(v) => onSectionContentChange(s.id, { ...c, copyright: v })} className="text-[11px] text-muted-foreground" disabled={previewMode} />
          </div>
        </div>
      </div>
    );
  };

  const renderers: Record<string, (s: Section) => JSX.Element> = {
    navbar: renderNavbar, hero: renderHero, cards: renderCards, text: renderText,
    columns: renderColumns, gallery: renderGallery, video: renderVideo, stats: renderStats,
    pricing: renderPricing, testimonials: renderTestimonials, team: renderTeam, faq: renderFAQ,
    logos: renderLogos, timeline: renderTimeline, banner: renderBanner,
    form: renderForm, separator: renderSeparator, cta: renderCTA, html: renderHTML, footer: renderFooter,
  };

  const animClass = (anim?: string) => anim && anim !== "none" ? `sec-anim-${anim}` : "";

  const canvasRef = useRef<HTMLDivElement>(null);
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (!previewMode) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setVisibleSections(prev => new Set(prev).add(entry.target.getAttribute("data-section-id") ?? ""));
          }
        });
      },
      { threshold: 0.15 }
    );
    const el = canvasRef.current;
    if (el) {
      el.querySelectorAll("[data-section-id]").forEach(node => observer.observe(node));
    }
    return () => observer.disconnect();
  }, [previewMode, sections]);

  const siteStyleVars = siteStyles ? {
    "--site-font-heading": siteStyles.fonts?.heading ?? "Inter",
    "--site-font-body": siteStyles.fonts?.body ?? "Inter",
    "--site-color-primary": `hsl(${siteStyles.colors?.primary ?? "220 14% 28%"})`,
    "--site-color-secondary": `hsl(${siteStyles.colors?.secondary ?? "220 10% 95%"})`,
    "--site-color-accent": `hsl(${siteStyles.colors?.accent ?? "220 14% 45%"})`,
    "--site-color-bg": `hsl(${siteStyles.colors?.background ?? "0 0% 100%"})`,
    "--site-color-fg": `hsl(${siteStyles.colors?.foreground ?? "220 14% 10%"})`,
    "--site-color-muted": `hsl(${siteStyles.colors?.muted ?? "220 10% 60%"})`,
    "--site-radius": `${siteStyles.spacing?.borderRadius ?? 8}px`,
    "--site-gap": `${siteStyles.spacing?.sectionGap ?? 0}px`,
    "--site-max-w": `${siteStyles.spacing?.containerWidth ?? 1200}px`,
  } as React.CSSProperties : {};

  return (
    <div className="flex-1 bg-[#ebebeb] overflow-auto flex justify-center p-6" ref={canvasRef}>
      <div className={`${canvasWidth} w-full`}>
        <div
          className="bg-background rounded-lg shadow-canvas overflow-hidden site-styled"
          style={{
            ...siteStyleVars,
            fontFamily: `'${siteStyles?.fonts?.body ?? "Inter"}', sans-serif`,
            color: siteStyles?.colors?.foreground ? `hsl(${siteStyles.colors.foreground})` : undefined,
            backgroundColor: siteStyles?.colors?.background ? `hsl(${siteStyles.colors.background})` : undefined,
            borderRadius: siteStyles?.spacing?.borderRadius ? `${siteStyles.spacing.borderRadius}px` : undefined,
          }}
        >
          {sections.map((section) => (
            <div
              key={section.id}
              data-section-id={section.id}
              className={`group relative ${previewMode ? "" : "pl-6"} ${
                previewMode && section.animation && section.animation !== "none"
                  ? visibleSections.has(section.id) ? animClass(section.animation) : "opacity-0"
                  : ""
              }`}
              draggable={!previewMode}
              onDragStart={(e) => handleDragStart(e, section.id)}
              onDragEnd={handleDragEnd}
              onDragOver={(e) => handleDragOver(e, section.id)}
              onDrop={(e) => handleDrop(e, section.id)}
            >
              {!previewMode && <DragHandle />}
              {renderers[section.type]?.(section)}
            </div>
          ))}
          {sections.length === 0 && (
            <div className="p-12 text-center text-muted-foreground text-sm">
              Нет секций. Добавьте первый блок через сайдбар.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditorCanvas;
