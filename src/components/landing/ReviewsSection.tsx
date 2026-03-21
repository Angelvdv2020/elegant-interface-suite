import { Star, Quote } from "lucide-react";

const reviews = [
  { name: "Алексей М.", role: "Разработчик", text: "Перешёл с WireGuard — разница в скорости колоссальная. Reality невидим для провайдера. Настроил на AX3000T — летает!", rating: 5 },
  { name: "Мария К.", role: "Фрилансер", text: "Поддержка помогла настроить на Keenetic за 15 минут. Вся семья пользуется — YouTube без тормозов.", rating: 5 },
  { name: "Дмитрий С.", role: "Сисадмин", text: "Полгода без обрывов. 400+ Мбит/с через tproxy. Автовыдача ключей — не нужно ждать.", rating: 5 },
  { name: "Екатерина П.", role: "Предприниматель", text: "Семейный тариф. iPhone за 2 минуты через QR-код в Hiddify. Работает идеально.", rating: 5 },
];

const ReviewsSection = () => (
  <section className="section-dark py-10 lg:py-14">
    <div className="section-container">
      <div className="section-heading">
        <span className="section-label">Отзывы</span>
        <h2>Что говорят пользователи</h2>
      </div>
      <div className="card-grid-4 mobile-hscroll">
        {reviews.map((r) => (
          <div key={r.name} className="card-hover p-5 flex flex-col">
            <Quote className="h-5 w-5 text-primary/40 mb-3" />
            <p className="text-sm leading-relaxed text-muted-foreground flex-1 mb-4">{r.text}</p>
            <div>
              <div className="flex items-center gap-0.5 mb-1">
                {Array.from({ length: r.rating }).map((_, j) => (
                  <Star key={j} className="h-3 w-3 text-primary" fill="currentColor" />
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
