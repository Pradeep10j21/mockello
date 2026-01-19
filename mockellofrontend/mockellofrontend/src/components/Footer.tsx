import { Link } from "react-router-dom";
import { Leaf, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-sage flex items-center justify-center">
                <Leaf className="w-6 h-6 text-forest-deep" />
              </div>
              <span className="font-display text-xl font-semibold">
                GreenPath
              </span>
            </Link>
            <p className="text-primary-foreground/80 max-w-md">
              Connecting colleges and companies seamlessly through an intelligent
              placement ecosystem. Building bridges for future careers.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#about" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <Link to="/college/login" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  For Colleges
                </Link>
              </li>
              <li>
                <Link to="/company/login" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  For Companies
                </Link>
              </li>
              <li>
                <Link to="/student/login" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  For Students
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-primary-foreground/80">
                <Mail size={16} />
                <span>contact@greenpath.edu</span>
              </li>
              <li className="flex items-center gap-2 text-primary-foreground/80">
                <Phone size={16} />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-2 text-primary-foreground/80">
                <MapPin size={16} />
                <span>Mumbai, India</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-primary-foreground/60 text-sm">
            © 2024 GreenPath. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-primary-foreground/60 hover:text-primary-foreground text-sm transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-primary-foreground/60 hover:text-primary-foreground text-sm transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
