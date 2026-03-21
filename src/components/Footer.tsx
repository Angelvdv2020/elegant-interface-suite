import { Link } from "react-router-dom";
import { Send } from "lucide-react";

const Footer = () => (
  <footer className="border-t border-border section-light">
    <div className="section-container py-5">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-1.5">
            <svg width="20" height="20" viewBox="0 0 28 28" fill="none">
                <path d="M14 2C14 2 22 5 24 7L24 17Q24 23 14 26Q4 23 4 17L4 7C6 5 14 2 14 2Z" fill="rgba(0,255,136,0.08)" stroke="#00ff88" strokeWidth="1.2"/>
                <rect x="10" y="13" width="8" height="7" rx="2" fill="rgba(0,255,136,0.2)" stroke="#00ff88" strokeWidth="0.8"/>
                <path d="M11.5 13L11.5 10.5Q11.5 8 14 8Q16.5 8 16.5 10.5L16.5 13" fill="none" stroke="#00ff88" strokeWidth="1.2" strokeLinecap="round"/>
              </svg>
            <span className="text-xs font-bold text-foreground">Northline<span className="text-primary">VPN</span></span>
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
