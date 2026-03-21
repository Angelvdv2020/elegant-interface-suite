import LandingHeader from "@/components/LandingHeader";
import LandingFooter from "@/components/LandingFooter";
import HeroSection from "@/components/landing/HeroSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import EditorPreview from "@/components/landing/EditorPreview";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
import IntegrationsSection from "@/components/landing/IntegrationsSection";
import PricingSection from "@/components/landing/PricingSection";
import CTASection from "@/components/landing/CTASection";

const Index = () => (
  <>
    <LandingHeader />
    <main className="pt-14">
      <HeroSection />
      <EditorPreview />
      <FeaturesSection />
      <HowItWorksSection />
      <IntegrationsSection />
      <PricingSection />
      <CTASection />
    </main>
    <LandingFooter />
  </>
);

export default Index;
