import PageLayout from "@/components/PageLayout";
import { Link } from "react-router-dom";

const platforms = [
  {
    emoji: "\uD83D\uDCF1",
    name: "iOS",
    apps: "Happ-Proxy, Hiddify",
    badge: "App Store",
    href: "/setup",
    featured: false,
    router: false,
  },
  {
    emoji: "\uD83D\uDCF1",
    name: "Android",
    apps: "Happ-Proxy, Hiddify",
    badge: "Google Play",
    href: "/setup",
    featured: true,
    router: false,
  },
  {
    emoji: "\uD83D\uDDA5\uFE0F",
    name: "Windows",
    apps: "Happ-Proxy, Hiddify",
    badge: "Desktop",
    href: "/setup",
    featured: false,
    router: false,
  },
  {
    emoji: "\uD83D\uDCBB",
    name: "macOS",
    apps: "Happ-Proxy, Hiddify",
    badge: "Apple Silicon & Intel",
    href: "/setup",
    featured: false,
    router: false,
  },
  {
    emoji: "\uD83D\uDD00",
    name: "OpenWrt",
    apps: "Xray-core, podkop, sing-box",
    badge: "\u0420\u043E\u0443\u0442\u0435\u0440",
    href: "/routers/openwrt",
    featured: false,
    router: true,
  },
  {
    emoji: "\uD83D\uDCE1",
    name: "Keenetic",
    apps: "Entware + Xray-core \u0447\u0435\u0440\u0435\u0437 SSH",
    badge: "\u0420\u043E\u0443\u0442\u0435\u0440",
    href: "/routers/keenetic",
    featured: false,
    router: true,
  },
];

const steps = [
  {
    emoji: "\uD83D\uDCCB",
    title: "\u0421\u043A\u043E\u043F\u0438\u0440\u0443\u0439\u0442\u0435 \u043A\u043B\u044E\u0447",
    desc: "\u0417\u0430\u0439\u0434\u0438\u0442\u0435 \u0432 \u043B\u0438\u0447\u043D\u044B\u0439 \u043A\u0430\u0431\u0438\u043D\u0435\u0442 \u0438 \u0441\u043A\u043E\u043F\u0438\u0440\u0443\u0439\u0442\u0435 VLESS-\u0441\u0441\u044B\u043B\u043A\u0443 \u0438\u043B\u0438 \u043E\u0442\u043A\u0440\u043E\u0439\u0442\u0435 QR-\u043A\u043E\u0434.",
  },
  {
    emoji: "\u2B07\uFE0F",
    title: "\u0423\u0441\u0442\u0430\u043D\u043E\u0432\u0438\u0442\u0435 \u043F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u0435",
    desc: "\u0421\u043A\u0430\u0447\u0430\u0439\u0442\u0435 \u0440\u0435\u043A\u043E\u043C\u0435\u043D\u0434\u0443\u0435\u043C\u043E\u0435 \u043F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u0435 \u0434\u043B\u044F \u0432\u0430\u0448\u0435\u0439 \u043F\u043B\u0430\u0442\u0444\u043E\u0440\u043C\u044B \u2014 \u0431\u0435\u0441\u043F\u043B\u0430\u0442\u043D\u043E.",
  },
  {
    emoji: "\u2705",
    title: "\u0418\u043C\u043F\u043E\u0440\u0442\u0438\u0440\u0443\u0439\u0442\u0435 \u043A\u043B\u044E\u0447",
    desc: "\u0412\u0441\u0442\u0430\u0432\u044C\u0442\u0435 \u0441\u0441\u044B\u043B\u043A\u0443 \u0438\u043B\u0438 \u043E\u0442\u0441\u043A\u0430\u043D\u0438\u0440\u0443\u0439\u0442\u0435 QR \u2014 \u0432\u0441\u0451, VPN \u0440\u0430\u0431\u043E\u0442\u0430\u0435\u0442.",
  },
];

