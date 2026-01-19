import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../services/apiConfig";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Leaf, Mail, Lock, ArrowLeft, Eye, EyeOff, Shield } from "lucide-react";
import { toast } from "sonner";
const AdminLogin = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_BASE_URL}/admin/login`, {

        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Authentication failed");
      }

      localStorage.setItem("token", data.access_token);
      localStorage.setItem("userRole", "admin");
      localStorage.setItem("userEmail", formData.email);

      toast.success("Welcome, Super Admin!");
      navigate("/admin/dashboard");
    } catch (error: any) {
      toast.error(error.message);
    }
  };
  return <div className="min-h-screen bg-background leaf-pattern flex">
    {/* Left Panel - Decorative */}
    <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-earth via-bark to-earth text-primary-foreground p-12 flex-col justify-between relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-hero opacity-30" />

      <div className="relative z-10">
        <Link to="/" className="flex items-center gap-3 mb-12">
          <div className="w-12 h-12 rounded-xl bg-transparent flex items-center justify-center overflow-hidden">
            <img src="/logo.png" alt="Mockello Logo" className="w-full h-full object-contain" />
          </div>
          <span className="font-display text-2xl font-semibold">Mockello
          </span>
        </Link>

        <h1 className="font-display text-4xl font-bold mb-4 animate-fade-up">
          Super Admin Portal
        </h1>
        <p className="text-primary-foreground/80 text-lg max-w-md animate-fade-up" style={{
          animationDelay: "0.1s"
        }}>
          Full platform control and oversight. Manage colleges, companies,
          students, and monitor all placement activities.
        </p>
      </div>

      <div className="relative z-10 space-y-6 animate-fade-up" style={{
        animationDelay: "0.2s"
      }}>
        {["Complete platform oversight", "Approve/reject registrations", "View comprehensive analytics"].map((feature, index) => <div key={index} className="flex items-center gap-3">
          <div className="w-6 h-6 rounded-full bg-gold/30 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-gold" />
          </div>
          <span className="text-primary-foreground/90">{feature}</span>
        </div>)}
      </div>
    </div>

    {/* Right Panel - Form */}
    <div className="flex-1 flex items-center justify-center p-8">
      <div className="w-full max-w-md">
        <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors">
          <ArrowLeft size={16} />
          <span>Back to Home</span>
        </Link>

        <div className="mb-8">
          <div className="w-16 h-16 rounded-2xl bg-earth mb-4 flex items-center justify-center shadow-medium">
            <Shield className="w-8 h-8 text-primary-foreground" />
          </div>
          <h2 className="font-display text-3xl font-bold text-foreground mb-2">
            Admin Access
          </h2>
          <p className="text-muted-foreground">
            Sign in with your administrator credentials
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">Admin Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input id="email" type="email" placeholder="admin@greenpath.edu" className="pl-10 input-forest" value={formData.email} onChange={e => setFormData({
                ...formData,
                email: e.target.value
              })} required />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input id="password" type={showPassword ? "text" : "password"} placeholder="••••••••" className="pl-10 pr-10 input-forest" value={formData.password} onChange={e => setFormData({
                ...formData,
                password: e.target.value
              })} required />
              <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <Button type="submit" variant="admin" size="lg" className="w-full">
            Access Dashboard
          </Button>

          <p className="text-center text-sm text-muted-foreground">
            This portal is restricted to authorized administrators only.
          </p>
        </form>
      </div>
    </div>
  </div>;
};
export default AdminLogin;