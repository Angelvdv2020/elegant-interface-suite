import { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const pageNames: Record<string, string> = {
  "/pricing": "Тарифы",
  "/features": "Возможности",
  "/setup": "Инструкции",
  "/faq": "FAQ",
  "/blog": "Блог",
  "/referral": "Рефералы",
  "/services": "Сервис",
  "/routers": "Роутеры",
  "/routers/openwrt": "OpenWrt",
  "/routers/keenetic": "Keenetic",
  "/routers/vless-setup": "Настройка VLESS",
  "/dashboard": "Личный кабинет",
  "/tools": "Инструменты",
  "/tools/xray-generator": "Xray Generator",
  "/tools/clash-convertor": "Clash Convertor",
  "/chat": "Чат",
  "/apps/android": "Android",
  "/apps/windows": "Windows",
  "/apps/ios": "iOS",
  "/apps/macos": "macOS",
  "/admin": "Панель администратора",
  "/reviews": "Отзывы",
  "/contacts": "Контакты",
  "/terms": "Условия",
  "/privacy": "Конфиденциальность",
};

const PageLayout = ({ children }: { children: ReactNode }) => {
  const { pathname } = useLocation();
  const pageName = pageNames[pathname] || "";

  return (
    <>
      {/* ── Фон: шум + зелёный glow orb ── */}
      <div aria-hidden style={{
        position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none",
        backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E\")",
        opacity: 0.5,
      }} />
      <div aria-hidden style={{
        position: "fixed", zIndex: 0, pointerEvents: "none",
        width: 900, height: 900, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(0,255,136,0.09) 0%, transparent 65%)",
        top: "50%", left: "50%", transform: "translate(-50%, -50%)",
      }} />
      <Header />
      <main className="pt-16" style={{ position: "relative", zIndex: 1 }}>
        {/* Баннер */}
        <div
          className="relative w-full overflow-hidden h-[120px] sm:h-[160px] lg:h-[200px]"
          style={{
            background: "linear-gradient(135deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.2) 50%, rgba(0,255,136,0.04) 100%)",
            borderBottom: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          {/* Grid pattern */}
          <div aria-hidden style={{
            position: "absolute", inset: 0, opacity: 0.06,
            backgroundImage: "linear-gradient(rgba(0,255,136,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,136,1) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }} />

          {/* Glow */}
          <div aria-hidden style={{
            position: "absolute", top: "50%", left: "30%", transform: "translate(-50%, -50%)",
            width: 500, height: 300, borderRadius: "50%",
            background: "radial-gradient(ellipse, rgba(0,255,136,0.08) 0%, transparent 70%)",
          }} />

          {/* Content */}
          <div className="relative h-full flex flex-col items-center justify-center text-center">
            <div
              className="text-[32px] sm:text-[44px] lg:text-[56px] font-black leading-none tracking-tight"
              style={{
                fontFamily: "'Unbounded', sans-serif",
                color: "rgba(255,255,255,0.7)",
                textShadow: "0 0 40px rgba(0,255,136,0.3), 0 0 80px rgba(0,255,136,0.1)",
              }}
            >
              Northline<span style={{ color: "#00ff88", textShadow: "0 0 30px rgba(0,255,136,0.6), 0 0 60px rgba(0,255,136,0.2)" }}>VPN</span>
            </div>
            {pageName && (
              <div
                className="mt-2 sm:mt-3 text-[12px] sm:text-[14px] font-bold tracking-widest uppercase"
                style={{ color: "rgba(0,255,136,0.6)", fontFamily: "'JetBrains Mono', monospace", letterSpacing: 5, textShadow: "0 0 20px rgba(0,255,136,0.3)" }}
              >
                {pageName}
              </div>
            )}
          </div>
        </div>
        {children}
      </main>
      <Footer />
    </>
  );
};

export default PageLayout;
