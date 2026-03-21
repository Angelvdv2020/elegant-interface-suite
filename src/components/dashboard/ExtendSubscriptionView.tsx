import { useState, useEffect, useMemo } from "react";
import {
  Loader2, Search, Key as KeyIcon, Clock, Smartphone, Zap, Wifi, Router,
  Calendar, Shield, ChevronRight, AlertTriangle, CheckCircle,
} from "lucide-react";
import { keyService, tariffService, orderService } from "@/api/services";
import type { VpnKey, TariffCalculation } from "@/api/types";

interface Props { onNavigate: (tab: string) => void; }

function getTariffAccent(name?: string) {
  const n = (name || "").toLowerCase();
  if (n === "ultra") return { color: "#a78bfa", bg: "rgba(167,139,250,0.1)", border: "rgba(167,139,250,0.25)", icon: Zap };
  if (n === "lte") return { color: "#00ff88", bg: "rgba(0,255,136,0.08)", border: "rgba(0,255,136,0.2)", icon: Wifi };
  if (n.includes("router") || n.includes("роутер")) return { color: "#60a5fa", bg: "rgba(96,165,250,0.1)", border: "rgba(96,165,250,0.25)", icon: Router };
  return { color: "#00ff88", bg: "rgba(0,255,136,0.08)", border: "rgba(0,255,136,0.2)", icon: KeyIcon };
}

function getStatusStyle(status: string) {
  if (status === "active") return { color: "#00ff88", bg: "rgba(0,255,136,0.1)", label: "Активен" };
  if (status === "frozen") return { color: "#00cfff", bg: "rgba(0,207,255,0.1)", label: "Заморожен" };
  return { color: "#f85149", bg: "rgba(248,81,73,0.1)", label: "Истёк" };
}

