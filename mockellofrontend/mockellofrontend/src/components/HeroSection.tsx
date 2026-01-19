import { Link } from "react-router-dom";
import { Building2, GraduationCap, Users, Shield, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  const loginOptions = [
    {
      title: "Login as Company",
      icon: Building2,
      path: "/company/login",
      variant: "company" as const,
      description: "Find top talent",
    },
    {
      title: "Login as College",
      icon: GraduationCap,
      path: "/college/login",
      variant: "college" as const,
      description: "Manage placements",
    },
    {
      title: "Login as Student",
      icon: Users,
      path: "/student/login",
      variant: "student" as const,
      description: "Explore careers",
    },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-hero pointer-events-none" />
      <div className="absolute top-20 right-10 w-72 h-72 bg-sage/20 rounded-full blur-3xl animate-pulse-soft" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-forest-pale/30 rounded-full blur-3xl animate-pulse-soft" style={{ animationDelay: "1s" }} />
      
      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-sage-light px-4 py-2 rounded-full mb-8 animate-fade-up">
            <Sparkles className="w-4 h-4 text-forest-medium" />
            <span className="text-sm font-medium text-forest-deep">Intelligent Placement Ecosystem</span>
          </div>

          {/* Main Heading */}
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 animate-fade-up" style={{ animationDelay: "0.1s" }}>
            Connecting Colleges & Companies{" "}
            <span className="text-gradient-forest">Seamlessly</span>
          </h1>

          {/* Subtext */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 animate-fade-up" style={{ animationDelay: "0.2s" }}>
            GreenPath bridges the gap between education and industry, creating an 
            intelligent placement ecosystem that nurtures careers and builds futures.
          </p>

          {/* CTA Buttons Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto animate-fade-up" style={{ animationDelay: "0.3s" }}>
            {loginOptions.map((option, index) => (
              <Link
                key={option.path}
                to={option.path}
                className="group"
                style={{ animationDelay: `${0.4 + index * 0.1}s` }}
              >
                <div className="card-forest h-full flex flex-col items-center text-center p-6 hover:scale-105 transition-all duration-300">
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-colors duration-300 ${
                    option.variant === 'company' ? 'bg-forest-medium text-primary-foreground' :
                    option.variant === 'college' ? 'bg-sage text-forest-deep' :
                    option.variant === 'student' ? 'bg-accent text-accent-foreground' :
                    'bg-earth text-primary-foreground'
                  }`}>
                    <option.icon className="w-7 h-7" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-1">{option.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{option.description}</p>
                  <div className="flex items-center gap-1 text-primary font-medium text-sm group-hover:gap-2 transition-all duration-300">
                    <span>Continue</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto animate-fade-up" style={{ animationDelay: "0.6s" }}>
          {[
            { value: "500+", label: "Partner Colleges" },
            { value: "1,200+", label: "Companies" },
            { value: "50K+", label: "Students Placed" },
            { value: "98%", label: "Success Rate" },
          ].map((stat, index) => (
            <div
              key={index}
              className="text-center p-4"
            >
              <div className="font-display text-3xl md:text-4xl font-bold text-forest-medium mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
