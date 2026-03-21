import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import { tariffService } from "@/api/services";
import type { Tariff } from "@/api/types";

/* ── Tariff card styling ─────────────────────────── */

function getTariffCardStyle(tariff: Tariff) {
  const name = tariff.name.toLowerCase();

  if (name === "trial" || name.includes("пробн")) {
    return {
      icon: "\uD83C\uDF1F",
      iconStyle: "bg-white/5 border border-white/[0.15]",
      priceColor: "text-white",
      currencyColor: "text-white",
      badge: { text: "Бесплатно", style: "bg-white/10 border border-white/20 text-white/70" },
      featured: false,
      ctaStyle:
        "bg-white/[0.06] border border-white/[0.15] text-white/50 hover:bg-white/10 hover:text-white hover:border-white/[0.15]",
      ctaText: "Попробовать",
    };
  }

  if (name === "ultra") {
    return {
      icon: "\u26A1",
      iconStyle: "bg-[#00ff88]/10 border border-[#00ff88]/25",
      priceColor: "text-[#00ff88]",
      currencyColor: "text-[#00ff88]",
      badge: { text: "\u2B50 Популярный", style: "bg-[#00ff88]/[0.15] border border-[#00ff88]/40 text-[#00ff88]" },
      featured: true,
      ctaStyle:
        "bg-[#00ff88] text-[#040d08] font-bold shadow-[0_0_20px_rgba(0,255,136,0.35)] hover:bg-[#00ffaa] hover:shadow-[0_0_30px_rgba(0,255,136,0.5)] hover:-translate-y-px",
      ctaText: "Подключить \u2192",
    };
  }

  if (name === "lte") {
    return {
      icon: "\uD83D\uDD10",
      iconStyle: "bg-[#00cfff]/10 border border-[#00cfff]/25",
      priceColor: "text-[#00cfff]",
      currencyColor: "text-[#00cfff]",
      badge: { text: "Выгодный", style: "bg-[#00cfff]/[0.12] border border-[#00cfff]/35 text-[#00cfff]" },
      featured: false,
      ctaStyle:
        "bg-[#00cfff]/[0.12] border border-[#00cfff]/40 text-[#00cfff] hover:bg-[#00cfff]/20 hover:shadow-[0_0_20px_rgba(0,207,255,0.2)]",
      ctaText: "Подключить",
    };
  }

  if (name === "router" || name.includes("роутер")) {
    return {
      icon: "\uD83D\uDCE1",
      iconStyle: "bg-[#b088ff]/10 border border-[#b088ff]/25",
      priceColor: "text-[#b088ff]",
      currencyColor: "text-[#b088ff]",
      badge: { text: "Роутер", style: "bg-[#b088ff]/[0.12] border border-[#b088ff]/35 text-[#b088ff]" },
      featured: false,
      ctaStyle:
        "bg-[#b088ff]/10 border border-[#b088ff]/35 text-[#b088ff] hover:bg-[#b088ff]/[0.18]",
      ctaText: "Подключить",
    };
  }

  // Default
  return {
    icon: "\uD83D\uDEE1\uFE0F",
    iconStyle: "bg-white/5 border border-white/[0.15]",
    priceColor: "text-white",
    currencyColor: "text-white",
    badge: null,
    featured: false,
    ctaStyle:
      "bg-white/[0.06] border border-white/[0.15] text-white/50 hover:bg-white/10 hover:text-white hover:border-white/[0.15]",
    ctaText: "Подключить",
  };
}

