import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { tariffService } from "@/api/services";
import type { Tariff } from "@/api/types";
import { MessageCircle } from "lucide-react";

const referralLevels = [
  { pct: "5%", level: "Уровень 1", desc: "от платежей тех, кого пригласили вы", pctColor: "text-[#00ff88]" },
  { pct: "3%", level: "Уровень 2", desc: "от платежей приглашённых 2-го уровня", pctColor: "text-[#00cfff]" },
  { pct: "1%", level: "Уровень 3", desc: "от платежей приглашённых 3-го уровня", pctColor: "text-[#e8f0e8]/[0.72]" },
];

function isRouter(t: Tariff) {
  const n = t.name.toLowerCase();
  return n === "router" || n.includes("роутер") || n.includes("router");
}

function getAccent(tariff: Tariff) {
  const n = tariff.name.toLowerCase();
  if (n === "trial" || n.includes("пробн")) return { color: "#e8f0e8", bg: "rgba(255,255,255,0.06)", border: "rgba(255,255,255,0.15)" };
  if (n === "ultra") return { color: "#00ff88", bg: "rgba(0,255,136,0.08)", border: "rgba(0,255,136,0.35)" };
  if (n === "lte") return { color: "#00cfff", bg: "rgba(0,207,255,0.08)", border: "rgba(0,207,255,0.3)" };
  if (isRouter(tariff)) return { color: "#b088ff", bg: "rgba(176,136,255,0.08)", border: "rgba(176,136,255,0.25)" };
  return { color: "#00ff88", bg: "rgba(0,255,136,0.06)", border: "rgba(255,255,255,0.12)" };
}

function getDisplayName(t: Tariff): string {
  const n = t.name.toLowerCase();
  if (n === "trial" || n.includes("пробн")) return "Пробный период";
  if (n === "ultra") return "🚀 Ultra";
  if (n === "lte") return "📶 LTE";
  if (isRouter(t)) return "🛰 Router";
  return t.name;
}

function getBadge(t: Tariff): string {
  const n = t.name.toLowerCase();
  if (n === "trial" || n.includes("пробн")) return "Бесплатно";
  if (n === "ultra") return "Популярный";
  return "";
}

function buildDesc(t: Tariff): string[] {
  const n = t.name.toLowerCase();

  if (n === "trial" || n.includes("пробн")) {
    return ["1 устройство", "Безлимитный трафик", "3 дня", "VLESS + Reality"];
  }
  if (n === "ultra") {
    return ["5 устройств", "Безлимитный трафик", "30 дней", "VLESS + Reality", "Настраиваемый"];
  }
  if (n === "lte") {
    return ["Безлимитный трафик", "Срок — бессрочно", "Оплата только за трафик", "VLESS + Reality"];
  }

  // Router — определяем вариант по цене
  if (isRouter(t)) {
    if (t.price_rub && t.price_rub >= 800) {
      return ["1 сервер", "Безлимитный трафик", "30 дней", "VLESS + Reality", "Настраиваемый тариф"];
    }
    return ["1 устройство", "Безлимитный трафик", "30 дней", "VLESS + Reality", "Настраиваемый тариф"];
  }

  // Fallback из API
  const f: string[] = [];
  if (t.device_limit != null) f.push(t.device_limit === 1 ? "1 устройство" : `${t.device_limit} устройств`);
  if (t.traffic_limit_gb != null) f.push(`${t.traffic_limit_gb} ГБ`); else f.push("Безлимитный трафик");
  f.push(`${t.duration_days} дней`);
  f.push("VLESS + Reality");
  if (t.configurable) f.push("Настраиваемый");
  return f;
}

function fmtPrice(t: Tariff): { price: string; sub: string } {
  const n = t.name.toLowerCase();
  if (n === "trial" || n.includes("пробн")) return { price: "0 ₽", sub: "" };
  if (n === "ultra") return { price: "350 ₽", sub: "/мес" };
  if (n === "lte") return { price: "3 ₽", sub: "/ 1 ГБ" };
  if (isRouter(t)) {
    if (t.price_rub && t.price_rub >= 800) return { price: "1 000 ₽", sub: "/мес" };
    return { price: "300 ₽", sub: "/мес" };
  }
  if (t.price_rub === null || t.price_rub === 0) return { price: "0 ₽", sub: "" };
  if (t.duration_days === 30) return { price: `${t.price_rub} ₽`, sub: "/мес" };
  if (t.duration_days === 360) return { price: `${t.price_rub} ₽`, sub: "/год" };
  return { price: `${t.price_rub} ₽`, sub: `/ ${t.duration_days} дн.` };
}

