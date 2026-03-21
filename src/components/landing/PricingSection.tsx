import { Link } from "react-router-dom";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const plans = [
  {
    name: "Starter",
    price: "0 ₽",
    sub: "навсегда",
    desc: "Для пробы и маленьких сайтов",
    features: ["До 3 страниц", "Базовые блоки", "Медиабиблиотека (100 МБ)", "Водяной знак Visually"],
    cta: "Начать бесплатно",
    popular: false,
  },
  {
    name: "Pro",
    price: "1 490 ₽",
    sub: "/мес",
    desc: "Для бизнесов и агентств",
    features: ["Безлимитные страницы", "Все блоки + кастомные", "Медиабиблиотека (10 ГБ)", "История версий", "Публикация по расписанию", "Без водяного знака", "Приоритетная поддержка"],
    cta: "Попробовать 14 дней",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Договорная",
    sub: "",
    desc: "White-label, SSO, SLA",
    features: ["Всё из Pro", "White-label (ваш бренд)", "SSO / SAML", "SDK кастомных блоков", "SLA 99.9%", "Выделенный менеджер"],
    cta: "Связаться",
    popular: false,
  },
];

const PricingSection = () => (
  <section id="pricing" className="py-20 lg:py-28 bg-secondary/30">
    <div className="mx-auto max-w-5xl px-4 sm:px-6">
      <div className="text-center mb-14">
        <div className="text-[11px] font-semibold uppercase tracking-[0.15em] text-brand mb-3">Тарифы</div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-foreground">Простая и прозрачная цена</h2>
        <p className="mt-3 text-sm text-muted-foreground">Начните бесплатно. Масштабируйтесь по мере роста.</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {plans.map((p, i) => (
          <div
            key={p.name}
            className={`relative flex flex-col rounded-xl border bg-background p-6 transition-all hover:-translate-y-0.5 hover:shadow-medium animate-fade-up ${p.popular ? "border-brand shadow-soft" : "border-border"}`}
            style={{ animationDelay: `${i * 100}ms` }}
          >
            {p.popular && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand px-3 py-0.5 text-[10px] font-bold text-brand-light uppercase tracking-wider">
                Популярный
              </span>
            )}
            <div className="mb-4">
              <div className="text-sm font-semibold text-foreground">{p.name}</div>
              <div className="mt-2">
                <span className="text-3xl font-extrabold text-foreground">{p.price}</span>
                {p.sub && <span className="text-sm text-muted-foreground ml-1">{p.sub}</span>}
              </div>
              <div className="text-[12px] text-muted-foreground mt-1">{p.desc}</div>
            </div>

            <div className="space-y-2.5 mb-6 flex-1">
              {p.features.map((f) => (
                <div key={f} className="flex items-start gap-2 text-[13px] text-muted-foreground">
                  <Check className="h-4 w-4 text-success shrink-0 mt-0.5" />
                  {f}
                </div>
              ))}
            </div>

            <Button variant={p.popular ? "default" : "outline"} className="w-full rounded-lg" asChild>
              <Link to="/signup">{p.cta}</Link>
            </Button>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default PricingSection;
