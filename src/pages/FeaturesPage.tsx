import PageLayout from "@/components/PageLayout";
import { Link } from "react-router-dom";
import { Check, X, Minus } from "lucide-react";

const features = [
  {
    icon: "\u26A1",
    title: "\u0421\u043A\u043E\u0440\u043E\u0441\u0442\u044C \u0434\u043E 700 \u041C\u0431\u0438\u0442/\u0441",
    desc: "VLESS \u0441 XTLS-Reality \u0440\u0430\u0431\u043E\u0442\u0430\u0435\u0442 \u043D\u0430 \u0441\u043A\u043E\u0440\u043E\u0441\u0442\u0438 \u0432\u0430\u0448\u0435\u0433\u043E \u043F\u0440\u043E\u0432\u0430\u0439\u0434\u0435\u0440\u0430. \u0421\u0442\u0440\u0438\u043C\u0438\u043D\u0433 4K, \u043E\u043D\u043B\u0430\u0439\u043D-\u0438\u0433\u0440\u044B, \u0441\u043A\u0430\u0447\u0438\u0432\u0430\u043D\u0438\u0435 \u2014 \u0431\u0435\u0437 \u043F\u0440\u043E\u0441\u0430\u0434\u043E\u043A \u0438 \u0431\u0443\u0444\u0435\u0440\u0438\u0437\u0430\u0446\u0438\u0438.",
    stat: "700+",
    statLabel: "\u041C\u0431\u0438\u0442/\u0441",
  },
  {
    icon: "\uD83D\uDEE1\uFE0F",
    title: "\u041D\u0435\u0432\u0438\u0434\u0438\u043C \u0434\u043B\u044F DPI",
    desc: "Reality \u043C\u0430\u0441\u043A\u0438\u0440\u0443\u0435\u0442 \u0442\u0440\u0430\u0444\u0438\u043A \u043F\u043E\u0434 \u043E\u0431\u044B\u0447\u043D\u043E\u0435 HTTPS-\u0441\u043E\u0435\u0434\u0438\u043D\u0435\u043D\u0438\u0435 \u0441 \u043B\u0435\u0433\u0438\u0442\u0438\u043C\u043D\u044B\u043C \u0441\u0430\u0439\u0442\u043E\u043C. \u0414\u0430\u0436\u0435 \u043F\u0440\u043E\u0434\u0432\u0438\u043D\u0443\u0442\u044B\u0439 DPI \u043D\u0435 \u043E\u043F\u0440\u0435\u0434\u0435\u043B\u0438\u0442 VPN.",
    stat: "100%",
    statLabel: "\u043D\u0435\u0432\u0438\u0434\u0438\u043C\u043E\u0441\u0442\u044C",
  },
  {
    icon: "\uD83C\uDFE0",
    title: "VPN \u043D\u0430 \u0432\u0435\u0441\u044C \u0434\u043E\u043C",
    desc: "\u041D\u0430\u0441\u0442\u0440\u043E\u0439\u0442\u0435 \u043D\u0430 \u0440\u043E\u0443\u0442\u0435\u0440\u0435 OpenWrt \u0438\u043B\u0438 Keenetic \u2014 \u0432\u0441\u0435 \u0443\u0441\u0442\u0440\u043E\u0439\u0441\u0442\u0432\u0430 \u0430\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0447\u0435\u0441\u043A\u0438 \u0437\u0430\u0449\u0438\u0449\u0435\u043D\u044B \u0431\u0435\u0437 \u0443\u0441\u0442\u0430\u043D\u043E\u0432\u043A\u0438 \u043F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u0439.",
    stat: "\u221E",
    statLabel: "\u0443\u0441\u0442\u0440\u043E\u0439\u0441\u0442\u0432",
  },
  {
    icon: "\uD83D\uDD11",
    title: "\u041A\u043B\u044E\u0447 \u0437\u0430 30 \u0441\u0435\u043A\u0443\u043D\u0434",
    desc: "\u041E\u043F\u043B\u0430\u0442\u0438\u043B\u0438 \u2014 \u043A\u043B\u044E\u0447 \u0432 \u043B\u0438\u0447\u043D\u043E\u043C \u043A\u0430\u0431\u0438\u043D\u0435\u0442\u0435. QR-\u043A\u043E\u0434 \u0434\u043B\u044F \u0441\u043A\u0430\u043D\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u044F \u0438\u043B\u0438 \u0441\u0441\u044B\u043B\u043A\u0430 \u043F\u043E\u0434\u043F\u0438\u0441\u043A\u0438 \u0434\u043B\u044F \u0438\u043C\u043F\u043E\u0440\u0442\u0430 \u043E\u0434\u043D\u0438\u043C \u043D\u0430\u0436\u0430\u0442\u0438\u0435\u043C.",
    stat: "30",
    statLabel: "\u0441\u0435\u043A\u0443\u043D\u0434",
  },
  {
    icon: "\uD83D\uDE48",
    title: "Zero-log \u043F\u043E\u043B\u0438\u0442\u0438\u043A\u0430",
    desc: "\u041D\u0435 \u0437\u0430\u043F\u0438\u0441\u044B\u0432\u0430\u0435\u043C IP, \u0441\u0430\u0439\u0442\u044B, \u0442\u0440\u0430\u0444\u0438\u043A, \u0432\u0440\u0435\u043C\u044F \u0441\u0435\u0441\u0441\u0438\u0439. \u0414\u0430\u043D\u043D\u044B\u0445 \u0444\u0438\u0437\u0438\u0447\u0435\u0441\u043A\u0438 \u043D\u0435\u0442 \u043D\u0430 \u0441\u0435\u0440\u0432\u0435\u0440\u0430\u0445 \u2014 \u043D\u0435\u0447\u0435\u0433\u043E \u043F\u0435\u0440\u0435\u0434\u0430\u0442\u044C.",
    stat: "0",
    statLabel: "\u043B\u043E\u0433\u043E\u0432",
  },
  {
    icon: "\uD83C\uDF0D",
    title: "15+ \u043B\u043E\u043A\u0430\u0446\u0438\u0439",
    desc: "\u0421\u0435\u0440\u0432\u0435\u0440\u044B \u0432 \u0413\u0435\u0440\u043C\u0430\u043D\u0438\u0438, \u041D\u0438\u0434\u0435\u0440\u043B\u0430\u043D\u0434\u0430\u0445, \u0424\u0438\u043D\u043B\u044F\u043D\u0434\u0438\u0438, \u041A\u0430\u0437\u0430\u0445\u0441\u0442\u0430\u043D\u0435, \u0421\u0428\u0410, \u042F\u043F\u043E\u043D\u0438\u0438 \u0438 \u0434\u0440\u0443\u0433\u0438\u0445 \u0441\u0442\u0440\u0430\u043D\u0430\u0445.",
    stat: "15+",
    statLabel: "\u0441\u0442\u0440\u0430\u043D",
  },
  {
    icon: "\uD83D\uDCAC",
    title: "\u041F\u043E\u0434\u0434\u0435\u0440\u0436\u043A\u0430 24/7",
    desc: "Telegram-\u0431\u043E\u0442 \u0438 \u0447\u0430\u0442 \u043D\u0430 \u0441\u0430\u0439\u0442\u0435 \u2014 \u043F\u043E\u043C\u043E\u0436\u0435\u043C \u0441 \u043D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u043E\u0439 \u043D\u0430 \u043B\u044E\u0431\u043E\u043C \u0443\u0441\u0442\u0440\u043E\u0439\u0441\u0442\u0432\u0435 \u0438 \u0440\u043E\u0443\u0442\u0435\u0440\u0435.",
    stat: "24/7",
    statLabel: "\u043E\u043D\u043B\u0430\u0439\u043D",
  },
  {
    icon: "\uD83D\uDCB0",
    title: "\u0413\u0438\u0431\u043A\u0438\u0435 \u0442\u0430\u0440\u0438\u0444\u044B",
    desc: "\u041E\u0442 149 \u20BD/\u043C\u0435\u0441 \u0437\u0430 \u043E\u0434\u043D\u043E \u0443\u0441\u0442\u0440\u043E\u0439\u0441\u0442\u0432\u043E \u0434\u043E \u0431\u0435\u0437\u043B\u0438\u043C\u0438\u0442\u043D\u043E\u0433\u043E \u043F\u043B\u0430\u043D\u0430. \u0417\u0430\u043C\u043E\u0440\u043E\u0437\u043A\u0430, \u043F\u0440\u043E\u0434\u043B\u0435\u043D\u0438\u0435, \u0441\u043C\u0435\u043D\u0430 \u043B\u043E\u043A\u0430\u0446\u0438\u0438.",
    stat: "\u043E\u0442 149",
    statLabel: "\u20BD/\u043C\u0435\u0441",
    statSmall: true,
  },
];

