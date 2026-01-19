import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Building2,
  GraduationCap,
  Users,
  BarChart3,
  LogOut,
  Leaf,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface AdminSidebarProps {
  onLogout?: () => void;
}

const AdminSidebar = ({ onLogout }: AdminSidebarProps) => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/admin/dashboard" },
    { icon: GraduationCap, label: "Colleges", path: "/admin/colleges" },
    { icon: Building2, label: "Companies", path: "/admin/companies" },
    { icon: Users, label: "Students", path: "/admin/students" },
    { icon: BarChart3, label: "Analytics", path: "/admin/analytics" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <aside
      className={cn(
        "h-screen bg-earth text-primary-foreground flex flex-col transition-all duration-300 sticky top-0",
        collapsed ? "w-20" : "w-64"
      )}
    >
      {/* Logo */}
      <div className="p-4 border-b border-bark/30">
        <Link to="/admin/dashboard" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-transparent flex items-center justify-center flex-shrink-0 overflow-hidden">
            <img src="/logo.png" alt="Mockello Logo" className="w-full h-full object-contain" />
          </div>
          {!collapsed && (
            <div>
              <span className="font-display text-lg font-semibold block">Mockello</span>
              <span className="text-xs text-primary-foreground/60">Super Admin</span>
            </div>
          )}
        </Link>
      </div>

      {/* Toggle Button */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-20 w-6 h-6 rounded-full bg-gold text-bark flex items-center justify-center shadow-md hover:bg-gold-light transition-colors"
      >
        {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </button>

      {/* Navigation */}
      <nav className="flex-1 py-6">
        <ul className="space-y-1 px-3">
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200",
                  isActive(item.path)
                    ? "bg-bark text-primary-foreground border-l-4 border-gold"
                    : "text-primary-foreground/80 hover:bg-bark/50 hover:text-primary-foreground"
                )}
              >
                <item.icon size={20} className="flex-shrink-0" />
                {!collapsed && <span className="font-medium">{item.label}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-bark/30">
        <button
          onClick={onLogout}
          className={cn(
            "flex items-center gap-3 w-full px-4 py-3 rounded-lg text-primary-foreground/80 hover:bg-destructive/20 hover:text-destructive-foreground transition-all duration-200",
            collapsed && "justify-center"
          )}
        >
          <LogOut size={20} className="flex-shrink-0" />
          {!collapsed && <span className="font-medium">Logout</span>}
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
