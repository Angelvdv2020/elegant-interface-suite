import { useState } from "react";
import { Trash2, Loader2 } from "lucide-react";
import type { HwidDevice } from "@/api/types";
import { keyService } from "@/api/services";

interface DevicesModalProps {
  keyAlias: string;
  keyId: string;
  devices: HwidDevice[];
  onClose: () => void;
  onResetHwid: (keyId: string) => void;
  onDeviceDeleted?: () => void;
}

const css = {
  bg: "rgba(0,0,0,0.35)",
  border: "rgba(255,255,255,0.07)",
  borderG: "rgba(0,255,136,0.2)",
  green: "#00ff88",
  text: "#e8f0e8",
  textDim: "rgba(232,240,232,0.72)",
  textMuted: "rgba(232,240,232,0.45)",
  red: "#f85149",
};

const deviceEmoji = (os: string) => {
  const l = (os || "").toLowerCase();
  if (l.includes("ios") || l.includes("iphone") || l.includes("ipad")) return "📱";
  if (l.includes("android")) return "🤖";
  if (l.includes("mac")) return "🍎";
  if (l.includes("windows")) return "💻";
  if (l.includes("linux")) return "🐧";
  if (l.includes("tv") || l.includes("android tv")) return "📺";
  if (l.includes("router") || l.includes("openwrt")) return "📡";
  return "🖥";
};

const DevicesModal = ({ keyAlias, keyId, devices, onClose, onResetHwid, onDeviceDeleted }: DevicesModalProps) => {
  const [deleting, setDeleting] = useState<string | null>(null);
  const [localDevices, setLocalDevices] = useState(devices);
  const [confirmReset, setConfirmReset] = useState(false);

  const handleDeleteDevice = async (hwid: string) => {
    setDeleting(hwid);
    try {
      await keyService.deleteHwidDevice(keyId, hwid);
      setLocalDevices((prev) => prev.filter((d) => d.id !== hwid));
      onDeviceDeleted?.();
    } catch {
      // ignore
    } finally {
      setDeleting(null);
    }
  };

  const handleResetAll = () => {
    if (!confirmReset) {
      setConfirmReset(true);
      return;
    }
    onResetHwid(keyId);
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 999,
        display: "flex", alignItems: "center", justifyContent: "center",
        background: "rgba(0,0,0,0.7)", backdropFilter: "blur(4px)",
        padding: 16,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%", maxWidth: 480, borderRadius: 16,
          background: "#05090f", border: `1px solid ${css.border}`,
          boxShadow: "0 32px 80px rgba(0,0,0,0.7)",
          overflow: "hidden",
        }}
      >
        {/* Header */}
        <div style={{
          padding: "20px 24px 16px",
          borderBottom: `1px solid ${css.border}`,
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <div>
            <div style={{
              fontFamily: "'Unbounded', sans-serif", fontSize: 16,
              fontWeight: 700, color: "#fff",
            }}>
              Устройства
            </div>
            <div style={{ fontSize: 12, color: css.textMuted, marginTop: 4 }}>
              {keyAlias} · {localDevices.length} подключено
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              width: 32, height: 32, borderRadius: 8,
              background: css.bg, border: `1px solid ${css.border}`,
              color: css.textMuted, fontSize: 14, cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: "16px 24px", maxHeight: 400, overflowY: "auto" }}>
          {localDevices.length === 0 ? (
            <div style={{ textAlign: "center", padding: "40px 0" }}>
              <div style={{ fontSize: 36, marginBottom: 12 }}>📱</div>
              <div style={{ fontSize: 13, color: css.textDim }}>Нет подключённых устройств</div>
              <div style={{ fontSize: 11, color: css.textMuted, marginTop: 6 }}>
                Устройства появятся после первого подключения
              </div>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {localDevices.map((d) => (
                <div key={d.id} style={{
                  display: "flex", alignItems: "center", gap: 12,
                  padding: "14px 16px", borderRadius: 12,
                  background: css.bg, border: `1px solid ${css.border}`,
                  transition: "border-color 0.15s",
                }}>
                  <span style={{ fontSize: 22, flexShrink: 0 }}>{deviceEmoji(d.os)}</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{
                      fontSize: 13, fontWeight: 600, color: css.text,
                      overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                    }}>
                      {d.device_model || "Неизвестное устройство"}
                    </div>
                    <div style={{ fontSize: 11, color: css.textMuted, marginTop: 3 }}>
                      {d.os}
                      {d.last_connected_at && (
                        <> · {new Date(d.last_connected_at).toLocaleDateString("ru-RU")}</>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => handleDeleteDevice(d.id)}
                    disabled={deleting === d.id}
                    title="Удалить устройство"
                    style={{
                      width: 34, height: 34, borderRadius: 8, flexShrink: 0,
                      background: deleting === d.id ? "rgba(248,81,73,0.2)" : "rgba(248,81,73,0.08)",
                      border: "1px solid rgba(248,81,73,0.2)",
                      color: css.red, cursor: deleting === d.id ? "wait" : "pointer",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      transition: "all 0.15s",
                    }}
                  >
                    {deleting === d.id ? (
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    ) : (
                      <Trash2 className="h-3.5 w-3.5" />
                    )}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {localDevices.length > 0 && (
          <div style={{ padding: "16px 24px 20px", borderTop: `1px solid ${css.border}` }}>
            <button
              onClick={handleResetAll}
              style={{
                width: "100%", padding: "11px 16px", borderRadius: 10,
                border: `1px solid rgba(248,81,73,${confirmReset ? "0.5" : "0.2"})`,
                background: confirmReset ? "rgba(248,81,73,0.15)" : "rgba(248,81,73,0.06)",
                color: css.red, fontSize: 12, fontWeight: 600,
                cursor: "pointer", fontFamily: "'Inter', sans-serif",
                transition: "all 0.15s",
              }}
            >
              {confirmReset ? "Точно сбросить все устройства?" : "Сбросить все HWID"}
            </button>
            <div style={{ marginTop: 8, fontSize: 11, color: css.textMuted, textAlign: "center" }}>
              После сброса ключ можно использовать на новых устройствах
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DevicesModal;
