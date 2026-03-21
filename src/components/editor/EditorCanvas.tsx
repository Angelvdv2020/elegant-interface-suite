import { useState, useCallback, useRef } from "react";
import EditableText from "./EditableText";
import type { Section, HeroContent, CardsContent, TextContent } from "./types";

interface EditorCanvasProps {
  device: "desktop" | "tablet" | "mobile";
  sections: Section[];
  selected: string;
  setSelected: (id: string) => void;
  onSectionsReorder: (sections: Section[]) => void;
  onSectionContentChange: (sectionId: string, content: Section["content"]) => void;
}

const DragHandle = () => (
  <div
    className="absolute top-1/2 -left-5 -translate-y-1/2 flex flex-col items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity cursor-grab active:cursor-grabbing"
    title="Перетащите для перемещения"
  >
    <div className="w-1 h-1 rounded-full bg-muted-foreground/40" />
    <div className="w-1 h-1 rounded-full bg-muted-foreground/40" />
    <div className="w-1 h-1 rounded-full bg-muted-foreground/40" />
    <div className="w-1 h-1 rounded-full bg-muted-foreground/40" />
    <div className="w-1 h-1 rounded-full bg-muted-foreground/40" />
    <div className="w-1 h-1 rounded-full bg-muted-foreground/40" />
  </div>
);

const SectionControls = ({ hasAdd = true }: { hasAdd?: boolean }) => (
  <div className="absolute top-2 right-2 flex gap-1 z-10">
    <span className="px-1.5 py-0.5 rounded bg-background border border-border text-[10px] text-muted-foreground shadow-soft cursor-pointer hover:bg-secondary">✎</span>
    {hasAdd && <span className="px-1.5 py-0.5 rounded bg-background border border-border text-[10px] text-muted-foreground shadow-soft cursor-pointer hover:bg-secondary">⊕</span>}
    <span className="px-1.5 py-0.5 rounded bg-background border border-border text-[10px] text-destructive shadow-soft cursor-pointer hover:bg-secondary">✕</span>
  </div>
);

const EditorCanvas = ({ device, sections, selected, setSelected, onSectionsReorder, onSectionContentChange }: EditorCanvasProps) => {
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
    if (dragItem.current && dragItem.current !== id) {
      setDragOverId(id);
    }
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

  const renderHero = (section: Section) => {
    const content = section.content as HeroContent;
    const isSelected = selected === section.id;
    return (
      <div
        className={`relative p-6 border-2 border-dashed cursor-pointer transition-all ${isSelected ? "border-brand/50 bg-brand-50/20" : "border-transparent hover:border-brand/15"} ${dragOverId === section.id ? "border-brand/70 bg-brand/5" : ""}`}
        onClick={() => setSelected(section.id)}
      >
        {isSelected && <SectionControls />}
        <div className="w-full h-24 rounded-lg bg-gradient-to-r from-brand to-brand-700 flex items-center justify-center mb-4">
          <span className="text-[11px] text-brand-100/70">Кликните чтобы заменить изображение</span>
        </div>
        <EditableText value={content.title} onChange={(v) => onSectionContentChange(section.id, { ...content, title: v })} as="h2" className="text-xl font-semibold text-foreground mb-2" />
        <EditableText value={content.description} onChange={(v) => onSectionContentChange(section.id, { ...content, description: v })} className="text-[13px] text-muted-foreground leading-relaxed mb-4" />
        <div className="inline-flex items-center gap-1.5 px-4 py-2 bg-brand text-brand-light rounded-lg text-[13px] font-medium">
          <EditableText value={content.buttonText} onChange={(v) => onSectionContentChange(section.id, { ...content, buttonText: v })} as="span" className="text-brand-light" />
        </div>
      </div>
    );
  };

  const renderCards = (section: Section) => {
    const content = section.content as CardsContent;
    const isSelected = selected === section.id;
    return (
      <div
        className={`relative p-6 border-2 border-dashed cursor-pointer transition-all ${isSelected ? "border-brand/50 bg-brand-50/20" : "border-transparent hover:border-brand/15"} ${dragOverId === section.id ? "border-brand/70 bg-brand/5" : ""}`}
        onClick={() => setSelected(section.id)}
      >
        {isSelected && <SectionControls />}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {content.cards.map((c, i) => (
            <div key={i} className="border border-border rounded-lg p-4">
              <div className={`w-7 h-7 rounded-md ${c.bg} mb-3`} />
              <EditableText
                value={c.label}
                onChange={(v) => {
                  const newCards = [...content.cards];
                  newCards[i] = { ...newCards[i], label: v };
                  onSectionContentChange(section.id, { cards: newCards });
                }}
                className="text-[13px] font-medium text-foreground mb-1"
                as="div"
              />
              <EditableText
                value={c.description}
                onChange={(v) => {
                  const newCards = [...content.cards];
                  newCards[i] = { ...newCards[i], description: v };
                  onSectionContentChange(section.id, { cards: newCards });
                }}
                className="text-[12px] text-muted-foreground leading-relaxed"
                as="div"
              />
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderText = (section: Section) => {
    const content = section.content as TextContent;
    const isSelected = selected === section.id;
    return (
      <div
        className={`relative p-6 border-2 border-dashed cursor-pointer transition-all ${isSelected ? "border-brand/50 bg-brand-50/20" : "border-transparent hover:border-brand/15"} ${dragOverId === section.id ? "border-brand/70 bg-brand/5" : ""}`}
        onClick={() => setSelected(section.id)}
      >
        {isSelected && <SectionControls hasAdd={false} />}
        <EditableText value={content.title} onChange={(v) => onSectionContentChange(section.id, { ...content, title: v })} as="h3" className="text-lg font-semibold text-foreground mb-2" />
        <EditableText value={content.body} onChange={(v) => onSectionContentChange(section.id, { ...content, body: v })} className="text-[13px] text-muted-foreground leading-relaxed" />
      </div>
    );
  };

  return (
    <div className="flex-1 bg-[#ebebeb] overflow-auto flex justify-center p-6">
      <div className={`${canvasWidth} w-full`}>
        <div className="bg-background rounded-lg shadow-canvas overflow-hidden">
          {sections.map((section) => (
            <div
              key={section.id}
              className="group relative pl-6"
              draggable
              onDragStart={(e) => handleDragStart(e, section.id)}
              onDragEnd={handleDragEnd}
              onDragOver={(e) => handleDragOver(e, section.id)}
              onDrop={(e) => handleDrop(e, section.id)}
            >
              <DragHandle />
              {section.type === "hero" && renderHero(section)}
              {section.type === "cards" && renderCards(section)}
              {section.type === "text" && renderText(section)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EditorCanvas;
