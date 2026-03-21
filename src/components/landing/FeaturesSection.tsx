import { useState } from "react";
import { Zap, ShieldCheck, Router, KeyRound, MessageCircle, EyeOff, ChevronDown, UserPlus, CreditCard, Wifi } from "lucide-react";

const features = [
  { icon: Zap, title: "Скорость до 700 Мбит/с", desc: "VLESS с XTLS-Reality на скорости провайдера. Стриминг, игры, скачивание без просадок.", accent: "from-amber-500/20 to-orange-500/10" },
  { icon: ShieldCheck, title: "Невидим для DPI", desc: "Reality маскирует трафик под HTTPS. Провайдер не видит VPN.", accent: "from-emerald-500/20 to-green-500/10" },
  { icon: Router, title: "VPN на весь дом", desc: "На роутере — все устройства защищены. Smart TV, приставки, IoT.", accent: "from-blue-500/20 to-cyan-500/10" },
  { icon: KeyRound, title: "Ключ за 30 секунд", desc: "Оплатили — ключ в ЛК. QR-код или ссылка для импорта.", accent: "from-violet-500/20 to-purple-500/10" },
  { icon: EyeOff, title: "Zero-log политика", desc: "Не записываем IP, сайты, трафик. Данных нет на серверах.", accent: "from-rose-500/20 to-pink-500/10" },
  { icon: MessageCircle, title: "Поддержка 24/7", desc: "Telegram-бот и чат. Настроим на любом устройстве.", accent: "from-sky-500/20 to-indigo-500/10" },
];

const steps = [
  { icon: UserPlus, num: "1", title: "Создайте аккаунт", desc: "Через Telegram — один клик", time: "30 сек" },
  { icon: CreditCard, num: "2", title: "Оплатите", desc: "Купон Plati.ru или бот", time: "1 мин" },
  { icon: Wifi, num: "3", title: "Подключитесь", desc: "Ключ в приложение — готово", time: "2 мин" },
];

const FeaturesSection = () => {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="section-light py-10 lg:py-14">
      <div className="section-container">
        <div className="section-heading">
          <span className="section-label">Преимущества</span>
          <h2>Почему 50 000+ пользователей выбрали нас</h2>
          <p>Протокол нового поколения, мгновенная настройка и полная анонимность</p>
        </div>

        {/* Desktop: единый бенто-грид */}
        <div className="hidden md:grid grid-cols-3 gap-4 max-w-5xl mx-auto">
          {/* 6 фичей */}
          {features.map((f) => (
            <div
              key={f.title}
              className="group relative overflow-hidden rounded-2xl bg-card shadow-glow border border-border/50 p-5 transition-all hover:border-primary/30 hover:shadow-[0_0_30px_rgba(0,255,136,0.08)]"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${f.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              <div className="relative">
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 border border-primary/20 shrink-0">
                    <f.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-sm font-bold text-foreground">{f.title}</h3>
                </div>
                <p className="text-xs leading-relaxed text-muted-foreground">{f.desc}</p>
              </div>
            </div>
          ))}

          {/* 3 шага — третий ряд, как это работает */}
          {steps.map((s) => (
            <div
              key={s.num}
              className="relative overflow-hidden rounded-2xl bg-card shadow-glow border border-primary/20 p-5 transition-all hover:border-primary/40 hover:shadow-[0_0_30px_rgba(0,255,136,0.1)]"
            >
              <div className="absolute top-3 right-4 text-4xl font-black text-primary/8 select-none leading-none">{s.num}</div>
              <div className="relative">
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15 border border-primary/30 shrink-0">
                    <s.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-foreground">{s.title}</h3>
                    <p className="text-xs text-muted-foreground">{s.desc}</p>
                  </div>
                </div>
                <div className="mt-2 inline-flex items-center rounded-full bg-primary/10 border border-primary/20 px-2.5 py-0.5 text-[10px] font-semibold text-primary">
                  {s.time}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile: аккордеон фичей + шаги */}
        <div className="md:hidden space-y-2">
          {features.map((f, i) => (
            <div key={f.title} className="rounded-xl border border-border/50 bg-card shadow-glow overflow-hidden">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="flex w-full items-center gap-3 p-4 text-left"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 border border-primary/20 shrink-0">
                  <f.icon className="h-5 w-5 text-primary" />
                </div>
                <span className="flex-1 text-sm font-bold text-foreground">{f.title}</span>
                <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${open === i ? "rotate-180" : ""}`} />
              </button>
              {open === i && (
                <div className="px-4 pb-4 pt-0">
                  <p className="text-sm leading-relaxed text-muted-foreground pl-[52px]">{f.desc}</p>
                </div>
              )}
            </div>
          ))}

          {/* Шаги — мобайл */}
          <div className="mt-4 pt-4 border-t border-border/30">
            <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-3">Быстрый старт</p>
            <div className="space-y-2">
              {steps.map((s) => (
                <div key={s.num} className="flex items-center gap-3 rounded-xl border border-primary/20 bg-card shadow-glow p-3.5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/15 border border-primary/30 shrink-0">
                    <s.icon className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-bold">{s.title}</div>
                    <div className="text-xs text-muted-foreground">{s.desc}</div>
                  </div>
                  <span className="text-[10px] font-semibold text-primary shrink-0">{s.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
