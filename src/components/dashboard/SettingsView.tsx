import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { giftService } from "@/api/services";
import { LogOut, Gift, User, Wallet, Calendar } from "lucide-react";

const SettingsView = () => {
  const { user, logout } = useAuth();
  const [giftCode, setGiftCode] = useState("");
  const [giftMessage, setGiftMessage] = useState("");
  const [giftLoading, setGiftLoading] = useState(false);
  const [giftSuccess, setGiftSuccess] = useState(false);

  const handleActivateGift = async () => {
    if (!giftCode.trim()) return;
    setGiftLoading(true); setGiftMessage("");
    try {
      const res = await giftService.activate(giftCode.trim());
      setGiftMessage(res.message); setGiftSuccess(res.success);
      if (res.success) setGiftCode("");
    } catch (err: any) { setGiftMessage(err.message || "Ошибка"); setGiftSuccess(false); }
    setGiftLoading(false);
  };

  const profileItems = [
    { icon: User, label: "Telegram", value: user?.username ? `@${user.username}` : `ID: ${user?.tg_id}` },
    { icon: Wallet, label: "Баланс", value: `${user?.balance ?? 0} ₽`, accent: true },
    { icon: Calendar, label: "Дата регистрации", value: user?.created_at ? new Date(user.created_at).toLocaleDateString("ru-RU", { year: "numeric", month: "long", day: "numeric" }) : "—" },
  ];

  return (
    <div className="space-y-4">
      {/* ── Профиль ── */}
      <div className="rounded-[18px] overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.06)", boxShadow: "0 4px 16px rgba(11,18,32,0.2)" }}>
        <div className="px-5 py-3 flex items-center gap-3" style={{ background: "#101826" }}>
          <div className="flex h-8 w-8 items-center justify-center rounded-lg shrink-0" style={{ background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.2)" }}>
            <User style={{ width: 14, height: 14, color: "#10B981" }} />
          </div>
          <div className="text-[13px] font-bold text-white">Профиль</div>
        </div>
        <div style={{ background: "#0B1220" }}>
          {profileItems.map((item, i) => (
            <div key={item.label} className="flex items-center gap-3 px-5 py-3.5" style={{ borderBottom: i < profileItems.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none" }}>
              <item.icon style={{ width: 14, height: 14, color: "#9CA3AF", flexShrink: 0 }} />
              <div>
                <div className="text-[10px] uppercase tracking-wide" style={{ color: "#9CA3AF" }}>{item.label}</div>
                <div className="text-[13px] font-medium" style={{ color: item.accent ? "#10B981" : "#FFFFFF" }}>{item.value}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Подарок ── */}
      <div className="rounded-[18px] overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.06)", boxShadow: "0 4px 16px rgba(11,18,32,0.2)" }}>
        <div className="px-5 py-3 flex items-center gap-3" style={{ background: "#101826" }}>
          <div className="flex h-8 w-8 items-center justify-center rounded-lg shrink-0" style={{ background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.2)" }}>
            <Gift style={{ width: 14, height: 14, color: "#F59E0B" }} />
          </div>
          <div className="text-[13px] font-bold text-white">Активировать подарок</div>
        </div>
        <div className="px-5 py-4" style={{ background: "#0B1220" }}>
          {giftMessage && (
            <div className="mb-3 rounded-lg px-4 py-2.5 text-xs" style={{
              background: giftSuccess ? "rgba(16,185,129,0.08)" : "rgba(248,81,73,0.08)",
              border: `1px solid ${giftSuccess ? "rgba(16,185,129,0.2)" : "rgba(248,81,73,0.2)"}`,
              color: giftSuccess ? "#10B981" : "#f85149",
            }}>{giftMessage}</div>
          )}
          <div className="flex gap-2 items-center">
            <input placeholder="Код подарка" value={giftCode} onChange={(e) => setGiftCode(e.target.value)}
              className="flex-1 rounded-lg px-3 py-2.5 text-sm outline-none"
              style={{ background: "#0F172A", border: "1px solid rgba(255,255,255,0.08)", color: "#FFFFFF" }} />
            <button onClick={handleActivateGift} disabled={giftLoading || !giftCode.trim()}
              className="rounded-lg px-4 py-2.5 text-xs font-semibold transition-all whitespace-nowrap disabled:opacity-40"
              style={{ background: "#0F172A", border: "1px solid rgba(255,255,255,0.08)", color: "#9CA3AF" }}>
              Активировать
            </button>
          </div>
        </div>
      </div>

      {/* ── Выход ── */}
      <div className="rounded-[18px] overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.06)", boxShadow: "0 4px 16px rgba(11,18,32,0.2)" }}>
        <div className="px-5 py-3 flex items-center gap-3" style={{ background: "#101826" }}>
          <div className="flex h-8 w-8 items-center justify-center rounded-lg shrink-0" style={{ background: "rgba(248,81,73,0.1)", border: "1px solid rgba(248,81,73,0.2)" }}>
            <LogOut style={{ width: 14, height: 14, color: "#f85149" }} />
          </div>
          <div className="text-[13px] font-bold text-white">Выход</div>
        </div>
        <div className="px-5 py-4 flex items-center justify-between" style={{ background: "#0B1220" }}>
          <div className="text-[12px]" style={{ color: "#9CA3AF" }}>Выйти из личного кабинета</div>
          <button onClick={() => { logout(); window.location.href = "/"; }}
            className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-semibold transition-all"
            style={{ background: "rgba(248,81,73,0.08)", border: "1px solid rgba(248,81,73,0.2)", color: "#f85149" }}>
            <LogOut className="h-3.5 w-3.5" /> Выйти
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsView;
