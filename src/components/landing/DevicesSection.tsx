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
  <section className="section-dark py-10 lg:py-14">
    <div className="section-container">
      <div className="section-heading">
        <span className="section-label">Устройства</span>
        <h2>Совместимые платформы</h2>
        <p>Работает на всех популярных устройствах и роутерах</p>
      </div>
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6 mobile-hscroll">
        {platforms.map((p) => (
          <Link key={p.name} to={p.href}
            className="card-hover p-5 flex flex-col items-center gap-3 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
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
