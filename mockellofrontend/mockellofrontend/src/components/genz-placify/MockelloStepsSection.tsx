import { useEffect, useRef, useState } from "react";
import { FileText, Users, Bot, Briefcase, CheckCircle2 } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const steps = [
  {
    id: "step-1",
    number: "01",
    title: "Aptitude Test",
    subtitle: "Prove Your Skills",
    icon: FileText,
    color: "bg-secondary",
    description: "Take company-curated aptitude assessments designed to evaluate your logical reasoning, quantitative skills, and domain knowledge.",
    points: [
      "Timed assessments with real company patterns",
      "Adaptive difficulty based on your performance",
      "Instant scoring and detailed analytics",
      "Top scorers advance to the next round",
    ],
  },
  {
    id: "step-2",
    number: "02",
    title: "Group Discussion",
    subtitle: "Collaborate & Communicate",
    icon: Users,
    color: "bg-accent",
    description: "Engage in real-time group discussions with other candidates to showcase your communication, leadership, and teamwork abilities.",
    points: [
      "Live video discussions with peers",
      "AI-moderated sessions for fairness",
      "Topic-based debates and case studies",
      "Soft skills evaluation by AI judges",
    ],
  },
  {
    id: "step-3",
    number: "03",
    title: "AI Interview",
    subtitle: "Practice Makes Perfect",
    icon: Bot,
    color: "bg-forest-light",
    description: "Face a personalized AI-powered interview that adapts to your responses and provides real-time feedback on your performance.",
    points: [
      "Natural conversation with AI interviewer",
      "Technical and behavioral questions",
      "Real-time feedback and suggestions",
      "Unlimited practice sessions available",
    ],
  },
  {
    id: "step-4",
    number: "04",
    title: "Company Interview",
    subtitle: "Meet Your Future Employer",
    icon: Briefcase,
    color: "bg-earth",
    description: "The final step — a face-to-face interview with company officials to assess your technical expertise, communication skills, and cultural fit.",
    points: [
      "Direct interaction with HR and technical panels",
      "Company-specific technical assessments",
      "Salary negotiation and offer discussions",
      "Feedback provided after each interview",
    ],
  },
];

const MockelloStepsSection = () => {
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
    <section ref={sectionRef} className="py-24 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-sage-light/30 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold-light/30 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="inline-block px-4 py-1 rounded-full bg-secondary/20 text-secondary text-sm font-medium mb-4">
            Your Journey
          </span>
          <h2 className="text-4xl md:text-5xl font-bold font-serif text-foreground mb-4">
            4 Steps to Your <span className="text-gradient-forest">Dream Job</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A structured pathway designed to prepare you for every stage of the placement process
          </p>
        </div>

        {/* Timeline */}
        <div className="max-w-4xl mx-auto">
          {/* Progress line */}
          <div className="hidden md:block absolute left-1/2 top-[280px] bottom-48 w-0.5 bg-border -translate-x-1/2" />

          <Accordion type="single" collapsible className="space-y-6">
            {steps.map((step, index) => (
              <AccordionItem
                key={step.id}
                value={step.id}
                className={`border-0 transition-all duration-500 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 100 + 200}ms` }}
              >
                <div className="relative">
                  {/* Step number badge - visible on md+ */}
                  <div className="hidden md:flex absolute -left-20 top-6 w-12 h-12 rounded-full bg-primary text-primary-foreground items-center justify-center font-bold text-lg z-10">
                    {step.number}
                  </div>

                  <div className="card-forest overflow-hidden">
                    <AccordionTrigger className="px-6 py-6 hover:no-underline group">
                      <div className="flex items-center gap-4 w-full">
                        {/* Mobile step number */}
                        <div className="md:hidden flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                          {step.number}
                        </div>

                        {/* Icon */}
                        <div className={`flex-shrink-0 w-14 h-14 rounded-xl ${step.color} flex items-center justify-center`}>
                          <step.icon className="w-7 h-7 text-primary-foreground" />
                        </div>

                        {/* Title & subtitle */}
                        <div className="text-left flex-1">
                          <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                            {step.title}
                          </h3>
                          <p className="text-sm text-muted-foreground">{step.subtitle}</p>
                        </div>
                      </div>
                    </AccordionTrigger>

                    <AccordionContent className="px-6 pb-6">
                      <div className="pl-0 md:pl-18 space-y-4">
                        <p className="text-muted-foreground leading-relaxed">
                          {step.description}
                        </p>

                        <ul className="space-y-3">
                          {step.points.map((point, pointIndex) => (
                            <li key={pointIndex} className="flex items-start gap-3">
                              <CheckCircle2 className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                              <span className="text-foreground">{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </AccordionContent>
                  </div>
                </div>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default MockelloStepsSection;