const ExtendSubscriptionView = ({ onNavigate }: Props) => {
  const [keys, setKeys] = useState<VpnKey[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [durationMonths, setDurationMonths] = useState(1);
  const [calc, setCalc] = useState<TariffCalculation | null>(null);
  const [calcLoading, setCalcLoading] = useState(false);
  const [orderLoading, setOrderLoading] = useState(false);
  const [orderError, setOrderError] = useState("");
  const [tariffs, setTariffs] = useState<any[]>([]);

  useEffect(() => {
    keyService.list()
      .then(data => { const f = data.filter(k => ["active", "expired", "frozen"].includes(k.status)); setKeys(f); if (f.length > 0) setSelectedId(f[0].client_id); })
      .catch(err => setError(err.message || "Ошибка"))
      .finally(() => setLoading(false));
  }, []);
  useEffect(() => { tariffService.list().then(setTariffs).catch(() => {}); }, []);

  const selectedKey = useMemo(() => keys.find(k => k.client_id === selectedId) || null, [keys, selectedId]);

  useEffect(() => {
    if (!selectedKey) { setCalc(null); return; }
    const tariff = tariffs.find(t => t.name === selectedKey.tariff_name);
    if (!tariff) { setCalc(null); return; }
    const timer = setTimeout(() => {
      setCalcLoading(true);
      tariffService.calculate(tariff.id, selectedKey.device_limit || 1, 0, durationMonths)
        .then(setCalc).catch(() => setCalc(null)).finally(() => setCalcLoading(false));
    }, 300);
    return () => clearTimeout(timer);
  }, [selectedKey, durationMonths, tariffs]);

  const handleOrder = async () => {
    if (!selectedKey) return;
    const tariff = tariffs.find(t => t.name === selectedKey.tariff_name);
    if (!tariff) { setOrderError("Тариф не найден"); return; }
    setOrderLoading(true); setOrderError("");
    try {
      const res = await orderService.create({ tariff_id: tariff.id, devices: selectedKey.device_limit || 1, traffic_gb: 0, duration_months: durationMonths });
      if (res.bot_url) window.open(res.bot_url, "_blank");
    } catch (err: any) { setOrderError(err.message || "Ошибка"); }
    setOrderLoading(false);
  };

  const filtered = useMemo(() => {
    if (!search) return keys;
    return keys.filter(k => (k.alias || "").toLowerCase().includes(search.toLowerCase()) || (k.tariff_name || "").toLowerCase().includes(search.toLowerCase()));
  }, [keys, search]);

  if (loading) return <div className="flex justify-center py-20"><Loader2 className="h-6 w-6 text-[#00ff88] animate-spin" /></div>;
  if (error) return <div className="rounded-[16px] p-8 text-center text-sm" style={{ background: "rgba(248,81,73,0.04)", border: "1px solid rgba(248,81,73,0.2)", color: "#f85149" }}>{error}</div>;
  if (keys.length === 0) return (
    <div className="rounded-[16px] p-12 text-center" style={{ background: "rgba(0,255,136,0.02)", border: "1px solid rgba(0,255,136,0.15)" }}>
      <div className="text-lg font-bold text-white mb-2">Нет подписок для продления</div>
      <p className="text-sm mb-4" style={{ color: "rgba(255,255,255,0.35)" }}>Сначала приобретите подписку</p>
      <button onClick={() => onNavigate("buy")} className="rounded-xl px-6 py-3 text-sm font-bold" style={{ background: "#00ff88", color: "#040d08" }}>Купить подписку</button>
    </div>
  );

  const accent = selectedKey ? getTariffAccent(selectedKey.tariff_name) : getTariffAccent();
  const status = selectedKey ? getStatusStyle(selectedKey.status) : getStatusStyle("");
  const TariffIcon = accent.icon;
  const isExpiring = selectedKey && selectedKey.status === "active" && selectedKey.days_left > 0 && selectedKey.days_left <= 7;
  const durationMax = selectedKey ? Math.max(selectedKey.days_left || 0, 30) : 30;
  const progress = selectedKey && selectedKey.days_left > 0 ? Math.min((selectedKey.days_left / durationMax) * 100, 100) : 0;

  return (
    <div className="grid gap-5 lg:grid-cols-[280px_1fr]">
      {/* ══ LEFT: Key list ══ */}
      <div className="flex flex-col gap-3">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5" style={{ color: "rgba(255,255,255,0.2)" }} />
          <input placeholder="Поиск ключа..." value={search} onChange={e => setSearch(e.target.value)}
            className="w-full rounded-lg pl-9 pr-3 py-2.5 text-[12px] outline-none"
            style={{ background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.8)" }} />
        </div>

        {/* Key cards */}
        <div className="flex flex-col gap-1.5 lg:max-h-[520px] lg:overflow-y-auto lg:pr-1" style={{ scrollbarWidth: "thin", scrollbarColor: "rgba(255,255,255,0.1) transparent" }}>
          {filtered.map(k => {
            const a = getTariffAccent(k.tariff_name);
            const s = getStatusStyle(k.status);
            const selected = k.client_id === selectedId;
            const Icon = a.icon;
            return (
              <button key={k.client_id} onClick={() => { setSelectedId(k.client_id); setDurationMonths(1); setOrderError(""); }}
                className="flex items-center gap-3 rounded-xl px-3.5 py-3 text-left transition-all w-full"
                style={{
                  background: selected ? a.bg : "rgba(0,0,0,0.25)",
                  border: `1px solid ${selected ? a.border : "rgba(255,255,255,0.06)"}`,
                }}>
                <div className="flex h-9 w-9 items-center justify-center rounded-lg shrink-0" style={{ background: a.bg, border: `1px solid ${a.border}` }}>
                  <Icon style={{ width: 14, height: 14, color: a.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[13px] font-bold text-white truncate">{k.alias || "Ключ"}</div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[10px] font-semibold" style={{ color: a.color }}>{k.tariff_name || "—"}</span>
                    <span className="rounded-full px-1.5 py-0.5 text-[8px] font-bold" style={{ background: s.bg, color: s.color }}>{s.label}</span>
                  </div>
                </div>
                {k.days_left > 0 && <span className="text-[11px] font-mono font-bold shrink-0" style={{ color: k.days_left <= 7 ? "#ffaa00" : "rgba(255,255,255,0.25)" }}>{k.days_left}д</span>}
                {selected && <ChevronRight style={{ width: 14, height: 14, color: a.color, flexShrink: 0 }} />}
              </button>
            );
          })}
        </div>
      </div>

      {/* ══ RIGHT PANEL (light) ══ */}
      {selectedKey ? (
        <div className="lg:sticky lg:top-5">
          <div className="rounded-[18px] p-5 space-y-4"
            style={{
              background: "#F8FAFC",
              color: "#0F172A",
              border: "1px solid #E2E8F0",
              boxShadow: "0 10px 30px rgba(15,23,42,0.12)",
            }}>

            {/* ── БЛОК 1: Информация о ключе ── */}
            <div className="rounded-[14px] overflow-hidden" style={{ background: "#FFFFFF", border: "1px solid #E2E8F0" }}>
              {/* Header */}
              <div className="px-4 py-3.5 flex items-center justify-between" style={{ background: "#ECFDF5", borderBottom: "1px solid #E2E8F0" }}>
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg" style={{ background: "#FFFFFF", border: "1px solid #E2E8F0" }}>
                    <TariffIcon style={{ width: 16, height: 16, color: "#059669" }} />
                  </div>
                  <div>
                    <div className="text-[14px] font-bold" style={{ color: "#0F172A" }}>{selectedKey.alias || "Ключ"}</div>
                    <div className="text-[10px] font-semibold" style={{ color: "#059669" }}>{selectedKey.tariff_name}</div>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-bold"
                  style={{
                    background: selectedKey.status === "active" ? "#DCFCE7" : selectedKey.status === "frozen" ? "#DBEAFE" : "#FEE2E2",
                    color: selectedKey.status === "active" ? "#166534" : selectedKey.status === "frozen" ? "#1E40AF" : "#991B1B",
                  }}>
                  {status.label}
                </span>
              </div>

              {/* Progress + Info */}
              <div className="px-4 py-4 space-y-3">
                {/* Progress */}
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-[10px]" style={{ color: "#64748B" }}>Срок действия</span>
                    <span className="text-[12px] font-bold" style={{ color: isExpiring ? "#D97706" : "#059669" }}>
                      {selectedKey.days_left > 0 ? `${selectedKey.days_left} дней` : "Истёк"}
                    </span>
                  </div>
                  <div className="h-2 rounded-full overflow-hidden" style={{ background: "#E2E8F0" }}>
                    <div className="h-full rounded-full transition-all duration-500" style={{
                      width: `${progress}%`,
                      background: isExpiring ? "linear-gradient(90deg, #F59E0B, #EF4444)" : "#10B981",
                    }} />
                  </div>
                  {isExpiring && (
                    <div className="flex items-center gap-1 mt-1.5 text-[10px]" style={{ color: "#D97706" }}>
                      <AlertTriangle className="h-3 w-3" /> Скоро истечёт
                    </div>
                  )}
                </div>

                {/* Info rows */}
                <div className="space-y-0">
                  {[
                    { icon: Calendar, label: "Тариф", value: selectedKey.tariff_name || "—" },
                    { icon: Smartphone, label: "Устройства", value: selectedKey.device_limit ? `${selectedKey.device_limit} шт.` : "Безлимит" },
                    { icon: Shield, label: "Протокол", value: "VLESS + Reality" },
                    { icon: KeyIcon, label: "ID", value: selectedKey.client_id.slice(0, 8) + "…" },
                  ].map(item => (
                    <div key={item.label} className="flex items-center justify-between py-2" style={{ borderBottom: "1px solid #F1F5F9" }}>
                      <div className="flex items-center gap-2">
                        <item.icon style={{ width: 12, height: 12, color: "#94A3B8" }} />
                        <span className="text-[11px]" style={{ color: "#64748B" }}>{item.label}</span>
                      </div>
                      <span className="text-[11px] font-semibold" style={{ color: "#0F172A" }}>{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ── БЛОК 2: Продление ── */}
            <div className="rounded-[14px] overflow-hidden" style={{ background: "#FFFFFF", border: "1px solid #E2E8F0" }}>
              <div className="px-4 py-3 flex items-center gap-2" style={{ background: "#F1F5F9", borderBottom: "1px solid #E2E8F0" }}>
                <Clock style={{ width: 14, height: 14, color: "#059669" }} />
                <span className="text-[12px] font-semibold" style={{ color: "#475569" }}>Продление подписки</span>
              </div>
              <div className="px-4 py-4 space-y-4">
                {/* Duration picker */}
                <div>
                  <div className="text-[11px] mb-2" style={{ color: "#64748B" }}>Период продления</div>
                  <div className="grid grid-cols-4 gap-2">
                    {[1, 3, 6, 12].map(m => (
                      <button key={m} onClick={() => setDurationMonths(m)}
                        className="rounded-[10px] py-3 text-center transition-all"
                        style={{
                          background: durationMonths === m ? "#ECFDF5" : "#FFFFFF",
                          border: `1px solid ${durationMonths === m ? "#10B981" : "#CBD5E1"}`,
                          color: durationMonths === m ? "#065F46" : "#0F172A",
                        }}>
                        <div className="text-[14px] font-bold">{m}</div>
                        <div className="text-[10px]" style={{ color: durationMonths === m ? "#059669" : "#94A3B8" }}>мес.</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price */}
                {calc && (
                  <div className="rounded-[14px] p-4" style={{ background: "#FFFFFF", border: "1px solid #E2E8F0" }}>
                    <div className="flex justify-between items-center text-[12px] mb-2">
                      <span style={{ color: "#64748B" }}>Ежемесячно</span>
                      <span className="font-medium" style={{ color: "#0F172A" }}>{calc.monthly} ₽</span>
                    </div>
                    {calc.discount_percent > 0 && (
                      <div className="flex justify-between items-center text-[12px] mb-2">
                        <span style={{ color: "#64748B" }}>Скидка</span>
                        <span className="font-bold" style={{ color: "#059669" }}>-{calc.discount_percent}%</span>
                      </div>
                    )}
                    <div className="pt-3 flex justify-between items-baseline" style={{ borderTop: "1px solid #E2E8F0" }}>
                      <span className="text-[13px] font-semibold" style={{ color: "#0F172A" }}>Итого за {durationMonths} мес.</span>
                      <span className="text-[24px] font-black" style={{ color: "#10B981" }}>{calc.total} ₽</span>
                    </div>
                    {calc.per_day !== undefined && calc.per_day > 0 && (
                      <div className="text-right text-[11px] mt-1" style={{ color: "#94A3B8" }}>{calc.per_day} ₽/день</div>
                    )}
                  </div>
                )}
                {calcLoading && <div className="flex justify-center py-4"><Loader2 className="h-4 w-4 animate-spin" style={{ color: "#10B981" }} /></div>}

                {orderError && (
                  <div className="rounded-[10px] px-4 py-2.5 text-[12px]" style={{ background: "#FEF2F2", border: "1px solid #FECACA", color: "#991B1B" }}>{orderError}</div>
                )}

                {/* CTA */}
                <button onClick={handleOrder} disabled={orderLoading || !calc}
                  className="w-full rounded-[12px] py-3.5 text-[14px] font-bold transition-all disabled:opacity-40 flex items-center justify-center gap-2 hover:brightness-95"
                  style={{ background: "#10B981", color: "#FFFFFF" }}>
                  {orderLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <CheckCircle className="h-4 w-4" />}
                  {orderLoading ? "Оформляем..." : "Продлить подписку"}
                </button>
                <p className="text-[11px] text-center" style={{ color: "#94A3B8" }}>
                  Вы будете перенаправлены в Telegram-бот для оплаты
                </p>
              </div>
            </div>

          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center rounded-[18px] p-12"
          style={{ background: "#F8FAFC", border: "1px solid #E2E8F0", boxShadow: "0 10px 30px rgba(15,23,42,0.12)" }}>
          <div className="text-center">
            <KeyIcon className="h-8 w-8 mx-auto mb-3" style={{ color: "#CBD5E1" }} />
            <div className="text-sm" style={{ color: "#64748B" }}>Выберите ключ для продления</div>
          </div>
        </div>
      )}

      <style>{`
        @media(max-width:1024px) {
          .grid.lg\\:grid-cols-\\[280px_1fr\\] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
};

export default ExtendSubscriptionView;
