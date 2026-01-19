import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Briefcase, Target, Award, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import StudentNavbar from "@/components/StudentNavbar";
import StudentFooter from "@/components/StudentFooter";

const FeatureCard = ({
  icon,
  title,
  description
}: {
  icon: ReactNode;
  title: string;
  description: string;
}) => (
  <Card className="group hover:shadow-lg transition-all duration-300 border-border/50 bg-card/50 backdrop-blur-sm">
    <CardContent className="p-8 text-center">
      <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <h3 className="font-serif text-xl font-semibold mb-3">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">{description}</p>
    </CardContent>
  </Card>
);

const StatCard = ({ value, label }: { value: string; label: string }) => (
  <div className="text-center">
    <p className="text-4xl md:text-5xl font-serif font-bold text-primary mb-2">{value}</p>
    <p className="text-muted-foreground">{label}</p>
  </div>
);

const StudentLandingPage = () => {
  return (
    <div className="min-h-screen bg-background leaf-pattern">
      <StudentNavbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 border border-border/50 mb-8 animate-fade-in">
            <GraduationCap className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-foreground">Student Placement Portal</span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold mb-6 leading-tight animate-fade-in" style={{ animationDelay: "0.1s" }}>
            Find Opportunities<br />
            <span className="text-primary italic">You're Eligible For</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed animate-fade-in" style={{ animationDelay: "0.2s" }}>
            Discover and apply to companies that match your skills and qualifications. Your career journey starts here with personalized placement opportunities.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <Button asChild size="lg">
              <Link to="/student/auth?mode=signup">
                <GraduationCap className="w-5 h-5 mr-2" />
                Student Sign Up
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/student/auth">
                Login to Dashboard <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-6 bg-secondary/30">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <StatCard value="500+" label="Partner Companies" />
            <StatCard value="10K+" label="Students Placed" />
            <StatCard value="95%" label="Success Rate" />
            <StatCard value="₹12L" label="Avg Package" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-serif font-bold mb-4">
              Why Choose StudentHub?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We connect talented students with top companies, making the placement process seamless and efficient.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Target className="w-7 h-7 text-primary" />}
              title="Auto Eligibility Check"
              description="Our system automatically matches your CGPA and branch with company requirements, showing only relevant opportunities."
            />
            <FeatureCard
              icon={<Briefcase className="w-7 h-7 text-primary" />}
              title="Easy Applications"
              description="Apply to multiple companies with a single click. Track all your applications in one convenient dashboard."
            />
            <FeatureCard
              icon={<Award className="w-7 h-7 text-primary" />}
              title="Real-time Updates"
              description="Get instant notifications about new opportunities, application status changes, and interview schedules."
            />
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
              { step: "01", title: "Create Your Profile", description: "Sign up and complete your academic details, skills, and upload your resume." },
              { step: "02", title: "Browse Opportunities", description: "View companies you're eligible for based on your profile and qualifications." },
              { step: "03", title: "Apply & Track", description: "Register for placement drives and track your application status in real-time." },
              { step: "04", title: "Get Placed", description: "Attend interviews and get your dream job offer!" },
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

      {/* CTA Section */}
      <section className="py-20 px-6 bg-primary text-primary-foreground">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-5xl font-serif font-bold mb-4 italic">
            Ready to Start Your Career Journey?
          </h2>
          <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto mb-8">
            Join thousands of students who have already found their dream jobs through our platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary">
              <Link to="/student/auth?mode=signup">
                Get Started Now <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <StudentFooter />
    </div>
  );
};

export default StudentLandingPage;
