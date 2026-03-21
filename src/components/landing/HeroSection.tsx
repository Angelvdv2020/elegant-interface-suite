import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";

const HeroSection = () => (
  <section className="relative overflow-hidden pt-24 pb-8 sm:pt-32 sm:pb-12">
    {/* Subtle grid */}
    <div className="absolute inset-0 opacity-[0.03]" style={{
      backgroundImage: "linear-gradient(hsl(220 14% 70%) 1px, transparent 1px), linear-gradient(90deg, hsl(220 14% 70%) 1px, transparent 1px)",
      backgroundSize: "48px 48px",
    }} />

    {/* Gradient blobs */}
    <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-20 blur-3xl"
      style={{ background: "radial-gradient(circle, #E6F1FB, transparent 70%)" }} />
    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-15 blur-3xl"
      style={{ background: "radial-gradient(circle, #E1F5EE, transparent 70%)" }} />

    <div className="relative mx-auto max-w-4xl px-4 sm:px-6 text-center">
      {/* Badge */}
      <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-background px-3.5 py-1.5 shadow-soft animate-fade-up">
        <span className="h-1.5 w-1.5 rounded-full bg-success" />
        <span className="text-[12px] font-medium text-muted-foreground">Публичная бета — попробуйте бесплатно</span>
      </div>

      <h1 className="text-[32px] sm:text-[44px] lg:text-[56px] font-extrabold leading-[1.08] tracking-[-0.03em] text-foreground animate-fade-up delay-1">
        Редактируйте сайт<br />
        <span className="text-gradient-brand">прямо в браузере</span>
      </h1>

      <p className="mt-5 mx-auto max-w-xl text-[15px] sm:text-[17px] leading-[1.7] text-muted-foreground animate-fade-up delay-2">
        Визуальный редактор, который встраивается в любой сайт через один <code className="rounded bg-secondary px-1.5 py-0.5 text-[13px] font-mono text-foreground">&lt;script&gt;</code> тег. Без отдельной CMS.
      </p>

      <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 animate-fade-up delay-3">
        <Button size="lg" asChild className="h-11 px-7 text-[14px] gap-2 rounded-lg font-medium">
          <Link to="/signup">Попробовать бесплатно <ArrowRight className="h-4 w-4" /></Link>
        </Button>
        <Button variant="outline" size="lg" asChild className="h-11 px-7 text-[14px] gap-2 rounded-lg font-medium">
          <a href="#demo"><Play className="h-3.5 w-3.5" /> Демо за 2 минуты</a>
        </Button>
      </div>

      <p className="mt-4 text-[12px] text-muted-foreground animate-fade-up delay-4">
        Бесплатно до 3 страниц · Без карты · Настройка за 30 секунд
      </p>
    </div>
  </section>
);

export default HeroSection;
