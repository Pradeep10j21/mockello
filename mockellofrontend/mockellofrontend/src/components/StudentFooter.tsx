import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";
import MockelloLogo from "./MockelloLogo";

const StudentFooter = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <MockelloLogo size="sm" />
            <p className="text-primary-foreground/80 leading-relaxed">
              Empowering students to find the perfect career opportunities. Your journey to success starts here.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-serif text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/student/auth" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Student Login
                </Link>
              </li>
              <li>
                <Link to="/student/auth?mode=signup" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Create Account
                </Link>
              </li>
              <li>
                <Link to="/" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Contact Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-serif text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-primary-foreground/80">
                <Mail className="w-4 h-4" />
                support@studenthub.edu
              </li>
              <li className="flex items-center gap-3 text-primary-foreground/80">
                <Phone className="w-4 h-4" />
                +91 98765 43210
              </li>
              <li className="flex items-center gap-3 text-primary-foreground/80">
                <MapPin className="w-4 h-4" />
                Mumbai, India
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-primary-foreground/60 text-sm">
            © 2024 StudentHub. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <Link to="/" className="text-primary-foreground/60 hover:text-primary-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link to="/" className="text-primary-foreground/60 hover:text-primary-foreground transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default StudentFooter;
