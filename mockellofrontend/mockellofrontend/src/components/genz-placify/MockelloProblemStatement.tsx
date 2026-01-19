import { useEffect, useRef, useState } from "react";
import { AlertTriangle, BookOpen, Brain, Clock, RotateCcw, CheckCircle, XCircle, Zap } from "lucide-react";

const MockelloProblemStatement = () => {
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

  const brokenLoopSteps = [
    { icon: BookOpen, label: "Lecture" },
    { icon: Brain, label: "Cram" },
    { icon: Clock, label: "Exam" },
    { icon: RotateCcw, label: "Forget" },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative py-24 bg-primary overflow-hidden"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 5c-5 10-15 15-25 15 5 10 15 25 25 35 10-10 20-25 25-35-10 0-20-5-25-15z' fill='%23ffffff' fill-opacity='1'/%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 mb-6">
            <AlertTriangle className="w-5 h-5 text-accent" />
            <span className="text-sm font-semibold text-accent">Reality Check</span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-serif text-primary-foreground mb-4">
            The <span className="text-accent">'Ctrl+C, Ctrl+V'</span> Crisis
          </h2>

          {/* Keyboard keys visual */}
          <div className="flex items-center justify-center gap-2 mt-6">
            <div className="px-4 py-2 bg-primary-foreground/10 rounded-lg border border-primary-foreground/20">
              <span className="text-primary-foreground font-mono text-sm">Ctrl</span>
            </div>
            <span className="text-primary-foreground/50">+</span>
            <div className="px-4 py-2 bg-primary-foreground/10 rounded-lg border border-primary-foreground/20">
              <span className="text-primary-foreground font-mono text-sm">C</span>
            </div>
            <span className="text-primary-foreground/30 mx-2">→</span>
            <div className="px-4 py-2 bg-primary-foreground/10 rounded-lg border border-primary-foreground/20">
              <span className="text-primary-foreground font-mono text-sm">Ctrl</span>
            </div>
            <span className="text-primary-foreground/50">+</span>
            <div className="px-4 py-2 bg-primary-foreground/10 rounded-lg border border-primary-foreground/20">
              <span className="text-primary-foreground font-mono text-sm">V</span>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className={`max-w-4xl mx-auto text-center mb-16 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-lg md:text-xl text-primary-foreground/80 leading-relaxed">
            Let's be real. The current system is <span className="text-accent font-semibold">glitchy</span>.
            You attend lectures, mug up definitions 24 hours before the exam, vomit it onto a paper,
            and hit <span className="font-mono bg-primary-foreground/10 px-2 py-1 rounded">'Reset.'</span>
          </p>
        </div>

        {/* The Broken Loop */}
        <div className={`mb-16 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h3 className="text-center text-xl font-semibold text-primary-foreground/70 mb-8">The Broken Loop</h3>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {brokenLoopSteps.map((step, index) => (
              <div key={index} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-primary-foreground/10 border border-primary-foreground/20 flex items-center justify-center mb-2">
                    <step.icon className="w-7 h-7 text-primary-foreground/70" />
                  </div>
                  <span className="text-sm text-primary-foreground/60">{step.label}</span>
                </div>
                {index < brokenLoopSteps.length - 1 && (
                  <div className="mx-3 text-primary-foreground/30 text-2xl">→</div>
                )}
                {index === brokenLoopSteps.length - 1 && (
                  <div className="mx-3 text-accent text-2xl">↻</div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* The Result */}
        <div className={`grid md:grid-cols-2 gap-6 max-w-3xl mx-auto mb-16 transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="bg-primary-foreground/5 rounded-2xl p-6 border border-primary-foreground/10">
            <h4 className="text-lg font-semibold text-primary-foreground mb-4">The Result?</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-secondary" />
                <span className="text-primary-foreground/80">You have a degree</span>
              </div>
              <div className="flex items-center gap-3">
                <XCircle className="w-5 h-5 text-destructive" />
                <span className="text-primary-foreground/80">Zero deployment skills</span>
              </div>
            </div>
          </div>

          <div className="bg-primary-foreground/5 rounded-2xl p-6 border border-primary-foreground/10">
            <h4 className="text-lg font-semibold text-primary-foreground mb-4">The Problem</h4>
            <p className="text-primary-foreground/70 text-sm leading-relaxed">
              You're easily distracted by the noise, doom-scrolling through theory
              without ever touching the practical reality.
            </p>
          </div>
        </div>

        {/* The Solution */}
        <div className={`text-center transition-all duration-700 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-accent/20 border border-accent/30">
            <Zap className="w-6 h-6 text-accent" />
            <span className="text-lg font-bold text-accent">Mockello is the patch.</span>
          </div>

          <p className="max-w-3xl mx-auto mt-8 text-primary-foreground/80 text-lg leading-relaxed">
            We don't ask you <span className="font-mono bg-primary-foreground/10 px-2 py-1 rounded">'What is Polymorphism?'</span>
            <br />
            We ask you to <span className="text-accent font-bold">break it</span>.
          </p>

          <p className="max-w-2xl mx-auto mt-6 text-primary-foreground/60">
            We strip away the distraction and force you into a <span className="text-secondary font-semibold">Flow State</span>.
            No textbooks. No memorization. Just you, a problem, and the clock.
          </p>
        </div>
      </div>
    </section>
  );
};

export default MockelloProblemStatement;
