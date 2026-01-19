import { useEffect, useRef, useState } from "react";
import { ArrowRight, Play, Building2, Bot, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const trustBadges = [
  { icon: Building2, text: "50+ Company Tests" },
  { icon: Bot, text: "AI-Powered Prep" },
  { icon: Users, text: "10,000+ Learners" },
];

const colleges = [
  "IIT Delhi",
  "NIT Trichy",
  "BITS Pilani",
  "VIT Vellore",
  "SRM Chennai",
  "IIIT Hyderabad",
];

const MockelloFinalCTA = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-primary relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 5c-5 10-15 15-25 15 5 10 15 25 25 35 10-10 20-25 25-35-10 0-20-5-25-15z' fill='%23ffffff' fill-opacity='1'/%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Glowing orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-secondary/20 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main heading */}
          <h2
            className={`text-4xl md:text-5xl lg:text-6xl font-bold font-serif text-primary-foreground mb-6 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Ready to Prove You're{" "}
            <span className="text-accent">Placement-Ready</span>?
          </h2>

          {/* Subtext */}
          <p
            className={`text-xl text-primary-foreground/80 mb-10 transition-all duration-700 delay-100 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Join thousands of students who transformed their placement journey with Mockello
          </p>

          {/* CTA Buttons */}
          <div
            className={`flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <Button
              size="lg"
              className="bg-accent hover:bg-accent/90 text-accent-foreground group px-8 py-6 text-lg font-semibold"
              asChild
            >
              <Link to="/mock-placement/assessment">
                Start Your Test Now
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 group px-8 py-6 text-lg"
            >
              <Play className="mr-2 w-5 h-5" />
              Practice First
            </Button>
          </div>

          {/* Trust badges */}
          <div
            className={`flex flex-wrap items-center justify-center gap-8 mb-12 transition-all duration-700 delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {trustBadges.map((badge, index) => (
              <div key={index} className="flex items-center gap-2">
                <badge.icon className="w-5 h-5 text-secondary" />
                <span className="text-primary-foreground/80">{badge.text}</span>
              </div>
            ))}
          </div>

          {/* Trusted by colleges */}
          <div
            className={`transition-all duration-700 delay-400 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <p className="text-primary-foreground/60 text-sm mb-4">
              Trusted by students from
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              {colleges.map((college, index) => (
                <span
                  key={index}
                  className="px-4 py-2 rounded-full bg-primary-foreground/10 text-primary-foreground/80 text-sm font-medium"
                >
                  {college}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MockelloFinalCTA;
