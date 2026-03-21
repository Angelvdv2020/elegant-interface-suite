import { useState, useEffect, useCallback, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  Copy, Check, QrCode, Pencil, Snowflake, Play, Smartphone, Clock,
  ShoppingCart, Loader2, MoreHorizontal, AlertTriangle, Pause, Zap,
  Wifi, Router, Key as KeyIcon, Search, Filter,
} from "lucide-react";
import { keyService } from "@/api/services";
import QrCodeModal from "@/components/dashboard/QrCodeModal";
import RenameKeyModal from "@/components/dashboard/RenameKeyModal";
import DevicesModal from "@/components/dashboard/DevicesModal";
import type { VpnKey, HwidDevice } from "@/api/types";

interface Props { onNavigate: (tab: string) => void; }

// ── Tariff accent colors ──
function getTariffAccent(name?: string) {
  const n = (name || "").toLowerCase();
  if (n === "ultra") return { color: "#a78bfa", bg: "rgba(167,139,250,0.1)", border: "rgba(167,139,250,0.25)", icon: Zap };
  if (n === "lte") return { color: "#00ff88", bg: "rgba(0,255,136,0.08)", border: "rgba(0,255,136,0.2)", icon: Wifi };
  if (n.includes("router") || n.includes("роутер")) return { color: "#60a5fa", bg: "rgba(96,165,250,0.1)", border: "rgba(96,165,250,0.25)", icon: Router };
  return { color: "#00ff88", bg: "rgba(0,255,136,0.08)", border: "rgba(0,255,136,0.2)", icon: KeyIcon };
}

function getStatusStyle(status: string) {
  if (status === "active") return { color: "#00ff88", bg: "rgba(0,255,136,0.1)", label: "Активен", dot: true };
  if (status === "frozen") return { color: "#00cfff", bg: "rgba(0,207,255,0.1)", label: "Заморожен", dot: false };
  return { color: "#f85149", bg: "rgba(248,81,73,0.1)", label: "Истёк", dot: false };
}

type FilterType = "all" | "active" | "frozen" | "expired";

