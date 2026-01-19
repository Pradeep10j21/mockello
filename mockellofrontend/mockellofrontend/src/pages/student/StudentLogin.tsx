import { Link } from "react-router-dom";
import { Users, ArrowLeft, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";

const StudentLogin = () => {
  return (
    <div className="min-h-screen bg-background leaf-pattern flex items-center justify-center p-6">
      <div className="w-full max-w-md text-center">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors"
        >
          <ArrowLeft size={16} />
          <span>Back to Home</span>
        </Link>

        <div className="card-forest">
          <div className="w-20 h-20 rounded-2xl bg-accent mx-auto mb-6 flex items-center justify-center shadow-medium">
            <Users className="w-10 h-10 text-accent-foreground" />
          </div>

          <h1 className="font-display text-3xl font-bold text-foreground mb-4">
            Student Portal
          </h1>

          <div className="flex items-center justify-center gap-2 text-forest-medium mb-6">
            <Wrench size={18} />
            <span className="text-sm font-medium">Under Development</span>
          </div>

          <p className="text-muted-foreground mb-8">
            The Student module is currently being handled by another team. 
            This portal will enable students to view opportunities, 
            apply for positions, and track their application status.
          </p>

          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-muted/50 text-left">
              <h3 className="font-semibold text-foreground mb-2">Coming Soon:</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Student profile & resume builder</li>
                <li>• View eligible opportunities</li>
                <li>• Apply to positions</li>
                <li>• Application status tracking</li>
                <li>• Interview scheduling</li>
              </ul>
            </div>

            <Button variant="student" className="w-full" asChild>
              <Link to="/">Return to Home</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentLogin;
