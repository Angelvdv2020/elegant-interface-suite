import { Link } from "react-router-dom";
import { Send } from "lucide-react";

const Footer = () => (
  <footer className="border-t border-border bg-background">
    <div className="section-container py-5">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary">
              <span className="text-[10px] font-black text-primary-foreground" style={{ fontFamily: "'Unbounded', sans-serif" }}>N</span>
            </div>
            <span className="text-xs font-bold text-foreground">Northline<span className="text-gradient-gold">VPN</span></span>
          </Link>
          <span className="text-[11px] text-muted-foreground">© {new Date().getFullYear()}</span>
        </div>
        <a
          href="https://t.me/northlinevpn"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs text-primary hover:underline"
        >
          <Send className="h-3 w-3" /> Telegram
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;
