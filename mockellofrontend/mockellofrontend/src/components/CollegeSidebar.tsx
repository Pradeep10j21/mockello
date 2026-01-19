import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Building2, UserCircle, Target, LogOut, Leaf, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
interface CollegeSidebarProps {
  onLogout?: () => void;
}
const CollegeSidebar = ({
  onLogout
}: CollegeSidebarProps) => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const menuItems = [{
    icon: LayoutDashboard,
    label: "Dashboard",
    path: "/college/dashboard"
  }, {
    icon: UserCircle,
    label: "College Profile",
    path: "/college/profile"
  }, {
    icon: Building2,
    label: "Companies",
    path: "/college/companies"
  }, {
    icon: Target,
    label: "Eligibility Tracker",
    path: "/college/eligibility"
  }];
  const isActive = (path: string) => location.pathname === path;
  return <aside className={cn("h-screen bg-primary text-primary-foreground flex flex-col transition-all duration-300 sticky top-0", collapsed ? "w-20" : "w-64")}>
      {/* Logo */}
      <div className="p-4 border-b border-sidebar-border">
        <Link to="/college/dashboard" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-transparent flex items-center justify-center flex-shrink-0 overflow-hidden">
            <img src="/logo.png" alt="Mockello Logo" className="w-full h-full object-contain" />
          </div>
          {!collapsed && <span className="font-display text-lg font-semibold">Mockello
        </span>}
        </Link>
      </div>

      {/* Toggle Button */}
      <button onClick={() => setCollapsed(!collapsed)} className="absolute -right-3 top-20 w-6 h-6 rounded-full bg-sage text-forest-deep flex items-center justify-center shadow-md hover:bg-sage-light transition-colors">
        {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </button>

      {/* Navigation */}
      <nav className="flex-1 py-6">
        <ul className="space-y-1 px-3">
          {menuItems.map(item => <li key={item.path}>
              <Link to={item.path} className={cn("flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200", isActive(item.path) ? "bg-sidebar-accent text-sidebar-accent-foreground border-l-4 border-sage" : "text-primary-foreground/80 hover:bg-sidebar-accent/50 hover:text-primary-foreground")}>
                <item.icon size={20} className="flex-shrink-0" />
                {!collapsed && <span className="font-medium">{item.label}</span>}
              </Link>
            </li>)}
        </ul>
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-sidebar-border">
        <button onClick={onLogout} className={cn("flex items-center gap-3 w-full px-4 py-3 rounded-lg text-primary-foreground/80 hover:bg-destructive/20 hover:text-destructive-foreground transition-all duration-200", collapsed && "justify-center")}>
          <LogOut size={20} className="flex-shrink-0" />
          {!collapsed && <span className="font-medium">Logout</span>}
        </button>
      </div>
    </aside>;
};
export default CollegeSidebar;