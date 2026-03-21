// Re-export RoutersOpenWrt page content without PageLayout wrapper
// The DashboardPage provides its own layout (sidebar + topbar)

import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ExternalLink, Check, X, AlertTriangle, ArrowRight, Router, Copy, Info } from "lucide-react";

const css = {
  bg: "transparent",
  bg2: "rgba(0,0,0,0.35)",
  bg3: "rgba(0,0,0,0.3)",
  bgCode: "#060c12",
  green: "#00ff88",
  cyan: "#00cfff",
  amber: "#ffaa00",
  border: "rgba(255,255,255,0.07)",
  borderG: "rgba(0,255,136,0.2)",
  text: "#e8f0e8",
  textDim: "rgba(232,240,232,0.72)",
  textMuted: "rgba(232,240,232,0.45)",
  red: "#f85149",
};

const CodeBlock = ({ code, title }: { code: string; title?: string }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => { navigator.clipboard.writeText(code); setCopied(true); setTimeout(() => setCopied(false), 2000); };
  return (
    <div style={{ background: css.bgCode, border: `1px solid ${css.border}`, borderRadius: 12, overflow: "hidden", marginBottom: 12 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "9px 14px", borderBottom: `1px solid ${css.border}`, background: "rgba(255,255,255,0.02)" }}>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: css.textMuted, letterSpacing: 0.5 }}>{title || "Terminal"}</span>
        <button onClick={handleCopy} style={{ display: "flex", alignItems: "center", gap: 5, fontFamily: "'JetBrains Mono', monospace", fontSize: 10, fontWeight: 700, color: copied ? css.green : css.textMuted, background: "none", border: "none", cursor: "pointer", padding: "2px 6px", borderRadius: 4 }}>
          {copied ? <><Check className="h-3 w-3" /> Copied</> : <><Copy className="h-3 w-3" /> Copy</>}
        </button>
      </div>
      <pre style={{ padding: 16, fontFamily: "'JetBrains Mono', monospace", fontSize: 12, lineHeight: 1.7, color: "#b8d4b8", overflowX: "auto", whiteSpace: "pre", margin: 0 }}>{code}</pre>
    </div>
  );
};

const RoutersOpenWrtContent = () => (
  <div className="space-y-6">
    <p className="text-sm" style={{ color: css.textDim }}>Пошаговая инструкция настройки VLESS + Reality на роутерах с OpenWrt.</p>

    <div style={{ background: css.bg2, border: `1px solid ${css.borderG}`, borderRadius: 14, padding: "20px 22px" }}>
      <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, fontWeight: 700, color: css.textMuted, letterSpacing: 2, textTransform: "uppercase", marginBottom: 14 }}>Что понадобится</div>
      {["Роутер с OpenWrt (MT7981B/MT7986A)", "SSH-доступ к роутеру", "Ключ из личного кабинета"].map(item => (
        <div key={item} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 13, color: css.textDim, marginBottom: 9, lineHeight: 1.5 }}>
          <span style={{ color: css.green, fontSize: 14, flexShrink: 0, marginTop: 1 }}>✓</span>
          <span>{item}</span>
        </div>
      ))}
    </div>

    <div>
      <div style={{ fontFamily: "'Unbounded', sans-serif", fontSize: 15, fontWeight: 700, color: "#fff", marginBottom: 14, display: "flex", alignItems: "center", gap: 10 }}>
        <span style={{ width: 26, height: 26, borderRadius: 7, flexShrink: 0, background: "rgba(0,255,136,0.12)", border: `1px solid ${css.borderG}`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 700, color: css.green }}>1</span>
        Подключение по SSH
      </div>
      <CodeBlock code="ssh root@192.168.1.1" />
    </div>

    <div>
      <div style={{ fontFamily: "'Unbounded', sans-serif", fontSize: 15, fontWeight: 700, color: "#fff", marginBottom: 14, display: "flex", alignItems: "center", gap: 10 }}>
        <span style={{ width: 26, height: 26, borderRadius: 7, flexShrink: 0, background: "rgba(0,255,136,0.12)", border: `1px solid ${css.borderG}`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 700, color: css.green }}>2</span>
        Установка Xray-core
      </div>
      <CodeBlock code={`opkg update\nopkg install xray-core`} />
    </div>

    <div style={{ display: "flex", alignItems: "center", gap: 10, background: "rgba(255,170,0,0.06)", border: "1px solid rgba(255,170,0,0.2)", borderRadius: 10, padding: "12px 16px", fontSize: 12, color: css.textDim, lineHeight: 1.6 }}>
      <AlertTriangle className="h-4 w-4 shrink-0" style={{ color: css.amber }} />
      <span>Полная инструкция доступна на <a href="/routers/openwrt" style={{ color: css.green, textDecoration: "none", fontWeight: 600 }}>отдельной странице</a></span>
    </div>
  </div>
);

export default RoutersOpenWrtContent;
