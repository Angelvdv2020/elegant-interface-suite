import { Link } from "react-router-dom";
import { Monitor, Smartphone, Laptop, Router, Tablet, Tv } from "lucide-react";

const platforms = [
  { icon: Monitor, name: "Windows", apps: "Hiddify, v2rayN", href: "/setup" },
  { icon: Laptop, name: "macOS", apps: "Hiddify, V2Box", href: "/setup" },
  { icon: Smartphone, name: "iOS", apps: "Hiddify, Streisand", href: "/setup" },
  { icon: Tablet, name: "Android", apps: "Hiddify, V2rayNG", href: "/setup" },
  { icon: Router, name: "OpenWrt", apps: "Xray, podkop", href: "/routers/openwrt" },
  { icon: Tv, name: "Keenetic", apps: "Entware + Xray", href: "/routers/keenetic" },
];

const DevicesSection = () => (
  <section className="py-16 lg:py-24 bg-background">
    <div className="section-container">
      <div className="section-heading">
        <span className="section-label">Устройства</span>
        <h2>Совместимые платформы</h2>
        <p>Работает на всех популярных устройствах и роутерах</p>
      </div>
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6 mobile-hscroll">
        {platforms.map((p, i) => (
          <Link key={p.name} to={p.href}
            className="group flex flex-col items-center gap-3 text-center py-6 animate-slide-up transition-transform hover:-translate-y-1 active:scale-[0.97]"
            style={{ animationDelay: `${i * 80}ms` }}>
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/8 border border-primary/15 transition-colors group-hover:bg-primary/12 group-hover:border-primary/25">
              <p.icon className="h-6 w-6 text-primary" />
            </div>
            <div>
              <div className="text-sm font-semibold text-foreground">{p.name}</div>
              <div className="text-[11px] text-muted-foreground leading-tight mt-1">{p.apps}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  </section>
);

export default DevicesSection;
