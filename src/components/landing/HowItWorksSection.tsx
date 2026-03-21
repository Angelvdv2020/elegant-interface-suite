import { UserPlus, CreditCard, Wifi } from "lucide-react";

const steps = [
  { icon: UserPlus, num: "1", title: "Создайте аккаунт", desc: "Через Telegram — один клик. Никаких паспортов и email.", time: "30 сек" },
  { icon: CreditCard, num: "2", title: "Оплатите подписку", desc: "Купон Plati.ru или оплата в боте. Мгновенное зачисление.", time: "1 мин" },
  { icon: Wifi, num: "3", title: "Подключитесь", desc: "Скопируйте ключ, вставьте в приложение — готово.", time: "2 мин" },
];

const HowItWorksSection = () => (
  <section className="py-16 lg:py-24 bg-secondary/30">
    <div className="section-container">
      <div className="section-heading">
        <span className="section-label">Быстрый старт</span>
        <h2>Как это работает</h2>
        <p>Три простых шага до безопасного интернета</p>
      </div>

      <div className="relative max-w-4xl mx-auto">
        {/* Connector line — desktop */}
        <div className="hidden md:block absolute top-[36px] left-[calc(16.67%+32px)] right-[calc(16.67%+32px)] h-px bg-gradient-to-r from-border via-accent/30 to-border" />

        <div className="grid gap-10 md:grid-cols-3 mobile-hscroll">
          {steps.map((s, i) => (
            <div key={s.num} className="relative flex flex-col items-center text-center animate-slide-up" style={{ animationDelay: `${i * 120}ms` }}>
              <div className="relative mb-6">
                <div className="flex h-[64px] w-[64px] items-center justify-center rounded-2xl bg-background border border-border shadow-soft">
                  <s.icon className="h-6 w-6 text-primary" />
                </div>
                <div className="absolute -top-2 -right-2 flex h-7 w-7 items-center justify-center rounded-full bg-accent text-[11px] font-bold text-accent-foreground shadow-gold">
                  {s.num}
                </div>
              </div>

              <h3 className="text-base font-bold text-foreground mb-2">{s.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">{s.desc}</p>
              <span className="inline-flex items-center rounded-full bg-primary/8 border border-primary/15 px-3 py-1 text-xs font-semibold text-primary">
                {s.time}
              </span>

              {i < steps.length - 1 && (
                <div className="md:hidden mt-6 flex justify-center">
                  <div className="h-8 w-px bg-gradient-to-b from-border to-transparent" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default HowItWorksSection;
