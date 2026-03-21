import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/landing/HeroSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import StatsSection from "@/components/landing/StatsSection";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
import PricingSection from "@/components/landing/PricingSection";
import DevicesSection from "@/components/landing/DevicesSection";
import ReviewsSection from "@/components/landing/ReviewsSection";
import PaymentSection from "@/components/landing/PaymentSection";
import ReferralSection from "@/components/landing/ReferralSection";
import FAQSection from "@/components/landing/FAQSection";
import CTASection from "@/components/landing/CTASection";

const Index = () => (
  <>
    <Header />
    <main className="pt-16">
      <HeroSection />
      <StatsSection />
      <FeaturesSection />
      <HowItWorksSection />
      <PricingSection />
      <DevicesSection />
      <ReviewsSection />
      <PaymentSection />
      <ReferralSection />
      <FAQSection />
      <CTASection />
    </main>
    <Footer />
  </>
);

export default Index;
