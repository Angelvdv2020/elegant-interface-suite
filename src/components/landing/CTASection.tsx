import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const CTASection = () => (
  <section className="py-20 lg:py-28">
    <div className="mx-auto max-w-4xl px-4 sm:px-6">
      <div className="rounded-2xl border border-brand/20 bg-gradient-to-br from-brand-light via-background to-success-light px-8 py-16 text-center sm:px-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: "linear-gradient(hsl(212 75% 37%) 1px, transparent 1px), linear-gradient(90deg, hsl(212 75% 37%) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }} />
        <div className="relative">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground">Готовы редактировать визуально?</h2>
          <p className="mx-auto mt-4 max-w-lg text-[15px] text-muted-foreground">
            Подключите редактор за 30 секунд. Бесплатный план — без ограничений по времени.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button size="lg" className="h-11 px-8 text-[14px] gap-2 rounded-lg" asChild>
              <Link to="/signup">Начать бесплатно <ArrowRight className="h-4 w-4" /></Link>
            </Button>
            <Button variant="outline" size="lg" className="h-11 px-8 text-[14px] rounded-lg" asChild>
              <a href="#demo">Посмотреть демо</a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default CTASection;
