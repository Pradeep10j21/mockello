import { useEffect, useState } from "react";
import { ArrowRight, Play, Code, BarChart3, Terminal, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const rotatingWords = ["Test", "Compete", "Succeed", "Get Placed"];

const FloatingElement = ({
  children,
  className,
  delay = 0
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) => (
  <div
    className={`absolute hidden lg:flex items-center gap-2 px-4 py-2 rounded-lg glass-forest text-sm font-mono text-primary ${className}`}
    style={{
      animation: `floatCode 4s ease-in-out infinite`,
      animationDelay: `${delay}s`
    }}
  >
    {children}
  </div>
);

const MockelloHeroSection = () => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-sage-light/30 via-transparent to-transparent" />

      {/* Animated background dots */}
      <div className="absolute inset-0 opacity-20">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-secondary"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${3 + Math.random() * 3}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Floating code elements */}
      <FloatingElement className="top-[15%] left-[5%]" delay={0}>
        <Code className="w-4 h-4 text-secondary" />
        <span>while(learning)</span>
      </FloatingElement>

      <FloatingElement className="top-[25%] right-[8%]" delay={0.5}>
        <Terminal className="w-4 h-4 text-accent" />
        <span>keep(growing→)</span>
      </FloatingElement>

      <FloatingElement className="bottom-[30%] left-[8%]" delay={1}>
        <BarChart3 className="w-4 h-4 text-secondary" />
        <span>analytics++</span>
      </FloatingElement>

      <FloatingElement className="bottom-[20%] right-[5%]" delay={1.5}>
        <Zap className="w-4 h-4 text-accent" />
        <span>skill.upgrade()</span>
      </FloatingElement>

      {/* Main content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        {/* Badge */}
        <div
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-secondary animate-pulseSoft" />
          <span className="text-sm font-medium text-primary">Your Gateway to Placements</span>
        </div>

        {/* Main heading with word rotation */}
        <h1
          className={`text-4xl md:text-6xl lg:text-7xl font-bold font-serif text-foreground mb-6 transition-all duration-700 delay-100 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          Where Aptitude Meets
          <br />
          <span className="relative inline-block h-[1.2em] overflow-hidden">
            <span className="text-gradient-forest">Opportunity</span>
          </span>
        </h1>

        {/* Rotating words */}
        <div
          className={`h-12 mb-8 transition-all duration-700 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="relative h-full flex items-center justify-center">
            {rotatingWords.map((word, index) => (
              <span
                key={word}
                className={`absolute text-2xl md:text-3xl font-semibold text-secondary transition-all duration-500 ${
                  index === currentWordIndex
                    ? 'opacity-100 translate-y-0'
                    : index < currentWordIndex
                      ? 'opacity-0 -translate-y-6'
                      : 'opacity-0 translate-y-6'
                }`}
              >
                {word}
              </span>
            ))}
          </div>
        </div>

        {/* Subheading */}
        <p
          className={`text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 transition-all duration-700 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          Master real-world aptitude tests. Practice with company-specific questions.
          Land your dream placement.
        </p>

        {/* CTA Buttons */}
        <div
          className={`flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 transition-all duration-700 delay-400 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <Button size="lg" className="btn-forest group px-8 py-6 text-lg" asChild>
            <Link to="/mock-placement/assessment">
              Begin Your Assessment
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="btn-outline-forest group px-8 py-6 text-lg"
          >
            <Play className="mr-2 w-5 h-5" />
            Sharpen Your Skills
          </Button>
        </div>

        {/* Stats bar */}
        <div
          className={`flex flex-wrap items-center justify-center gap-8 md:gap-12 transition-all duration-700 delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          {[
            { value: "50+", label: "Company Tests" },
            { value: "10K+", label: "Questions" },
            { value: "95%", label: "Success Rate" },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default MockelloHeroSection;
