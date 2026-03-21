import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import heroBg from "@/assets/hero-bg.png";

const HeroSection = () => (
  <section className="relative h-[60vh] sm:h-[70vh] lg:h-[calc(100vh-4rem)] flex flex-col overflow-hidden">
    <img src={heroBg} alt="" className="absolute inset-0 h-full w-full object-cover z-0" loading="eager" />

    <div className="relative z-10 flex-1 flex items-center justify-center sm:justify-end w-full px-4 sm:px-8 lg:px-[60px] py-10 lg:py-20">
      <div className="max-w-xl text-center sm:text-right lg:-mt-8 lg:mr-8 xl:mr-12">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/30 backdrop-blur-sm px-3.5 py-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          <span className="text-[12px] sm:text-[13px] font-light tracking-wide text-white/90">Серверы работают стабильно</span>
        </div>

        <h1 className="text-[28px] sm:text-[38px] lg:text-[58px] font-light leading-[1.05] tracking-[-0.02em] text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)]">
          Интернет без
          <br />
          <span className="font-bold text-primary">цензуры</span>{" "}
          <span className="font-bold">и&nbsp;ограничений</span>
        </h1>

        <p className="mt-4 sm:mt-5 mx-auto sm:ml-auto sm:mr-0 max-w-lg text-[13px] sm:text-[15px] leading-[1.7] font-light text-white/70 drop-shadow-[0_1px_6px_rgba(0,0,0,0.5)]">
          VPN на протоколе <span className="font-medium text-white/90">VLESS + XTLS-Reality</span> — невидим для блокировок, работает на скорости провайдера.
        </p>

        <div className="mt-5 sm:mt-7 flex flex-col sm:flex-row gap-3 justify-center sm:justify-end">
          <Button variant="cta" size="lg" asChild className="h-12 px-8 text-[14px] sm:text-[15px] min-h-[48px] gap-2 font-medium">
            <Link to="/login">Подключить VPN <ArrowRight className="h-4 w-4" /></Link>
          </Button>
          <Button size="lg" asChild className="h-12 px-8 text-[14px] sm:text-[15px] min-h-[48px] font-light bg-white/10 border border-white/20 text-white hover:bg-white/20 backdrop-blur-sm">
            <Link to="/setup">Как настроить</Link>
          </Button>
        </div>

        <p className="mt-4 text-[11px] sm:text-[13px] font-light tracking-wide text-white/40">
          От 149 ₽/мес • Безлимитный трафик • Без логов
        </p>
      </div>
    </div>
  </section>
);

export default HeroSection;
