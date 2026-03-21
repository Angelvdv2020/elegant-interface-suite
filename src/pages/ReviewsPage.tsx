import { useState } from "react";
import PageLayout from "@/components/PageLayout";
import { Star, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

const reviews = [
  { name: "Алексей М.", date: "15 мар 2026", text: "Перешёл с WireGuard — разница в скорости колоссальная. Reality невидим для провайдера. Настроил на AX3000T — летает!", rating: 5 },
  { name: "Мария К.", date: "12 мар 2026", text: "Поддержка помогла настроить на Keenetic за 15 минут. Вся семья пользуется — YouTube без тормозов.", rating: 5 },
  { name: "Дмитрий С.", date: "10 мар 2026", text: "Полгода без обрывов. 400+ Мбит/с через tproxy. Автовыдача ключей — кайф.", rating: 5 },
  { name: "Екатерина П.", date: "8 мар 2026", text: "Семейный тариф. iPhone за 2 минуты через QR в Hiddify. Работает идеально.", rating: 5 },
  { name: "Иван Л.", date: "5 мар 2026", text: "Наконец-то VPN который не режет скорость. 500+ Мбит/с на MT7986A. Подключил всю квартиру.", rating: 5 },
  { name: "Ольга Т.", date: "2 мар 2026", text: "Простая регистрация, ключ за минуту. Даже бабушка смогла подключить через QR-код.", rating: 5 },
  { name: "Сергей В.", date: "28 фев 2026", text: "Третий VPN за год, этот единственный не блокируется. Reality — будущее обхода блокировок.", rating: 4 },
  { name: "Анна Р.", date: "25 фев 2026", text: "Реферальная программа топ. Пригласила 5 друзей — подписка окупается бонусами.", rating: 5 },
];

const ReviewsPage = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <PageLayout>
      <section className="section-dark py-10 lg:py-14">
        <div className="section-container">
          <div className="section-heading">
            <span className="section-label">Отзывы</span>
            <h2>Что говорят пользователи</h2>
            <p>Реальные отзывы клиентов NorthlineVPN</p>
          </div>
          <div className="text-center mb-6">
            <Button variant="cta" onClick={() => setShowForm(true)}>Оставить отзыв</Button>
          </div>
          <div className="card-grid-3">
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
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-foreground">{r.name}</span>
                    <span className="text-[10px] text-muted-foreground">{r.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-xl border border-border bg-card shadow-glow p-6">
            <h3 className="text-lg font-bold mb-4">Оставить отзыв</h3>
            <div className="space-y-3">
              <Input placeholder="Ваше имя" className="min-h-[48px]" />
              <Textarea placeholder="Ваш отзыв..." rows={4} />
              <div className="flex gap-2">
                <Button variant="cta" className="flex-1 min-h-[48px]">Отправить</Button>
                <Button variant="outline" className="min-h-[48px]" onClick={() => setShowForm(false)}>Отмена</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </PageLayout>
  );
};

export default ReviewsPage;
