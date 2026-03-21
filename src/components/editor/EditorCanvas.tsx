import { useState, useCallback, useRef } from "react";
import EditableText from "./EditableText";
import type { Section, HeroContent, CardsContent, TextContent, GalleryContent, FormContent, SeparatorContent, CTAContent } from "./types";

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

  const sectionClass = (id: string) =>
    previewMode
      ? "p-6"
      : `relative p-6 border-2 border-dashed cursor-pointer transition-all ${
          selected === id ? "border-brand/50 bg-brand-50/20" : "border-transparent hover:border-brand/15"
        } ${dragOverId === id ? "border-brand/70 bg-brand/5" : ""}`;

  const renderHero = (s: Section) => {
    const c = s.content as HeroContent;
    return (
      <div className={sectionClass(s.id)} onClick={() => setSelected(s.id)}>
        {!previewMode && <SectionControls onDelete={() => onDeleteSection(s.id)} />}
        <div className="w-full h-24 rounded-lg bg-gradient-to-r from-brand to-brand-700 flex items-center justify-center mb-4">
          <span className="text-[11px] text-brand-100/70">Кликните чтобы заменить</span>
        </div>
        <EditableText value={c.title} onChange={(v) => onSectionContentChange(s.id, { ...c, title: v })} as="h2" className="text-xl font-semibold text-foreground mb-2" disabled={previewMode} />
        <EditableText value={c.description} onChange={(v) => onSectionContentChange(s.id, { ...c, description: v })} className="text-[13px] text-muted-foreground leading-relaxed mb-4" disabled={previewMode} />
        <div className="inline-flex items-center px-4 py-2 bg-brand text-brand-light rounded-lg text-[13px] font-medium">
          <EditableText value={c.buttonText} onChange={(v) => onSectionContentChange(s.id, { ...c, buttonText: v })} as="span" className="text-brand-light" disabled={previewMode} />
        </div>
      </div>
    );
  };

  const renderCards = (s: Section) => {
    const c = s.content as CardsContent;
    return (
      <div className={sectionClass(s.id)} onClick={() => setSelected(s.id)}>
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
      <div className={sectionClass(s.id)} onClick={() => setSelected(s.id)}>
        {!previewMode && <SectionControls onDelete={() => onDeleteSection(s.id)} />}
        <EditableText value={c.title} onChange={(v) => onSectionContentChange(s.id, { ...c, title: v })} as="h3" className="text-lg font-semibold text-foreground mb-2" disabled={previewMode} />
        <EditableText value={c.body} onChange={(v) => onSectionContentChange(s.id, { ...c, body: v })} className="text-[13px] text-muted-foreground leading-relaxed" disabled={previewMode} />
      </div>
    );
  };

  const renderGallery = (s: Section) => {
    const c = s.content as GalleryContent;
    return (
      <div className={sectionClass(s.id)} onClick={() => setSelected(s.id)}>
        {!previewMode && <SectionControls onDelete={() => onDeleteSection(s.id)} />}
        {c.images.length === 0 ? (
          <div className="grid grid-cols-3 gap-2">
            {[1, 2, 3].map(i => (
              <div key={i} className="aspect-square rounded-lg bg-muted/50 border-2 border-dashed border-border flex items-center justify-center text-[11px] text-muted-foreground">
                + Фото
              </div>
            ))}
          </div>
        ) : (
          <div className={`grid gap-2`} style={{ gridTemplateColumns: `repeat(${c.columns}, 1fr)` }}>
            {c.images.map((img, i) => (
              <img key={i} src={img.url} alt={img.alt} className="aspect-square rounded-lg object-cover" />
            ))}
          </div>
        )}
      </div>
    );
  };

  const renderForm = (s: Section) => {
    const c = s.content as FormContent;
    return (
      <div className={sectionClass(s.id)} onClick={() => setSelected(s.id)}>
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
          <button className="px-4 py-2 bg-brand text-brand-light rounded-lg text-[13px] font-medium">
            {c.buttonText}
          </button>
        </div>
      </div>
    );
  };

  const renderSeparator = (s: Section) => {
    const c = s.content as SeparatorContent;
    return (
      <div className={sectionClass(s.id)} onClick={() => setSelected(s.id)}>
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
      <div className={sectionClass(s.id)} onClick={() => setSelected(s.id)}>
        {!previewMode && <SectionControls onDelete={() => onDeleteSection(s.id)} />}
        <div className={`${c.bgColor} rounded-xl p-8 text-center`}>
          <EditableText value={c.title} onChange={(v) => onSectionContentChange(s.id, { ...c, title: v })} as="h3" className="text-xl font-bold text-brand-light mb-2" disabled={previewMode} />
          <EditableText value={c.description} onChange={(v) => onSectionContentChange(s.id, { ...c, description: v })} className="text-sm text-brand-light/80 mb-4" disabled={previewMode} />
          <button className="px-5 py-2.5 bg-white text-brand rounded-lg text-sm font-semibold hover:bg-white/90 transition-colors">
            {c.buttonText}
          </button>
        </div>
      </div>
    );
  };

  const renderers: Record<string, (s: Section) => JSX.Element> = {
    hero: renderHero, cards: renderCards, text: renderText,
    gallery: renderGallery, form: renderForm, separator: renderSeparator, cta: renderCTA,
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
