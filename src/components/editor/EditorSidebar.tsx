import { Type, Image, LayoutGrid, AlignLeft, Plus, GripVertical } from "lucide-react";
import type { Section } from "./types";

interface EditorSidebarProps {
  sections: Section[];
  selected: string;
  setSelected: (id: string) => void;
}

const pages = [
  { name: "Главная", active: true },
  { name: "О нас", active: false },
  { name: "Контакты", active: false },
];

const EditorSidebar = ({ sections, selected, setSelected }: EditorSidebarProps) => (
  <div className="w-[200px] shrink-0 border-r border-border bg-secondary/30 flex flex-col overflow-y-auto hidden md:flex">
    {/* Pages */}
    <div className="p-3 border-b border-border">
      <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-2">Страницы</div>
      {pages.map((p) => (
        <div key={p.name} className={`flex items-center gap-2 px-2 py-1.5 rounded text-[13px] cursor-pointer mb-0.5 ${p.active ? "bg-brand-light text-brand font-medium border-l-2 border-brand" : "text-muted-foreground hover:bg-secondary"}`}>
          <Type className="h-3.5 w-3.5 shrink-0" />
          {p.name}
        </div>
      ))}
      <button className="flex items-center gap-2 px-2 py-1.5 text-[12px] text-muted-foreground hover:text-foreground w-full">
        <Plus className="h-3.5 w-3.5" /> Добавить
      </button>
    </div>

    {/* Sections */}
    <div className="p-3 border-b border-border">
      <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-2">Секции</div>
      {sections.map((s) => (
        <div
          key={s.id}
          onClick={() => setSelected(s.id)}
          className={`flex items-center gap-2 px-2 py-1.5 rounded text-[13px] cursor-pointer mb-0.5 ${selected === s.id ? "bg-brand-light text-brand font-medium border-l-2 border-brand" : "text-muted-foreground hover:bg-secondary"}`}
        >
          <GripVertical className="h-3 w-3 shrink-0 opacity-40" />
          {s.type === "hero" && <Image className="h-3.5 w-3.5 shrink-0" />}
          {s.type === "cards" && <LayoutGrid className="h-3.5 w-3.5 shrink-0" />}
          {s.type === "text" && <AlignLeft className="h-3.5 w-3.5 shrink-0" />}
          {s.label}
        </div>
      ))}
      <button className="flex items-center gap-2 px-2 py-1.5 text-[12px] text-muted-foreground hover:text-foreground w-full">
        <Plus className="h-3.5 w-3.5" /> Добавить блок
      </button>
    </div>

    {/* Media */}
    <div className="p-3">
      <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-2">Медиа</div>
      <div className="text-[12px] text-muted-foreground px-2 py-1.5 hover:bg-secondary rounded cursor-pointer">Изображения</div>
      <div className="text-[12px] text-muted-foreground px-2 py-1.5 hover:bg-secondary rounded cursor-pointer">Иконки</div>
    </div>
  </div>
);

export default EditorSidebar;
