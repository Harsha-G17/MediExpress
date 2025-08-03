import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { FeaturedProducts } from "@/components/FeaturedProducts";
import { Benefits } from "@/components/Benefits";
import { ConsultationCTA } from "@/components/ConsultationCTA";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <HowItWorks />
      <FeaturedProducts />
      <Benefits />
      <ConsultationCTA />
    </div>
  );
};

export default Index;