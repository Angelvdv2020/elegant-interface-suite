const stats = [
  { value: "50K+", label: "пользователей" },
  { value: "99.9%", label: "аптайм" },
  { value: "700", label: "Мбит/с" },
  { value: "15+", label: "локаций" },
];

const StatsSection = () => (
  <section className="py-12 lg:py-16 border-y border-border bg-background">
    <div className="section-container">
      <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 mobile-hscroll">
        {stats.map((s, i) => (
          <div key={s.label} className="text-center animate-slide-up" style={{ animationDelay: `${i * 100}ms` }}>
            <div className="text-3xl font-extrabold text-gradient-gold sm:text-4xl" style={{ fontFamily: "'Unbounded', sans-serif" }}>{s.value}</div>
            <div className="mt-1.5 text-sm text-muted-foreground">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default StatsSection;
