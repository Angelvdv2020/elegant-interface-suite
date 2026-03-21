import { ArrowRight } from "lucide-react";

const ReferralSection = () => (
  <section className="section-light py-10 lg:py-14">
    <div className="section-container">
      <div className="section-heading">
        <span className="section-label">Партнёрам</span>
        <h2>Реферальная программа</h2>
        <p>Трёхуровневая система. Получайте процент с каждого платежа приглашённых.</p>
      </div>
      <div className="grid gap-6 lg:grid-cols-2 lg:items-start">
        <div className="space-y-3">
          {[
            { pct: 5, level: 1, desc: "от платежей тех, кого пригласили вы" },
            { pct: 3, level: 2, desc: "от платежей приглашённых 2-го уровня" },
            { pct: 1, level: 3, desc: "от платежей приглашённых 3-го уровня" },
          ].map((l) => (
            <div key={l.level} className="card-hover p-4 flex items-center gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-sm font-bold text-primary">{l.pct}%</div>
              <div>
                <div className="text-sm font-semibold">Уровень {l.level}</div>
                <div className="text-xs text-muted-foreground">{l.desc}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="card-hover p-6">
          <h3 className="text-sm font-semibold text-muted-foreground mb-4">Пример заработка</h3>
          <div className="grid grid-cols-3 gap-3 mb-4">
            {[
              { label: "Приглашённых", value: "12" },
              { label: "Заработано", value: "2 840 ₽" },
              { label: "Активных", value: "8" },
            ].map((s) => (
              <div key={s.label} className="rounded-lg bg-background p-4 text-center">
                <div className="text-xl font-extrabold">{s.value}</div>
                <div className="text-[10px] text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </div>
          <div className="rounded-lg bg-background p-3">
            <div className="text-xs text-muted-foreground mb-1">Ваша реферальная ссылка</div>
            <code className="block truncate rounded border border-border bg-card px-3 py-2 text-xs font-mono text-primary">
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
