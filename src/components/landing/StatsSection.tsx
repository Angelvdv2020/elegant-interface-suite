const stats = [
  { value: "50K+", label: "пользователей" },
  { value: "99.9%", label: "аптайм" },
  { value: "700", label: "Мбит/с" },
  { value: "15+", label: "локаций" },
];

const StatsSection = () => (
  <section className="section-dark py-12 lg:py-14">
    <div className="section-container">
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 mobile-hscroll">
        {stats.map((s) => (
          <div key={s.label} className="text-center">
            <div className="text-3xl font-extrabold text-primary sm:text-4xl">{s.value}</div>
            <div className="mt-1 text-sm text-muted-foreground">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default StatsSection;
