import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const links = [
  { label: "Возможности", href: "#features" },
  { label: "Тарифы", href: "/pricing" },
  { label: "Документация", href: "#docs" },
];

const LandingHeader = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-brand text-[11px] font-bold text-brand-light">V</div>
          <span className="text-[15px] font-semibold text-foreground tracking-tight">Visually</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {links.map((l) => (
            <a key={l.label} href={l.href} className="text-[13px] text-muted-foreground transition-colors hover:text-foreground">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/login">Войти</Link>
          </Button>
          <Button size="sm" asChild>
            <Link to="/signup">Попробовать бесплатно</Link>
          </Button>
        </div>

        <button className="md:hidden text-foreground" onClick={() => setOpen(!open)}>
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-background px-4 pb-4 pt-2 md:hidden">
          {links.map((l) => (
            <a key={l.label} href={l.href} className="block py-2 text-sm text-muted-foreground" onClick={() => setOpen(false)}>
              {l.label}
            </a>
          ))}
          <div className="mt-3 flex gap-2">
            <Button variant="ghost" size="sm" asChild className="flex-1">
              <Link to="/login" onClick={() => setOpen(false)}>Войти</Link>
            </Button>
            <Button size="sm" asChild className="flex-1">
              <Link to="/signup" onClick={() => setOpen(false)}>Попробовать</Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default LandingHeader;
