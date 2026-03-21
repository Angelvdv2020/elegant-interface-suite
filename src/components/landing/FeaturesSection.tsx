import { useState } from "react";
import { Zap, Lock, Router, KeyRound, MessageCircle, EyeOff, ChevronDown } from "lucide-react";

const features = [
  { icon: Zap, title: "Скорость до 700 Мбит/с", desc: "VLESS с XTLS-Reality на скорости провайдера. Стриминг, игры, скачивание без просадок.", color: "hsl(var(--accent))" },
  { icon: Lock, title: "Невидим для DPI", desc: "Reality маскирует трафик под HTTPS. Провайдер не видит VPN.", color: "hsl(var(--primary))" },
  { icon: Router, title: "VPN на весь дом", desc: "На роутере — все устройства защищены. Smart TV, приставки, IoT.", color: "hsl(var(--accent))" },
  { icon: KeyRound, title: "Ключ за 30 секунд", desc: "Оплатили — ключ в ЛК. QR-код или ссылка для импорта.", color: "hsl(var(--primary))" },
  { icon: EyeOff, title: "Zero-log политика", desc: "Не записываем IP, сайты, трафик. Данных нет на серверах.", color: "hsl(var(--accent))" },
  { icon: MessageCircle, title: "Поддержка 24/7", desc: "Telegram-бот и чат. Настроим на любом устройстве.", color: "hsl(var(--primary))" },
];

const FeaturesSection = () => {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="section-container">
        <div className="section-heading">
          <span className="section-label">Преимущества</span>
          <h2>Почему 50 000+ пользователей выбрали нас</h2>
          <p>Протокол нового поколения, мгновенная настройка и полная анонимность</p>
        </div>

        {/* Desktop */}
        <div className="hidden md:grid grid-cols-3 gap-x-12 gap-y-14 max-w-5xl mx-auto">
          {features.map((f, i) => (
            <div key={f.title} className="group animate-slide-up" style={{ animationDelay: `${i * 80}ms` }}>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl mb-4 transition-transform group-hover:scale-105 active:scale-95"
                style={{ background: `${f.color}15`, border: `1.5px solid ${f.color}30` }}>
                <f.icon className="h-5 w-5" style={{ color: f.color }} />
              </div>
              <h3 className="text-base font-bold text-foreground mb-2">{f.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>

        {/* Mobile accordion */}
        <div className="md:hidden space-y-2">
          {features.map((f, i) => (
            <div key={f.title} className="border-b border-border last:border-b-0">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="flex w-full items-center gap-3 py-4 text-left"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl shrink-0"
                  style={{ background: `${f.color}12`, border: `1px solid ${f.color}20` }}>
                  <f.icon className="h-5 w-5" style={{ color: f.color }} />
                </div>
                <span className="flex-1 text-sm font-bold text-foreground">{f.title}</span>
                <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${open === i ? "rotate-180" : ""}`} />
              </button>
              {open === i && (
                <div className="pb-4 pl-[52px]">
                  <p className="text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
