import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../services/apiConfig";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Leaf, Mail, Lock, ArrowLeft, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
const CollegeLogin = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    collegeName: ""
  });
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLogin && formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const endpoint = isLogin
        ? `${API_BASE_URL}/college/login`
        : `${API_BASE_URL}/college/register`;


      const payload = isLogin
        ? { email: formData.email, password: formData.password }
        : {
          email: formData.email,
          password: formData.password,
          collegeName: formData.collegeName
        };

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 403) {
          navigate("/approval-pending");
          return;
        }
        throw new Error(data.detail || "Authentication failed");
      }

      localStorage.setItem("token", data.access_token);
      localStorage.setItem("userRole", "college");
      localStorage.setItem("userEmail", formData.email);

      toast.success(isLogin ? "Welcome back!" : "Account created successfully!");
      navigate(isLogin ? "/college/dashboard" : "/college/onboarding");
    } catch (error: any) {
      toast.error(error.message);
    }
  };
  return <div className="min-h-screen bg-background leaf-pattern flex">
    {/* Left Panel - Decorative */}


    {/* Right Panel - Form */}
    <div className="flex-1 flex items-center justify-center p-8">
      <div className="w-full max-w-md">
        <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors">
          <ArrowLeft size={16} />
          <span>Back to Home</span>
        </Link>

        <div className="mb-8">
          <h2 className="font-display text-3xl font-bold text-foreground mb-2">
            {isLogin ? "Welcome Back" : "Create Account"}
          </h2>
          <p className="text-muted-foreground">
            {isLogin ? "Sign in to access your college dashboard" : "Register your college to get started"}
          </p>
        </div>

        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="login" onClick={() => setIsLogin(true)}>
              Login
            </TabsTrigger>
            <TabsTrigger value="signup" onClick={() => setIsLogin(false)}>
              Sign Up
            </TabsTrigger>
          </TabsList>

          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="collegeName">College Name</Label>
                <div className="relative">
                  <Leaf className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="collegeName"
                    placeholder="University Name"
                    className="pl-10 input-forest"
                    value={formData.collegeName || ""}
                    onChange={e => setFormData({ ...formData, collegeName: e.target.value })}
                    required
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input id="email" type="email" placeholder="college@university.edu" className="pl-10 input-forest" value={formData.email} onChange={e => setFormData({
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

            {!isLogin && <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input id="confirmPassword" type={showPassword ? "text" : "password"} placeholder="••••••••" className="pl-10 input-forest" value={formData.confirmPassword} onChange={e => setFormData({
                  ...formData,
                  confirmPassword: e.target.value
                })} required />
              </div>
            </div>}

            {isLogin && <div className="flex items-center justify-end">
              <a href="#" className="text-sm text-primary hover:underline">
                Forgot password?
              </a>
            </div>}

            <Button type="submit" variant="forest" size="lg" className="w-full">
              {isLogin ? "Sign In" : "Create Account"}
            </Button>
          </form>
        </Tabs>
      </div>
    </div>
  </div>;
};
export default CollegeLogin;