const PricingSection = () => {
  const [tariffs, setTariffs] = useState<Tariff[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    tariffService.list().then(setTariffs).catch(() => setTariffs([])).finally(() => setLoading(false));
  }, []);

  return (
    <section id="pricing" className="relative py-10 lg:py-14">
      <div className="section-container">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-muted-foreground text-sm">Загрузка тарифов...</div>
          </div>
        ) : tariffs.length === 0 ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-muted-foreground text-sm">Тарифы временно недоступны</div>
          </div>
        ) : (
          <div className={`grid gap-4 grid-cols-1 sm:grid-cols-2 mb-14 ${
            tariffs.length <= 3 ? "lg:grid-cols-3" :
            tariffs.length === 4 ? "lg:grid-cols-2 xl:grid-cols-4" :
            "lg:grid-cols-3 xl:grid-cols-" + Math.min(tariffs.length, 5)
          }`}>
            {tariffs.map((tariff) => {
              const a = getAccent(tariff);
              const desc = buildDesc(tariff);
              const { price, sub } = fmtPrice(tariff);
              const badge = getBadge(tariff);
              const displayName = getDisplayName(tariff);
              const isPopular = tariff.name.toLowerCase() === "ultra";
              const isRouterTariff = isRouter(tariff);

              return (
                <div
                  key={tariff.id}
                  className="relative rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 flex flex-col"
                  style={{ background: "rgba(0,0,0,0.35)", border: `1px solid ${a.border}` }}
                >
                  {/* Цена крупно */}
                  <div
                    className="flex flex-col items-center justify-center py-8 px-4"
                    style={{ background: a.bg, borderBottom: `1px solid ${a.border}` }}
                  >
                    {badge && (
                      <span
                        className="mb-3 inline-block rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider"
                        style={{ background: a.bg, border: `1px solid ${a.border}`, color: a.color }}
                      >
                        {badge}
                      </span>
                    )}
                    <div className="text-center">
                      <span className="text-[36px] font-black leading-none" style={{ fontFamily: "'Unbounded', sans-serif", color: a.color }}>
                        {price}
                      </span>
                      {sub && <span className="text-xs text-white/40 ml-1">{sub}</span>}
                    </div>
                  </div>

                  {/* Название + описание */}
                  <div className="px-5 pt-5 pb-2">
                    <div className="text-sm font-bold text-white mb-3" style={{ fontFamily: "'Unbounded', sans-serif" }}>
                      {displayName}
                    </div>
                    <div className="space-y-2">
                      {desc.map((d) => (
                        <div key={d} className="flex items-center gap-2.5 text-[12px] text-[#e8f0e8]/70">
                          <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: a.color, opacity: 0.6 }} />
                          {d}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="px-5 pb-5 pt-4 mt-auto">
                    {isRouterTariff ? (
                      <a
                        href="https://t.me/northlinevpn_support"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 w-full text-center py-3 rounded-xl text-xs font-bold no-underline transition-all"
                        style={{ background: a.bg, color: a.color, border: `1px solid ${a.border}` }}
                      >
                        <MessageCircle className="h-3.5 w-3.5" />
                        Связаться с админом
                      </a>
                    ) : (
                      <Link
                        to="/login"
                        className="block w-full text-center py-3 rounded-xl text-xs font-bold no-underline transition-all"
                        style={{
                          background: isPopular ? a.color : a.bg,
                          color: isPopular ? "#040d08" : a.color,
                          border: `1px solid ${a.border}`,
                        }}
                      >
                        {tariff.price_rub === 0 || tariff.price_rub === null ? "Попробовать бесплатно" : "Подключить"}
                      </Link>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Referral */}
        <div className="mb-14">
          <div className="rounded-2xl px-6 py-8 sm:px-9" style={{ background: "rgba(0,0,0,0.35)", border: "1px solid rgba(255,255,255,0.07)" }}>
            <div className="flex items-center gap-3.5 mb-7">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl shrink-0" style={{ background: "rgba(0,255,136,0.08)", border: "1px solid rgba(0,255,136,0.2)" }}>
                🎁
              </div>
              <div>
                <div className="text-base font-bold text-white" style={{ fontFamily: "'Unbounded', sans-serif" }}>Реферальная система</div>
                <div className="text-xs text-[#e8f0e8]/70 mt-1">Приглашайте друзей и получайте процент с каждого их платежа</div>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {referralLevels.map((l) => (
                <div key={l.level} className="rounded-xl px-5 py-6 text-center" style={{ background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.07)" }}>
                  <div className="font-mono text-[10px] font-bold text-[#e8f0e8]/40 tracking-[1.5px] uppercase mb-2">{l.level}</div>
                  <div className={`text-[30px] font-black mb-1.5 ${l.pctColor}`} style={{ fontFamily: "'Unbounded', sans-serif" }}>{l.pct}</div>
                  <div className="text-[11px] text-[#e8f0e8]/40 leading-relaxed">{l.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
