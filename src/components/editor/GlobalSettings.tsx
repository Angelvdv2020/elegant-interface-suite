import { useState, useCallback } from "react";
import { X, Type, Palette, Search as SearchIcon, Globe, Settings2, Sparkles, Shapes, Blend } from "lucide-react";
import { fontPresets, type FontPreset } from "@/lib/presets/fontPresets";
import { colorPresets, type ColorPreset } from "@/lib/presets/colorPresets";
import { shapePresets, type ShapePreset } from "@/lib/presets/shapePresets";
import { gradientPresets, type GradientPreset } from "@/lib/presets/gradientPresets";
import type { SiteSettings } from "@/lib/presets/seoDefaults";
import { defaultSiteSettings } from "@/lib/presets/seoDefaults";

interface GlobalSettingsProps {
  open: boolean;
  onClose: () => void;
  settings: SiteSettings;
  onUpdate: (settings: SiteSettings) => void;
}

type Tab = "fonts" | "colors" | "gradients" | "seo" | "spacing" | "effects" | "shapes";

const tabs: { key: Tab; label: string; icon: typeof Type }[] = [
  { key: "fonts", label: "Шрифты", icon: Type },
  { key: "colors", label: "Цвета", icon: Palette },
  { key: "gradients", label: "Градиенты", icon: Blend },
  { key: "shapes", label: "Фигуры", icon: Shapes },
  { key: "seo", label: "SEO", icon: Globe },
  { key: "spacing", label: "Отступы", icon: Settings2 },
  { key: "effects", label: "Эффекты", icon: Sparkles },
];

const fontCategories = [
  { key: "sans", label: "Без засечек" },
  { key: "serif", label: "С засечками" },
  { key: "mixed", label: "Смешанные" },
  { key: "display", label: "Акцидентные" },
];

const colorCategories = [
  { key: "neutral", label: "Нейтральные" },
  { key: "warm", label: "Тёплые" },
  { key: "cool", label: "Холодные" },
  { key: "bold", label: "Яркие" },
  { key: "pastel", label: "Пастельные" },
  { key: "dark", label: "Тёмные" },
];

const shapeCategories = [
  { key: "geometric", label: "Геометрия" },
  { key: "organic", label: "Органика" },
  { key: "decorative", label: "Декор" },
  { key: "divider", label: "Разделители" },
  { key: "badge", label: "Бейджи" },
  { key: "frame", label: "Рамки" },
];

