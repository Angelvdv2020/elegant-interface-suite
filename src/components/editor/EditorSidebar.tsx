import { useState } from "react";
import {
  Type, Image, LayoutGrid, AlignLeft, Plus, GripVertical, Images, FileText, Minus, Megaphone,
  Trash2, Menu, PanelBottom, CreditCard, MessageCircle, HelpCircle, Play, BarChart3, Users,
  Columns, Code, Award, Clock, Flag, Eye, EyeOff, ChevronUp, ChevronDown, Layers,
} from "lucide-react";
import type { Section, SectionType } from "./types";
import { sectionTemplates } from "./types";
import MediaLibrary from "./MediaLibrary";

interface EditorSidebarProps {
  sections: Section[];
  selected: string;
  setSelected: (id: string) => void;
  siteId?: string | null;
  onAddSection: (type: SectionType) => void;
  onDeleteSection: (id: string) => void;
  pages?: { id: string; title: string; isActive: boolean }[];
  onSelectPage?: (id: string) => void;
  onAddPage?: () => void;
  onToggleVisibility?: (id: string) => void;
  onReorderSection?: (fromIdx: number, toIdx: number) => void;
  isMobile?: boolean;
}

const iconMap: Record<string, React.ReactNode> = {
  navbar: <Menu className="h-3.5 w-3.5 shrink-0" />,
  hero: <Image className="h-3.5 w-3.5 shrink-0" />,
  cards: <LayoutGrid className="h-3.5 w-3.5 shrink-0" />,
  text: <AlignLeft className="h-3.5 w-3.5 shrink-0" />,
  columns: <Columns className="h-3.5 w-3.5 shrink-0" />,
  gallery: <Images className="h-3.5 w-3.5 shrink-0" />,
  video: <Play className="h-3.5 w-3.5 shrink-0" />,
  stats: <BarChart3 className="h-3.5 w-3.5 shrink-0" />,
  pricing: <CreditCard className="h-3.5 w-3.5 shrink-0" />,
  testimonials: <MessageCircle className="h-3.5 w-3.5 shrink-0" />,
  team: <Users className="h-3.5 w-3.5 shrink-0" />,
  faq: <HelpCircle className="h-3.5 w-3.5 shrink-0" />,
  logos: <Award className="h-3.5 w-3.5 shrink-0" />,
  timeline: <Clock className="h-3.5 w-3.5 shrink-0" />,
  banner: <Flag className="h-3.5 w-3.5 shrink-0" />,
  form: <FileText className="h-3.5 w-3.5 shrink-0" />,
  separator: <Minus className="h-3.5 w-3.5 shrink-0" />,
  cta: <Megaphone className="h-3.5 w-3.5 shrink-0" />,
  html: <Code className="h-3.5 w-3.5 shrink-0" />,
  footer: <PanelBottom className="h-3.5 w-3.5 shrink-0" />,
};

const blockCategories: { label: string; types: SectionType[] }[] = [
  { label: "Структура", types: ["navbar", "footer", "separator", "columns"] },
  { label: "Контент", types: ["hero", "text", "cards", "gallery", "video", "html"] },
  { label: "Маркетинг", types: ["cta", "pricing", "testimonials", "stats", "logos", "banner"] },
  { label: "Прочее", types: ["team", "faq", "timeline", "form"] },
];

