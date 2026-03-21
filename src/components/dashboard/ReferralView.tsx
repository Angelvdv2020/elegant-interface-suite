import { useState, useEffect } from "react";
import { Copy, Check, Loader2, Users, Gift, BarChart3 } from "lucide-react";
import { referralService } from "@/api/services";
import type { ReferralStats } from "@/api/types";

const ReferralView = () => {
  const [stats, setStats] = useState<ReferralStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => { referralService.stats().then(setStats).catch(() => {}).finally(() => setLoading(false)); }, []);
  const copyLink = () => { if (!stats?.referral_link) return; navigator.clipboard.writeText(stats.referral_link); setCopied(true); setTimeout(() => setCopied(false), 2000); };

  if (loading) return <div className="flex justify-center py-16"><Loader2 className="h-6 w-6 animate-spin" style={{ color: "#10B981" }} /></div>;
  if (!stats) return <div className="text-center py-16 text-sm" style={{ color: "#9CA3AF" }}>Не удалось загрузить данные</div>;

  return (
    <div className="space-y-4">
      {/* ── Ссылка ── */}
      <div className="rounded-[18px] overflow-hidden" style={{ border: "1px solid rgba(0,255,136,0.2)", boxShadow: "0 4px 16px rgba(11,18,32,0.2)" }}>
        <div className="px-5 py-3 flex items-center gap-3" style={{ background: "#101826" }}>
          <div className="flex h-8 w-8 items-center justify-center rounded-lg shrink-0" style={{ background: "rgba(0,255,136,0.1)", border: "1px solid rgba(0,255,136,0.2)" }}>
            <Gift style={{ width: 14, height: 14, color: "#00ff88" }} />
          </div>
          <div className="text-[13px] font-bold text-white">Реферальная ссылка</div>
        </div>
        <div className="px-5 py-4" style={{ background: "#0B1220" }}>
          <div className="flex gap-2 items-center">
            <input readOnly value={stats.referral_link} className="flex-1 rounded-lg px-3 py-2.5 text-sm font-mono outline-none" style={{ background: "#0F172A", border: "1px solid rgba(255,255,255,0.08)", color: "#FFFFFF" }} />
            <button onClick={copyLink} className="inline-flex items-center gap-1.5 rounded-lg px-4 py-2.5 text-xs font-semibold transition-all whitespace-nowrap" style={{ background: "#0F172A", border: "1px solid rgba(255,255,255,0.08)", color: "#9CA3AF" }}>
              {copied ? <><Check className="h-3.5 w-3.5" /> Скопировано</> : <><Copy className="h-3.5 w-3.5" /> Копировать</>}
            </button>
          </div>
        </div>
      </div>

      {/* ── Уровни ── */}
      <div className="rounded-[18px] overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.06)", boxShadow: "0 4px 16px rgba(11,18,32,0.2)" }}>
        <div className="px-5 py-3 flex items-center gap-3" style={{ background: "#101826" }}>
          <div className="flex h-8 w-8 items-center justify-center rounded-lg shrink-0" style={{ background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.2)" }}>
            <Users style={{ width: 14, height: 14, color: "#10B981" }} />
          </div>
          <div className="text-[13px] font-bold text-white">Уровни вознаграждения</div>
        </div>
        <div className="px-5 py-4" style={{ background: "#0B1220" }}>
          {[
            { pct: 5, label: "от платежей тех, кого пригласили вы", color: "#00ff88" },
            { pct: 3, label: "от платежей приглашённых 2-го уровня", color: "#00cfff" },
            { pct: 1, label: "от платежей приглашённых 3-го уровня", color: "#9CA3AF" },
          ].map((l, i) => {
            const lvl = stats.levels[i] || { level: i + 1, percent: l.pct };
            return (
              <div key={i} className="flex items-center gap-3 mb-3 last:mb-0">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold shrink-0" style={{ background: `${l.color}15`, color: l.color }}>{lvl.percent}%</span>
                <span className="text-[12px]" style={{ color: "#9CA3AF" }}>Уровень {lvl.level} — {l.label}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Статистика ── */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Приглашённых", value: stats.total_referrals ?? 0, icon: Users },
          { label: "Заработано", value: `${stats.total_earned ?? 0} ₽`, icon: Gift },
          { label: "Активных", value: stats.active_referrals ?? 0, icon: BarChart3 },
        ].map((s) => (
          <div key={s.label} className="rounded-[18px] overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.06)", boxShadow: "0 4px 16px rgba(11,18,32,0.2)" }}>
            <div className="px-3 py-2 flex justify-center" style={{ background: "#101826" }}>
              <s.icon style={{ width: 14, height: 14, color: "#10B981" }} />
            </div>
            <div className="px-3 py-3 text-center" style={{ background: "#0B1220" }}>
              <div className="text-[18px] font-bold" style={{ color: "#10B981" }}>{s.value}</div>
              <div className="text-[10px] mt-0.5" style={{ color: "#9CA3AF" }}>{s.label}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReferralView;
