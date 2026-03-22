import { useState, useCallback } from "react";
import { ChevronDown, Monitor, Tablet, Smartphone, Eye, EyeOff } from "lucide-react";
import type { Section, Breakpoint, ResponsiveSettings, AnimationType } from "./types";
import { defaultResponsiveSettings } from "./types";
import AnimationSettings from "./AnimationSettings";

interface EditorPropertiesProps {
  sections: Section[];
  selected: string;
  setSelected: (id: string) => void;
  onUpdateResponsive?: (sectionId: string, responsive: Record<Breakpoint, ResponsiveSettings>) => void;
  onUpdateAnimation?: (sectionId: string, animation: AnimationType) => void;
  isMobile?: boolean;
}

const breakpoints: { key: Breakpoint; label: string; icon: typeof Monitor }[] = [
  { key: "desktop", label: "Desktop", icon: Monitor },
  { key: "tablet", label: "Tablet", icon: Tablet },
  { key: "mobile", label: "Mobile", icon: Smartphone },
];

const paddingLabels = [
  { key: "top" as const, label: "↑" },
  { key: "right" as const, label: "→" },
  { key: "bottom" as const, label: "↓" },
  { key: "left" as const, label: "←" },
];

const EditorProperties = ({ sections, selected, setSelected, onUpdateResponsive, onUpdateAnimation, isMobile = false }: EditorPropertiesProps) => {
  const [activeBreakpoint, setActiveBreakpoint] = useState<Breakpoint>("desktop");

  const selectedSection = sections.find((s) => s.id === selected);
  const responsive = selectedSection?.responsive ?? { ...defaultResponsiveSettings };
  const current = responsive[activeBreakpoint] ?? defaultResponsiveSettings[activeBreakpoint];

  const handlePaddingChange = useCallback(
    (side: "top" | "right" | "bottom" | "left", value: number) => {
      if (!selectedSection || !onUpdateResponsive) return;
      const updated = {
        ...responsive,
        [activeBreakpoint]: {
          ...current,
          padding: { ...current.padding, [side]: value },
        },
      };
      onUpdateResponsive(selectedSection.id, updated as Record<Breakpoint, ResponsiveSettings>);
    },
    [selectedSection, responsive, current, activeBreakpoint, onUpdateResponsive]
  );

  const handleVisibilityToggle = useCallback(() => {
    if (!selectedSection || !onUpdateResponsive) return;
    const updated = {
      ...responsive,
      [activeBreakpoint]: { ...current, visible: !current.visible },
    };
    onUpdateResponsive(selectedSection.id, updated as Record<Breakpoint, ResponsiveSettings>);
  }, [selectedSection, responsive, current, activeBreakpoint, onUpdateResponsive]);

  return (
    <div className="w-[220px] shrink-0 border-l border-border bg-secondary/30 overflow-y-auto hidden lg:flex flex-col">
      {/* Header */}
      <div className="px-3 py-2.5 border-b border-border text-[12px] font-medium text-foreground flex items-center justify-between">
        Свойства блока
        <ChevronDown className="h-3 w-3 text-muted-foreground" />
      </div>

      {/* Breakpoint picker */}
      <div className="px-3 py-2.5 border-b border-border">
        <div className="text-[10px] text-muted-foreground mb-2 font-medium">Устройство</div>
        <div className="flex gap-1">
          {breakpoints.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setActiveBreakpoint(key)}
              className={`flex items-center gap-1 px-2 py-1 rounded text-[10px] transition-colors ${
                activeBreakpoint === key
                  ? "bg-primary/10 text-primary border border-primary/20 font-medium"
                  : "border border-border text-muted-foreground hover:bg-secondary"
              }`}
            >
              <Icon className="h-3 w-3" />
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Selected block info */}
      {selectedSection ? (
        <>
          {/* Padding */}
          <div className="px-3 py-3 border-b border-border">
            <div className="text-[10px] text-muted-foreground mb-2 font-medium">
              Отступы — {breakpoints.find((b) => b.key === activeBreakpoint)?.label}
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              {paddingLabels.map(({ key, label }) => (
                <div key={key}>
                  <label className="text-[9px] text-muted-foreground">{label}</label>
                  <input
                    type="number"
                    min={0}
                    max={200}
                    className="w-full h-7 rounded border border-border bg-background text-center text-[12px] mt-0.5 focus:border-primary/40 focus:outline-none transition-colors"
                    value={current.padding[key]}
                    onChange={(e) => handlePaddingChange(key, parseInt(e.target.value) || 0)}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Visibility */}
          <div className="px-3 py-3 border-b border-border">
            <div className="text-[10px] text-muted-foreground mb-2 font-medium">
              Видимость — {breakpoints.find((b) => b.key === activeBreakpoint)?.label}
            </div>
            <button
              onClick={handleVisibilityToggle}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded text-[11px] transition-colors ${
                current.visible
                  ? "bg-primary/10 text-primary border border-primary/20"
                  : "bg-destructive/10 text-destructive border border-destructive/20"
              }`}
            >
              {current.visible ? <Eye className="h-3.5 w-3.5" /> : <EyeOff className="h-3.5 w-3.5" />}
              {current.visible ? "Показывать" : "Скрыт"}
            </button>

            {/* Quick overview */}
            <div className="mt-2 flex gap-1">
              {breakpoints.map(({ key, icon: Icon }) => {
                const r = responsive[key] ?? defaultResponsiveSettings[key];
                return (
                  <div
                    key={key}
                    className={`flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[9px] border ${
                      r.visible ? "border-primary/20 text-primary/70" : "border-destructive/20 text-destructive/60"
                    }`}
                  >
                    <Icon className="h-2.5 w-2.5" />
                    {r.visible ? "✓" : "✕"}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Animation */}
          <AnimationSettings
            animation={selectedSection.animation ?? "none"}
            onChange={(anim) => onUpdateAnimation?.(selectedSection.id, anim)}
          />
        </>
      ) : (
        <div className="px-3 py-6 text-center text-[11px] text-muted-foreground">
          Выберите блок для настройки
        </div>
      )}

      {/* Layers */}
      <div className="px-3 py-3">
        <div className="text-[10px] text-muted-foreground mb-2 font-medium">Слои</div>
        <div className="space-y-1">
          {sections.map((s) => (
            <div
              key={s.id}
              onClick={() => setSelected(s.id)}
              className={`flex items-center gap-2 px-2 py-1 rounded text-[11px] cursor-pointer transition-colors ${
                selected === s.id
                  ? "bg-secondary text-foreground font-medium"
                  : "text-muted-foreground hover:bg-secondary/50"
              }`}
            >
              <span
                className={`w-2 h-2 rounded-sm ${
                  s.type === "hero" ? "bg-primary" : s.type === "cards" ? "bg-green-500" : s.type === "cta" ? "bg-amber-500" : "bg-blue-400"
                }`}
              />
              {s.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EditorProperties;