const GlobalSettings = ({ open, onClose, settings, onUpdate }: GlobalSettingsProps) => {
  const [activeTab, setActiveTab] = useState<Tab>("fonts");
  const [search, setSearch] = useState("");
  const [fontCat, setFontCat] = useState<string>("all");
  const [colorCat, setColorCat] = useState<string>("all");
  const [shapeCat, setShapeCat] = useState<string>("all");
  const [gradCat, setGradCat] = useState<string>("all");

  const update = useCallback(
    <K extends keyof SiteSettings>(key: K, value: SiteSettings[K]) => {
      onUpdate({ ...settings, [key]: value });
    },
    [settings, onUpdate]
  );

  if (!open) return null;

  const filteredFonts = fontPresets.filter(
    (f) =>
      (fontCat === "all" || f.category === fontCat) &&
      (!search || f.name.toLowerCase().includes(search.toLowerCase()))
  );

  const filteredColors = colorPresets.filter(
    (c) =>
      (colorCat === "all" || c.category === colorCat) &&
      (!search || c.name.toLowerCase().includes(search.toLowerCase()))
  );

  const filteredShapes = shapePresets.filter(
    (s) =>
      (shapeCat === "all" || s.category === shapeCat) &&
      (!search || s.name.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="bg-background rounded-xl shadow-2xl w-full max-w-[820px] max-h-[85vh] flex flex-col overflow-hidden border border-border"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-border shrink-0">
          <h2 className="text-[15px] font-semibold text-foreground">Настройки сайта</h2>
          <button onClick={onClose} className="p-1 rounded hover:bg-secondary transition-colors">
            <X className="h-4 w-4 text-muted-foreground" />
          </button>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar tabs */}
          <div className="w-[160px] shrink-0 border-r border-border bg-secondary/30 p-2 space-y-0.5">
            {tabs.map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => { setActiveTab(key); setSearch(""); }}
                className={`flex items-center gap-2 w-full px-3 py-2 rounded-lg text-[13px] transition-colors ${
                  activeTab === key
                    ? "bg-primary/10 text-primary font-medium"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                }`}
              >
                <Icon className="h-4 w-4 shrink-0" />
                {label}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-5">
            {/* ═══ FONTS ═══ */}
            {activeTab === "fonts" && (
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="relative flex-1">
                    <SearchIcon className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                    <input
                      className="w-full h-8 pl-8 pr-3 rounded-lg border border-border bg-background text-[13px] focus:border-primary/40 focus:outline-none"
                      placeholder="Поиск шрифтов…"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex gap-1 mb-4 flex-wrap">
                  <button
                    onClick={() => setFontCat("all")}
                    className={`px-2.5 py-1 rounded-full text-[11px] transition-colors ${
                      fontCat === "all" ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"
                    }`}
                  >Все</button>
                  {fontCategories.map((cat) => (
                    <button
                      key={cat.key}
                      onClick={() => setFontCat(cat.key)}
                      className={`px-2.5 py-1 rounded-full text-[11px] transition-colors ${
                        fontCat === cat.key ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"
                      }`}
                    >{cat.label}</button>
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {filteredFonts.map((preset) => (
                    <FontCard
                      key={preset.id}
                      preset={preset}
                      active={settings.fonts.presetId === preset.id}
                      onClick={() => update("fonts", { heading: preset.heading, body: preset.body, presetId: preset.id })}
                    />
                  ))}
                </div>
                {/* Custom fonts */}
                <div className="mt-5 pt-4 border-t border-border">
                  <div className="text-[11px] text-muted-foreground font-medium mb-2 uppercase tracking-wider">Свои шрифты</div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] text-muted-foreground mb-1 block">Заголовки</label>
                      <input
                        className="w-full h-8 rounded-lg border border-border bg-background px-3 text-[13px] focus:border-primary/40 focus:outline-none"
                        value={settings.fonts.heading}
                        onChange={(e) => update("fonts", { ...settings.fonts, heading: e.target.value, presetId: undefined })}
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-muted-foreground mb-1 block">Основной текст</label>
                      <input
                        className="w-full h-8 rounded-lg border border-border bg-background px-3 text-[13px] focus:border-primary/40 focus:outline-none"
                        value={settings.fonts.body}
                        onChange={(e) => update("fonts", { ...settings.fonts, body: e.target.value, presetId: undefined })}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ═══ COLORS ═══ */}
            {activeTab === "colors" && (
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="relative flex-1">
                    <SearchIcon className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                    <input
                      className="w-full h-8 pl-8 pr-3 rounded-lg border border-border bg-background text-[13px] focus:border-primary/40 focus:outline-none"
                      placeholder="Поиск палитр…"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex gap-1 mb-4 flex-wrap">
                  <button
                    onClick={() => setColorCat("all")}
                    className={`px-2.5 py-1 rounded-full text-[11px] transition-colors ${
                      colorCat === "all" ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"
                    }`}
                  >Все</button>
                  {colorCategories.map((cat) => (
                    <button
                      key={cat.key}
                      onClick={() => setColorCat(cat.key)}
                      className={`px-2.5 py-1 rounded-full text-[11px] transition-colors ${
                        colorCat === cat.key ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"
                      }`}
                    >{cat.label}</button>
                  ))}
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {filteredColors.map((preset) => (
                    <ColorCard
                      key={preset.id}
                      preset={preset}
                      active={settings.colors.presetId === preset.id}
                      onClick={() => update("colors", { ...preset, presetId: preset.id })}
                    />
                  ))}
                </div>
                {/* Custom colors */}
                <div className="mt-5 pt-4 border-t border-border">
                  <div className="text-[11px] text-muted-foreground font-medium mb-2 uppercase tracking-wider">Свои цвета (HSL)</div>
                  <div className="grid grid-cols-3 gap-2">
                    {(["primary", "secondary", "accent", "background", "foreground", "muted"] as const).map((key) => (
                      <div key={key}>
                        <label className="text-[10px] text-muted-foreground mb-1 block capitalize">{key}</label>
                        <div className="flex items-center gap-1.5">
                          <div className="w-5 h-5 rounded border border-border shrink-0" style={{ backgroundColor: `hsl(${settings.colors[key]})` }} />
                          <input
                            className="w-full h-7 rounded border border-border bg-background px-2 text-[11px] font-mono focus:border-primary/40 focus:outline-none"
                            value={settings.colors[key]}
                            onChange={(e) => update("colors", { ...settings.colors, [key]: e.target.value, presetId: undefined })}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ═══ GRADIENTS ═══ */}
            {activeTab === "gradients" && (
              <div>
                <div className="flex gap-1 mb-4 flex-wrap">
                  <button onClick={() => setGradCat("all")} className={`px-2.5 py-1 rounded-full text-[11px] transition-colors ${gradCat === "all" ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"}`}>Все</button>
                  {[{ key: "soft", label: "Мягкие" }, { key: "vibrant", label: "Яркие" }, { key: "dark", label: "Тёмные" }, { key: "nature", label: "Природа" }, { key: "sunset", label: "Закат" }, { key: "ocean", label: "Океан" }].map(cat => (
                    <button key={cat.key} onClick={() => setGradCat(cat.key)} className={`px-2.5 py-1 rounded-full text-[11px] transition-colors ${gradCat === cat.key ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"}`}>{cat.label}</button>
                  ))}
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {gradientPresets.filter(g => gradCat === "all" || g.category === gradCat).map(g => (
                    <button
                      key={g.id}
                      onClick={() => navigator.clipboard.writeText(g.css).then(() => {})}
                      className="rounded-lg border-2 border-border hover:border-primary/40 overflow-hidden transition-all hover:shadow-sm"
                      title={`${g.name} — нажмите чтобы скопировать CSS`}
                    >
                      <div className="h-14 w-full" style={{ background: g.css }} />
                      <div className="px-2 py-1.5">
                        <div className="text-[11px] font-medium text-foreground">{g.name}</div>
                        <div className="text-[9px] text-muted-foreground truncate font-mono">{g.css.slice(0, 40)}…</div>
                      </div>
                    </button>
                  ))}
                </div>
                <p className="text-[11px] text-muted-foreground mt-4">Нажмите на градиент чтобы скопировать CSS. Используйте в HTML-блоках или как фон секций.</p>
              </div>
            )}

            {/* ═══ SHAPES ═══ */}
            {activeTab === "shapes" && (
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="relative flex-1">
                    <SearchIcon className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                    <input
                      className="w-full h-8 pl-8 pr-3 rounded-lg border border-border bg-background text-[13px] focus:border-primary/40 focus:outline-none"
                      placeholder="Поиск фигур…"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex gap-1 mb-4 flex-wrap">
                  <button
                    onClick={() => setShapeCat("all")}
                    className={`px-2.5 py-1 rounded-full text-[11px] transition-colors ${
                      shapeCat === "all" ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"
                    }`}
                  >Все</button>
                  {shapeCategories.map((cat) => (
                    <button
                      key={cat.key}
                      onClick={() => setShapeCat(cat.key)}
                      className={`px-2.5 py-1 rounded-full text-[11px] transition-colors ${
                        shapeCat === cat.key ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"
                      }`}
                    >{cat.label}</button>
                  ))}
                </div>
                <div className="grid grid-cols-5 gap-2">
                  {filteredShapes.map((shape) => (
                    <ShapeCard key={shape.id} shape={shape} />
                  ))}
                </div>
                <p className="text-[11px] text-muted-foreground mt-4">
                  Фигуры можно копировать как SVG и вставлять в HTML-блоки редактора. Цвет наследуется из палитры сайта.
                </p>
              </div>
            )}

            {/* ═══ SEO ═══ */}
            {activeTab === "seo" && (
              <div className="space-y-4">
                <div>
                  <label className="text-[11px] text-muted-foreground font-medium mb-1 block">Заголовок страницы (title)</label>
                  <input
                    className="w-full h-9 rounded-lg border border-border bg-background px-3 text-[13px] focus:border-primary/40 focus:outline-none"
                    value={settings.seo.title}
                    onChange={(e) => update("seo", { ...settings.seo, title: e.target.value })}
                    placeholder="Мой сайт — описание"
                    maxLength={60}
                  />
                  <div className="text-[10px] text-muted-foreground mt-1">{settings.seo.title.length}/60 символов</div>
                </div>
                <div>
                  <label className="text-[11px] text-muted-foreground font-medium mb-1 block">Мета-описание (description)</label>
                  <textarea
                    className="w-full h-20 rounded-lg border border-border bg-background px-3 py-2 text-[13px] resize-none focus:border-primary/40 focus:outline-none"
                    value={settings.seo.description}
                    onChange={(e) => update("seo", { ...settings.seo, description: e.target.value })}
                    placeholder="Краткое описание сайта для поисковиков"
                    maxLength={160}
                  />
                  <div className="text-[10px] text-muted-foreground mt-1">{settings.seo.description.length}/160 символов</div>
                </div>
                <div>
                  <label className="text-[11px] text-muted-foreground font-medium mb-1 block">Ключевые слова</label>
                  <input
                    className="w-full h-9 rounded-lg border border-border bg-background px-3 text-[13px] focus:border-primary/40 focus:outline-none"
                    value={settings.seo.keywords}
                    onChange={(e) => update("seo", { ...settings.seo, keywords: e.target.value })}
                    placeholder="ключевое слово 1, ключевое слово 2"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] text-muted-foreground font-medium mb-1 block">Автор</label>
                    <input
                      className="w-full h-9 rounded-lg border border-border bg-background px-3 text-[13px] focus:border-primary/40 focus:outline-none"
                      value={settings.seo.author}
                      onChange={(e) => update("seo", { ...settings.seo, author: e.target.value })}
                      placeholder="Имя автора"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-muted-foreground font-medium mb-1 block">Язык</label>
                    <select
                      className="w-full h-9 rounded-lg border border-border bg-background px-3 text-[13px] focus:border-primary/40 focus:outline-none"
                      value={settings.seo.language}
                      onChange={(e) => update("seo", { ...settings.seo, language: e.target.value })}
                    >
                      <option value="ru">Русский</option>
                      <option value="en">English</option>
                      <option value="de">Deutsch</option>
                      <option value="fr">Français</option>
                      <option value="es">Español</option>
                      <option value="uk">Українська</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="text-[11px] text-muted-foreground font-medium mb-1 block">OG Image URL</label>
                  <input
                    className="w-full h-9 rounded-lg border border-border bg-background px-3 text-[13px] focus:border-primary/40 focus:outline-none"
                    value={settings.seo.ogImage}
                    onChange={(e) => update("seo", { ...settings.seo, ogImage: e.target.value })}
                    placeholder="https://example.com/og-image.jpg"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-muted-foreground font-medium mb-1 block">Favicon URL</label>
                  <input
                    className="w-full h-9 rounded-lg border border-border bg-background px-3 text-[13px] focus:border-primary/40 focus:outline-none"
                    value={settings.seo.favicon}
                    onChange={(e) => update("seo", { ...settings.seo, favicon: e.target.value })}
                    placeholder="https://example.com/favicon.ico"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-muted-foreground font-medium mb-1 block">Robots</label>
                  <select
                    className="w-full h-9 rounded-lg border border-border bg-background px-3 text-[13px] focus:border-primary/40 focus:outline-none"
                    value={settings.seo.robots}
                    onChange={(e) => update("seo", { ...settings.seo, robots: e.target.value })}
                  >
                    <option value="index, follow">index, follow</option>
                    <option value="noindex, nofollow">noindex, nofollow</option>
                    <option value="index, nofollow">index, nofollow</option>
                    <option value="noindex, follow">noindex, follow</option>
                  </select>
                </div>

                {/* SEO Preview */}
                <div className="mt-4 p-4 rounded-lg bg-secondary/50 border border-border">
                  <div className="text-[10px] text-muted-foreground mb-2 uppercase tracking-wider font-medium">Превью в Google</div>
                  <div className="text-[15px] text-blue-700 font-medium leading-snug truncate">
                    {settings.seo.title || "Заголовок страницы"}
                  </div>
                  <div className="text-[12px] text-green-700 truncate mt-0.5">
                    https://example.com
                  </div>
                  <div className="text-[12px] text-muted-foreground leading-relaxed mt-1 line-clamp-2">
                    {settings.seo.description || "Описание страницы для поисковых систем…"}
                  </div>
                </div>
              </div>
            )}

            {/* ═══ SPACING ═══ */}
            {activeTab === "spacing" && (
              <div className="space-y-5">
                <div>
                  <label className="text-[11px] text-muted-foreground font-medium mb-2 block">Радиус скругления (px)</label>
                  <div className="flex items-center gap-3">
                    <input
                      type="range" min={0} max={24} step={1}
                      className="flex-1 accent-primary"
                      value={settings.spacing.borderRadius}
                      onChange={(e) => update("spacing", { ...settings.spacing, borderRadius: +e.target.value })}
                    />
                    <span className="text-[13px] text-foreground tabular-nums w-8 text-right">{settings.spacing.borderRadius}</span>
                  </div>
                  <div className="flex gap-2 mt-2">
                    {[0, 4, 8, 12, 16, 24].map((v) => (
                      <button
                        key={v}
                        onClick={() => update("spacing", { ...settings.spacing, borderRadius: v })}
                        className={`w-10 h-10 border-2 transition-colors ${
                          settings.spacing.borderRadius === v ? "border-primary" : "border-border"
                        }`}
                        style={{ borderRadius: v }}
                      />
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-[11px] text-muted-foreground font-medium mb-2 block">Отступ между секциями (px)</label>
                  <div className="flex items-center gap-3">
                    <input
                      type="range" min={0} max={64} step={4}
                      className="flex-1 accent-primary"
                      value={settings.spacing.sectionGap}
                      onChange={(e) => update("spacing", { ...settings.spacing, sectionGap: +e.target.value })}
                    />
                    <span className="text-[13px] text-foreground tabular-nums w-8 text-right">{settings.spacing.sectionGap}</span>
                  </div>
                </div>
                <div>
                  <label className="text-[11px] text-muted-foreground font-medium mb-2 block">Ширина контейнера (px)</label>
                  <div className="flex items-center gap-3">
                    <input
                      type="range" min={800} max={1600} step={50}
                      className="flex-1 accent-primary"
                      value={settings.spacing.containerWidth}
                      onChange={(e) => update("spacing", { ...settings.spacing, containerWidth: +e.target.value })}
                    />
                    <span className="text-[13px] text-foreground tabular-nums w-12 text-right">{settings.spacing.containerWidth}</span>
                  </div>
                </div>
              </div>
            )}

            {/* ═══ EFFECTS ═══ */}
            {activeTab === "effects" && (
              <div className="space-y-5">
                <div>
                  <label className="text-[11px] text-muted-foreground font-medium mb-2 block">Тени</label>
                  <div className="flex gap-2">
                    {(["none", "sm", "md", "lg"] as const).map((v) => (
                      <button
                        key={v}
                        onClick={() => update("effects", { ...settings.effects, shadow: v })}
                        className={`flex-1 h-16 rounded-lg border-2 flex items-center justify-center text-[11px] font-medium transition-all ${
                          settings.effects.shadow === v ? "border-primary bg-primary/5" : "border-border"
                        }`}
                        style={{
                          boxShadow:
                            v === "none" ? "none" :
                            v === "sm" ? "0 1px 3px rgba(0,0,0,0.12)" :
                            v === "md" ? "0 4px 12px rgba(0,0,0,0.1)" :
                            "0 8px 30px rgba(0,0,0,0.12)",
                        }}
                      >
                        {v === "none" ? "Без тени" : v === "sm" ? "Лёгкая" : v === "md" ? "Средняя" : "Сильная"}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-[11px] text-muted-foreground font-medium mb-2 block">Анимация</label>
                  <div className="flex gap-2">
                    {(["none", "subtle", "moderate", "energetic"] as const).map((v) => (
                      <button
                        key={v}
                        onClick={() => update("effects", { ...settings.effects, animation: v })}
                        className={`flex-1 py-3 rounded-lg border-2 text-[11px] font-medium transition-all ${
                          settings.effects.animation === v ? "border-primary bg-primary/5" : "border-border"
                        }`}
                      >
                        {v === "none" ? "Нет" : v === "subtle" ? "Мягкая" : v === "moderate" ? "Умеренная" : "Активная"}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-[11px] text-muted-foreground font-medium mb-2 block">Масштаб при наведении</label>
                  <button
                    onClick={() => update("effects", { ...settings.effects, hoverScale: !settings.effects.hoverScale })}
                    className={`px-4 py-2 rounded-lg border-2 text-[12px] font-medium transition-all ${
                      settings.effects.hoverScale ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground"
                    }`}
                  >
                    {settings.effects.hoverScale ? "✓ Включено" : "Выключено"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Sub-components ───

const FontCard = ({ preset, active, onClick }: { preset: FontPreset; active: boolean; onClick: () => void }) => (
  <button
    onClick={onClick}
    className={`text-left p-3 rounded-lg border-2 transition-all hover:shadow-sm ${
      active ? "border-primary bg-primary/5" : "border-border hover:border-primary/30"
    }`}
  >
    <div className="text-[10px] text-muted-foreground mb-1">{preset.name}</div>
    <div className="text-[16px] font-bold text-foreground leading-tight mb-0.5" style={{ fontFamily: preset.heading }}>
      Заголовок Aa
    </div>
    <div className="text-[11px] text-muted-foreground" style={{ fontFamily: preset.body }}>
      Основной текст сайта
    </div>
    <div className="text-[9px] text-muted-foreground/60 mt-1.5 truncate">
      {preset.heading}{preset.heading !== preset.body ? ` + ${preset.body}` : ""}
    </div>
  </button>
);

const ColorCard = ({ preset, active, onClick }: { preset: ColorPreset; active: boolean; onClick: () => void }) => (
  <button
    onClick={onClick}
    className={`p-3 rounded-lg border-2 transition-all hover:shadow-sm ${
      active ? "border-primary bg-primary/5" : "border-border hover:border-primary/30"
    }`}
  >
    <div className="flex gap-1 mb-2">
      {[preset.primary, preset.secondary, preset.accent, preset.background, preset.foreground].map((c, i) => (
        <div key={i} className="h-5 flex-1 rounded-sm first:rounded-l-md last:rounded-r-md" style={{ backgroundColor: `hsl(${c})` }} />
      ))}
    </div>
    <div className="text-[11px] font-medium text-foreground">{preset.name}</div>
    <div className="text-[9px] text-muted-foreground">{preset.category}</div>
  </button>
);

const ShapeCard = ({ shape }: { shape: ShapePreset }) => (
  <div
    className="aspect-square rounded-lg border border-border hover:border-primary/40 p-3 flex flex-col items-center justify-center cursor-pointer transition-all hover:shadow-sm group"
    onClick={() => {
      const svgStr = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${shape.viewBox}">${shape.svg}</svg>`;
      navigator.clipboard.writeText(svgStr);
    }}
    title={`${shape.name} — нажмите чтобы скопировать SVG`}
  >
    <svg
      viewBox={shape.viewBox}
      className="w-8 h-8 text-foreground group-hover:text-primary transition-colors"
      dangerouslySetInnerHTML={{ __html: shape.svg }}
    />
    <div className="text-[9px] text-muted-foreground mt-1.5 truncate w-full text-center">{shape.name}</div>
  </div>
);

export default GlobalSettings;
