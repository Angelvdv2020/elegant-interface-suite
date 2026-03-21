import { Link } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import PricingSection from "@/components/landing/PricingSection";

const PricingPage = () => (
  <PageLayout>
    {/* ── Breadcrumb ── */}
    <div
      className="flex items-center gap-2 text-xs text-white/25 px-6 sm:px-12 pt-[18px] relative"
      style={{ zIndex: 1, fontFamily: "'Mulish', sans-serif" }}
    >
      <Link to="/" className="text-[#00ff88] font-medium no-underline hover:underline">
        Главная
      </Link>
      <span>/</span>
      <span className="text-[#e8f0e8]/[0.72]">Тарифные планы</span>
    </div>

    {/* ── Pricing Section ── */}
    <div className="relative" style={{ zIndex: 1 }}>
      <PricingSection />
    </div>
  </PageLayout>
);

export default PricingPage;
