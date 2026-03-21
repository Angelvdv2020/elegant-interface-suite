import { CreditCard, Wallet, Bitcoin, Globe, Star } from "lucide-react";

const providers = [
  { name: "ЮKassa", detail: "Карты, СБП", icon: CreditCard },
  { name: "YooMoney", detail: "Кошелёк", icon: Wallet },
  { name: "Robokassa", detail: "Карты", icon: CreditCard },
  { name: "Kassai", detail: "Карты + СБП", icon: CreditCard },
  { name: "CryptoBot", detail: "Крипто (TG)", icon: Bitcoin },
  { name: "Heleket", detail: "Крипто", icon: Bitcoin },
  { name: "Freekassa", detail: "Агрегатор", icon: Globe },
  { name: "Tribute", detail: "RUB/USD", icon: Wallet },
  { name: "TG Stars", detail: "Telegram", icon: Star },
  { name: "Plati.ru", detail: "Маркетплейс", icon: Globe },
];

const PaymentSection = () => (
  <section id="payment" className="py-16 lg:py-24 bg-secondary/30">
    <div className="section-container">
      <div className="section-heading">
        <span className="section-label">Оплата</span>
        <h2>Способы оплаты</h2>
        <p>11 способов оплаты — выберите удобный. Возврат 7 дней.</p>
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {providers.map((p, i) => (
          <div key={p.name} className="flex flex-col items-center gap-2 py-5 rounded-xl bg-background border border-border hover:border-primary/20 hover:shadow-soft transition-all animate-slide-up active:scale-[0.97]" style={{ animationDelay: `${i * 60}ms` }}>
            <p.icon className="h-5 w-5 text-primary/60" />
            <div className="text-xs font-semibold text-foreground">{p.name}</div>
            <div className="text-[10px] text-muted-foreground">{p.detail}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default PaymentSection;
