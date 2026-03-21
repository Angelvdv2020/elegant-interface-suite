import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const CTASection = () => (
  <section className="section-dark py-10 lg:py-14">
    <div className="section-container">
      <div className="rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/10 via-card to-accent/5 px-8 py-14 text-center sm:px-16">
        <h2 className="text-2xl font-extrabold sm:text-3xl lg:text-4xl">Готовы к свободному интернету?</h2>
        <p className="mx-auto mt-4 max-w-xl text-base text-muted-foreground">
          Подключитесь за 2 минуты. Безлимитный трафик, мгновенная выдача ключей, все устройства.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button variant="cta" size="lg" className="h-12 px-10 text-base gap-2 min-h-[48px] w-full sm:w-auto" asChild>
            <Link to="/login">Подключить VPN <ArrowRight className="h-4 w-4" /></Link>
          </Button>
          <Button variant="ghost" size="lg" className="text-base min-h-[48px] w-full sm:w-auto" asChild>
            <Link to="/setup">Как настроить?</Link>
          </Button>
        </div>
        <p className="mt-4 text-xs text-muted-foreground">От 149 ₽/мес • Без логов • Возврат 7 дней</p>
      </div>
    </div>
  </section>
);

export default CTASection;
