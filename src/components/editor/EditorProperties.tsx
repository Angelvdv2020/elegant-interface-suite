import { ChevronDown } from "lucide-react";
import type { Section } from "./types";

interface EditorPropertiesProps {
  sections: Section[];
  selected: string;
  setSelected: (id: string) => void;
}

const EditorProperties = ({ sections, selected, setSelected }: EditorPropertiesProps) => (
  <div className="w-[220px] shrink-0 border-l border-border bg-secondary/30 overflow-y-auto hidden lg:flex flex-col">
    <div className="px-3 py-2.5 border-b border-border text-[12px] font-medium text-foreground flex items-center justify-between">
      Свойства блока
      <ChevronDown className="h-3 w-3 text-muted-foreground" />
    </div>

    {/* Padding */}
    <div className="px-3 py-3 border-b border-border">
      <div className="text-[10px] text-muted-foreground mb-2 font-medium">Отступы (px)</div>
      <div className="grid grid-cols-2 gap-1.5">
        {["Верх", "Право", "Низ", "Лево"].map((d, i) => (
          <div key={d}>
            <label className="text-[9px] text-muted-foreground">{d}</label>
            <input className="w-full h-7 rounded border border-border bg-background text-center text-[12px] mt-0.5" defaultValue={[28, 32, 28, 32][i]} />
          </div>
        ))}
      </div>
    </div>

    {/* Background */}
    <div className="px-3 py-3 border-b border-border">
      <div className="text-[10px] text-muted-foreground mb-2 font-medium">Фон блока</div>
      <div className="flex gap-1.5 items-center">
        <div className="w-7 h-7 rounded border border-border bg-white cursor-pointer hover:border-brand/40 transition-colors" />
        <input className="flex-1 h-7 rounded border border-border bg-background px-2 text-[12px] font-mono" defaultValue="#ffffff" />
      </div>
    </div>

    {/* Font */}
    <div className="px-3 py-3 border-b border-border">
      <div className="text-[10px] text-muted-foreground mb-2 font-medium">Шрифт заголовка</div>
      <select className="w-full h-7 rounded border border-border bg-background px-2 text-[12px] mb-2">
        <option>Inter</option>
        <option>Roboto</option>
        <option>Playfair Display</option>
      </select>
      <div className="flex gap-1 flex-wrap">
        {[14, 16, 18, 20, 24].map((s) => (
          <button key={s} className={`px-1.5 py-0.5 rounded border text-[10px] ${s === 14 ? "border-brand/30 bg-brand-light text-brand font-medium" : "border-border text-muted-foreground hover:bg-secondary"}`}>
            {s}
          </button>
        ))}
        <button className="px-1.5 py-0.5 rounded border border-brand/30 bg-brand-light text-brand text-[10px] font-bold">B</button>
        <button className="px-1.5 py-0.5 rounded border border-border text-[10px] text-muted-foreground italic">I</button>
      </div>
    </div>

    {/* Text color */}
    <div className="px-3 py-3 border-b border-border">
      <div className="text-[10px] text-muted-foreground mb-2 font-medium">Цвет текста</div>
      <div className="flex gap-1.5 items-center">
        <div className="w-7 h-7 rounded border border-border bg-foreground cursor-pointer" />
        <input className="flex-1 h-7 rounded border border-border bg-background px-2 text-[12px] font-mono" defaultValue="#111111" />
      </div>
    </div>

    {/* Responsiveness */}
    <div className="px-3 py-3 border-b border-border">
      <div className="text-[10px] text-muted-foreground mb-2 font-medium">Адаптивность</div>
      <div className="flex gap-1">
        <button className="px-2 py-1 rounded border border-brand/30 bg-brand-light text-brand text-[10px] font-medium">Показывать</button>
        <button className="px-2 py-1 rounded border border-border text-[10px] text-muted-foreground hover:bg-secondary">Скрыть моб.</button>
      </div>
    </div>

    {/* Layers */}
    <div className="px-3 py-3">
      <div className="text-[10px] text-muted-foreground mb-2 font-medium">Слои</div>
      <div className="space-y-1">
        {sections.map((s) => (
          <div
            key={s.id}
            onClick={() => setSelected(s.id)}
            className={`flex items-center gap-2 px-2 py-1 rounded text-[11px] cursor-pointer ${selected === s.id ? "bg-secondary text-foreground font-medium" : "text-muted-foreground hover:bg-secondary/50"}`}
          >
            <span className={`w-2 h-2 rounded-sm ${s.type === "hero" ? "bg-brand" : s.type === "cards" ? "bg-success" : "bg-warning"}`} />
            {s.label}
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default EditorProperties;