const SubscriptionsView = ({ onNavigate }: Props) => {
  const [copied, setCopied] = useState<string | null>(null);
  const [qrModal, setQrModal] = useState<{ url: string; alias: string } | null>(null);
  const [renameModal, setRenameModal] = useState<{ keyId: string; alias: string } | null>(null);
  const [devicesModal, setDevicesModal] = useState<{ keyId: string; alias: string; devices: HwidDevice[] } | null>(null);
  const [keys, setKeys] = useState<VpnKey[]>([]);
  const [loadingKeys, setLoadingKeys] = useState(true);
  const [error, setError] = useState("");
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [filter, setFilter] = useState<FilterType>("all");
  const [search, setSearch] = useState("");

  const loadKeys = useCallback(async () => {
    setLoadingKeys(true);
    try { setKeys(await keyService.list()); } catch (err: any) { setError(err.message || "Ошибка"); }
    finally { setLoadingKeys(false); }
  }, []);
  useEffect(() => { loadKeys(); }, [loadKeys]);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text); setCopied(id); setTimeout(() => setCopied(null), 2000);
  };
  const handleRename = async (keyId: string, newAlias: string) => {
    setActionLoading(keyId);
    try { await keyService.rename(keyId, newAlias); setKeys(prev => prev.map(k => k.client_id === keyId ? { ...k, alias: newAlias } : k)); setRenameModal(null); } catch {} setActionLoading(null);
  };
  const handleFreeze = async (id: string) => {
    setActionLoading(id); try { await keyService.freeze(id); setKeys(prev => prev.map(k => k.client_id === id ? { ...k, status: "frozen" as const } : k)); } catch {} setActionLoading(null);
  };
  const handleUnfreeze = async (id: string) => {
    setActionLoading(id); try { const r = await keyService.unfreeze(id); setKeys(prev => prev.map(k => k.client_id === id ? { ...k, status: "active" as const, expires_at: r.expires_at } : k)); } catch {} setActionLoading(null);
  };
  const handleShowDevices = async (id: string, alias: string) => {
    setActionLoading(id); try { const d = await keyService.getHwid(id); setDevicesModal({ keyId: id, alias, devices: d }); } catch { setDevicesModal({ keyId: id, alias, devices: [] }); } setActionLoading(null);
  };
  const handleResetHwid = async (id: string) => {
    setActionLoading(id); try { await keyService.resetHwid(id); setDevicesModal(null); } catch {} setActionLoading(null);
  };

  // ── Filtered + searched keys ──
  const filtered = useMemo(() => {
    let list = keys;
    if (filter === "active") list = list.filter(k => k.status === "active");
    else if (filter === "frozen") list = list.filter(k => k.status === "frozen");
    else if (filter === "expired") list = list.filter(k => k.status !== "active" && k.status !== "frozen");
    if (search) list = list.filter(k => (k.alias || "").toLowerCase().includes(search.toLowerCase()) || (k.tariff_name || "").toLowerCase().includes(search.toLowerCase()));
    return list;
  }, [keys, filter, search]);

  // ── Sidebar stats ──
  const expiringSoon = keys.filter(k => k.status === "active" && k.days_left > 0 && k.days_left <= 7);
  const frozenKeys = keys.filter(k => k.status === "frozen");
  const activeCount = keys.filter(k => k.status === "active").length;

  // ── Loading / Error / Empty ──
  if (loadingKeys) return <div className="flex justify-center py-20"><Loader2 className="h-6 w-6 text-[#00ff88] animate-spin" /></div>;
  if (error) return (
    <div className="rounded-xl overflow-hidden" style={{ border: "1px solid rgba(248,81,73,0.2)" }}>
      <div className="p-8 text-center" style={{ background: "rgba(248,81,73,0.04)" }}>
        <p className="text-sm" style={{ color: "#f85149" }}>{error}</p>
        <button onClick={loadKeys} className="mt-3 rounded-lg px-4 py-2 text-xs" style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.5)", border: "1px solid rgba(255,255,255,0.1)" }}>Повторить</button>
      </div>
    </div>
  );
  if (keys.length === 0) return (
    <div className="rounded-xl overflow-hidden" style={{ border: "1px solid rgba(0,255,136,0.15)" }}>
      <div className="p-12 text-center" style={{ background: "rgba(0,255,136,0.02)" }}>
        <div className="text-5xl mb-4">🔑</div>
        <div className="text-lg font-bold text-white mb-2">Нет подписок</div>
        <p className="text-sm mb-6" style={{ color: "rgba(255,255,255,0.35)" }}>Приобретите подписку для начала работы</p>
        <button onClick={() => onNavigate("buy")} className="rounded-xl px-6 py-3 text-sm font-bold inline-flex items-center gap-2" style={{ background: "#00ff88", color: "#040d08" }}>
          <ShoppingCart className="h-4 w-4" /> Купить подписку
        </button>
      </div>
    </div>
  );

  const filters: { id: FilterType; label: string; count: number }[] = [
    { id: "all", label: "Все", count: keys.length },
    { id: "active", label: "Активные", count: activeCount },
    { id: "frozen", label: "Замороженные", count: frozenKeys.length },
    { id: "expired", label: "Истёкшие", count: keys.length - activeCount - frozenKeys.length },
  ];

  return (
    <div>
      {/* ── Filters + Search ── */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="flex gap-1 overflow-x-auto rounded-[14px] p-1" style={{ background: "#0B1220", border: "1px solid rgba(255,255,255,0.06)" }}>
          {filters.map(f => (
            <button key={f.id} onClick={() => setFilter(f.id)}
              className="flex items-center gap-1.5 whitespace-nowrap rounded-[10px] px-3 py-2 text-[12px] font-medium transition-all"
              style={{
                background: filter === f.id ? "#111827" : "transparent",
                color: filter === f.id ? "#FFFFFF" : "#9CA3AF",
                border: filter === f.id ? "1px solid #10B981" : "1px solid transparent",
              }}>
              {f.label}
              <span className="text-[10px] font-bold rounded px-1.5 py-0.5" style={{
                background: filter === f.id ? "rgba(16,185,129,0.15)" : "rgba(255,255,255,0.06)",
                color: filter === f.id ? "#10B981" : "#6B7280",
              }}>{f.count}</span>
            </button>
          ))}
        </div>
        <div className="relative flex-1 max-w-[280px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5" style={{ color: "#6B7280" }} />
          <input placeholder="Поиск..." value={search} onChange={e => setSearch(e.target.value)}
            className="w-full rounded-[12px] pl-9 pr-3 py-2.5 text-[12px] outline-none transition-all"
            style={{ background: "#0F172A", border: "1px solid rgba(255,255,255,0.08)", color: "#FFFFFF" }}
            onFocus={e => { e.currentTarget.style.borderColor = "#10B981"; e.currentTarget.style.boxShadow = "0 0 0 2px rgba(16,185,129,0.2)"; }}
            onBlur={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; e.currentTarget.style.boxShadow = "none"; }} />
        </div>
      </div>

      {/* ── Layout: cards + right panel ── */}
      <div className="grid gap-7 lg:grid-cols-[1fr_300px]">
        {/* ── CARDS GRID ── */}
        <div className="grid gap-3 grid-cols-1 sm:grid-cols-2">
          {filtered.map((vpnKey) => {
            const accent = getTariffAccent(vpnKey.tariff_name);
            const status = getStatusStyle(vpnKey.status);
            const isExpiring = vpnKey.status === "active" && vpnKey.days_left > 0 && vpnKey.days_left <= 7;
            const TariffIcon = accent.icon;

            return (
              <div key={vpnKey.client_id} className="rounded-[18px] overflow-hidden flex flex-col transition-all hover:translate-y-[-1px]"
                style={{ background: "#0B1220", border: `1px solid ${isExpiring ? "rgba(255,170,0,0.3)" : "rgba(16,24,38,0.12)"}`, boxShadow: "0 4px 16px rgba(11,18,32,0.2)" }}>

                {/* ── Card header ── */}
                <div className="px-4 py-3 flex items-center justify-between" style={{ background: "#101826" }}>
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg shrink-0" style={{ background: accent.bg, border: `1px solid ${accent.border}` }}>
                      <TariffIcon style={{ width: 14, height: 14, color: accent.color }} />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[13px] font-bold text-white truncate">{vpnKey.alias || "Ключ"}</div>
                      {vpnKey.tariff_name && <div className="text-[10px] font-semibold" style={{ color: accent.color }}>{vpnKey.tariff_name}</div>}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    {vpnKey.days_left > 0 && (
                      <span className="text-[11px] font-mono font-bold" style={{ color: isExpiring ? "#ffaa00" : "rgba(255,255,255,0.3)" }}>
                        {vpnKey.days_left}д
                      </span>
                    )}
                    <span className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[9px] font-bold" style={{ background: status.bg, color: status.color }}>
                      {status.dot && <span className="h-1 w-1 rounded-full animate-pulse" style={{ background: status.color }} />}
                      {status.label}
                    </span>
                  </div>
                </div>

                {/* ── Card body ── */}
                <div className="px-4 py-3 flex-1" style={{ background: "#0B1220" }}>
                  <div className="flex items-center gap-3 text-[11px] mb-3" style={{ color: "rgba(255,255,255,0.3)" }}>
                    {vpnKey.device_limit && <span>📱 {vpnKey.device_limit} устр.</span>}
                    <span>🔐 VLESS+Reality</span>
                    {isExpiring && <span className="flex items-center gap-1" style={{ color: "#ffaa00" }}><AlertTriangle className="h-3 w-3" /> Скоро истекает</span>}
                  </div>

                  {/* Primary actions */}
                  <div className="flex gap-1.5 flex-wrap">
                    {vpnKey.status === "active" && (
                      <button onClick={() => onNavigate("extend")} className="rounded-lg px-3 py-1.5 text-[11px] font-semibold transition-all"
                        style={{ background: "rgba(255,170,0,0.1)", border: "1px solid rgba(255,170,0,0.25)", color: "#ffaa00" }}>
                        Продлить
                      </button>
                    )}
                    {vpnKey.status === "active" && (
                      <button onClick={() => handleFreeze(vpnKey.client_id)} disabled={actionLoading === vpnKey.client_id}
                        className="rounded-lg px-3 py-1.5 text-[11px] font-semibold transition-all disabled:opacity-40"
                        style={{ background: "rgba(0,207,255,0.08)", border: "1px solid rgba(0,207,255,0.2)", color: "#00cfff" }}>
                        <Snowflake className="h-3 w-3 inline mr-1" />Заморозить
                      </button>
                    )}
                    {vpnKey.status === "frozen" && (
                      <button onClick={() => handleUnfreeze(vpnKey.client_id)} disabled={actionLoading === vpnKey.client_id}
                        className="rounded-lg px-3 py-1.5 text-[11px] font-semibold transition-all disabled:opacity-40"
                        style={{ background: "rgba(0,255,136,0.08)", border: "1px solid rgba(0,255,136,0.2)", color: "#00ff88" }}>
                        <Play className="h-3 w-3 inline mr-1" />Разморозить
                      </button>
                    )}
                  </div>
                </div>

                {/* ── Card footer ── */}
                <div className="px-4 py-2 flex items-center justify-between" style={{ background: "#0A0F1A", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                  <div className="flex gap-1">
                    <button onClick={() => copyToClipboard(vpnKey.key, vpnKey.client_id)} title="Скопировать ключ"
                      className="flex h-7 w-7 items-center justify-center rounded-md transition-all"
                      style={{ background: "rgba(255,255,255,0.05)", color: copied === vpnKey.client_id ? "#00ff88" : "rgba(255,255,255,0.3)" }}>
                      {copied === vpnKey.client_id ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                    </button>
                    <button onClick={() => setQrModal({ url: vpnKey.key, alias: vpnKey.alias || "Ключ" })} title="QR-код"
                      className="flex h-7 w-7 items-center justify-center rounded-md transition-all"
                      style={{ background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.3)" }}>
                      <QrCode className="h-3 w-3" />
                    </button>
                    <button onClick={() => handleShowDevices(vpnKey.client_id, vpnKey.alias || "Ключ")} title="Устройства"
                      className="flex h-7 w-7 items-center justify-center rounded-md transition-all"
                      style={{ background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.3)" }}>
                      <Smartphone className="h-3 w-3" />
                    </button>
                  </div>
                  {/* More menu */}
                  <div className="relative">
                    <button onClick={() => setOpenMenu(openMenu === vpnKey.client_id ? null : vpnKey.client_id)}
                      className="flex h-7 w-7 items-center justify-center rounded-md transition-all"
                      style={{ background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.3)" }}>
                      <MoreHorizontal className="h-3.5 w-3.5" />
                    </button>
                    {openMenu === vpnKey.client_id && (
                      <div className="absolute right-0 bottom-full mb-1 w-40 rounded-lg py-1 z-20"
                        style={{ background: "#0d1420", border: "1px solid rgba(255,255,255,0.1)", boxShadow: "0 8px 30px rgba(0,0,0,0.6)" }}>
                        <button onClick={() => { setRenameModal({ keyId: vpnKey.client_id, alias: vpnKey.alias || "" }); setOpenMenu(null); }}
                          className="flex w-full items-center gap-2 px-3 py-2 text-[11px] transition-all"
                          style={{ color: "rgba(255,255,255,0.5)" }}>
                          <Pencil className="h-3 w-3" /> Переименовать
                        </button>
                        {vpnKey.remnawave_link && (
                          <button onClick={() => { copyToClipboard(vpnKey.remnawave_link!, vpnKey.client_id + "_sub"); setOpenMenu(null); }}
                            className="flex w-full items-center gap-2 px-3 py-2 text-[11px] transition-all"
                            style={{ color: "rgba(255,255,255,0.5)" }}>
                            <Copy className="h-3 w-3" /> Ссылка подписки
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── RIGHT PANEL (dark) ── */}
        <div className="hidden lg:block">
          <div className="sticky top-5 rounded-[18px] p-5"
            style={{
              background: "#0B1220",
              border: "1px solid rgba(255,255,255,0.06)",
              boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
            }}>

            {/* ── Статистика ── */}
            <div style={{ marginBottom: 20 }}>
              <div className="text-[13px] font-semibold mb-3" style={{ color: "#FFFFFF" }}>Статистика</div>
              <div className="grid grid-cols-3 gap-2">
                <div className="rounded-[10px] p-3 text-center" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <div className="text-[20px] font-bold" style={{ color: "#10B981" }}>{activeCount}</div>
                  <div className="text-[10px]" style={{ color: "#9CA3AF" }}>Активных</div>
                </div>
                <div className="rounded-[10px] p-3 text-center" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <div className="text-[20px] font-bold" style={{ color: "#3B82F6" }}>{frozenKeys.length}</div>
                  <div className="text-[10px]" style={{ color: "#9CA3AF" }}>Заморож.</div>
                </div>
                <div className="rounded-[10px] p-3 text-center" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <div className="text-[20px] font-bold" style={{ color: "#FFFFFF" }}>{keys.length}</div>
                  <div className="text-[10px]" style={{ color: "#9CA3AF" }}>Всего</div>
                </div>
              </div>
            </div>

            {/* ── Скоро истекают ── */}
            {expiringSoon.length > 0 && (
              <div style={{ marginBottom: 20 }}>
                <div className="flex items-center gap-2 mb-2.5">
                  <AlertTriangle className="h-3.5 w-3.5" style={{ color: "#F59E0B" }} />
                  <span className="text-[13px] font-semibold" style={{ color: "#F59E0B" }}>Скоро истекают</span>
                </div>
                <div className="space-y-1.5">
                  {expiringSoon.map(k => (
                    <div key={k.client_id} className="flex items-center justify-between rounded-[10px] px-3 py-2.5"
                      style={{ background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.2)" }}>
                      <span className="text-[12px] font-medium truncate mr-2" style={{ color: "#FFFFFF" }}>{k.alias || "Ключ"}</span>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-[11px] font-mono font-bold" style={{ color: "#F59E0B" }}>{k.days_left}д</span>
                        <button onClick={() => onNavigate("extend")} className="rounded-md px-2.5 py-1 text-[10px] font-bold"
                          style={{ background: "#F59E0B", color: "#FFFFFF" }}>
                          Продлить
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ── Замороженные ── */}
            {frozenKeys.length > 0 && (
              <div style={{ marginBottom: 20 }}>
                <div className="flex items-center gap-2 mb-2.5">
                  <Pause className="h-3.5 w-3.5" style={{ color: "#3B82F6" }} />
                  <span className="text-[13px] font-semibold" style={{ color: "#60A5FA" }}>Замороженные</span>
                </div>
                <div className="space-y-1.5">
                  {frozenKeys.map(k => (
                    <div key={k.client_id} className="flex items-center justify-between rounded-[10px] px-3 py-2.5"
                      style={{ background: "rgba(59,130,246,0.08)", border: "1px solid rgba(59,130,246,0.2)" }}>
                      <span className="text-[12px] font-medium truncate mr-2" style={{ color: "#FFFFFF" }}>{k.alias || "Ключ"}</span>
                      <button onClick={() => handleUnfreeze(k.client_id)} className="rounded-md px-2.5 py-1 text-[10px] font-bold shrink-0"
                        style={{ background: "#3B82F6", color: "#FFFFFF" }}>
                        Разморозить
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ── Разделитель ── */}
            <div style={{ height: 1, background: "rgba(255,255,255,0.06)", margin: "4px 0 16px" }} />

            {/* ── Быстрые действия ── */}
            <div>
              <div className="text-[13px] font-semibold mb-3" style={{ color: "#FFFFFF" }}>Быстрые действия</div>
              <div className="space-y-2">
                <button onClick={() => onNavigate("buy")}
                  className="flex w-full items-center gap-3 rounded-[10px] px-4 py-3 text-[13px] font-semibold transition-all"
                  style={{ background: "#10B981", color: "#FFFFFF" }}>
                  <ShoppingCart className="h-4 w-4" /> Купить подписку
                </button>
                <button onClick={() => onNavigate("topup")}
                  className="flex w-full items-center gap-3 rounded-[10px] px-4 py-3 text-[13px] font-medium transition-all"
                  style={{ background: "#0F172A", color: "#D1D5DB", border: "1px solid rgba(255,255,255,0.08)" }}>
                  <Zap className="h-4 w-4" style={{ color: "#9CA3AF" }} /> Пополнить баланс
                </button>
                <Link to="/setup"
                  className="flex w-full items-center gap-3 rounded-[10px] px-4 py-3 text-[13px] font-medium transition-all no-underline"
                  style={{ background: "#0F172A", color: "#D1D5DB", border: "1px solid rgba(255,255,255,0.08)" }}>
                  <Wifi className="h-4 w-4" style={{ color: "#9CA3AF" }} /> Инструкции
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {qrModal && <QrCodeModal url={qrModal.url} alias={qrModal.alias} onClose={() => setQrModal(null)} />}
      {renameModal && <RenameKeyModal keyId={renameModal.keyId} currentAlias={renameModal.alias} onClose={() => setRenameModal(null)} onSave={handleRename} />}
      {devicesModal && <DevicesModal keyId={devicesModal.keyId} keyAlias={devicesModal.alias} devices={devicesModal.devices} onClose={() => setDevicesModal(null)} onResetHwid={handleResetHwid} />}
    </div>
  );
};

export default SubscriptionsView;
