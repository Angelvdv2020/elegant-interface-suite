import { useState, useCallback, useRef } from "react";
import EditableText from "./EditableText";
import type {
  Section, HeroContent, CardsContent, TextContent, GalleryContent, FormContent,
  SeparatorContent, CTAContent, NavbarContent, FooterContent, PricingContent,
  TestimonialsContent, FAQContent, VideoContent, StatsContent, TeamContent,
  ColumnsContent, HTMLContent, LogosContent, TimelineContent, BannerContent,
} from "./types";

interface EditorCanvasProps {
  device: "desktop" | "tablet" | "mobile";
  sections: Section[];
  selected: string;
  setSelected: (id: string) => void;
  onSectionsReorder: (sections: Section[]) => void;
  onSectionContentChange: (sectionId: string, content: Section["content"]) => void;
  onDeleteSection: (sectionId: string) => void;
  previewMode?: boolean;
}

const DragHandle = () => (
  <div className="absolute top-1/2 -left-5 -translate-y-1/2 flex flex-col items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity cursor-grab active:cursor-grabbing">
    {[...Array(6)].map((_, i) => (
      <div key={i} className="w-1 h-1 rounded-full bg-muted-foreground/40" />
    ))}
  </div>
);

const SectionControls = ({ onDelete }: { onDelete: () => void }) => (
  <div className="absolute top-2 right-2 flex gap-1 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
    <span className="px-1.5 py-0.5 rounded bg-background border border-border text-[10px] text-muted-foreground shadow-sm cursor-pointer hover:bg-secondary">✎</span>
    <span
      className="px-1.5 py-0.5 rounded bg-background border border-border text-[10px] text-destructive shadow-sm cursor-pointer hover:bg-destructive/10"
      onClick={(e) => { e.stopPropagation(); onDelete(); }}
    >✕</span>
  </div>
);

