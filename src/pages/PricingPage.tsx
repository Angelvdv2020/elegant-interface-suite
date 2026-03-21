import LandingHeader from "@/components/LandingHeader";
import LandingFooter from "@/components/LandingFooter";
import PricingSection from "@/components/landing/PricingSection";

const PricingPage = () => (
  <>
    <LandingHeader />
    <main className="pt-14">
      <PricingSection />
    </main>
    <LandingFooter />
  </>
);

export default PricingPage;