function buildTariffFeatures(tariff: Tariff): { text: string; enabled: boolean; highlight?: string; checkColor?: string }[] {
  const features: { text: string; enabled: boolean; highlight?: string; checkColor?: string }[] = [];

  features.push({ text: "VLESS + Reality протокол", enabled: true });

  if (tariff.device_limit !== null && tariff.device_limit !== undefined) {
    features.push({ text: "одновременно", enabled: true, highlight: tariff.device_limit === 1 ? "1 устройство" : `${tariff.device_limit} устройств` });
  } else {
    features.push({ text: "Безлимит устройств", enabled: true });
  }

  if (tariff.traffic_limit_gb !== null && tariff.traffic_limit_gb !== undefined) {
    features.push({ text: `${tariff.traffic_limit_gb} ГБ трафика`, enabled: true });
  } else {
    features.push({ text: "Безлимитный трафик", enabled: true });
  }

  const durationText =
    tariff.duration_days === 3
      ? "3 дня доступа"
      : tariff.duration_days === 30
      ? "30 дней доступа"
      : tariff.duration_days === 360
      ? "360 дней доступа"
      : `${tariff.duration_days} дней доступа`;
  features.push({ text: durationText, enabled: true });

  if (tariff.configurable) {
    const style = getTariffCardStyle(tariff);
    features.push({
      text: "Гибкая настройка параметров",
      enabled: true,
      checkColor: style.featured ? "text-[#00ff88]" : undefined,
    });
  }

  if (tariff.price_rub === 0 || tariff.price_rub === null) {
    features.push({ text: "Без оплаты", enabled: true });
  }

  return features;
}

function formatTariffPrice(tariff: Tariff): { price: string; suffix: string } {
  if (tariff.price_rub === null || tariff.price_rub === 0) {
    return { price: "0", suffix: "" };
  }
  if (tariff.duration_days === 30) {
    return { price: String(tariff.price_rub), suffix: "/мес" };
  }
  if (tariff.duration_days === 360) {
    return { price: String(tariff.price_rub), suffix: "/год" };
  }
  return { price: String(tariff.price_rub), suffix: ` / ${tariff.duration_days} дн.` };
}

const faqItems = [
  {
    q: "Можно ли сменить тариф в любое время?",
    a: "Да, смена тарифа доступна в любой момент через личный кабинет. Переход на более высокий тариф происходит немедленно, разница в стоимости рассчитывается пропорционально.",
  },
  {
    q: "Работает ли VPN на роутере?",
    a: "Да, VLESS + Reality работает на роутерах с OpenWrt. В блоге есть подробные гайды по настройке на Xiaomi AX3000T и других моделях.",
  },
  {
    q: "Как работает гарантия возврата?",
    a: "Если сервис вам не подойдёт в течение 30 дней — напишите в поддержку, и мы вернём деньги без лишних вопросов. Гарантия действует для всех тарифов.",
  },
  {
    q: "Какие способы оплаты принимаются?",
    a: "Принимаем банковские карты (Visa, МИР, МастерКард), SBP, криптовалюту (USDT, BTC) и ЮMoney. Все платежи обрабатываются безопасно.",
  },
  {
    q: "Хранятся ли логи активности?",
    a: "Нет. Мы придерживаемся строгой политики no-logs: никакие данные о вашей интернет-активности не собираются и не хранятся на серверах.",
  },
  {
    q: "Подходит ли сервис для обхода блокировок?",
    a: "Да, протоколы VLESS + Reality и Hysteria 2 разработаны специально для обхода DPI-систем. Трафик маскируется под обычный HTTPS, что делает его крайне трудным для детектирования.",
  },
];

/* ── Main Page Component ──────────────────────────── */

