import { useEffect, useRef, useState } from "react";
import {
  Timer,
  Trophy,
  BarChart2,
  Target,
  Focus,
  Shield,
  Users2,
  Award
} from "lucide-react";

const features = [
  {
    icon: Timer,
    title: "Timed Precision",
    description: "Real exam conditions with company-specific time limits",
  },
  {
    icon: Trophy,
    title: "Live Leaderboard",
    description: "Compete with peers and track your ranking in real-time",
  },
  {
    icon: BarChart2,
    title: "Progress Analytics",
    description: "Detailed insights into your strengths and improvement areas",
  },
  {
    icon: Target,
    title: "Mock Arena",
    description: "Practice with unlimited mock tests across all categories",
  },
  {
    icon: Focus,
    title: "Flow State Mode",
    description: "Distraction-free environment for maximum concentration",
  },
  {
    icon: Shield,
    title: "Secure Testing",
    description: "Proctored assessments with anti-cheat technology",
  },
  {
    icon: Users2,
    title: "Peer Learning",
    description: "Connect with fellow aspirants and learn together",
  },
  {
    icon: Award,
    title: "Skill Badges",
    description: "Earn verified badges to showcase your achievements",
  },
];

const MockelloFeaturesSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-muted/30 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 bg-secondary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="inline-block px-4 py-1 rounded-full bg-accent/20 text-accent text-sm font-medium mb-4">
            Platform Features
          </span>
          <h2 className="text-4xl md:text-5xl font-bold font-serif text-foreground mb-4">
            Everything You Need to <span className="text-gradient-forest">Succeed</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Comprehensive tools and features designed to maximize your placement success
          </p>
        </div>

        {/* Features grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`card-forest group cursor-pointer transition-all duration-500 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 50 + 200}ms` }}
            >
              <div className="flex flex-col items-center text-center">
                {/* Icon */}
                <div className="w-14 h-14 rounded-2xl bg-secondary/20 flex items-center justify-center mb-4 group-hover:bg-secondary/30 group-hover:scale-110 transition-all duration-300">
                  <feature.icon className="w-7 h-7 text-secondary" />
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MockelloFeaturesSection;
