import { ArrowRight } from "lucide-react";

const ReferralSection = () => (
  <section className="py-16 lg:py-24 bg-background">
    <div className="section-container">
      <div className="section-heading">
        <span className="section-label">Партнёрам</span>
        <h2>Реферальная программа</h2>
        <p>Трёхуровневая система. Получайте процент с каждого платежа приглашённых.</p>
      </div>
      <div className="grid gap-10 lg:grid-cols-2 lg:items-start max-w-5xl mx-auto">
        {/* Levels */}
        <div className="space-y-6">
          {[
            { pct: 5, level: 1, desc: "от платежей тех, кого пригласили вы", color: "hsl(var(--accent))" },
            { pct: 3, level: 2, desc: "от платежей приглашённых 2-го уровня", color: "hsl(var(--primary))" },
            { pct: 1, level: 3, desc: "от платежей приглашённых 3-го уровня", color: "hsl(var(--muted-foreground))" },
          ].map((l, i) => (
            <div key={l.level} className="flex items-center gap-5 animate-slide-in-left" style={{ animationDelay: `${i * 100}ms` }}>
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-lg font-black" style={{ color: l.color, background: `${l.color}10`, border: `1.5px solid ${l.color}25` }}>
                {l.pct}%
              </div>
              <div>
                <div className="text-sm font-bold text-foreground">Уровень {l.level}</div>
                <div className="text-sm text-muted-foreground">{l.desc}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Example earnings */}
        <div className="animate-slide-in-right rounded-2xl border border-border bg-secondary/40 p-6">
          <h3 className="text-sm font-semibold text-muted-foreground mb-5">Пример заработка</h3>
          <div className="grid grid-cols-3 gap-3 mb-5">
            {[
              { label: "Приглашённых", value: "12" },
              { label: "Заработано", value: "2 840 ₽" },
              { label: "Активных", value: "8" },
            ].map((s) => (
              <div key={s.label} className="rounded-xl bg-background border border-border p-4 text-center">
                <div className="text-xl font-extrabold text-foreground">{s.value}</div>
                <div className="text-[10px] text-muted-foreground mt-1">{s.label}</div>
              </div>
            ))}
          </div>
          <div className="rounded-xl bg-background border border-border p-3">
            <div className="text-xs text-muted-foreground mb-1">Ваша реферальная ссылка</div>
            <code className="block truncate rounded-lg border border-border bg-secondary/50 px-3 py-2 text-xs font-mono text-primary">
              northlinevpn.io/ref/a7x2k9m
            </code>
          </div>
          <div className="mt-3 flex items-center gap-1.5 text-xs text-primary font-medium">
            <ArrowRight className="h-3 w-3" /> Подробнее в личном кабинете
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default ReferralSection;
