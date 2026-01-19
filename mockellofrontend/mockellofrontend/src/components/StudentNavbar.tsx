import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import MockelloLogo from "./MockelloLogo";

const StudentNavbar = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="container mx-auto px-6">
        <nav className="flex items-center justify-between h-16">
          <MockelloLogo size="sm" />

          <div className="flex items-center gap-6">
            <Link
              to="/"
              className="text-muted-foreground hover:text-foreground transition-colors font-medium"
            >
              Back to Home
            </Link>
            <Link
              to="/student/auth"
              className="text-muted-foreground hover:text-foreground transition-colors font-medium"
            >
              Login
            </Link>
            <Button asChild size="sm">
              <Link to="/student/auth?mode=signup">Sign Up</Link>
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default StudentNavbar;
