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
      <Header />
      <main className="pt-16 bg-background min-h-screen">
        {/* Page banner */}
        <div className="relative w-full overflow-hidden h-[100px] sm:h-[130px] lg:h-[160px] border-b border-border">
          {/* Subtle gradient */}
          <div className="absolute inset-0" style={{
            background: "linear-gradient(135deg, hsl(220 80% 95%) 0%, hsl(220 20% 98%) 50%, hsl(42 60% 95%) 100%)",
          }} />

          {/* Fine grid */}
          <div aria-hidden className="absolute inset-0 opacity-[0.04]" style={{
            backgroundImage: "linear-gradient(hsl(220 72% 45%) 1px, transparent 1px), linear-gradient(90deg, hsl(220 72% 45%) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }} />

          {/* Content */}
          <div className="relative h-full flex flex-col items-center justify-center text-center">
            <div
              className="text-[28px] sm:text-[36px] lg:text-[44px] font-black leading-none tracking-tight"
              style={{ fontFamily: "'Unbounded', sans-serif" }}
            >
              <span className="text-foreground/70">Northline</span>
              <span className="text-gradient-gold">VPN</span>
            </div>
            {pageName && (
              <div className="mt-2 text-[11px] sm:text-[13px] font-bold tracking-[0.15em] uppercase text-primary" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
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
