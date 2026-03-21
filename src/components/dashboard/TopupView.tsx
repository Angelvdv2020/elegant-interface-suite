import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { couponService } from "@/api/services";
import { ShoppingCart, Tag, Info, MessageCircle, ExternalLink, Wallet } from "lucide-react";

const PLATI_URL = "https://plati.market/itm/5780472?lang=ru-RU";
const BOT_URL = "https://t.me/NorthlineVPNbot";

const TopupView = () => {
  const { user, refreshUser } = useAuth();
  const [couponCode, setCouponCode] = useState("");
  const [couponLoading, setCouponLoading] = useState(false);
  const [couponMessage, setCouponMessage] = useState("");
  const [couponSuccess, setCouponSuccess] = useState(false);

  const handleActivateCoupon = async () => {
    if (!couponCode.trim()) return;
    setCouponLoading(true); setCouponMessage("");
    try {
      const res = await couponService.activate(couponCode.trim());
      setCouponSuccess(res.success); setCouponMessage(res.message);
      if (res.success) { setCouponCode(""); await refreshUser(); }
    } catch (err: any) {
      setCouponSuccess(false); setCouponMessage(err.message || "Ошибка активации купона");
    }
    setCouponLoading(false);
  };

  return (
    <div className="space-y-4">
      {/* ── Баланс ── */}
      <div className="rounded-[18px] overflow-hidden" style={{ border: "1px solid rgba(0,255,136,0.2)", boxShadow: "0 4px 16px rgba(11,18,32,0.2)" }}>
        <div className="px-5 py-4 flex items-center gap-3" style={{ background: "#101826" }}>
          <div className="flex h-8 w-8 items-center justify-center rounded-lg shrink-0" style={{ background: "rgba(0,255,136,0.1)", border: "1px solid rgba(0,255,136,0.2)" }}>
            <Wallet style={{ width: 14, height: 14, color: "#00ff88" }} />
          </div>
          <div className="text-[13px] font-bold text-white">Текущий баланс</div>
        </div>
        <div className="px-5 py-4" style={{ background: "#0B1220" }}>
          <div className="text-[28px] font-black" style={{ color: "#00ff88" }}>{user?.balance ?? 0} ₽</div>
        </div>
      </div>

      {/* ── Plati.ru ── */}
      <div className="rounded-[18px] overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.06)", boxShadow: "0 4px 16px rgba(11,18,32,0.2)" }}>
        <div className="px-5 py-3 flex items-center gap-3" style={{ background: "#101826" }}>
          <div className="flex h-8 w-8 items-center justify-center rounded-lg shrink-0" style={{ background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.2)" }}>
            <ShoppingCart style={{ width: 14, height: 14, color: "#10B981" }} />
          </div>
          <div className="text-[13px] font-bold text-white">Купить купон на Plati.ru</div>
        </div>
        <div className="px-5 py-4" style={{ background: "#0B1220" }}>
          <p className="text-[12px] mb-4" style={{ color: "#9CA3AF" }}>Купите купон на нужную сумму, затем активируйте его ниже или в Telegram-боте.</p>
          <a href={PLATI_URL} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-xs font-bold no-underline transition-all"
            style={{ background: "#10B981", color: "#FFFFFF" }}>
            <ShoppingCart className="h-3.5 w-3.5" /> Купить купон <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      </div>

      {/* ── Купон ── */}
      <div className="rounded-[18px] overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.06)", boxShadow: "0 4px 16px rgba(11,18,32,0.2)" }}>
        <div className="px-5 py-3 flex items-center gap-3" style={{ background: "#101826" }}>
          <div className="flex h-8 w-8 items-center justify-center rounded-lg shrink-0" style={{ background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.2)" }}>
            <Tag style={{ width: 14, height: 14, color: "#F59E0B" }} />
          </div>
          <div className="text-[13px] font-bold text-white">Активировать купон</div>
        </div>
        <div className="px-5 py-4" style={{ background: "#0B1220" }}>
          {couponMessage && (
            <div className="mb-3 rounded-lg px-4 py-2.5 text-xs" style={{
              background: couponSuccess ? "rgba(16,185,129,0.08)" : "rgba(248,81,73,0.08)",
              border: `1px solid ${couponSuccess ? "rgba(16,185,129,0.2)" : "rgba(248,81,73,0.2)"}`,
              color: couponSuccess ? "#10B981" : "#f85149",
            }}>{couponMessage}</div>
          )}
          <div className="flex gap-2 items-center">
            <input placeholder="Введите код купона" value={couponCode} onChange={(e) => { setCouponCode(e.target.value); setCouponMessage(""); }}
              className="flex-1 rounded-lg px-3 py-2.5 text-sm outline-none"
              style={{ background: "#0F172A", border: "1px solid rgba(255,255,255,0.08)", color: "#FFFFFF" }} />
            <button onClick={handleActivateCoupon} disabled={couponLoading || !couponCode.trim()}
              className="rounded-lg px-4 py-2.5 text-xs font-semibold transition-all whitespace-nowrap disabled:opacity-40"
              style={{ background: "#0F172A", border: "1px solid rgba(255,255,255,0.08)", color: "#9CA3AF" }}>
              Активировать
            </button>
          </div>
        </div>
      </div>

      {/* ── Как это работает ── */}
      <div className="rounded-[18px] overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.06)", boxShadow: "0 4px 16px rgba(11,18,32,0.2)" }}>
        <div className="px-5 py-3 flex items-center gap-3" style={{ background: "#101826" }}>
          <div className="flex h-8 w-8 items-center justify-center rounded-lg shrink-0" style={{ background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.2)" }}>
            <Info style={{ width: 14, height: 14, color: "#10B981" }} />
          </div>
          <div className="text-[13px] font-bold text-white">Как это работает</div>
        </div>
        <div className="px-5 py-4" style={{ background: "#0B1220" }}>
          {["Купите купон на Plati.ru на нужную сумму", "Скопируйте код из письма или страницы покупки", "Активируйте купон выше или в Telegram-боте", "Баланс пополнится мгновенно"].map((text, i) => (
            <div key={i} className="flex items-start gap-3 text-[12px] mb-3 last:mb-0" style={{ color: "#9CA3AF" }}>
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold shrink-0 mt-0.5"
                style={{ background: "rgba(16,185,129,0.12)", color: "#10B981" }}>{i + 1}</span>
              {text}
            </div>
          ))}
        </div>
        <div className="px-5 py-3 flex items-center justify-between" style={{ background: "#0A0F1A", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
          <div className="flex items-center gap-2 text-[11px]" style={{ color: "#9CA3AF" }}>
            <MessageCircle className="h-3.5 w-3.5" /> Также через Telegram-бота
          </div>
          <a href={BOT_URL} target="_blank" rel="noopener noreferrer"
            className="rounded-lg px-3 py-1.5 text-[11px] font-semibold no-underline transition-all"
            style={{ background: "rgba(255,255,255,0.05)", color: "#9CA3AF" }}>
            Открыть бота
          </a>
        </div>
      </div>
    </div>
  );
};

export default TopupView;
