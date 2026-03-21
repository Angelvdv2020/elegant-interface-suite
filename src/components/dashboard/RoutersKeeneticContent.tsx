import { Link } from "react-router-dom";
import { Router, AlertTriangle } from "lucide-react";

const css = { green: "#00ff88", textDim: "rgba(232,240,232,0.72)", textMuted: "rgba(232,240,232,0.45)", border: "rgba(255,255,255,0.07)", borderG: "rgba(0,255,136,0.2)", amber: "#ffaa00" };

const RoutersKeeneticContent = () => (
  <div className="space-y-6">
    <p className="text-sm" style={{ color: css.textDim }}>Настройка VLESS на роутерах Keenetic через Entware.</p>

    <div style={{ background: "rgba(0,0,0,0.35)", border: `1px solid ${css.borderG}`, borderRadius: 14, padding: "20px 22px" }}>
      <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, fontWeight: 700, color: css.textMuted, letterSpacing: 2, textTransform: "uppercase", marginBottom: 14 }}>Что понадобится</div>
      {["Keenetic с поддержкой Entware", "USB-накопитель от 1 ГБ", "SSH-доступ", "Ключ из ЛК"].map(item => (
        <div key={item} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 13, color: css.textDim, marginBottom: 9, lineHeight: 1.5 }}>
          <span style={{ color: css.green, fontSize: 14, flexShrink: 0, marginTop: 1 }}>✓</span>
          <span>{item}</span>
        </div>
      ))}
    </div>

    <div style={{ background: "rgba(0,0,0,0.35)", border: `1px solid ${css.border}`, borderRadius: 14, padding: "20px 22px" }}>
      <div style={{ fontSize: 14, fontWeight: 700, color: "#fff", marginBottom: 12 }}>Поддерживаемые модели</div>
      {["Keenetic Giga (KN-1010/1011)", "Keenetic Ultra (KN-1810/1811)", "Keenetic Viva (KN-1912/1913)", "Keenetic Hero 4G+ (KN-2311)"].map(m => (
        <div key={m} style={{ fontSize: 12, color: css.textDim, marginBottom: 6, display: "flex", alignItems: "center", gap: 8 }}>
          <Router className="h-3 w-3" style={{ color: css.green }} /> {m}
        </div>
      ))}
    </div>

    <div style={{ display: "flex", alignItems: "center", gap: 10, background: "rgba(255,170,0,0.06)", border: "1px solid rgba(255,170,0,0.2)", borderRadius: 10, padding: "12px 16px", fontSize: 12, color: css.textDim, lineHeight: 1.6 }}>
      <AlertTriangle className="h-4 w-4 shrink-0" style={{ color: css.amber }} />
      <span>Полная инструкция на <a href="/routers/keenetic" style={{ color: css.green, textDecoration: "none", fontWeight: 600 }}>отдельной странице</a></span>
    </div>
  </div>
);

export default RoutersKeeneticContent;
