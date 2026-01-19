import { Link } from "react-router-dom";
import { Leaf, Menu, X, Shield } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return <header className="fixed top-0 left-0 right-0 z-50 glass-forest">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-transparent flex items-center justify-center shadow-soft group-hover:shadow-medium transition-all duration-300 overflow-hidden">
              <img src="/logo.png" alt="Mockello Logo" className="w-full h-full object-contain" />
            </div>
            <span className="font-display text-xl font-semibold text-foreground">Mockello</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Button variant="forest" size="sm" asChild>
              <Link to="/admin/login" className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                Super Admin
              </Link>
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2 text-foreground" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && <nav className="md:hidden mt-4 pb-4 flex flex-col gap-4 animate-fade-up">
            <Button variant="forest" size="sm" asChild>
              <Link to="/admin/login" className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                Super Admin
              </Link>
            </Button>
          </nav>}
      </div>
    </header>;
};
export default Header;