import { Star, Quote } from "lucide-react";

const reviews = [
  { name: "Алексей М.", role: "Разработчик", text: "Перешёл с WireGuard — разница в скорости колоссальная. Reality невидим для провайдера. Настроил на AX3000T — летает!", rating: 5 },
  { name: "Мария К.", role: "Фрилансер", text: "Поддержка помогла настроить на Keenetic за 15 минут. Вся семья пользуется — YouTube без тормозов.", rating: 5 },
  { name: "Дмитрий С.", role: "Сисадмин", text: "Полгода без обрывов. 400+ Мбит/с через tproxy. Автовыдача ключей — не нужно ждать.", rating: 5 },
  { name: "Екатерина П.", role: "Предприниматель", text: "Семейный тариф. iPhone за 2 минуты через QR-код в Hiddify. Работает идеально.", rating: 5 },
];

const ReviewsSection = () => (
  <section className="py-16 lg:py-24 bg-secondary/30">
    <div className="section-container">
      <div className="section-heading">
        <span className="section-label">Отзывы</span>
        <h2>Что говорят пользователи</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mobile-hscroll">
        {reviews.map((r, i) => (
          <div key={r.name} className="flex flex-col animate-slide-up" style={{ animationDelay: `${i * 100}ms` }}>
            <Quote className="h-6 w-6 text-accent/40 mb-4" />
            <p className="text-sm leading-relaxed text-muted-foreground flex-1 mb-5">{r.text}</p>
            <div className="premium-divider mb-4" />
            <div>
              <div className="flex items-center gap-0.5 mb-1.5">
                {Array.from({ length: r.rating }).map((_, j) => (
                  <Star key={j} className="h-3.5 w-3.5 text-accent" fill="currentColor" />
                ))}
              </div>
              <div className="text-sm font-semibold text-foreground">{r.name}</div>
              <div className="text-xs text-muted-foreground">{r.role}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default ReviewsSection;
