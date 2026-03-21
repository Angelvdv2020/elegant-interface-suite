import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const CTASection = () => (
  <section className="py-16 lg:py-24 bg-background">
    <div className="section-container">
      <div className="rounded-2xl border border-primary/20 px-8 py-16 text-center sm:px-16 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, hsl(220 80% 96%), hsl(220 20% 98%), hsl(42 60% 96%))" }}>
        {/* Grid decoration */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: "linear-gradient(hsl(220 72% 45%) 1px, transparent 1px), linear-gradient(90deg, hsl(220 72% 45%) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }} />
        <div className="relative">
          <h2 className="text-2xl font-extrabold sm:text-3xl lg:text-4xl text-foreground">Готовы к свободному интернету?</h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-muted-foreground">
            Подключитесь за 2 минуты. Безлимитный трафик, мгновенная выдача ключей, все устройства.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="cta" size="lg" className="h-12 px-10 text-base gap-2 min-h-[48px] w-full sm:w-auto rounded-xl" asChild>
              <Link to="/login">Подключить VPN <ArrowRight className="h-4 w-4" /></Link>
            </Button>
            <Button variant="outline" size="lg" className="text-base min-h-[48px] w-full sm:w-auto rounded-xl" asChild>
              <Link to="/setup">Как настроить?</Link>
            </Button>
          </div>
          <p className="mt-4 text-xs text-muted-foreground">От 149 ₽/мес • Без логов • Возврат 7 дней</p>
        </div>
      </div>
    </div>
  </section>
);

export default CTASection;
