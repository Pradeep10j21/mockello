import { useEffect, useRef, useState } from "react";
import {
  Cpu,
  LineChart,
  Layers,
  Landmark,
  HeartPulse,
  Rocket
} from "lucide-react";

const categories = [
  {
    icon: Cpu,
    title: "Tech Giants",
    companies: ["Google", "Microsoft", "Amazon", "Meta"],
    color: "from-blue-500/20 to-cyan-500/20",
    borderColor: "border-blue-500/30",
  },
  {
    icon: LineChart,
    title: "Consulting",
    companies: ["McKinsey", "BCG", "Bain", "Deloitte"],
    color: "from-purple-500/20 to-pink-500/20",
    borderColor: "border-purple-500/30",
  },
  {
    icon: Layers,
    title: "Product",
    companies: ["Flipkart", "Swiggy", "Razorpay", "CRED"],
    color: "from-orange-500/20 to-red-500/20",
    borderColor: "border-orange-500/30",
  },
  {
    icon: Landmark,
    title: "Finance",
    companies: ["Goldman Sachs", "Morgan Stanley", "JP Morgan"],
    color: "from-green-500/20 to-emerald-500/20",
    borderColor: "border-green-500/30",
  },
  {
    icon: HeartPulse,
    title: "Healthcare",
    companies: ["Philips", "Siemens", "GE Healthcare"],
    color: "from-rose-500/20 to-pink-500/20",
    borderColor: "border-rose-500/30",
  },
  {
    icon: Rocket,
    title: "Startups",
    companies: ["Zerodha", "Groww", "Ola", "Dunzo"],
    color: "from-amber-500/20 to-yellow-500/20",
    borderColor: "border-amber-500/30",
  },
];

const MockelloTailoredTests = () => {
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
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Company-Specific
          </span>
          <h2 className="text-4xl md:text-5xl font-bold font-serif text-foreground mb-4">
            No <span className="text-gradient-forest">One-Size-Fits-All</span> Here
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Practice with tests tailored to the exact patterns of your dream companies
          </p>
        </div>

        {/* Categories grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {categories.map((category, index) => (
            <div
              key={index}
              className={`relative group cursor-pointer overflow-hidden rounded-2xl border ${category.borderColor} bg-card p-6 transition-all duration-500 hover:-translate-y-2 hover:shadow-lg ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 80 + 200}ms` }}
            >
              {/* Background gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-50 group-hover:opacity-70 transition-opacity`} />

              <div className="relative z-10">
                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-background/80 flex items-center justify-center mb-4">
                  <category.icon className="w-6 h-6 text-primary" />
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-foreground mb-3">
                  {category.title}
                </h3>

                {/* Companies */}
                <div className="flex flex-wrap gap-2">
                  {category.companies.map((company, companyIndex) => (
                    <span
                      key={companyIndex}
                      className="px-3 py-1 text-xs font-medium bg-background/80 rounded-full text-muted-foreground"
                    >
                      {company}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MockelloTailoredTests;
