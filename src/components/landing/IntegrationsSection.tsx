const integrations = [
  { name: "WordPress", desc: "Плагин с автоустановкой", emoji: "🔵" },
  { name: "Next.js", desc: "npm-пакет + SSR", emoji: "▲" },
  { name: "Nuxt", desc: "Модуль для Nuxt 3", emoji: "💚" },
  { name: "Webflow", desc: "Через API", emoji: "🔷" },
  { name: "Static HTML", desc: "Один тег скрипта", emoji: "📄" },
  { name: "REST API", desc: "Любая CMS", emoji: "🔌" },
];

const IntegrationsSection = () => (
  <section className="py-20 lg:py-28">
    <div className="mx-auto max-w-5xl px-4 sm:px-6">
      <div className="text-center mb-14">
        <div className="text-[11px] font-semibold uppercase tracking-[0.15em] text-brand mb-3">Интеграции</div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-foreground">Работает с вашим стеком</h2>
        <p className="mt-3 text-sm text-muted-foreground max-w-lg mx-auto">Готовые коннекторы для популярных платформ. REST API для всего остального.</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {integrations.map((p, i) => (
          <div key={p.name} className="flex flex-col items-center gap-2 py-5 rounded-xl border border-border bg-background hover:border-brand/30 hover:shadow-soft transition-all cursor-default animate-fade-up active:scale-[0.97]" style={{ animationDelay: `${i * 60}ms` }}>
            <span className="text-xl">{p.emoji}</span>
            <div className="text-[12px] font-semibold text-foreground">{p.name}</div>
            <div className="text-[10px] text-muted-foreground">{p.desc}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default IntegrationsSection;
