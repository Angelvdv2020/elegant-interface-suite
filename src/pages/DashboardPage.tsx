import { useState, useEffect, lazy, Suspense } from "react";
import { useLocation, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";
import {
  Key, ShoppingCart, RefreshCw, CreditCard, Users, Settings,
  LogOut, Wifi, Globe, Wrench, Shield, ChevronRight, Home,
  BookOpen, Loader2,
} from "lucide-react";
import SubscriptionsView from "@/components/dashboard/SubscriptionsView";
import BuySubscriptionView from "@/components/dashboard/BuySubscriptionView";
import ExtendSubscriptionView from "@/components/dashboard/ExtendSubscriptionView";
import TopupView from "@/components/dashboard/TopupView";
import ReferralView from "@/components/dashboard/ReferralView";
import SettingsView from "@/components/dashboard/SettingsView";

// Lazy-load heavy pages
const RoutersOpenWrtContent = lazy(() => import("@/components/dashboard/RoutersOpenWrtContent"));
const RoutersKeeneticContent = lazy(() => import("@/components/dashboard/RoutersKeeneticContent"));
const VlessSetupContent = lazy(() => import("@/components/dashboard/VlessSetupContent"));
const BlogContent = lazy(() => import("@/components/dashboard/BlogContent"));

type DashboardTab =
  | "subscriptions" | "buy" | "extend" | "topup" | "referrals" | "settings"
  | "openwrt" | "keenetic" | "vless" | "blog";

interface NavItem { id: DashboardTab; label: string; icon: React.ElementType; }

const mainNav: NavItem[] = [
  { id: "subscriptions", label: "Мои подписки", icon: Key },
  { id: "buy", label: "Купить подписку", icon: ShoppingCart },
  { id: "extend", label: "Продлить", icon: RefreshCw },
  { id: "topup", label: "Пополнить баланс", icon: CreditCard },
  { id: "referrals", label: "Рефералы", icon: Users },
  { id: "settings", label: "Настройки", icon: Settings },
];

const routerNav: NavItem[] = [
  { id: "openwrt", label: "OpenWrt", icon: Wifi },
  { id: "keenetic", label: "Keenetic", icon: Globe },
  { id: "vless", label: "Настройка VLESS", icon: Wrench },
];

const allTabs = [...mainNav.map(n => n.id), ...routerNav.map(n => n.id), "blog"] as DashboardTab[];

const tabTitles: Record<DashboardTab, string> = {
  subscriptions: "Мои подписки", buy: "Купить подписку", extend: "Продлить подписку",
  topup: "Пополнить баланс", referrals: "Реферальная программа", settings: "Настройки",
  openwrt: "OpenWrt", keenetic: "Keenetic", vless: "Настройка VLESS", blog: "Блог",
};

const DashboardPage = () => {
  const { user, logout } = useAuth();
  useTheme();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const incomingTab = (location.state as any)?.tab as string | undefined;
  const initialTab: DashboardTab = incomingTab && allTabs.includes(incomingTab as DashboardTab)
    ? (incomingTab as DashboardTab) : "subscriptions";
  const [activeTab, setActiveTab] = useState<DashboardTab>(initialTab);

  useEffect(() => {
    if (incomingTab && allTabs.includes(incomingTab as DashboardTab)) setActiveTab(incomingTab as DashboardTab);
  }, [incomingTab]);

  const handleNavigate = (tab: string) => setActiveTab(tab as DashboardTab);
  const handleNavClick = (id: DashboardTab) => { setActiveTab(id); setSidebarOpen(false); };
  const isAdmin = user?.role === "admin" || user?.role === "superadmin";

  const renderContent = () => {
    switch (activeTab) {
      case "subscriptions": return <SubscriptionsView onNavigate={handleNavigate} />;
      case "buy": return <BuySubscriptionView />;
      case "extend": return <ExtendSubscriptionView onNavigate={handleNavigate} />;
      case "topup": return <TopupView />;
      case "referrals": return <ReferralView />;
      case "settings": return <SettingsView />;
      case "openwrt": return <Suspense fallback={<Loader2 className="h-5 w-5 animate-spin mx-auto mt-20" style={{ color: "#10B981" }} />}><RoutersOpenWrtContent /></Suspense>;
      case "keenetic": return <Suspense fallback={<Loader2 className="h-5 w-5 animate-spin mx-auto mt-20" style={{ color: "#10B981" }} />}><RoutersKeeneticContent /></Suspense>;
      case "vless": return <Suspense fallback={<Loader2 className="h-5 w-5 animate-spin mx-auto mt-20" style={{ color: "#10B981" }} />}><VlessSetupContent /></Suspense>;
      case "blog": return <Suspense fallback={<Loader2 className="h-5 w-5 animate-spin mx-auto mt-20" style={{ color: "#10B981" }} />}><BlogContent /></Suspense>;
      default: return <SubscriptionsView onNavigate={handleNavigate} />;
    }
  };

  const SidebarLink = ({ item, isActive }: { item: NavItem; isActive: boolean }) => (
    <button
      onClick={() => handleNavClick(item.id)}
      className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] font-medium transition-all mb-0.5"
      style={{
        color: isActive ? "#00ff88" : "rgba(255,255,255,0.45)",
        background: isActive ? "rgba(0,255,136,0.08)" : "transparent",
        borderLeft: isActive ? "2px solid #00ff88" : "2px solid transparent",
      }}
    >
      <item.icon style={{ width: 16, height: 16, flexShrink: 0 }} />
      {item.label}
      {isActive && <ChevronRight style={{ width: 14, height: 14, marginLeft: "auto", opacity: 0.4 }} />}
    </button>
  );

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: "#05090f" }}>
      {/* ══ SIDEBAR ══ */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-[260px] flex flex-col transition-transform duration-300 lg:relative lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
        style={{ background: "#0a0f18", borderRight: "1px solid rgba(255,255,255,0.06)" }}
      >
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 px-5 py-5 no-underline" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <path d="M14 2C14 2 22 5 24 7L24 17Q24 23 14 26Q4 23 4 17L4 7C6 5 14 2 14 2Z" fill="rgba(0,255,136,0.08)" stroke="#00ff88" strokeWidth="1.2"/>
            <rect x="10" y="13" width="8" height="7" rx="2" fill="rgba(0,255,136,0.2)" stroke="#00ff88" strokeWidth="0.8"/>
            <path d="M11.5 13L11.5 10.5Q11.5 8 14 8Q16.5 8 16.5 10.5L16.5 13" fill="none" stroke="#00ff88" strokeWidth="1.2" strokeLinecap="round"/>
          </svg>
          <div>
            <div className="text-sm font-bold text-white">Northline<span className="text-[#00ff88]">VPN</span></div>
            <div className="text-[10px] text-white/30">Личный кабинет</div>
          </div>
        </Link>

        {/* User profile */}
        <div className="px-5 py-4" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold"
              style={{ background: "rgba(0,255,136,0.12)", border: "1px solid rgba(0,255,136,0.25)", color: "#00ff88" }}>
              {(user?.username || "U")[0].toUpperCase()}
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-sm font-semibold text-white truncate">{user?.username || "Пользователь"}</div>
              <div className="text-xs font-semibold" style={{ color: "#00ff88" }}>{user?.balance ?? 0} ₽</div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-4">
          <div className="text-[10px] font-bold text-white/20 uppercase tracking-widest px-3 mb-2">Меню</div>
          {mainNav.map(item => <SidebarLink key={item.id} item={item} isActive={activeTab === item.id} />)}

          <div className="text-[10px] font-bold text-white/20 uppercase tracking-widest px-3 mt-5 mb-2">Роутеры</div>
          {routerNav.map(item => <SidebarLink key={item.id} item={item} isActive={activeTab === item.id} />)}

          <div className="text-[10px] font-bold text-white/20 uppercase tracking-widest px-3 mt-5 mb-2">Контент</div>
          <SidebarLink item={{ id: "blog", label: "Блог", icon: BookOpen }} isActive={activeTab === "blog"} />

          {isAdmin && (
            <>
              <div className="text-[10px] font-bold text-white/20 uppercase tracking-widest px-3 mt-5 mb-2">Администрирование</div>
              <a href="/panel-229b4f63b351f6906790337a28fb436f/"
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] font-medium transition-all mb-0.5 no-underline"
                style={{ color: "#ffaa00", borderLeft: "2px solid transparent" }}>
                <Shield style={{ width: 16, height: 16, flexShrink: 0 }} />
                Админ-панель
              </a>
            </>
          )}
        </nav>

        {/* Bottom */}
        <div className="px-3 py-3" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="flex gap-2">
            <Link to="/" className="flex-1 flex items-center justify-center gap-2 rounded-lg py-2.5 text-xs text-white/30 hover:text-white/60 transition-all no-underline"
              style={{ background: "rgba(255,255,255,0.03)" }}>
              <Home style={{ width: 14, height: 14 }} /> На сайт
            </Link>
            <button onClick={() => { logout(); window.location.href = "/"; }}
              className="flex-1 flex items-center justify-center gap-2 rounded-lg py-2.5 text-xs transition-all"
              style={{ background: "rgba(248,81,73,0.06)", color: "rgba(248,81,73,0.7)" }}>
              <LogOut style={{ width: 14, height: 14 }} /> Выйти
            </button>
          </div>
          <div className="text-center mt-3 text-[9px] text-white/15 font-mono tracking-wider">NORTHLINE VPN v2.0</div>
        </div>
      </aside>

      {sidebarOpen && <div className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* ══ MAIN ══ */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden" style={{ background: "#111827" }}>
        <header className="flex items-center justify-between px-4 sm:px-8 h-14 shrink-0"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", background: "#0B1220" }}>
          <div className="flex items-center gap-4">
            <button className="lg:hidden" style={{ color: "#9CA3AF" }} onClick={() => setSidebarOpen(true)}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
              </svg>
            </button>
            <h1 className="text-base sm:text-lg font-bold" style={{ color: "#FFFFFF" }}>{tabTitles[activeTab]}</h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 text-xs" style={{ color: "#10B981" }}>
              <span className="h-1.5 w-1.5 rounded-full animate-pulse" style={{ background: "#10B981", boxShadow: "0 0 6px rgba(16,185,129,0.5)" }} />
              Онлайн
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto" style={{ background: "#111827" }}>
          <div className="p-4 sm:p-8 max-w-[960px]">
            {renderContent()}
          </div>
        </main>
      </div>

      <style>{`
        aside::-webkit-scrollbar { width: 3px; }
        aside::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 2px; }
        main::-webkit-scrollbar { width: 4px; }
        main::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 2px; }
      `}</style>
    </div>
  );
};

export default DashboardPage;
