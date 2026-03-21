import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const HeroSection = () => (
  <section className="relative min-h-[85vh] flex items-center overflow-hidden bg-background">
    {/* Background geometry */}
    <div className="absolute inset-0 overflow-hidden">
      {/* Large gradient orbs */}
      <div className="absolute -top-[200px] -right-[200px] w-[700px] h-[700px] rounded-full opacity-30"
        style={{ background: "radial-gradient(circle, hsl(220 80% 92%), transparent 70%)" }} />
      <div className="absolute -bottom-[300px] -left-[200px] w-[800px] h-[800px] rounded-full opacity-20"
        style={{ background: "radial-gradient(circle, hsl(42 60% 90%), transparent 70%)" }} />
      {/* Fine grid */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: "linear-gradient(hsl(220 20% 60%) 1px, transparent 1px), linear-gradient(90deg, hsl(220 20% 60%) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
      }} />
    </div>

    <div className="relative z-10 section-container py-20 lg:py-28">
      <div className="max-w-3xl">
        {/* Status badge */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-background/80 px-4 py-2 shadow-soft animate-slide-up">
          <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-[12px] font-medium text-muted-foreground">Серверы работают стабильно</span>
        </div>

        <h1 className="text-[36px] sm:text-[48px] lg:text-[64px] font-extrabold leading-[1.05] tracking-[-0.03em] text-foreground animate-slide-up stagger-1" style={{ lineHeight: "1.05" }}>
          Интернет без<br />
          <span className="text-gradient-gold">цензуры</span>{" "}
          и&nbsp;ограничений
        </h1>

        <p className="mt-6 max-w-lg text-[15px] sm:text-[17px] leading-[1.7] text-muted-foreground animate-slide-up stagger-2">
          VPN на протоколе <span className="font-semibold text-foreground">VLESS + XTLS-Reality</span> — невидим для блокировок, работает на скорости провайдера.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-3 animate-slide-up stagger-3">
          <Button variant="cta" size="lg" asChild className="h-13 px-10 text-[15px] min-h-[52px] gap-2 font-semibold rounded-xl">
            <Link to="/login">Подключить VPN <ArrowRight className="h-4 w-4" /></Link>
          </Button>
          <Button variant="outline" size="lg" asChild className="h-13 px-10 text-[15px] min-h-[52px] font-medium rounded-xl border-border hover:bg-secondary">
            <Link to="/setup">Как настроить</Link>
          </Button>
        </div>

        <p className="mt-5 text-[13px] text-muted-foreground animate-slide-up stagger-4">
          От 149 ₽/мес · Безлимитный трафик · Без логов
        </p>
      </div>
    </div>
  </section>
);

export default HeroSection;
