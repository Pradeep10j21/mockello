import MockelloHeader from "@/components/genz-placify/MockelloHeader";
import MockelloFooter from "@/components/genz-placify/MockelloFooter";
import MockelloHeroSection from "@/components/genz-placify/MockelloHeroSection";
import MockelloProblemStatement from "@/components/genz-placify/MockelloProblemStatement";
import MockelloStepsSection from "@/components/genz-placify/MockelloStepsSection";
import MockelloFeaturesSection from "@/components/genz-placify/MockelloFeaturesSection";
import MockelloTailoredTests from "@/components/genz-placify/MockelloTailoredTests";
import MockelloFinalCTA from "@/components/genz-placify/MockelloFinalCTA";

const MockelloLanding = () => {
  return (
    <div className="min-h-screen bg-background">
      <MockelloHeader />
      <main>
        <MockelloHeroSection />
        <MockelloProblemStatement />
        <MockelloStepsSection />
        <MockelloFeaturesSection />
        <MockelloTailoredTests />
        <MockelloFinalCTA />
      </main>
      <MockelloFooter />
    </div>
  );
};

export default MockelloLanding;