const EditorCanvas = ({
  device, sections, selected, setSelected,
  onSectionsReorder, onSectionContentChange, onDeleteSection,
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

  // ─── Renderers ───

  const renderNavbar = (s: Section) => {
    const c = s.content as NavbarContent;
    return (
      <div className={cls(s.id)} onClick={() => setSelected(s.id)}>
        {!previewMode && <SectionControls onDelete={() => onDeleteSection(s.id)} />}
        <div className="flex items-center justify-between">
          <EditableText value={c.logo} onChange={(v) => onSectionContentChange(s.id, { ...c, logo: v })} as="span" className="text-[15px] font-bold text-foreground" disabled={previewMode} />
          <div className="flex items-center gap-4">
            {c.links.map((link, i) => (
              <EditableText key={i} value={link.label} onChange={(v) => {
                const links = [...c.links]; links[i] = { ...links[i], label: v };
                onSectionContentChange(s.id, { ...c, links });
              }} as="span" className="text-[13px] text-muted-foreground hover:text-foreground" disabled={previewMode} />
            ))}
            <span className="px-3 py-1.5 bg-primary text-primary-foreground rounded-md text-[12px] font-medium">{c.buttonText}</span>
          </div>
        </div>
      </div>
    );
  };

  const renderHero = (s: Section) => {
    const c = s.content as HeroContent;
    return (
      <div className={cls(s.id)} onClick={() => setSelected(s.id)}>
        {!previewMode && <SectionControls onDelete={() => onDeleteSection(s.id)} />}
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
    return (
      <div className={cls(s.id)} onClick={() => setSelected(s.id)}>
        {!previewMode && <SectionControls onDelete={() => onDeleteSection(s.id)} />}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {c.cards.map((card, i) => (
            <div key={i} className="border border-border rounded-lg p-4">
              <div className={`w-7 h-7 rounded-md ${card.bg} mb-3`} />
              <EditableText value={card.label} onChange={(v) => {
                const cards = [...c.cards]; cards[i] = { ...cards[i], label: v };
                onSectionContentChange(s.id, { cards });
              }} className="text-[13px] font-medium text-foreground mb-1" as="div" disabled={previewMode} />
              <EditableText value={card.description} onChange={(v) => {
                const cards = [...c.cards]; cards[i] = { ...cards[i], description: v };
                onSectionContentChange(s.id, { cards });
              }} className="text-[12px] text-muted-foreground leading-relaxed" as="div" disabled={previewMode} />
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderText = (s: Section) => {
    const c = s.content as TextContent;
    return (
      <div className={cls(s.id)} onClick={() => setSelected(s.id)}>
        {!previewMode && <SectionControls onDelete={() => onDeleteSection(s.id)} />}
        <EditableText value={c.title} onChange={(v) => onSectionContentChange(s.id, { ...c, title: v })} as="h3" className="text-lg font-semibold text-foreground mb-2" disabled={previewMode} />
        <EditableText value={c.body} onChange={(v) => onSectionContentChange(s.id, { ...c, body: v })} className="text-[13px] text-muted-foreground leading-relaxed" disabled={previewMode} />
      </div>
    );
  };

  const renderColumns = (s: Section) => {
    const c = s.content as ColumnsContent;
    return (
      <div className={cls(s.id)} onClick={() => setSelected(s.id)}>
        {!previewMode && <SectionControls onDelete={() => onDeleteSection(s.id)} />}
        <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${c.count}, 1fr)` }}>
          {c.columns.map((col, i) => (
            <div key={i} className="border border-border/50 rounded-lg p-4">
              <EditableText value={col.title} onChange={(v) => {
                const cols = [...c.columns]; cols[i] = { ...cols[i], title: v };
                onSectionContentChange(s.id, { ...c, columns: cols });
              }} as="h4" className="text-[14px] font-semibold text-foreground mb-2" disabled={previewMode} />
              <EditableText value={col.body} onChange={(v) => {
                const cols = [...c.columns]; cols[i] = { ...cols[i], body: v };
                onSectionContentChange(s.id, { ...c, columns: cols });
              }} className="text-[12px] text-muted-foreground leading-relaxed" disabled={previewMode} />
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderGallery = (s: Section) => {
    const c = s.content as GalleryContent;
    return (
      <div className={cls(s.id)} onClick={() => setSelected(s.id)}>
        {!previewMode && <SectionControls onDelete={() => onDeleteSection(s.id)} />}
        {c.images.length === 0 ? (
          <div className="grid grid-cols-3 gap-2">
            {[1, 2, 3].map(i => (
              <div key={i} className="aspect-square rounded-lg bg-muted/50 border-2 border-dashed border-border flex items-center justify-center text-[11px] text-muted-foreground">+ Фото</div>
            ))}
          </div>
        ) : (
          <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${c.columns}, 1fr)` }}>
            {c.images.map((img, i) => (
              <img key={i} src={img.url} alt={img.alt} className="aspect-square rounded-lg object-cover" />
            ))}
          </div>
        )}
      </div>
    );
  };

  const renderVideo = (s: Section) => {
    const c = s.content as VideoContent;
    return (
      <div className={cls(s.id)} onClick={() => setSelected(s.id)}>
        {!previewMode && <SectionControls onDelete={() => onDeleteSection(s.id)} />}
        <EditableText value={c.title} onChange={(v) => onSectionContentChange(s.id, { ...c, title: v })} as="h3" className="text-lg font-semibold text-foreground mb-2" disabled={previewMode} />
        <EditableText value={c.description} onChange={(v) => onSectionContentChange(s.id, { ...c, description: v })} className="text-[13px] text-muted-foreground mb-4" disabled={previewMode} />
        <div className="aspect-video rounded-lg bg-muted/30 border border-border overflow-hidden">
          {previewMode ? (
            <iframe src={c.url} className="w-full h-full" frameBorder="0" allowFullScreen />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground text-[12px]">
              ▶ Видео: {c.url}
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderStats = (s: Section) => {
    const c = s.content as StatsContent;
    return (
      <div className={cls(s.id)} onClick={() => setSelected(s.id)}>
        {!previewMode && <SectionControls onDelete={() => onDeleteSection(s.id)} />}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {c.items.map((item, i) => (
            <div key={i} className="text-center p-4">
              <EditableText value={item.value} onChange={(v) => {
                const items = [...c.items]; items[i] = { ...items[i], value: v };
                onSectionContentChange(s.id, { items });
              }} as="div" className="text-2xl font-bold text-foreground mb-1 tabular-nums" disabled={previewMode} />
              <EditableText value={item.label} onChange={(v) => {
                const items = [...c.items]; items[i] = { ...items[i], label: v };
                onSectionContentChange(s.id, { items });
              }} as="div" className="text-[12px] text-muted-foreground" disabled={previewMode} />
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderPricing = (s: Section) => {
    const c = s.content as PricingContent;
    return (
      <div className={cls(s.id)} onClick={() => setSelected(s.id)}>
        {!previewMode && <SectionControls onDelete={() => onDeleteSection(s.id)} />}
        <EditableText value={c.title} onChange={(v) => onSectionContentChange(s.id, { ...c, title: v })} as="h3" className="text-xl font-bold text-foreground text-center mb-1" disabled={previewMode} />
        <EditableText value={c.description} onChange={(v) => onSectionContentChange(s.id, { ...c, description: v })} className="text-[13px] text-muted-foreground text-center mb-6" disabled={previewMode} />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {c.plans.map((plan, i) => (
            <div key={i} className={`rounded-xl border p-5 ${plan.highlighted ? "border-primary bg-primary/5 shadow-md" : "border-border"}`}>
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
                  <li key={fi} className="text-[12px] text-muted-foreground flex items-start gap-1.5">
                    <span className="text-primary mt-0.5">✓</span> {f}
                  </li>
                ))}
              </ul>
              <button className={`w-full py-2 rounded-lg text-[12px] font-medium ${plan.highlighted ? "bg-primary text-primary-foreground" : "border border-border text-foreground hover:bg-secondary"}`}>
                {plan.buttonText}
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderTestimonials = (s: Section) => {
    const c = s.content as TestimonialsContent;
    return (
      <div className={cls(s.id)} onClick={() => setSelected(s.id)}>
        {!previewMode && <SectionControls onDelete={() => onDeleteSection(s.id)} />}
        <EditableText value={c.title} onChange={(v) => onSectionContentChange(s.id, { ...c, title: v })} as="h3" className="text-xl font-bold text-foreground text-center mb-6" disabled={previewMode} />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {c.items.map((item, i) => (
            <div key={i} className="border border-border rounded-xl p-5">
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
      </div>
    );
  };

  const renderTeam = (s: Section) => {
    const c = s.content as TeamContent;
    return (
      <div className={cls(s.id)} onClick={() => setSelected(s.id)}>
        {!previewMode && <SectionControls onDelete={() => onDeleteSection(s.id)} />}
        <EditableText value={c.title} onChange={(v) => onSectionContentChange(s.id, { ...c, title: v })} as="h3" className="text-xl font-bold text-foreground text-center mb-6" disabled={previewMode} />
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {c.members.map((m, i) => (
            <div key={i} className="text-center">
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
      </div>
    );
  };

  const renderFAQ = (s: Section) => {
    const c = s.content as FAQContent;
    return (
      <div className={cls(s.id)} onClick={() => setSelected(s.id)}>
        {!previewMode && <SectionControls onDelete={() => onDeleteSection(s.id)} />}
        <EditableText value={c.title} onChange={(v) => onSectionContentChange(s.id, { ...c, title: v })} as="h3" className="text-xl font-bold text-foreground mb-4" disabled={previewMode} />
        <div className="space-y-3 max-w-lg">
          {c.items.map((item, i) => (
            <div key={i} className="border border-border rounded-lg p-4">
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
      </div>
    );
  };

  const renderLogos = (s: Section) => {
    const c = s.content as LogosContent;
    return (
      <div className={cls(s.id)} onClick={() => setSelected(s.id)}>
        {!previewMode && <SectionControls onDelete={() => onDeleteSection(s.id)} />}
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
              <img key={i} src={l.url} alt={l.alt} className="h-8 object-contain opacity-60 grayscale hover:opacity-100 hover:grayscale-0 transition-all" />
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
        {!previewMode && <SectionControls onDelete={() => onDeleteSection(s.id)} />}
        <EditableText value={c.title} onChange={(v) => onSectionContentChange(s.id, { ...c, title: v })} as="h3" className="text-xl font-bold text-foreground mb-6" disabled={previewMode} />
        <div className="relative pl-6 space-y-6">
          <div className="absolute left-[7px] top-2 bottom-2 w-px bg-border" />
          {c.items.map((item, i) => (
            <div key={i} className="relative">
              <div className="absolute -left-6 top-1 w-3.5 h-3.5 rounded-full border-2 border-primary bg-background" />
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
      </div>
    );
  };

  const renderBanner = (s: Section) => {
    const c = s.content as BannerContent;
    return (
      <div className={cls(s.id)} onClick={() => setSelected(s.id)}>
        {!previewMode && <SectionControls onDelete={() => onDeleteSection(s.id)} />}
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
        {!previewMode && <SectionControls onDelete={() => onDeleteSection(s.id)} />}
        <EditableText value={c.title} onChange={(v) => onSectionContentChange(s.id, { ...c, title: v })} as="h3" className="text-lg font-semibold text-foreground mb-4" disabled={previewMode} />
        <div className="space-y-3 max-w-md">
          {c.fields.map((f, i) => (
            <div key={i}>
              <label className="block text-[12px] font-medium text-foreground mb-1">
                {f.label} {f.required && <span className="text-destructive">*</span>}
              </label>
              {f.type === "textarea" ? (
                <textarea className="w-full h-20 rounded-md border border-input bg-background px-3 py-2 text-sm" placeholder={f.placeholder} readOnly />
              ) : (
                <input type={f.type} className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm" placeholder={f.placeholder} readOnly />
              )}
            </div>
          ))}
          <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-[13px] font-medium">{c.buttonText}</button>
        </div>
      </div>
    );
  };

  const renderSeparator = (s: Section) => {
    const c = s.content as SeparatorContent;
    return (
      <div className={cls(s.id)} onClick={() => setSelected(s.id)}>
        {!previewMode && <SectionControls onDelete={() => onDeleteSection(s.id)} />}
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
        {!previewMode && <SectionControls onDelete={() => onDeleteSection(s.id)} />}
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
        {!previewMode && <SectionControls onDelete={() => onDeleteSection(s.id)} />}
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
        {!previewMode && <SectionControls onDelete={() => onDeleteSection(s.id)} />}
        <div className="bg-secondary/50 rounded-lg p-6">
          <div className="flex flex-wrap gap-8 mb-4">
            <div>
              <EditableText value={c.logo} onChange={(v) => onSectionContentChange(s.id, { ...c, logo: v })} as="div" className="text-[14px] font-bold text-foreground mb-2" disabled={previewMode} />
            </div>
            {c.columns.map((col, i) => (
              <div key={i}>
                <EditableText value={col.title} onChange={(v) => {
                  const cols = [...c.columns]; cols[i] = { ...cols[i], title: v };
                  onSectionContentChange(s.id, { ...c, columns: cols });
                }} as="div" className="text-[12px] font-semibold text-foreground mb-2" disabled={previewMode} />
                <div className="space-y-1">
                  {col.links.map((link, li) => (
                    <EditableText key={li} value={link.label} onChange={(v) => {
                      const cols = [...c.columns];
                      const links = [...cols[i].links]; links[li] = { ...links[li], label: v };
                      cols[i] = { ...cols[i], links };
                      onSectionContentChange(s.id, { ...c, columns: cols });
                    }} as="div" className="text-[12px] text-muted-foreground hover:text-foreground" disabled={previewMode} />
                  ))}
                </div>
              </div>
            ))}
          </div>
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

  return (
    <div className="flex-1 bg-[#ebebeb] overflow-auto flex justify-center p-6">
      <div className={`${canvasWidth} w-full`}>
        <div className="bg-background rounded-lg shadow-canvas overflow-hidden">
          {sections.map((section) => (
            <div
              key={section.id}
              className={`group relative ${previewMode ? "" : "pl-6"}`}
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
