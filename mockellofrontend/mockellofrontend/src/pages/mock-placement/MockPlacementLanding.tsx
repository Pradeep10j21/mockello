import { useEffect, useState } from "react";
import { ArrowRight, Play, Code, BarChart3, Terminal, Zap, BookOpen, Target, TrendingUp, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate, Link } from "react-router-dom";
import MockelloLogo from "@/components/MockelloLogo";

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
      animation: `float 4s ease-in-out infinite`,
      animationDelay: `${delay}s`
    }}
  >
    {children}
  </div>
);

const MockPlacementLanding = () => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleBeginAssessment = () => {
    navigate("/mock-placement/assessment");
  };

  const features = [
    {
      icon: BookOpen,
      title: 'Learn as You Go',
      description: 'Understand concepts when you make mistakes',
    },
    {
      icon: Target,
      title: 'Adaptive Assessment',
      description: 'Questions that challenge and teach',
    },
    {
      icon: TrendingUp,
      title: 'Track Your Progress',
      description: 'See your strengths and areas to improve',
    },
    {
      icon: Clock,
      title: 'Your Own Pace',
      description: 'No pressure, just learning',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:h-20">
            <Link to="/student/dashboard" className="flex items-center gap-2">
              <MockelloLogo size="sm" />
            </Link>
            <div className="flex items-center gap-4">
              <Link to="/student/dashboard" className="text-muted-foreground hover:text-foreground transition-colors">
                Back to Dashboard
              </Link>
              <Button className="btn-forest" onClick={handleBeginAssessment}>
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 bg-gradient-hero" />

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
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
            <span className="text-sm font-medium text-primary">Mock Placement Drive</span>
          </div>

          {/* Main heading */}
          <h1
            className={`text-4xl md:text-6xl lg:text-7xl font-bold font-serif text-foreground mb-6 transition-all duration-700 delay-100 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            Mockello: Where Aptitude Meets
            <br />
            <span className="text-gradient-forest">Opportunity</span>
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
            <Button size="lg" className="btn-forest group px-8 py-6 text-lg" onClick={handleBeginAssessment}>
              Begin Your Assessment
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
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
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-serif text-foreground mb-4">
              Everything You Need to <span className="text-gradient-forest">Succeed</span>
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <div
                key={index}
                className="card-forest group cursor-pointer"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-14 h-14 rounded-2xl bg-secondary/20 flex items-center justify-center mb-4 group-hover:bg-secondary/30 group-hover:scale-110 transition-all duration-300">
                    <feature.icon className="w-7 h-7 text-secondary" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-6 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-serif font-bold mb-4">
              How It Works
            </h2>
          </div>

          <div className="space-y-8">
            {[
              { step: "01", title: "Start Your Assessment", description: "Begin the aptitude test with company-specific questions designed for real placements." },
              { step: "02", title: "Answer & Learn", description: "Answer questions and get instant feedback. Learn from mistakes with detailed explanations." },
              { step: "03", title: "Track Progress", description: "Monitor your performance across different topics and difficulty levels." },
              { step: "04", title: "Get Results", description: "Receive comprehensive results and recommendations to improve your placement chances." },
            ].map((item, idx) => (
              <div key={idx} className="flex gap-6 items-start animate-fade-in" style={{ animationDelay: `${idx * 0.1}s` }}>
                <div className="w-16 h-16 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center font-serif font-bold text-xl shrink-0">
                  {item.step}
                </div>
                <div className="pt-2">
                  <h3 className="font-serif text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partner Companies */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-serif font-bold mb-4">
              Trusted by <span className="text-gradient-forest">Top Companies</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our platform is designed with input from leading companies to ensure you get the most relevant preparation.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center">
            {[
              "TechCorp", "DataFlow", "CloudNine", "AI Dynamics", "FinTech Pro", "InnovateLabs"
            ].map((company, index) => (
              <div key={index} className="flex items-center justify-center p-4 rounded-lg bg-card border border-border hover:shadow-md transition-shadow">
                <span className="text-lg font-semibold text-muted-foreground">{company}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Mockello. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default MockPlacementLanding;
