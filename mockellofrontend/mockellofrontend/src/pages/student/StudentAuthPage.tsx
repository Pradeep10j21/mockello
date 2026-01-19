import { useState } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../services/apiConfig";

import { ArrowLeft, Mail, Lock, Eye, EyeOff, GraduationCap, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const StudentAuthPage = () => {
  const [searchParams] = useSearchParams();
  const initialMode = searchParams.get("mode") === "signup" ? "signup" : "login";
  const navigate = useNavigate();

  const [mode, setMode] = useState<"login" | "signup">(initialMode);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { toast } = useToast();

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (mode === "signup" && formData.password !== formData.confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure your passwords match.",
        variant: "destructive",
      });
      return;
    }

    try {
      const endpoint = mode === "login"
        ? `${API_BASE_URL}/student/login`
        : `${API_BASE_URL}/student/register`;


      const payload = mode === "login"
        ? { email: formData.email, password: formData.password }
        : {
          email: formData.email,
          password: formData.password,
          fullName: formData.fullName
        };

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || (mode === "login" ? "Login failed" : "Authentication failed"));
      }

      // Store token
      localStorage.setItem("token", data.access_token);
      localStorage.setItem("userRole", "student");
      localStorage.setItem("userEmail", formData.email); // Use formData.email as loginEmail

      if (mode === "login") {
        // Check Verification Status
        // We can decode the token here or assume specific logic
        // For MVP, we'll try to decode the JWT payload roughly
        try {
          const payload = JSON.parse(atob(data.access_token.split('.')[1]));
          if (payload.isVerified === false) {
            navigate("/student/approval-pending");
            return;
          }
        } catch (e) {
          console.error("Token decode error", e);
        }

        toast({
          title: "Welcome back!",
          description: "Successfully logged in"
        });
        navigate("/student/dashboard");
      } else { // mode === "signup"
        toast({
          title: "Account created successfully!",
          description: "Redirecting...",
        });
        navigate("/student/onboarding");
      }

    } catch (error: any) {
      toast({
        title: "Authentication Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background leaf-pattern flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link
            to="/student"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          <div className="w-14 h-14 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-6">
            <GraduationCap className="w-7 h-7" />
          </div>

          <h1 className="text-3xl font-serif font-bold mb-2">
            {mode === "login" ? "Student Login" : "Student Sign Up"}
          </h1>
          <p className="text-muted-foreground">
            {mode === "login"
              ? "Sign in to access your dashboard"
              : "Create your account to get started"
            }
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex bg-secondary/50 rounded-lg p-1 mb-8">
          <button
            onClick={() => setMode("login")}
            className={`flex-1 py-2.5 px-4 rounded-md text-sm font-medium transition-all ${mode === "login"
              ? "bg-background shadow-sm text-foreground"
              : "text-muted-foreground hover:text-foreground"
              }`}
          >
            Login
          </button>
          <button
            onClick={() => setMode("signup")}
            className={`flex-1 py-2.5 px-4 rounded-md text-sm font-medium transition-all ${mode === "signup"
              ? "bg-background shadow-sm text-foreground"
              : "text-muted-foreground hover:text-foreground"
              }`}
          >
            Sign Up
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {mode === "signup" && (
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="fullName"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={(e) => updateFormData("fullName", e.target.value)}
                  className="pl-10 h-12 bg-card border-border"
                  required
                />
              </div>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="email">College Email ID</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="student@college.edu"
                value={formData.email}
                onChange={(e) => updateFormData("email", e.target.value)}
                className="pl-10 h-12 bg-card border-border"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => updateFormData("password", e.target.value)}
                className="pl-10 pr-10 h-12 bg-card border-border"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {mode === "signup" && (
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={(e) => updateFormData("confirmPassword", e.target.value)}
                  className="pl-10 pr-10 h-12 bg-card border-border"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>
          )}

          <Button type="submit" className="w-full h-12" size="lg">
            {mode === "login" ? "Sign In" : "Create Account"}
          </Button>
        </form>

        {mode === "login" && (
          <p className="text-center text-sm text-muted-foreground mt-6">
            Don't have an account?{" "}
            <button
              onClick={() => setMode("signup")}
              className="text-primary hover:underline font-medium"
            >
              Sign up here
            </button>
          </p>
        )}
      </div>
    </div>
  );
};

export default StudentAuthPage;
