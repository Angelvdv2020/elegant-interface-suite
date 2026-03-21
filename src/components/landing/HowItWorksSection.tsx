import { UserPlus, CreditCard, Wifi } from "lucide-react";

const steps = [
  { icon: UserPlus, num: "1", title: "Создайте аккаунт", desc: "Через Telegram — один клик. Никаких паспортов и email.", time: "30 сек" },
  { icon: CreditCard, num: "2", title: "Оплатите подписку", desc: "Купон Plati.ru или оплата в боте. Мгновенное зачисление.", time: "1 мин" },
  { icon: Wifi, num: "3", title: "Подключитесь", desc: "Скопируйте ключ, вставьте в приложение — готово.", time: "2 мин" },
];

const HowItWorksSection = () => (
  <section className="section-dark py-10 lg:py-14">
    <div className="section-container">
      <div className="section-heading">
        <span className="section-label">Быстрый старт</span>
        <h2>Как это работает</h2>
        <p>Три простых шага до безопасного интернета</p>
      </div>

      {/* Таймлайн */}
      <div className="relative max-w-4xl mx-auto">
        {/* Линия между шагами — десктоп */}
        <div className="hidden md:block absolute top-[52px] left-[calc(16.67%+28px)] right-[calc(16.67%+28px)] h-px bg-gradient-to-r from-primary/50 via-primary/30 to-primary/50" />

        <div className="grid gap-8 md:grid-cols-3 mobile-hscroll">
          {steps.map((s, i) => (
            <div key={s.num} className="relative flex flex-col items-center text-center">
              {/* Номер с иконкой */}
              <div className="relative mb-5">
                <div className="flex h-[56px] w-[56px] items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/30 shadow-[0_0_20px_rgba(0,255,136,0.15)]">
                  <s.icon className="h-6 w-6 text-primary" />
                </div>
                <div className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-[11px] font-bold text-primary-foreground">
                  {s.num}
                </div>
              </div>

              {/* Контент */}
              <h3 className="text-base font-bold mb-2">{s.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">{s.desc}</p>
              <span className="inline-flex items-center rounded-full bg-primary/10 border border-primary/20 px-3 py-1 text-xs font-medium text-primary">
                {s.time}
              </span>

              {/* Стрелка между шагами — мобайл */}
              {i < steps.length - 1 && (
                <div className="md:hidden mt-4 flex justify-center">
                  <div className="h-6 w-px bg-gradient-to-b from-primary/40 to-transparent" />
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
