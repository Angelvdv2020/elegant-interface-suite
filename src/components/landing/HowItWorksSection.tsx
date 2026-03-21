const steps = [
  {
    num: "1",
    title: "Добавьте скрипт",
    desc: "Вставьте один тег в HTML вашего сайта. Это всё, что нужно для подключения.",
    code: '<script src="https://cdn.visually.app/v2/editor.js"\n  data-api-key="vsl_xxx"\n  data-role="editor"\n></script>',
  },
  {
    num: "2",
    title: "Редактируйте визуально",
    desc: "Кликайте по элементам, меняйте текст, изображения, стили — прямо на странице.",
    code: null,
  },
  {
    num: "3",
    title: "Публикуйте",
    desc: "Нажмите «Опубликовать» — изменения моментально появятся на сайте. Или запланируйте.",
    code: null,
  },
];

const HowItWorksSection = () => (
  <section className="py-20 lg:py-28 bg-secondary/30">
    <div className="mx-auto max-w-4xl px-4 sm:px-6">
      <div className="text-center mb-14">
        <div className="text-[11px] font-semibold uppercase tracking-[0.15em] text-brand mb-3">Быстрый старт</div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-foreground">Три шага к визуальному редактированию</h2>
      </div>

      <div className="space-y-10">
        {steps.map((s, i) => (
          <div key={s.num} className="flex gap-5 items-start animate-fade-up" style={{ animationDelay: `${i * 120}ms` }}>
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand text-[13px] font-bold text-brand-light">
              {s.num}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-[15px] font-semibold text-foreground mb-1">{s.title}</h3>
              <p className="text-[13px] text-muted-foreground leading-relaxed mb-3">{s.desc}</p>
              {s.code && (
                <pre className="rounded-lg bg-foreground text-primary-foreground p-4 text-[12px] leading-relaxed overflow-x-auto font-mono">
                  {s.code}
                </pre>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default HowItWorksSection;