const comparison = [
  { proto: "VLESS + Reality", speed: "\u0414\u043E 700 \u041C\u0431\u0438\u0442/\u0441", dpi: true, mask: "HTTPS (google.com)", latency: "\u041D\u0438\u0437\u043A\u0430\u044F", ours: true },
  { proto: "OpenVPN", speed: "\u0414\u043E 200 \u041C\u0431\u0438\u0442/\u0441", dpi: false, mask: "\u0427\u0430\u0441\u0442\u0438\u0447\u043D\u0430\u044F (obfs)", latency: "\u0412\u044B\u0441\u043E\u043A\u0430\u044F", ours: false },
  { proto: "Shadowsocks", speed: "\u0414\u043E 400 \u041C\u0431\u0438\u0442/\u0441", dpi: "partial" as const, mask: "\u0427\u0430\u0441\u0442\u0438\u0447\u043D\u0430\u044F", latency: "\u0421\u0440\u0435\u0434\u043D\u044F\u044F", ours: false },
  { proto: "Hysteria 2", speed: "\u0414\u043E 600 \u041C\u0431\u0438\u0442/\u0441", dpi: true, mask: "QUIC/UDP", latency: "\u041D\u0438\u0437\u043A\u0430\u044F", ours: false },
];

/* ── Hero SVG Background ── */
const heroSvgStyle = `
  .why-hh1{animation:why-halo 3s ease-out infinite}
  .why-hh2{animation:why-halo 3s ease-out infinite 1s}
  .why-hh3{animation:why-halo 3s ease-out infinite 2s}
  @keyframes why-halo{0%{opacity:.55;stroke-width:2.5;r:68}100%{opacity:0;stroke-width:.3;r:280}}
`;