const ServicesPage = () => {
  const [tariffs, setTariffs] = useState<Tariff[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    tariffService
      .list()
      .then((data) => setTariffs(data))
      .catch(() => setTariffs([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <PageLayout>
      {/* ── BREADCRUMB ── */}
      <div className="px-6 sm:px-12 pt-[18px] flex items-center gap-2 text-xs text-white/25">
        <Link to="/" className="text-[#00ff88] font-medium hover:underline">
          Главная
        </Link>
        <span>/</span>
        <span className="text-white/45">Тарифы</span>
      </div>

      {/* ── PAGE CONTENT ── */}
      <div className="px-6 sm:px-12 pt-9 pb-20 max-w-[1400px] relative z-[1]">
        {/* ── Trust strip ── */}
        <div className="bg-[rgba(0,0,0,0.3)] shadow-glow border border-white/[0.15] rounded-2xl p-7 sm:px-9 grid grid-cols-2 md:grid-cols-4 gap-6 mb-14 text-center mobile-hscroll">
          <div>
            <div className="text-2xl font-black text-[#00ff88] mb-1" style={{ fontFamily: "'Unbounded', sans-serif" }}>99.9%</div>
            <div className="text-[11px] text-[#e8f0e8]/45 tracking-[0.5px]">UPTIME SLA</div>
          </div>
          <div>
            <div className="text-2xl font-black text-white mb-1" style={{ fontFamily: "'Unbounded', sans-serif" }}>No-logs</div>
            <div className="text-[11px] text-[#e8f0e8]/45 tracking-[0.5px]">Политика конфиденциальности</div>
          </div>
          <div>
            <div className="text-2xl font-black text-[#00cfff] mb-1" style={{ fontFamily: "'Unbounded', sans-serif" }}>3 страны</div>
            <div className="text-[11px] text-[#e8f0e8]/45 tracking-[0.5px]">Локации серверов</div>
          </div>
          <div>
            <div className="text-2xl font-black text-[#00ff88] mb-1" style={{ fontFamily: "'Unbounded', sans-serif" }}>30 дней</div>
            <div className="text-[11px] text-[#e8f0e8]/45 tracking-[0.5px]">Гарантия возврата</div>
          </div>
        </div>

        {/* ── Plans grid ── */}
        {loading ? (
          <div className="flex items-center justify-center py-20 mb-14">
            <div className="text-white/25 text-sm">Загрузка тарифов...</div>
          </div>
        ) : tariffs.length === 0 ? (
          <div className="flex items-center justify-center py-20 mb-14">
            <div className="text-white/25 text-sm">Тарифы временно недоступны</div>
          </div>
        ) : (
          <div
            className={`grid gap-5 mb-14 mobile-hscroll grid-cols-1 ${
              tariffs.length === 2
                ? "md:grid-cols-2"
                : tariffs.length === 3
                ? "md:grid-cols-2 lg:grid-cols-3"
                : "md:grid-cols-2 lg:grid-cols-4"
            }`}
          >
            {tariffs.map((tariff) => {
              const style = getTariffCardStyle(tariff);
              const features = buildTariffFeatures(tariff);
              const { price, suffix } = formatTariffPrice(tariff);

              return (
                <div
                  key={tariff.id}
                  className={`bg-[rgba(0,0,0,0.3)] shadow-glow border rounded-[20px] overflow-hidden transition-all duration-[250ms] relative flex flex-col group
                    ${
                      style.featured
                        ? "border-[#00ff88]/35 shadow-[0_0_40px_rgba(0,255,136,0.1)] hover:border-[#00ff88] hover:shadow-[0_16px_60px_rgba(0,0,0,0.5),0_0_50px_rgba(0,255,136,0.18)]"
                        : "border-white/[0.15] hover:border-[#00ff88]/20 hover:shadow-[0_12px_40px_rgba(0,0,0,0.5),0_0_24px_rgba(0,255,136,0.06)]"
                    }
                    hover:-translate-y-1`}
                >
                  {/* Glow bar for featured */}
                  {style.featured && (
                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#00ff88] to-transparent" />
                  )}

                  {/* Header */}
                  <div className="p-7 pb-6 border-b border-white/[0.15] relative">
                    {style.badge && (
                      <div
                        className={`absolute top-[18px] right-[18px] font-mono text-[9px] font-bold px-2.5 py-1 rounded-md tracking-[1px] uppercase ${style.badge.style}`}
                      >
                        {style.badge.text}
                      </div>
                    )}
                    <div
                      className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 text-xl ${style.iconStyle}`}
                    >
                      {style.icon}
                    </div>
                    <div className="text-base font-bold text-white mb-1.5" style={{ fontFamily: "'Unbounded', sans-serif" }}>{tariff.name}</div>
                    {tariff.configurable && (
                      <div
                        className="inline-block font-mono text-[8px] font-bold tracking-wider uppercase px-[8px] py-[2px] rounded-[4px] text-[#ffaa00] mb-1.5"
                        style={{ background: "rgba(255,170,0,0.12)", border: "1px solid rgba(255,170,0,0.35)" }}
                      >
                        Настраиваемый
                      </div>
                    )}

                    {/* Price */}
                    <div className="mt-5 flex items-baseline gap-1.5">
                      <span className={`text-base font-bold pt-1.5 ${style.currencyColor}`} style={{ fontFamily: "'Unbounded', sans-serif" }}>
                        {"\u20BD"}
                      </span>
                      <span className={`text-[34px] font-black leading-none ${style.priceColor}`} style={{ fontFamily: "'Unbounded', sans-serif" }}>
                        {price}
                      </span>
                      {suffix && (
                        <span className="text-[11px] text-white/25 ml-0.5">{suffix}</span>
                      )}
                    </div>
                  </div>

                  {/* Features */}
                  <div className="px-7 py-6 flex-1">
                    {features.map((f, i) => (
                      <div
                        key={i}
                        className={`flex items-start gap-2.5 text-[13px] leading-relaxed mb-3.5 last:mb-0 ${
                          f.enabled ? "text-white/45" : "text-white/25"
                        }`}
                      >
                        <span className={`shrink-0 text-sm mt-px ${f.enabled ? f.checkColor || "text-white/45" : "text-white/25"}`}>
                          {f.enabled ? "\u2713" : "\u2014"}
                        </span>
                        <span>
                          {f.highlight ? (
                            <>
                              <strong className="text-white">{f.highlight}</strong> {f.text}
                            </>
                          ) : (
                            f.text
                          )}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <div className="px-7 pb-7">
                    <Link
                      to="/login"
                      className={`block w-full text-center py-[13px] rounded-[10px] text-sm font-bold no-underline transition-all ${style.ctaStyle}`}
                    >
                      {tariff.price_rub === 0 || tariff.price_rub === null ? "Попробовать бесплатно" : style.ctaText}
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ── Comparison table ── */}
        {!loading && tariffs.length > 0 && (
          <div className="mb-14">
            <h2 className="text-xl font-bold text-white mb-1.5" style={{ fontFamily: "'Unbounded', sans-serif" }}>
              Детальное <span className="text-[#00ff88]">сравнение</span>
            </h2>
            <p className="text-[13px] text-white/25 font-light mb-6">
              Что включает каждый тарифный план
            </p>

            {/* Desktop table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full bg-[rgba(0,0,0,0.3)] shadow-glow border border-white/[0.15] rounded-2xl overflow-hidden border-collapse">
                <thead>
                  <tr>
                    <th className="text-left w-[30%] px-5 py-3.5 text-[11px] font-bold text-white/25 tracking-[1px] uppercase bg-[#243750] border-b border-white/[0.15]" style={{ fontFamily: "'Unbounded', sans-serif" }}>
                      Параметр
                    </th>
                    {tariffs.map((t) => {
                      const s = getTariffCardStyle(t);
                      return (
                        <th
                          key={t.id}
                          className={`px-5 py-3.5 text-center text-[11px] font-bold tracking-[1px] uppercase border-b border-white/[0.15] ${
                            s.featured
                              ? "text-[#00ff88] bg-[#00ff88]/5 border-l border-l-[#00ff88]/[0.15] border-r border-r-[#00ff88]/[0.15]"
                              : "text-white/25 bg-[#243750]"
                          }`}
                          style={{ fontFamily: "'Unbounded', sans-serif" }}
                        >
                          {t.name}
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody>
                  {/* Price row */}
                  <tr className="group/row">
                    <td className="text-left px-5 py-3.5 text-[13px] text-white/45 font-medium border-b border-white/[0.15]">
                      Цена
                    </td>
                    {tariffs.map((t) => {
                      const s = getTariffCardStyle(t);
                      const { price: p, suffix: sf } = formatTariffPrice(t);
                      return (
                        <td
                          key={t.id}
                          className={`text-center px-5 py-3.5 text-[13px] border-b border-white/[0.15] ${
                            s.featured ? "bg-[#00ff88]/[0.03] border-l border-l-[#00ff88]/10 border-r border-r-[#00ff88]/10" : ""
                          }`}
                        >
                          <span className="text-[#ffaa00] text-xs font-mono">{p}{"\u20BD"}{sf}</span>
                        </td>
                      );
                    })}
                  </tr>
                  {/* Duration row */}
                  <tr className="group/row">
                    <td className="text-left px-5 py-3.5 text-[13px] text-white/45 font-medium border-b border-white/[0.15]">
                      Срок действия
                    </td>
                    {tariffs.map((t) => {
                      const s = getTariffCardStyle(t);
                      return (
                        <td
                          key={t.id}
                          className={`text-center px-5 py-3.5 text-[13px] border-b border-white/[0.15] ${
                            s.featured ? "bg-[#00ff88]/[0.03] border-l border-l-[#00ff88]/10 border-r border-r-[#00ff88]/10" : ""
                          }`}
                        >
                          <span className="text-[#ffaa00] text-xs font-mono">{t.duration_days} дн.</span>
                        </td>
                      );
                    })}
                  </tr>
                  {/* Devices row */}
                  <tr className="group/row">
                    <td className="text-left px-5 py-3.5 text-[13px] text-white/45 font-medium border-b border-white/[0.15]">
                      Устройства
                    </td>
                    {tariffs.map((t) => {
                      const s = getTariffCardStyle(t);
                      return (
                        <td
                          key={t.id}
                          className={`text-center px-5 py-3.5 text-[13px] border-b border-white/[0.15] ${
                            s.featured ? "bg-[#00ff88]/[0.03] border-l border-l-[#00ff88]/10 border-r border-r-[#00ff88]/10" : ""
                          }`}
                        >
                          <span className="text-[#ffaa00] text-xs font-mono">
                            {t.device_limit !== null && t.device_limit !== undefined ? t.device_limit : "\u221E"}
                          </span>
                        </td>
                      );
                    })}
                  </tr>
                  {/* Traffic row */}
                  <tr className="group/row">
                    <td className="text-left px-5 py-3.5 text-[13px] text-white/45 font-medium border-b border-white/[0.15]">
                      Трафик
                    </td>
                    {tariffs.map((t) => {
                      const s = getTariffCardStyle(t);
                      return (
                        <td
                          key={t.id}
                          className={`text-center px-5 py-3.5 text-[13px] border-b border-white/[0.15] ${
                            s.featured ? "bg-[#00ff88]/[0.03] border-l border-l-[#00ff88]/10 border-r border-r-[#00ff88]/10" : ""
                          }`}
                        >
                          <span className="text-[#ffaa00] text-xs font-mono">
                            {t.traffic_limit_gb !== null && t.traffic_limit_gb !== undefined ? `${t.traffic_limit_gb} ГБ` : "\u221E"}
                          </span>
                        </td>
                      );
                    })}
                  </tr>
                  {/* Configurable row */}
                  <tr className="group/row">
                    <td className="text-left px-5 py-3.5 text-[13px] text-white/45 font-medium border-b border-white/[0.15]">
                      Настраиваемый
                    </td>
                    {tariffs.map((t) => {
                      const s = getTariffCardStyle(t);
                      return (
                        <td
                          key={t.id}
                          className={`text-center px-5 py-3.5 text-[13px] border-b border-white/[0.15] ${
                            s.featured ? "bg-[#00ff88]/[0.03] border-l border-l-[#00ff88]/10 border-r border-r-[#00ff88]/10" : ""
                          }`}
                        >
                          {t.configurable ? (
                            <span className="text-[#00ff88] text-base">{"\u2713"}</span>
                          ) : (
                            <span className="text-white/25 text-base">{"\u2014"}</span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                  {/* VLESS + Reality row */}
                  <tr className="group/row">
                    <td className="text-left px-5 py-3.5 text-[13px] text-white/45 font-medium border-b border-white/[0.15]">
                      VLESS + Reality
                    </td>
                    {tariffs.map((t) => {
                      const s = getTariffCardStyle(t);
                      return (
                        <td
                          key={t.id}
                          className={`text-center px-5 py-3.5 text-[13px] border-b border-white/[0.15] ${
                            s.featured ? "bg-[#00ff88]/[0.03] border-l border-l-[#00ff88]/10 border-r border-r-[#00ff88]/10" : ""
                          }`}
                        >
                          <span className="text-[#00ff88] text-base">{"\u2713"}</span>
                        </td>
                      );
                    })}
                  </tr>
                  {/* No-logs row */}
                  <tr className="group/row">
                    <td className="text-left px-5 py-3.5 text-[13px] text-white/45 font-medium">
                      No-logs политика
                    </td>
                    {tariffs.map((t) => {
                      const s = getTariffCardStyle(t);
                      return (
                        <td
                          key={t.id}
                          className={`text-center px-5 py-3.5 text-[13px] ${
                            s.featured ? "bg-[#00ff88]/[0.03] border-l border-l-[#00ff88]/10 border-r border-r-[#00ff88]/10" : ""
                          }`}
                        >
                          <span className="text-[#00ff88] text-base">{"\u2713"}</span>
                        </td>
                      );
                    })}
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Mobile comparison cards */}
            <div className="md:hidden space-y-3">
              {[
                { label: "Цена", render: (t: Tariff) => { const { price: p, suffix: sf } = formatTariffPrice(t); return `${p}\u20BD${sf}`; } },
                { label: "Срок действия", render: (t: Tariff) => `${t.duration_days} дн.` },
                { label: "Устройства", render: (t: Tariff) => t.device_limit !== null && t.device_limit !== undefined ? String(t.device_limit) : "\u221E" },
                { label: "Трафик", render: (t: Tariff) => t.traffic_limit_gb !== null && t.traffic_limit_gb !== undefined ? `${t.traffic_limit_gb} ГБ` : "\u221E" },
                { label: "Настраиваемый", render: (t: Tariff) => t.configurable ? "\u2713" : "\u2014" },
              ].map((row) => (
                <div
                  key={row.label}
                  className="bg-[rgba(0,0,0,0.3)] shadow-glow border border-white/[0.15] rounded-xl p-4"
                >
                  <div className="text-xs text-white/45 font-medium mb-2">{row.label}</div>
                  <div className={`grid gap-2 text-center`} style={{ gridTemplateColumns: `repeat(${tariffs.length}, 1fr)` }}>
                    {tariffs.map((t) => {
                      const s = getTariffCardStyle(t);
                      return (
                        <div key={t.id} className={s.featured ? "bg-[#00ff88]/[0.03] rounded-lg py-1" : ""}>
                          <div className={`text-[10px] mb-1 ${s.featured ? "text-[#00ff88]" : "text-white/25"}`}>{t.name}</div>
                          <span className="text-[#ffaa00] text-xs font-mono">{row.render(t)}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── FAQ ── */}
        <div className="mb-14">
          <h2 className="text-xl font-bold text-white mb-1.5" style={{ fontFamily: "'Unbounded', sans-serif" }}>
            Частые <span className="text-[#00ff88]">вопросы</span>
          </h2>
          <p className="text-[13px] text-white/25 font-light mb-6">
            Ответы на самые распространённые вопросы о тарифах
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {faqItems.map((item, i) => (
              <div
                key={i}
                className="bg-[rgba(0,0,0,0.3)] shadow-glow border border-white/[0.15] rounded-[14px] px-[22px] py-5 transition-all hover:border-[#00ff88]/20 hover:bg-[rgba(0,0,0,0.3)]/90 cursor-pointer"
              >
                <div className="text-[13px] font-semibold text-white mb-2 flex items-start justify-between gap-3">
                  <span>{item.q}</span>
                  <span className="text-[#00ff88] text-xs shrink-0 mt-0.5">{"\u2197"}</span>
                </div>
                <div className="text-xs text-white/45 leading-[1.7] font-light">{item.a}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default ServicesPage;
