import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import FloatingLeaves from "@/components/FloatingLeaves";
import { TreeDeciduous, Users, Building2, CheckCircle, ArrowRight } from "lucide-react";
const Index = () => {
  return <div className="min-h-screen bg-background leaf-pattern">
      <FloatingLeaves />
      <Header />
      
      {/* Hero Section */}
      <HeroSection />

      {/* About Section */}
      <section id="about" className="py-20 bg-card relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 animate-fade-up">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">Why Choose Mockello?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our platform revolutionizes the placement process by creating seamless 
              connections between educational institutions and industry leaders.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[{
            icon: TreeDeciduous,
            title: "Sustainable Growth",
            description: "Like a forest ecosystem, we nurture long-term relationships between colleges and companies for sustainable career growth."
          }, {
            icon: Users,
            title: "Smart Matching",
            description: "Our intelligent algorithm matches student skills with company requirements, ensuring the perfect fit for both parties."
          }, {
            icon: Building2,
            title: "Industry Connections",
            description: "Access a vast network of top-tier companies actively seeking fresh talent from premier educational institutions."
          }].map((feature, index) => <div key={index} className="card-forest text-center animate-fade-up" style={{
            animationDelay: `${index * 0.1}s`
          }}>
                <div className="w-16 h-16 rounded-2xl bg-sage-light mx-auto mb-6 flex items-center justify-center">
                  <feature.icon className="w-8 h-8 text-forest-medium" />
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>)}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              How It Works
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Get started in three simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-16 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-sage via-forest-light to-sage" />

            {[{
            step: "01",
            title: "Register",
            description: "Sign up as a college, company, or student with verified credentials."
          }, {
            step: "02",
            title: "Connect",
            description: "Browse opportunities, post requirements, or apply for positions."
          }, {
            step: "03",
            title: "Grow",
            description: "Build lasting relationships and achieve placement success."
          }].map((item, index) => <div key={index} className="text-center animate-fade-up" style={{
            animationDelay: `${index * 0.1}s`
          }}>
                <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground font-display text-2xl font-bold flex items-center justify-center mx-auto mb-6 shadow-medium relative z-10">
                  {item.step}
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                  {item.title}
                </h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>)}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-canopy text-primary-foreground">
        <div className="container mx-auto px-6 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Placements?
          </h2>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto mb-8">
            Join thousands of colleges and companies already using GreenPath 
            to streamline their placement processes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/college/login" className="inline-flex items-center justify-center gap-2 bg-sage text-forest-deep px-8 py-4 rounded-xl font-semibold hover:bg-sage-light transition-all duration-300 shadow-medium hover:shadow-glow hover:-translate-y-1">
              Get Started
              <ArrowRight className="w-5 h-5" />
            </a>
            <a href="#about" className="inline-flex items-center justify-center gap-2 border-2 border-primary-foreground/30 text-primary-foreground px-8 py-4 rounded-xl font-semibold hover:bg-primary-foreground/10 transition-all duration-300">
              Learn More
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>;
};
export default Index;