const EditorSidebar = ({
  sections, selected, setSelected, siteId = null,
  onAddSection, onDeleteSection,
  pages = [{ id: "main", title: "Главная", isActive: true }],
  onSelectPage, onAddPage,
  onToggleVisibility, onReorderSection,
  isMobile = false,
}: EditorSidebarProps) => {
  const [mediaOpen, setMediaOpen] = useState(false);
  const [showAddBlock, setShowAddBlock] = useState(false);
  const [sidebarTab, setSidebarTab] = useState<"sections" | "layers">("sections");

  return (
    <>
      <div className={`${isMobile ? "w-full flex" : "w-[200px] shrink-0 border-r border-border bg-secondary/30 hidden md:flex"} flex-col overflow-y-auto`}>
        {/* Pages */}
        <div className="p-3 border-b border-border">
          <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-2">Страницы</div>
          {pages.map((p) => (
            <div
              key={p.id}
              onClick={() => onSelectPage?.(p.id)}
              className={`flex items-center gap-2 px-2 py-1.5 rounded text-[13px] cursor-pointer mb-0.5 ${
                p.isActive ? "bg-primary/10 text-primary font-medium border-l-2 border-primary" : "text-muted-foreground hover:bg-secondary"
              }`}
            >
              <Type className="h-3.5 w-3.5 shrink-0" />
              {p.title}
            </div>
          ))}
          <button onClick={onAddPage} className="flex items-center gap-2 px-2 py-1.5 text-[12px] text-muted-foreground hover:text-foreground w-full">
            <Plus className="h-3.5 w-3.5" /> Добавить
          </button>
        </div>

        {/* Tab switcher */}
        <div className="flex border-b border-border">
          <button
            onClick={() => setSidebarTab("sections")}
            className={`flex-1 py-2 text-[10px] uppercase tracking-wider font-semibold transition-colors ${
              sidebarTab === "sections" ? "text-primary border-b-2 border-primary" : "text-muted-foreground hover:text-foreground"
            }`}
          >Секции</button>
          <button
            onClick={() => setSidebarTab("layers")}
            className={`flex-1 py-2 text-[10px] uppercase tracking-wider font-semibold transition-colors flex items-center justify-center gap-1 ${
              sidebarTab === "layers" ? "text-primary border-b-2 border-primary" : "text-muted-foreground hover:text-foreground"
            }`}
          ><Layers className="h-3 w-3" /> Слои</button>
        </div>

        {sidebarTab === "sections" ? (
          <div className="p-3 border-b border-border flex-1">
            {sections.map((s) => (
              <div
                key={s.id}
                onClick={() => setSelected(s.id)}
                className={`flex items-center gap-2 px-2 py-1.5 rounded text-[13px] cursor-pointer mb-0.5 group/item ${
                  selected === s.id ? "bg-primary/10 text-primary font-medium border-l-2 border-primary" : "text-muted-foreground hover:bg-secondary"
                } ${(s.content as any)?.__hidden ? "opacity-40" : ""}`}
              >
                <GripVertical className="h-3 w-3 shrink-0 opacity-40" />
                {iconMap[s.type] || <AlignLeft className="h-3.5 w-3.5 shrink-0" />}
                <span className="flex-1 truncate">{s.label}</span>
                <Trash2
                  className="h-3 w-3 shrink-0 opacity-0 group-hover/item:opacity-60 hover:!opacity-100 text-destructive cursor-pointer"
                  onClick={(e) => { e.stopPropagation(); onDeleteSection(s.id); }}
                />
              </div>
            ))}

            {showAddBlock ? (
              <div className="mt-1 border border-border rounded-lg bg-background p-2 max-h-[320px] overflow-y-auto space-y-2">
                {blockCategories.map((cat) => (
                  <div key={cat.label}>
                    <div className="text-[9px] uppercase tracking-wider text-muted-foreground font-semibold px-2 py-1">{cat.label}</div>
                    {cat.types.map((type) => {
                      const tmpl = sectionTemplates[type];
                      return (
                        <button
                          key={type}
                          onClick={() => { onAddSection(type); setShowAddBlock(false); }}
                          className="flex items-center gap-2 px-2 py-1.5 rounded text-[12px] text-muted-foreground hover:bg-secondary hover:text-foreground w-full transition-colors"
                        >
                          {iconMap[type]}
                          {tmpl.label}
                        </button>
                      );
                    })}
                  </div>
                ))}
                <button onClick={() => setShowAddBlock(false)} className="w-full text-center text-[11px] text-muted-foreground py-1 hover:text-foreground">Закрыть</button>
              </div>
            ) : (
              <button onClick={() => setShowAddBlock(true)} className="flex items-center gap-2 px-2 py-1.5 text-[12px] text-muted-foreground hover:text-foreground w-full">
                <Plus className="h-3.5 w-3.5" /> Добавить блок
              </button>
            )}
          </div>
        ) : (
          /* Layers panel */
          <div className="p-3 border-b border-border flex-1">
            <div className="text-[10px] text-muted-foreground mb-2">Порядок наложения (сверху вниз)</div>
            {sections.map((s, idx) => {
              const isHidden = !!(s.content as any)?.__hidden;
              return (
                <div
                  key={s.id}
                  onClick={() => setSelected(s.id)}
                  className={`flex items-center gap-1.5 px-2 py-1.5 rounded text-[12px] cursor-pointer mb-0.5 group/layer ${
                    selected === s.id ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground hover:bg-secondary"
                  } ${isHidden ? "opacity-40" : ""}`}
                >
                  {iconMap[s.type] || <AlignLeft className="h-3 w-3 shrink-0" />}
                  <span className="flex-1 truncate text-[11px]">{s.label}</span>
                  <button
                    className="p-0.5 rounded hover:bg-secondary opacity-0 group-hover/layer:opacity-100 transition-opacity"
                    onClick={(e) => { e.stopPropagation(); onToggleVisibility?.(s.id); }}
                    title={isHidden ? "Показать" : "Скрыть"}
                  >
                    {isHidden ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                  </button>
                  <button
                    className="p-0.5 rounded hover:bg-secondary opacity-0 group-hover/layer:opacity-100 transition-opacity disabled:opacity-20"
                    disabled={idx === 0}
                    onClick={(e) => { e.stopPropagation(); onReorderSection?.(idx, idx - 1); }}
                  >
                    <ChevronUp className="h-3 w-3" />
                  </button>
                  <button
                    className="p-0.5 rounded hover:bg-secondary opacity-0 group-hover/layer:opacity-100 transition-opacity disabled:opacity-20"
                    disabled={idx === sections.length - 1}
                    onClick={(e) => { e.stopPropagation(); onReorderSection?.(idx, idx + 1); }}
                  >
                    <ChevronDown className="h-3 w-3" />
                  </button>
                </div>
              );
            })}
          </div>
        )}

        {/* Media */}
        <div className="p-3">
          <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-2">Медиа</div>
          <div
            className="text-[12px] text-muted-foreground px-2 py-1.5 hover:bg-secondary rounded cursor-pointer"
            onClick={() => setMediaOpen(true)}
          >
            Изображения
          </div>
        </div>
      </div>

      <MediaLibrary open={mediaOpen} onClose={() => setMediaOpen(false)} siteId={siteId} />
    </>
  );
};

export default EditorSidebar;
