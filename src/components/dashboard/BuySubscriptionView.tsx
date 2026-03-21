import { useState, useEffect } from "react";
import { tariffService, couponService, subscribeService } from "@/api/services";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2, Check, Copy, ChevronRight, Minus, Plus } from "lucide-react";
import type { Tariff, TariffCalculation } from "@/api/types";

const BuySubscriptionView = () => {
  const { refreshUser } = useAuth();
  const [tariffs, setTariffs] = useState<Tariff[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedTariff, setSelectedTariff] = useState<Tariff | null>(null);
  const [devices, setDevices] = useState(1);
  const [trafficGb, setTrafficGb] = useState(0);
  const [durationMonths, setDurationMonths] = useState(1);
  const [couponCode, setCouponCode] = useState("");
  const [couponValid, setCouponValid] = useState<boolean | null>(null);
  const [couponMessage, setCouponMessage] = useState("");
  const [couponLoading, setCouponLoading] = useState(false);
  const [calc, setCalc] = useState<TariffCalculation | null>(null);
  const [calcLoading, setCalcLoading] = useState(false);
  const [orderLoading, setOrderLoading] = useState(false);
  const [orderError, setOrderError] = useState("");
  const [purchaseResult, setPurchaseResult] = useState<{ key: string; message: string } | null>(null);
  const [keyCopied, setKeyCopied] = useState(false);

  useEffect(() => {
    tariffService.list()
      .then((data) => setTariffs(data.filter((t) => {
        const n = t.name.toLowerCase();
        return !(n === "router" || n.includes("роутер") || n.includes("router"));
      })))
      .catch((err) => setError(err.message || "Не удалось загрузить тарифы"))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!selectedTariff) { setCalc(null); return; }
    const timer = setTimeout(() => {
      setCalcLoading(true);
      tariffService.calculate(selectedTariff.id, devices, trafficGb, durationMonths)
        .then(setCalc).catch(() => setCalc(null)).finally(() => setCalcLoading(false));
    }, 300);
    return () => clearTimeout(timer);
  }, [selectedTariff, devices, trafficGb, durationMonths]);

  const handleSelectTariff = (t: Tariff) => {
    setSelectedTariff(t); setDevices(t.device_limit || 1); setTrafficGb(t.traffic_limit_gb || 0);
    setDurationMonths(1); setCouponCode(""); setCouponValid(null); setCouponMessage(""); setOrderError(""); setPurchaseResult(null);
  };

  const handleValidateCoupon = async () => {
    if (!couponCode.trim()) return;
    setCouponLoading(true); setCouponMessage("");
    try {
      const res = await couponService.validate(couponCode.trim());
      setCouponValid(res.valid); setCouponMessage(res.message);
    } catch (err: any) { setCouponValid(false); setCouponMessage(err.message || "Ошибка"); }
    setCouponLoading(false);
  };

  const handlePurchase = async () => {
    if (!selectedTariff) return;
    setOrderLoading(true); setOrderError("");
    try {
      const res = await subscribeService.purchase({
        tariff_id: selectedTariff.id, devices, traffic_gb: trafficGb,
        duration_months: durationMonths, coupon_code: couponValid ? couponCode.trim() : undefined,
      });
      setPurchaseResult({ key: res.key || "", message: res.message || "Подписка оформлена" });
      await refreshUser();
    } catch (err: any) { setOrderError(err.message || "Не удалось оформить подписку"); }
    setOrderLoading(false);
  };

  if (loading) return <div className="flex justify-center py-16"><Loader2 className="h-6 w-6 text-primary animate-spin" /></div>;
  if (error) return <div className="rounded-[16px] p-6 text-center text-sm text-destructive">{error}</div>;

  if (purchaseResult) {
    return (
      <div className="space-y-4">
        <div className="rounded-[16px] p-6 text-center">
          <div className="text-3xl mb-3">🎉</div>
          <div className="text-base font-bold mb-1">Подписка оформлена</div>
          <p className="text-sm text-[#9CA3AF]">{purchaseResult.message}</p>
        </div>
        {purchaseResult.key && (
          <div className="rounded-[16px] p-5">
            <div className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-wider mb-3">Ваш ключ</div>
            <div className="flex gap-2 items-center">
              <input readOnly value={purchaseResult.key} className="flex-1 rounded-lg border border-[rgba(255,255,255,0.08)] bg-[#0F172A] px-3 py-2.5 text-sm text-white outline-none font-mono" />
              <button onClick={() => { navigator.clipboard.writeText(purchaseResult.key); setKeyCopied(true); setTimeout(() => setKeyCopied(false), 2000); }}
                className="inline-flex items-center gap-1.5 rounded-lg border border-[rgba(255,255,255,0.08)] bg-[#0F172A] px-4 py-2.5 text-xs font-semibold text-[#9CA3AF] hover:text-white transition-all whitespace-nowrap">
                {keyCopied ? <><Check className="h-3.5 w-3.5" /> Скопировано</> : <><Copy className="h-3.5 w-3.5" /> Копировать</>}
              </button>
            </div>
          </div>
        )}
        <button onClick={() => { setPurchaseResult(null); setSelectedTariff(null); setCalc(null); }}
          className="w-full rounded-lg border border-[rgba(255,255,255,0.08)] bg-[#0F172A] py-3 text-xs font-semibold text-[#9CA3AF] hover:text-white transition-all">
          Купить ещё одну подписку
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {!selectedTariff ? (
        <>
          <div className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-wider mb-1">Доступные тарифы</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {tariffs.map((t) => (
              <button key={t.id} onClick={() => handleSelectTariff(t)}
                className="rounded-[18px] overflow-hidden text-left transition-all hover:translate-y-[-1px] group"
                style={{ border: "1px solid rgba(255,255,255,0.06)", boxShadow: "0 4px 16px rgba(11,18,32,0.2)" }}>
                <div className="px-5 py-3 flex items-center justify-between" style={{ background: "#101826" }}>
                  <div className="text-[13px] font-bold text-white flex items-center gap-2">
                    {t.name}
                    {t.configurable && <span className="rounded px-1.5 py-0.5 text-[9px] font-bold uppercase" style={{ background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.2)", color: "#F59E0B" }}>Настр.</span>}
                  </div>
                  <ChevronRight className="h-4 w-4 shrink-0 group-hover:translate-x-0.5 transition-transform" style={{ color: "#9CA3AF" }} />
                </div>
                <div className="px-5 py-3" style={{ background: "#0B1220" }}>
                  <div className="text-[11px] mb-2" style={{ color: "#9CA3AF" }}>{t.duration_days} дн.{t.device_limit ? ` · ${t.device_limit} устр.` : ""}</div>
                  {t.price_rub !== null && <div className="text-[20px] font-black" style={{ color: "#10B981" }}>{t.price_rub} ₽<span className="text-[11px] font-normal ml-1" style={{ color: "#9CA3AF" }}>/мес</span></div>}
                </div>
              </button>
            ))}
          </div>
        </>
      ) : (
        <>
          {/* Выбранный тариф */}
          <div className="rounded-[18px] overflow-hidden" style={{ border: "1px solid rgba(16,185,129,0.2)", boxShadow: "0 4px 16px rgba(11,18,32,0.2)" }}>
            <div className="px-5 py-3 flex items-center justify-between" style={{ background: "#101826" }}>
              <div className="text-[13px] font-bold text-white">{selectedTariff.name}</div>
              <button onClick={() => { setSelectedTariff(null); setCalc(null); }} className="text-[11px] font-semibold" style={{ color: "#10B981" }}>Изменить</button>
            </div>
            <div className="px-5 py-3" style={{ background: "#0B1220" }}>
              <div className="text-[11px]" style={{ color: "#9CA3AF" }}>{selectedTariff.duration_days} дн.{selectedTariff.price_rub !== null && ` · ${selectedTariff.price_rub} ₽/мес`}</div>
            </div>
          </div>

          {/* Конфигурация */}
          <div className="rounded-[16px] p-5 space-y-5">
            {/* Срок */}
            <div>
              <div className="text-xs text-[#9CA3AF] mb-2">Срок подписки</div>
              <div className="grid grid-cols-4 gap-2">
                {[1, 3, 6, 12].map((m) => (
                  <button key={m} onClick={() => setDurationMonths(m)}
                    className={`rounded-lg py-2.5 text-xs font-semibold transition-all border ${durationMonths === m ? "border-primary/30 bg-primary/10 text-[#10B981]" : "border-[rgba(255,255,255,0.08)] bg-[#0F172A] text-[#9CA3AF] hover:text-white"}`}>
                    {m} мес.
                  </button>
                ))}
              </div>
            </div>

            {/* Устройства */}
            {selectedTariff.configurable && (
              <div>
                <div className="text-xs text-[#9CA3AF] mb-2">Устройства</div>
                <div className="flex items-center gap-4">
                  <button onClick={() => setDevices(d => Math.max(1, d - 1))} disabled={devices <= 1}
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-[rgba(255,255,255,0.08)] bg-[#0F172A] text-[#9CA3AF] disabled:opacity-30">
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-10 text-center text-lg font-bold">{devices}</span>
                  <button onClick={() => setDevices(d => Math.min(10, d + 1))} disabled={devices >= 10}
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-[rgba(255,255,255,0.08)] bg-[#0F172A] text-[#9CA3AF] disabled:opacity-30">
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Трафик */}
            {selectedTariff.configurable && selectedTariff.billing_type === "traffic" && (
              <div>
                <div className="text-xs text-[#9CA3AF] mb-2">Трафик (ГБ)</div>
                <div className="flex items-center gap-4">
                  <button onClick={() => setTrafficGb(t => Math.max(0, t - 50))} disabled={trafficGb <= 0}
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-[rgba(255,255,255,0.08)] bg-[#0F172A] text-[#9CA3AF] disabled:opacity-30">
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-14 text-center text-lg font-bold">{trafficGb} ГБ</span>
                  <button onClick={() => setTrafficGb(t => t + 50)}
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-[rgba(255,255,255,0.08)] bg-[#0F172A] text-[#9CA3AF]">
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Купон */}
            <div>
              <div className="text-xs text-[#9CA3AF] mb-2">Купон (необязательно)</div>
              <div className="flex gap-2 items-center">
                <input placeholder="Введите код купона" value={couponCode}
                  onChange={(e) => { setCouponCode(e.target.value); setCouponValid(null); setCouponMessage(""); }}
                  className="flex-1 rounded-lg border border-[rgba(255,255,255,0.08)] bg-[#0F172A] px-3 py-2.5 text-sm text-white outline-none" />
                <button onClick={handleValidateCoupon} disabled={couponLoading || !couponCode.trim()}
                  className="rounded-lg border border-[rgba(255,255,255,0.08)] bg-[#0F172A] px-4 py-2.5 text-xs font-semibold text-[#9CA3AF] hover:text-white transition-all whitespace-nowrap disabled:opacity-40">
                  Проверить
                </button>
              </div>
              {couponMessage && <p className={`text-xs mt-2 ${couponValid ? "text-success" : "text-destructive"}`}>{couponMessage}</p>}
            </div>
          </div>

          {/* Итого */}
          <div className="rounded-[16px] p-5">
            <div className="flex items-center justify-between text-[10px] font-bold text-[#9CA3AF] uppercase tracking-wider mb-4">
              Итого {calcLoading && <Loader2 className="h-3 w-3 animate-spin" />}
            </div>
            {calc && (
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-[#9CA3AF]">Ежемесячно</span>
                  <span className="font-medium">{calc.monthly} ₽</span>
                </div>
                {calc.discount_percent > 0 && (
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-[#9CA3AF]">Скидка</span>
                    <span className="font-bold text-[#10B981]">-{calc.discount_percent}%</span>
                  </div>
                )}
                <div className="border-t border-[rgba(255,255,255,0.08)] pt-3 flex justify-between items-baseline">
                  <span className="font-semibold text-sm">Итого за {durationMonths} мес.</span>
                  <span className="text-2xl font-bold text-[#10B981]">{calc.total} ₽</span>
                </div>
                {calc.per_day !== undefined && calc.per_day > 0 && (
                  <div className="text-right text-xs text-[#9CA3AF] mt-1">{calc.per_day} ₽/день</div>
                )}
              </div>
            )}
            {orderError && <div className="mb-3 rounded-lg border border-destructive/25 bg-destructive/5 px-4 py-2.5 text-xs text-destructive">{orderError}</div>}
            <button onClick={handlePurchase} disabled={orderLoading || !calc}
              className="w-full rounded-xl bg-[#10B981] py-3 text-sm font-bold text-white hover:brightness-110 transition-all disabled:opacity-40">
              {orderLoading ? "Оформляем..." : "Оформить подписку"}
            </button>
            <p className="text-xs text-[#9CA3AF] text-center mt-3">Подписка будет оплачена с баланса аккаунта</p>
          </div>
        </>
      )}
    </div>
  );
};

export default BuySubscriptionView;
