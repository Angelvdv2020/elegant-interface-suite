import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Undo2, Redo2, Monitor, Tablet, Smartphone, Eye, Save, 
  ChevronDown, Plus, GripVertical, Type, Image, LayoutGrid, 
  AlignLeft, Settings2, Layers, Blocks 
} from "lucide-react";

type Section = { id: string; type: "hero" | "cards" | "text"; label: string };

const defaultSections: Section[] = [
  { id: "hero", type: "hero", label: "Герой" },
  { id: "cards", type: "cards", label: "Карточки" },
  { id: "text", type: "text", label: "Текстовый блок" },
];

const pages = [
  { name: "Главная", active: true },
  { name: "О нас", active: false },
  { name: "Контакты", active: false },
];

const EditorPage = () => {
  const [selected, setSelected] = useState("cards");
  const [device, setDevice] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [activeTab, setActiveTab] = useState<"design" | "layers" | "blocks">("design");
  const [sections] = useState<Section[]>(defaultSections);

  const canvasWidth = device === "desktop" ? "max-w-[720px]" : device === "tablet" ? "max-w-[480px]" : "max-w-[320px]";

  return (
    <div className="flex flex-col h-screen bg-background overflow-hidden">
      {/* Topbar */}
      <div className="flex items-center gap-1.5 px-3 h-11 border-b border-border bg-secondary/50 shrink-0">
        <Link to="/" className="flex items-center gap-1.5 mr-2">
          <div className="flex h-6 w-6 items-center justify-center rounded bg-brand text-[10px] font-bold text-brand-light">V</div>
          <span className="text-[13px] font-medium text-foreground hidden sm:inline">Visually</span>
        </Link>
        <span className="rounded bg-brand px-1.5 py-0.5 text-[9px] font-bold text-brand-light">PRO</span>
        <div className="w-px h-4 bg-border mx-1" />

        {(["design", "layers", "blocks"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex items-center gap-1 px-2 py-1 rounded text-[12px] transition-colors ${activeTab === tab ? "bg-background border border-border text-foreground shadow-soft" : "text-muted-foreground hover:text-foreground"}`}
          >
            {tab === "design" && <Settings2 className="h-3.5 w-3.5" />}
            {tab === "layers" && <Layers className="h-3.5 w-3.5" />}
            {tab === "blocks" && <Blocks className="h-3.5 w-3.5" />}
            <span className="hidden sm:inline">{tab === "design" ? "Дизайн" : tab === "layers" ? "Слои" : "Блоки"}</span>
          </button>
        ))}

        <div className="w-px h-4 bg-border mx-1" />
        <button className="p-1.5 rounded text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors">
          <Undo2 className="h-3.5 w-3.5" />
        </button>
        <button className="p-1.5 rounded text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors">
          <Redo2 className="h-3.5 w-3.5" />
        </button>

        <div className="flex-1" />

        <div className="hidden sm:flex items-center gap-0.5 mr-2">
          {([["desktop", Monitor], ["tablet", Tablet], ["mobile", Smartphone]] as const).map(([d, Icon]) => (
            <button key={d} onClick={() => setDevice(d)} className={`p-1.5 rounded transition-colors ${device === d ? "bg-brand text-brand-light" : "text-muted-foreground hover:bg-secondary"}`}>
              <Icon className="h-3.5 w-3.5" />
            </button>
          ))}
        </div>

        <button className="flex items-center gap-1 px-2 py-1 rounded text-[12px] text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors">
          <Eye className="h-3.5 w-3.5" /> <span className="hidden sm:inline">Просмотр</span>
        </button>
        <button className="flex items-center gap-1 px-2.5 py-1 rounded text-[12px] text-muted-foreground hover:bg-secondary transition-colors">
          <Save className="h-3.5 w-3.5" /> <span className="hidden sm:inline">Черновик</span>
        </button>
        <button className="flex items-center gap-1 px-3 py-1 rounded-lg bg-success text-white text-[12px] font-medium hover:bg-success/90 transition-colors active:scale-[0.97]">
          Опубликовать
        </button>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
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

        {/* Canvas area */}
        <div className="flex-1 bg-[#ebebeb] overflow-auto flex justify-center p-6">
          <div className={`${canvasWidth} w-full`}>
            <div className="bg-background rounded-lg shadow-canvas overflow-hidden">
              {/* Hero section */}
              <div
                className={`relative p-6 border-2 border-dashed cursor-pointer transition-all ${selected === "hero" ? "border-brand/50 bg-brand-50/20" : "border-transparent hover:border-brand/15"}`}
                onClick={() => setSelected("hero")}
              >
                {selected === "hero" && (
                  <div className="absolute top-2 right-2 flex gap-1">
                    <span className="px-1.5 py-0.5 rounded bg-background border border-border text-[10px] text-muted-foreground shadow-soft cursor-pointer hover:bg-secondary">✎</span>
                    <span className="px-1.5 py-0.5 rounded bg-background border border-border text-[10px] text-muted-foreground shadow-soft cursor-pointer hover:bg-secondary">⊕</span>
                    <span className="px-1.5 py-0.5 rounded bg-background border border-border text-[10px] text-destructive shadow-soft cursor-pointer hover:bg-secondary">✕</span>
                  </div>
                )}
                <div className="w-full h-24 rounded-lg bg-gradient-to-r from-brand to-brand-700 flex items-center justify-center mb-4">
                  <span className="text-[11px] text-brand-100/70">Кликните чтобы заменить изображение</span>
                </div>
                <h2 className="text-xl font-semibold text-foreground mb-2">Ваш заголовок здесь</h2>
                <p className="text-[13px] text-muted-foreground leading-relaxed mb-4">Кликните по любому элементу страницы, чтобы его отредактировать. Перетащите блоки для изменения порядка.</p>
                <div className="inline-flex items-center gap-1.5 px-4 py-2 bg-brand text-brand-light rounded-lg text-[13px] font-medium">
                  Начать →
                </div>
              </div>

              {/* Cards section */}
              <div
                className={`relative p-6 border-2 border-dashed cursor-pointer transition-all ${selected === "cards" ? "border-brand/50 bg-brand-50/20" : "border-transparent hover:border-brand/15"}`}
                onClick={() => setSelected("cards")}
              >
                {selected === "cards" && (
                  <div className="absolute top-2 right-2 flex gap-1">
                    <span className="px-1.5 py-0.5 rounded bg-background border border-border text-[10px] text-muted-foreground shadow-soft cursor-pointer hover:bg-secondary">✎</span>
                    <span className="px-1.5 py-0.5 rounded bg-background border border-border text-[10px] text-muted-foreground shadow-soft cursor-pointer hover:bg-secondary">⊕</span>
                    <span className="px-1.5 py-0.5 rounded bg-background border border-border text-[10px] text-destructive shadow-soft cursor-pointer hover:bg-secondary">✕</span>
                  </div>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { bg: "bg-brand-light", label: "Функция 1" },
                    { bg: "bg-success-light", label: "Функция 2" },
                    { bg: "bg-purple-50", label: "Функция 3" },
                  ].map((c) => (
                    <div key={c.label} className="border border-border rounded-lg p-4">
                      <div className={`w-7 h-7 rounded-md ${c.bg} mb-3`} />
                      <div className="text-[13px] font-medium text-foreground mb-1">{c.label}</div>
                      <div className="text-[12px] text-muted-foreground leading-relaxed">Краткое описание преимущества продукта</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Text section */}
              <div
                className={`relative p-6 border-2 border-dashed cursor-pointer transition-all ${selected === "text" ? "border-brand/50 bg-brand-50/20" : "border-transparent hover:border-brand/15"}`}
                onClick={() => setSelected("text")}
              >
                {selected === "text" && (
                  <div className="absolute top-2 right-2 flex gap-1">
                    <span className="px-1.5 py-0.5 rounded bg-background border border-border text-[10px] text-muted-foreground shadow-soft cursor-pointer hover:bg-secondary">✎</span>
                    <span className="px-1.5 py-0.5 rounded bg-background border border-border text-[10px] text-destructive shadow-soft cursor-pointer hover:bg-secondary">✕</span>
                  </div>
                )}
                <h3 className="text-lg font-semibold text-foreground mb-2">О нашем продукте</h3>
                <p className="text-[13px] text-muted-foreground leading-relaxed">
                  Здесь может быть любой текстовый контент. Кликните дважды чтобы начать редактирование. Поддерживается форматирование: жирный, курсив, ссылки.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Properties panel */}
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
      </div>

      {/* Statusbar */}
      <div className="flex items-center gap-4 px-3 h-6 border-t border-border bg-secondary/50 text-[10px] text-muted-foreground shrink-0">
        <span className="text-success font-medium">● Сохранено</span>
        <span>Zoom: 100%</span>
        <span>{device === "desktop" ? "1280" : device === "tablet" ? "768" : "375"} × auto</span>
        <span className="ml-auto">v2.4.1</span>
      </div>
    </div>
  );
};

export default EditorPage;
