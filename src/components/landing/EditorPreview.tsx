import { useState } from "react";

const EditorPreview = () => {
  const [selectedSection, setSelectedSection] = useState<"hero" | "cards">("cards");

  return (
    <section className="py-8 sm:py-12">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="rounded-xl border border-border bg-background shadow-lifted overflow-hidden animate-scale-in delay-4">
          {/* Topbar */}
          <div className="flex items-center gap-2 px-3 h-10 border-b border-border bg-secondary/50 text-[12px]">
            <span className="font-medium text-foreground mr-2">Visually</span>
            <span className="rounded bg-brand px-1.5 py-0.5 text-[10px] font-bold text-brand-light">PRO</span>
            <div className="w-px h-4 bg-border mx-1" />
            <button className="px-2 py-1 rounded text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors">✦ Дизайн</button>
            <button className="px-2 py-1 rounded text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors">◈ Слои</button>
            <button className="px-2 py-1 rounded text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors">⊞ Блоки</button>
            <div className="flex-1" />
            <button className="px-2 py-1 rounded bg-success-light text-success text-[11px] font-medium border border-success/20">
              Опубликовать
            </button>
          </div>

          <div className="flex" style={{ height: 380 }}>
            {/* Sidebar */}
            <div className="w-[160px] shrink-0 border-r border-border bg-secondary/30 overflow-y-auto hidden sm:block">
              <div className="p-2">
                <div className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider px-2 py-1.5">Страницы</div>
                <div className="flex items-center gap-2 px-2 py-1.5 rounded text-[12px] bg-brand-light text-brand font-medium border-l-2 border-brand">
                  <span className="w-4 h-4 rounded bg-brand-light text-[9px] flex items-center justify-center">⬜</span>
                  Главная
                </div>
                <div className="flex items-center gap-2 px-2 py-1.5 rounded text-[12px] text-muted-foreground hover:bg-secondary cursor-pointer">
                  <span className="w-4 h-4 rounded bg-secondary text-[9px] flex items-center justify-center">⬜</span>
                  О нас
                </div>
              </div>
              <div className="border-t border-border p-2">
                <div className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider px-2 py-1.5">Блоки</div>
                <div className={`flex items-center gap-2 px-2 py-1.5 rounded text-[12px] cursor-pointer ${selectedSection === "hero" ? "bg-brand-light text-brand font-medium border-l-2 border-brand" : "text-muted-foreground hover:bg-secondary"}`} onClick={() => setSelectedSection("hero")}>
                  <span className="w-4 h-4 rounded bg-purple-50 text-[9px] flex items-center justify-center">◼</span>
                  Герой
                </div>
                <div className={`flex items-center gap-2 px-2 py-1.5 rounded text-[12px] cursor-pointer ${selectedSection === "cards" ? "bg-brand-light text-brand font-medium border-l-2 border-brand" : "text-muted-foreground hover:bg-secondary"}`} onClick={() => setSelectedSection("cards")}>
                  <span className="w-4 h-4 rounded bg-brand-light text-[9px] flex items-center justify-center text-brand">⊞</span>
                  Карточки
                </div>
              </div>
            </div>

            {/* Canvas */}
            <div className="flex-1 bg-[#e8e8e8] overflow-auto p-4 flex flex-col items-center">
              <div className="flex gap-1 mb-3 self-start">
                <button className="px-2.5 py-1 rounded text-[10px] bg-brand text-brand-light font-medium">Десктоп</button>
                <button className="px-2.5 py-1 rounded text-[10px] border border-border bg-background text-muted-foreground">Планшет</button>
                <button className="px-2.5 py-1 rounded text-[10px] border border-border bg-background text-muted-foreground">Мобайл</button>
              </div>
              <div className="bg-background rounded shadow-canvas w-full max-w-[520px] overflow-hidden">
                {/* Hero section */}
                <div
                  className={`relative p-5 border-2 border-dashed cursor-pointer transition-colors ${selectedSection === "hero" ? "border-brand/40 bg-brand-50/30" : "border-transparent hover:border-brand/20"}`}
                  onClick={() => setSelectedSection("hero")}
                >
                  {selectedSection === "hero" && (
                    <div className="absolute top-1.5 right-1.5 flex gap-1">
                      <span className="px-1.5 py-0.5 rounded bg-background border border-border text-[10px] text-muted-foreground">✎</span>
                      <span className="px-1.5 py-0.5 rounded bg-background border border-border text-[10px] text-muted-foreground">✕</span>
                    </div>
                  )}
                  <div className="w-full h-16 rounded bg-gradient-to-r from-brand to-brand-700 flex items-center justify-center mb-3">
                    <span className="text-[10px] text-brand-100">Изображение</span>
                  </div>
                  <div className="text-base font-semibold text-foreground mb-1">Ваш заголовок здесь</div>
                  <div className="text-[12px] text-muted-foreground leading-relaxed mb-3">Кликните на любой элемент, чтобы его отредактировать.</div>
                  <div className="inline-flex items-center gap-1 px-3 py-1.5 bg-brand text-brand-light rounded text-[11px] font-medium">Начать →</div>
                </div>

                {/* Cards section */}
                <div
                  className={`relative p-5 border-2 border-dashed cursor-pointer transition-colors ${selectedSection === "cards" ? "border-brand/40 bg-brand-50/30" : "border-transparent hover:border-brand/20"}`}
                  onClick={() => setSelectedSection("cards")}
                >
                  {selectedSection === "cards" && (
                    <div className="absolute top-1.5 right-1.5 flex gap-1">
                      <span className="px-1.5 py-0.5 rounded bg-background border border-border text-[10px] text-muted-foreground">✎</span>
                      <span className="px-1.5 py-0.5 rounded bg-background border border-border text-[10px] text-muted-foreground">✕</span>
                    </div>
                  )}
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { bg: "bg-brand-light", label: "Функция 1" },
                      { bg: "bg-success-light", label: "Функция 2" },
                      { bg: "bg-purple-50", label: "Функция 3" },
                    ].map((c) => (
                      <div key={c.label} className="border border-border rounded-lg p-2.5">
                        <div className={`w-5 h-5 rounded ${c.bg} mb-2`} />
                        <div className="text-[11px] font-medium text-foreground mb-0.5">{c.label}</div>
                        <div className="text-[10px] text-muted-foreground leading-snug">Описание</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Properties panel */}
            <div className="w-[180px] shrink-0 border-l border-border bg-secondary/30 overflow-y-auto hidden lg:block">
              <div className="px-3 py-2.5 border-b border-border text-[12px] font-medium text-foreground">Свойства блока</div>
              <div className="px-3 py-2.5 border-b border-border">
                <div className="text-[10px] text-muted-foreground mb-1.5">Отступы</div>
                <div className="flex gap-1.5">
                  <input className="w-12 h-6 rounded border border-border bg-background text-center text-[11px]" defaultValue="28" readOnly />
                  <input className="w-12 h-6 rounded border border-border bg-background text-center text-[11px]" defaultValue="32" readOnly />
                </div>
              </div>
              <div className="px-3 py-2.5 border-b border-border">
                <div className="text-[10px] text-muted-foreground mb-1.5">Фон</div>
                <div className="flex gap-1.5 items-center">
                  <div className="w-6 h-6 rounded border border-border bg-white" />
                  <input className="flex-1 h-6 rounded border border-border bg-background px-2 text-[11px]" defaultValue="#ffffff" readOnly />
                </div>
              </div>
              <div className="px-3 py-2.5 border-b border-border">
                <div className="text-[10px] text-muted-foreground mb-1.5">Шрифт</div>
                <div className="flex gap-1 flex-wrap">
                  <span className="px-1.5 py-0.5 rounded border border-border bg-background text-[10px] text-foreground font-medium">14</span>
                  <span className="px-1.5 py-0.5 rounded border border-border text-[10px] text-muted-foreground">16</span>
                  <span className="px-1.5 py-0.5 rounded border border-border bg-background text-[10px] text-foreground font-bold">B</span>
                  <span className="px-1.5 py-0.5 rounded border border-border text-[10px] text-muted-foreground italic">I</span>
                </div>
              </div>
              <div className="px-3 py-2.5">
                <div className="text-[10px] text-muted-foreground mb-1.5">Слои</div>
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground"><span className="w-2 h-2 rounded-sm bg-brand" /> Герой</div>
                  <div className="flex items-center gap-1.5 text-[11px] text-foreground font-medium"><span className="w-2 h-2 rounded-sm bg-success" /> Карточки</div>
                  <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground"><span className="w-2 h-2 rounded-sm bg-warning" /> Футер</div>
                </div>
              </div>
            </div>
          </div>

          {/* Statusbar */}
          <div className="flex items-center gap-4 px-3 h-6 border-t border-border bg-secondary/50 text-[10px] text-muted-foreground">
            <span className="text-success font-medium">● Сохранено</span>
            <span>Zoom: 100%</span>
            <span>680 × 620 px</span>
            <span className="ml-auto">v2.4.1</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditorPreview;
