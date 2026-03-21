import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, LogOut, LayoutDashboard, ChevronDown } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import ThemeSwitcher from "@/components/ThemeSwitcher";

interface NavItem {
  label: string;
  href?: string;
  children?: { label: string; href: string }[];
}

const navItems: NavItem[] = [
  { label: "Главная", href: "/" },
  { label: "Тарифы", href: "/pricing" },
  { label: "Возможности", href: "/features" },
  { label: "Инструкции", href: "/setup" },
  { label: "Блог", href: "/blog" },
  { label: "FAQ", href: "/faq" },
];

const DropdownNav = ({ item }: { item: NavItem }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => { setOpen(false); }, [location.pathname]);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        {item.label}
        <ChevronDown className={`h-3 w-3 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && item.children && (
        <div className="absolute left-0 top-full mt-2 w-48 rounded-lg border border-border bg-card/95 shadow-glow backdrop-blur-xl py-1.5 shadow-lg z-50">
          {item.children.map((child) => (
            <Link
              key={child.href}
              to={child.href}
              className="block px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors"
            >
              {child.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const { user, logout } = useAuth();
  const location = useLocation();

  useEffect(() => { setMobileOpen(false); setMobileExpanded(null); }, [location.pathname]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-background/70 backdrop-blur-xl">
      <div className="container-narrow flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" style={{ flexShrink: 0 }}>
              <path d="M14 2C14 2 22 5 24 7L24 17Q24 23 14 26Q4 23 4 17L4 7C6 5 14 2 14 2Z" fill="rgba(0,255,136,0.08)" stroke="#00ff88" strokeWidth="1.2"/>
              <rect x="10" y="13" width="8" height="7" rx="2" fill="rgba(0,255,136,0.2)" stroke="#00ff88" strokeWidth="0.8"/>
              <path d="M11.5 13L11.5 10.5Q11.5 8 14 8Q16.5 8 16.5 10.5L16.5 13" fill="none" stroke="#00ff88" strokeWidth="1.2" strokeLinecap="round"/>
            </svg>
          <span className="text-lg font-bold text-foreground">
            Northline<span className="text-primary">VPN</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-5 lg:flex">
          {navItems.map((item) =>
            item.children ? (
              <DropdownNav key={item.label} item={item} />
            ) : (
              <Link
                key={item.href}
                to={item.href!}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.label}
              </Link>
            )
          )}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <ThemeSwitcher variant="dropdown" />
          <div className="w-px h-5 bg-border/40" />
          {user ? (
            <>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/dashboard">
                  <LayoutDashboard className="h-4 w-4 mr-1.5" />
                  Кабинет
                </Link>
              </Button>
              <Button variant="ghost" size="sm" onClick={logout}>
                <LogOut className="h-4 w-4 mr-1.5" />
                Выйти
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/login">Войти</Link>
              </Button>
              <Button variant="cta" size="sm" asChild>
                <Link to="/login">Подключиться</Link>
              </Button>
            </>
          )}
        </div>

        <button
          className="text-foreground lg:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-border bg-background/95 backdrop-blur-xl px-4 pb-5 pt-3 lg:hidden max-h-[80vh] overflow-y-auto">
          <nav className="space-y-1">
            {navItems.map((item) =>
              item.children ? (
                <div key={item.label}>
                  <button
                    onClick={() => setMobileExpanded(mobileExpanded === item.label ? null : item.label)}
                    className="flex w-full items-center justify-between py-2 text-sm text-muted-foreground hover:text-foreground"
                  >
                    {item.label}
                    <ChevronDown className={`h-3.5 w-3.5 transition-transform ${mobileExpanded === item.label ? "rotate-180" : ""}`} />
                  </button>
                  {mobileExpanded === item.label && (
                    <div className="ml-4 space-y-1 pb-1">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          to={child.href}
                          className="block py-1.5 text-sm text-muted-foreground hover:text-foreground"
                          onClick={() => setMobileOpen(false)}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.href}
                  to={item.href!}
                  className="block py-2 text-sm text-muted-foreground hover:text-foreground"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>
          <div className="mt-3 border-t border-border pt-3">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-bold text-muted-foreground tracking-widest uppercase">Тема</span>
              <ThemeSwitcher variant="dropdown" />
            </div>
          </div>
          <div className="flex gap-2">
            {user ? (
              <>
                <Button variant="ghost" size="sm" asChild className="flex-1" onClick={() => setMobileOpen(false)}>
                  <Link to="/dashboard">Кабинет</Link>
                </Button>
                <Button variant="outline" size="sm" className="flex-1" onClick={() => { logout(); setMobileOpen(false); }}>
                  Выйти
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" size="sm" asChild className="flex-1">
                  <Link to="/login" onClick={() => setMobileOpen(false)}>Войти</Link>
                </Button>
                <Button variant="cta" size="sm" asChild className="flex-1">
                  <Link to="/login" onClick={() => setMobileOpen(false)}>Подключиться</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