const FeaturesPage = () => (
  <PageLayout>

    {/* Pulse keyframe (injected once) */}
    <style>{`
      @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.3}}
      @media(max-width:1024px){.feat-grid{grid-template-columns:repeat(2,1fr)!important}}
      @media(max-width:640px){.feat-grid{grid-template-columns:1fr!important}}
      @media(min-width:769px){.feat-page-content{padding-left:48px!important;padding-right:48px!important}}
      @media(max-width:768px){.feat-table-wrap{overflow-x:auto;-webkit-overflow-scrolling:touch}.feat-table-wrap table{min-width:600px}}
    `}</style>

    {/* Breadcrumb */}
    <div style={{ padding: "18px 16px 0", display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: "rgba(232,240,232,0.45)", position: "relative", zIndex: 1 }}>
      <Link to="/" style={{ color: "#00ff88", textDecoration: "none", fontWeight: 500 }}>Главная</Link>
      <span>/</span>
      <span style={{ color: "rgba(232,240,232,0.72)" }}>Почему NorthlineVPN</span>
    </div>

    {/* Features Grid */}
    <div style={{ padding: "40px 16px 0", position: "relative", zIndex: 1, maxWidth: 1400, margin: "0 auto" }}>
      <div
        className="feat-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 16,
          marginBottom: 60,
        }}
      >
        {features.map((f) => (
          <div
            key={f.title}
            style={{
              background: "rgba(0,0,0,0.35)",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: 16,
              padding: "26px 24px",
              position: "relative",
              overflow: "hidden",
              transition: "all 0.22s",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget;
              el.style.borderColor = "rgba(0,255,136,0.22)";
              el.style.transform = "translateY(-2px)";
              el.style.boxShadow = "0 8px 32px rgba(0,0,0,0.4), 0 0 20px rgba(0,255,136,0.05)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget;
              el.style.borderColor = "rgba(255,255,255,0.07)";
              el.style.transform = "translateY(0)";
              el.style.boxShadow = "none";
            }}
          >
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 16 }}>
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 11,
                  flexShrink: 0,
                  background: "rgba(0,255,136,0.08)",
                  border: "1px solid rgba(0,255,136,0.18)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 20,
                }}
              >
                {f.icon}
              </div>
              <div style={{ textAlign: "right" }}>
                <div
                  style={{
                    fontFamily: "'Unbounded', sans-serif",
                    fontSize: f.statSmall ? 16 : 22,
                    fontWeight: 900,
                    color: "rgba(0,255,136,0.3)",
                    lineHeight: 1,
                  }}
                >
                  {f.stat}
                </div>
                <div
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 9,
                    color: "rgba(232,240,232,0.45)",
                    letterSpacing: 1,
                    marginTop: 2,
                  }}
                >
                  {f.statLabel}
                </div>
              </div>
            </div>
            <div
              style={{
                fontFamily: "'Unbounded', sans-serif",
                fontSize: 15,
                fontWeight: 700,
                color: "#fff",
                marginBottom: 8,
              }}
            >
              {f.title}
            </div>
            <div style={{ fontSize: 12.5, color: "rgba(232,240,232,0.45)", lineHeight: 1.7, fontWeight: 300 }}>
              {f.desc}
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Comparison Table */}
    <div style={{ padding: "0 16px 80px", position: "relative", zIndex: 1, maxWidth: 1400, margin: "0 auto" }}>
      <div style={{ marginBottom: 56 }}>
        <div
          style={{
            fontFamily: "'Unbounded', sans-serif",
            fontSize: 20,
            fontWeight: 700,
            color: "#fff",
            textAlign: "center",
            marginBottom: 6,
          }}
        >
          Сравнение <span style={{ color: "#00ff88" }}>протоколов</span>
        </div>
        <div style={{ fontSize: 13, color: "rgba(232,240,232,0.45)", textAlign: "center", marginBottom: 28 }}>
          VLESS + Reality vs другие VPN-протоколы
        </div>

        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            background: "rgba(0,0,0,0.35)",
            border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: 16,
            overflow: "hidden",
          }}
        >
          <thead>
            <tr>
              {["Протокол", "Скорость", "Обход DPI", "Маскировка", "Задержка"].map((h) => (
                <th
                  key={h}
                  style={{
                    padding: "14px 20px",
                    textAlign: "left",
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 10,
                    fontWeight: 700,
                    color: "rgba(232,240,232,0.45)",
                    letterSpacing: 1.5,
                    textTransform: "uppercase",
                    background: "rgba(0,0,0,0.3)",
                    borderBottom: "1px solid rgba(255,255,255,0.07)",
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {comparison.map((c, i) => (
              <tr
                key={c.proto}
                style={{
                  background: c.ours ? "rgba(0,255,136,0.04)" : "transparent",
                }}
                onMouseEnter={(e) => {
                  const cells = e.currentTarget.querySelectorAll("td");
                  cells.forEach((td) => {
                    (td as HTMLElement).style.background = c.ours ? "rgba(0,255,136,0.07)" : "rgba(255,255,255,0.02)";
                  });
                }}
                onMouseLeave={(e) => {
                  const cells = e.currentTarget.querySelectorAll("td");
                  cells.forEach((td) => {
                    (td as HTMLElement).style.background = c.ours ? "rgba(0,255,136,0.04)" : "transparent";
                  });
                }}
              >
                <td
                  style={{
                    padding: "15px 20px",
                    fontSize: 13,
                    borderBottom: i < comparison.length - 1 ? "1px solid rgba(255,255,255,0.07)" : "none",
                    color: c.ours ? "#00ff88" : "rgba(232,240,232,0.72)",
                    fontWeight: c.ours ? 700 : 400,
                  }}
                >
                  {c.proto}
                  {c.ours && (
                    <span
                      style={{
                        display: "inline-block",
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: 8,
                        fontWeight: 700,
                        padding: "2px 7px",
                        borderRadius: 4,
                        background: "rgba(0,255,136,0.15)",
                        border: "1px solid rgba(0,255,136,0.35)",
                        color: "#00ff88",
                        letterSpacing: 0.5,
                        marginLeft: 8,
                        verticalAlign: "middle",
                      }}
                    >
                      НАШ
                    </span>
                  )}
                </td>
                <td style={{ padding: "15px 20px", fontSize: 13, borderBottom: i < comparison.length - 1 ? "1px solid rgba(255,255,255,0.07)" : "none", color: "rgba(232,240,232,0.72)" }}>
                  {c.speed}
                </td>
                <td style={{ padding: "15px 20px", fontSize: 13, borderBottom: i < comparison.length - 1 ? "1px solid rgba(255,255,255,0.07)" : "none", color: "rgba(232,240,232,0.72)" }}>
                  {c.dpi === true && <Check className="h-4 w-4" style={{ color: "#00ff88" }} />}
                  {c.dpi === false && <X className="h-4 w-4" style={{ color: "#ff4455" }} />}
                  {c.dpi === "partial" && <Minus className="h-4 w-4" style={{ color: "#ffaa00" }} />}
                </td>
                <td style={{ padding: "15px 20px", fontSize: 13, borderBottom: i < comparison.length - 1 ? "1px solid rgba(255,255,255,0.07)" : "none", color: "rgba(232,240,232,0.72)" }}>
                  {c.mask}
                </td>
                <td style={{ padding: "15px 20px", fontSize: 13, borderBottom: i < comparison.length - 1 ? "1px solid rgba(255,255,255,0.07)" : "none", color: "rgba(232,240,232,0.72)" }}>
                  {c.latency}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </PageLayout>
);

export default FeaturesPage;
