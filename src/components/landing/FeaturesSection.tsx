import { MousePointer2, Image, Layers, History, MonitorSmartphone, Webhook } from "lucide-react";

const features = [
  { icon: MousePointer2, title: "Inline-редактирование", desc: "Двойной клик по тексту — и вы уже редактируете. Без всплывающих окон и модальных панелей.", color: "bg-brand-light text-brand" },
  { icon: Image, title: "Медиабиблиотека", desc: "Загружайте изображения с автоматической компрессией. Храните на CDN. Поиск и фильтрация.", color: "bg-success-light text-success" },
  { icon: Layers, title: "Блочная система", desc: "Герой, карточки, текст, галерея, формы — перетаскивайте готовые секции и настраивайте.", color: "bg-purple-50 text-purple-600" },
  { icon: History, title: "История и версии", desc: "Undo/Redo на 50 шагов. Черновики и опубликованные версии. Полный аудит изменений.", color: "bg-warning-light text-warning" },
  { icon: MonitorSmartphone, title: "Адаптивность", desc: "Настраивайте отступы и видимость для каждого размера экрана отдельно.", color: "bg-brand-light text-brand" },
  { icon: Webhook, title: "API & Webhooks", desc: "REST API, Webhook при публикации. SDK для кастомных блоков. CI/CD интеграция.", color: "bg-success-light text-success" },
];

const FeaturesSection = () => (
  <section id="features" className="py-20 lg:py-28">
    <div className="mx-auto max-w-6xl px-4 sm:px-6">
      <div className="text-center mb-14">
        <div className="text-[11px] font-semibold uppercase tracking-[0.15em] text-brand mb-3">Возможности</div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-foreground">Всё для визуального редактирования</h2>
        <p className="mt-3 text-sm text-muted-foreground max-w-xl mx-auto">Мощный инструмент, который встраивается в ваш сайт за минуту</p>
      </div>

      <div className="grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
        {features.map((f, i) => (
          <div key={f.title} className="group animate-fade-up" style={{ animationDelay: `${i * 80}ms` }}>
            <div className={`flex h-10 w-10 items-center justify-center rounded-lg mb-4 ${f.color} transition-transform group-hover:scale-105 active:scale-95`}>
              <f.icon className="h-5 w-5" />
            </div>
            <h3 className="text-[15px] font-semibold text-foreground mb-1.5">{f.title}</h3>
            <p className="text-[13px] leading-relaxed text-muted-foreground">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default FeaturesSection;