const SetupHub = () => (
  <PageLayout>
    <style>{`
      @keyframes setup-pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.3; }
      }
      @keyframes setup-halo {
        0% { opacity: 0.55; stroke-width: 2.5; r: 68; }
        100% { opacity: 0; stroke-width: 0.3; r: 280; }
      }
      .setup-hh1 { animation: setup-halo 3s ease-out infinite; }
      .setup-hh2 { animation: setup-halo 3s ease-out infinite 1s; }
      .setup-hh3 { animation: setup-halo 3s ease-out infinite 2s; }
      .setup-tag-dot {
        width: 5px; height: 5px; border-radius: 50%;
        background: #00ff88;
        animation: setup-pulse 2s infinite;
      }
      .setup-hero {
        position: relative;
        overflow: hidden;
        height: 220px;
      }
      .setup-hero-svg {
        width: 100%; height: 100%; display: block;
      }
      .setup-hero-overlay {
        position: absolute; inset: 0;
        display: flex; align-items: center; justify-content: space-between;
        padding: 0 48px; pointer-events: none;
      }
      .setup-hero-tag {
        display: inline-flex; align-items: center; gap: 7px;
        background: rgba(0,255,136,0.08); border: 1px solid rgba(0,255,136,0.3);
        border-radius: 20px; padding: 5px 14px; margin-bottom: 14px;
        font-family: 'JetBrains Mono', monospace; font-size: 10px;
        color: #00ff88; font-weight: 500; letter-spacing: 1.5px;
      }
      .setup-hero-title {
        font-size: 34px; font-weight: 900; line-height: 1.1;
        color: #e8f0e8;
      }
      .setup-hero-title span { color: #00ff88; }
      .setup-hero-desc {
        font-size: 14px; color: rgba(255,255,255,0.6);
        margin-bottom: 14px; font-weight: 300;
      }
      .setup-hero-chips {
        display: flex; gap: 8px; justify-content: flex-end; flex-wrap: wrap;
      }
      .setup-chip {
        font-family: 'JetBrains Mono', monospace; font-size: 10px;
        padding: 5px 12px; border-radius: 6px; font-weight: 700;
      }
      .setup-chip-g {
        background: rgba(0,255,136,0.1); border: 1px solid rgba(0,255,136,0.35);
        color: #00ff88;
      }
      .setup-chip-c {
        background: rgba(0,207,255,0.1); border: 1px solid rgba(0,207,255,0.35);
        color: #00cfff;
      }
      .setup-hero-stats {
        display: flex; gap: 28px; justify-content: flex-end; margin-top: 14px;
      }
      .setup-stat-val {
        font-size: 18px; font-weight: 900; color: #00ff88;
      }
      .setup-stat-val.setup-blue { color: #00cfff; }
      .setup-stat-val.setup-white { color: #fff; }
      .setup-stat-lbl {
        font-size: 10px; color: rgba(255,255,255,0.35);
        margin-top: 2px; letter-spacing: 0.5px;
      }

      /* Breadcrumb */
      .setup-breadcrumb {
        padding: 18px 16px 0;
        display: flex; align-items: center; gap: 8px;
        font-size: 12px; color: rgba(232,240,232,0.45);
        position: relative; z-index: 1;
      }
      .setup-breadcrumb a {
        color: #00ff88; text-decoration: none; font-weight: 500;
      }

      /* Page */
      .setup-page {
        padding: 40px 16px 80px;
        position: relative; z-index: 1;
        max-width: 1400px;
        margin: 0 auto;
      }
      @media(min-width: 769px) {
        .setup-breadcrumb { padding-left: 48px; padding-right: 48px; }
        .setup-page { padding-left: 48px; padding-right: 48px; }
      }

      /* Platform Grid */
      .setup-platforms-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 16px;
        margin-bottom: 60px;
      }
      @media (max-width: 1023px) {
        .setup-platforms-grid {
          grid-template-columns: repeat(2, 1fr);
        }
      }
      @media (max-width: 639px) {
        .setup-platforms-grid {
          grid-template-columns: 1fr;
        }
        .setup-hero-overlay {
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
          padding: 0 20px;
          gap: 12px;
        }
        .setup-hero-right {
          text-align: left !important;
        }
        .setup-hero-chips {
          justify-content: flex-start;
        }
        .setup-hero-stats {
          justify-content: flex-start;
        }
        .setup-hero-title {
          font-size: 24px;
        }
        .setup-page {
          padding: 24px 16px 60px;
        }
        .setup-breadcrumb {
          padding: 14px 16px 0;
        }
      }

      .setup-platform-card {
        background: rgba(0,0,0,0.35);
        border: 1px solid rgba(255,255,255,0.07);
        border-radius: 16px; padding: 24px 22px;
        cursor: pointer; transition: all 0.22s;
        position: relative; text-decoration: none;
        display: flex; flex-direction: column;
        color: inherit;
      }
      .setup-platform-card:hover {
        border-color: rgba(0,255,136,0.25);
        transform: translateY(-3px);
        box-shadow: 0 8px 32px rgba(0,0,0,0.4), 0 0 20px rgba(0,255,136,0.06);
      }
      .setup-platform-card.setup-featured {
        border-color: rgba(0,255,136,0.35);
        box-shadow: 0 0 28px rgba(0,255,136,0.08);
      }
      .setup-platform-card.setup-featured:hover {
        border-color: #00ff88;
        box-shadow: 0 8px 40px rgba(0,0,0,0.5), 0 0 36px rgba(0,255,136,0.14);
      }

      .setup-platform-card-top {
        display: flex; align-items: flex-start;
        justify-content: space-between; margin-bottom: 18px;
      }

      .setup-platform-icon {
        width: 46px; height: 46px; border-radius: 12px;
        background: rgba(0,255,136,0.08); border: 1px solid rgba(0,255,136,0.18);
        display: flex; align-items: center; justify-content: center;
        font-size: 22px;
      }
      .setup-platform-icon.setup-router-icon {
        background: rgba(0,207,255,0.08);
        border-color: rgba(0,207,255,0.18);
      }

      .setup-store-badge {
        font-family: 'JetBrains Mono', monospace; font-size: 9px;
        font-weight: 700; padding: 4px 10px; border-radius: 6px;
        letter-spacing: 0.8px;
        background: rgba(255,255,255,0.05);
        border: 1px solid rgba(255,255,255,0.07);
        color: rgba(232,240,232,0.45);
      }
      .setup-store-badge.setup-badge-router {
        background: rgba(0,207,255,0.08);
        border-color: rgba(0,207,255,0.25);
        color: #00cfff;
      }

      .setup-platform-name {
        font-size: 17px; font-weight: 800;
        color: #fff; margin-bottom: 5px;
      }
      .setup-platform-apps {
        font-size: 12px; color: rgba(232,240,232,0.45);
        margin-bottom: 18px;
      }

      .setup-platform-link {
        display: inline-flex; align-items: center; gap: 6px;
        font-size: 13px; font-weight: 700; color: #00ff88;
        text-decoration: none; transition: gap 0.2s; margin-top: auto;
      }
      .setup-platform-card:hover .setup-platform-link { gap: 10px; }
      .setup-platform-card.setup-router-card .setup-platform-link { color: #00cfff; }

      /* General Steps */
      .setup-steps-section { margin-bottom: 56px; }
      .setup-steps-title {
        font-size: 20px; font-weight: 700;
        color: #fff; text-align: center; margin-bottom: 36px;
      }
      .setup-steps-title span { color: #00ff88; }

      .setup-steps-grid {
        display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px;
      }
      @media (max-width: 767px) {
        .setup-steps-grid {
          grid-template-columns: 1fr;
        }
      }

      .setup-step-card {
        background: rgba(0,0,0,0.35);
        border: 1px solid rgba(255,255,255,0.07);
        border-radius: 16px; padding: 28px 24px;
        text-align: center; transition: all 0.2s;
        position: relative;
      }
      .setup-step-card:hover {
        border-color: rgba(0,255,136,0.2);
        transform: translateY(-2px);
      }

      /* Connector arrows between steps (desktop only) */
      @media (min-width: 768px) {
        .setup-step-card:not(:last-child)::after {
          content: '\u2192';
          position: absolute; right: -14px; top: 50%;
          transform: translateY(-50%);
          color: rgba(0,255,136,0.2);
          font-size: 18px; z-index: 2;
        }
      }

      .setup-step-num-wrap {
        position: relative; display: inline-block; margin-bottom: 16px;
      }
      .setup-step-icon-bg {
        width: 60px; height: 60px; border-radius: 16px;
        background: rgba(0,255,136,0.08);
        border: 1px solid rgba(0,255,136,0.2);
        display: flex; align-items: center; justify-content: center;
        font-size: 26px; margin: 0 auto;
      }
      .setup-step-num {
        position: absolute; top: -8px; right: -8px;
        width: 22px; height: 22px; border-radius: 50%;
        background: #00ff88; color: #040d08;
        font-size: 10px; font-weight: 900;
        display: flex; align-items: center; justify-content: center;
        box-shadow: 0 0 10px rgba(0,255,136,0.4);
      }

      .setup-step-name {
        font-size: 14px; font-weight: 700;
        color: #fff; margin-bottom: 8px;
      }
      .setup-step-desc {
        font-size: 12px; color: rgba(232,240,232,0.45);
        line-height: 1.7; font-weight: 300;
      }
    `}</style>


    {/* Breadcrumb */}
    <div className="setup-breadcrumb">
      <Link to="/" style={{ color: "#00ff88", textDecoration: "none", fontWeight: 500 }}>
        Главная
      </Link>
      <span>/</span>
      <span style={{ color: "rgba(232,240,232,0.72)" }}>Инструкции по настройке</span>
    </div>

    {/* Page content */}
    <div className="setup-page">
      {/* Platform Grid */}
      <div className="setup-platforms-grid mobile-hscroll">
        {platforms.map((p) => (
          <Link
            key={p.name}
            to={p.href}
            className={[
              "setup-platform-card",
              p.featured ? "setup-featured" : "",
              p.router ? "setup-router-card" : "",
            ]
              .filter(Boolean)
              .join(" ")}
          >
            <div className="setup-platform-card-top">
              <div
                className={[
                  "setup-platform-icon",
                  p.router ? "setup-router-icon" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                {p.emoji}
              </div>
              <span
                className={[
                  "setup-store-badge",
                  p.router ? "setup-badge-router" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                {p.badge}
              </span>
            </div>
            <div className="setup-platform-name" style={{ fontFamily: "'Unbounded', sans-serif" }}>
              {p.name}
            </div>
            <div className="setup-platform-apps">{p.apps}</div>
            <span className="setup-platform-link">
              Настроить <span style={{ transition: "margin-left 0.2s" }}>{"\u2192"}</span>
            </span>
          </Link>
        ))}
      </div>

      {/* General Steps */}
      <div className="setup-steps-section">
        <div className="setup-steps-title" style={{ fontFamily: "'Unbounded', sans-serif" }}>
          Общие <span>шаги</span>
        </div>
        <div className="setup-steps-grid mobile-hscroll">
          {steps.map((s, i) => (
            <div key={s.title} className="setup-step-card">
              <div className="setup-step-num-wrap">
                <div className="setup-step-icon-bg">{s.emoji}</div>
                <div className="setup-step-num" style={{ fontFamily: "'Unbounded', sans-serif" }}>
                  {i + 1}
                </div>
              </div>
              <div className="setup-step-name" style={{ fontFamily: "'Unbounded', sans-serif" }}>
                {s.title}
              </div>
              <div className="setup-step-desc">{s.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </PageLayout>
);

export default SetupHub;
