import { Link } from "react-router-dom";
import { GraduationCap } from "lucide-react";

const StudentLogo = ({ variant = "default" }: { variant?: "default" | "light" }) => {
  return (
    <Link to="/student" className="flex items-center gap-2 group">
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-105 ${
        variant === "light"
          ? "bg-primary-foreground/20 text-primary-foreground"
          : "bg-primary text-primary-foreground"
      }`}>
        <GraduationCap className="w-5 h-5" />
      </div>
      <span className={`text-xl font-serif font-semibold ${
        variant === "light" ? "text-primary-foreground" : "text-foreground"
      }`}>
        StudentHub
      </span>
    </Link>
  );
};

export default StudentLogo;
