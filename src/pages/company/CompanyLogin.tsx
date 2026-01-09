import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../services/apiConfig";

import { Leaf, Mail, Lock, Eye, EyeOff, Building2, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
const CompanyLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const {
    toast
  } = useToast();
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail || !loginPassword) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }
    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/company/login`, {

        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: loginEmail, password: loginPassword }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 403) {
          navigate("/approval-pending");
          return;
        }
        throw new Error(data.detail || "Login failed");
      }

      localStorage.setItem("token", data.access_token);
      localStorage.setItem("userRole", "company");
      localStorage.setItem("userEmail", loginEmail);

      toast({
        title: "Welcome back!",
        description: "Successfully logged in"
      });
      navigate("/company/dashboard");
    } catch (error: any) {
      toast({
        title: "Login Error",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  const [companyName, setCompanyName] = useState("");

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!signupEmail || !signupPassword || !confirmPassword || !companyName) {
      toast({
        title: "Error",
        description: "Please fill in all fields including Company Name",
        variant: "destructive"
      });
      return;
    }
    if (signupPassword !== confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive"
      });
      return;
    }
    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/company/register`, {

        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: signupEmail,
          password: signupPassword,
          companyName: companyName
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Registration failed");
      }

      localStorage.setItem("token", data.access_token);
      localStorage.setItem("userRole", "company");
      localStorage.setItem("userEmail", signupEmail);

      toast({
        title: "Account created!",
        description: "Please complete your company profile"
      });
      navigate("/company/onboarding");
    } catch (error: any) {
      toast({
        title: "Registration Error",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  return <div className="min-h-screen bg-background flex">
    {/* Left Panel - Branding */}
    <div className="hidden lg:flex lg:w-1/2 gradient-accent p-12 flex-col justify-between relative overflow-hidden bg-primary text-primary-foreground">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M30%205C17.3%205%207%2015.3%207%2028c0%208.5%204.6%2015.9%2011.5%2019.9L30%2055l11.5-7.1C48.4%2043.9%2053%2036.5%2053%2028%2053%2015.3%2042.7%205%2030%205z%22%20fill%3D%22none%22%20stroke%3D%22%23ffffff%22%20stroke-width%3D%221%22%20opacity%3D%220.1%22%2F%3E%3C%2Fsvg%3E')] opacity-20"></div>

      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-8 text-sidebar-foreground">
          <div className="w-12 h-12 rounded-xl bg-transparent flex items-center justify-center overflow-hidden">
            <img src="/logo.png" alt="Mockello Logo" className="w-full h-full object-contain" />
          </div>
          <span className="font-display text-2xl font-bold text-primary-foreground">Mockello</span>
        </div>

        <h1 className="font-display text-4xl font-bold mb-4 text-primary-foreground">
          Company Portal
        </h1>
        <p className="text-lg max-w-md text-primary-foreground">
          Connect with top colleges and find the perfect candidates for your organization.
        </p>
      </div>

      <div className="relative z-10 space-y-6">
        <div className="flex items-center gap-4 text-white/90">
          <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <p className="font-medium">Post Job Requirements</p>
            <p className="text-sm text-white/70">Define criteria and find matching candidates</p>
          </div>
        </div>
        <div className="flex items-center gap-4 text-white/90">
          <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div>
            <p className="font-medium">Partner with Colleges</p>
            <p className="text-sm text-white/70">Build relationships with top institutions</p>
          </div>
        </div>
      </div>
    </div>

    {/* Right Panel - Auth Forms */}
    <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
      <div className="w-full max-w-md">
        {/* Mobile Logo */}
        <div className="lg:hidden flex items-center justify-center gap-2 mb-8">
          <div className="w-10 h-10 rounded-xl bg-transparent flex items-center justify-center overflow-hidden">
            <img src="/logo.png" alt="Mockello Logo" className="w-full h-full object-contain" />
          </div>
          <span className="font-display text-xl font-bold text-foreground">Mockello</span>
        </div>

        {/* User Type Toggle */}
        <div className="flex justify-center gap-4 mb-8">
          <Button variant="forest" className="gap-2" disabled>
            <Building2 className="w-4 h-4" />
            Company
          </Button>
          <Button variant="outline" className="gap-2" asChild>
            <Link to="/college/login">
              <GraduationCap className="w-4 h-4" />
              College
            </Link>
          </Button>
        </div>

        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-4">
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input type="email" placeholder="Company Email" className="pl-10" value={loginEmail} onChange={e => setLoginEmail(e.target.value)} />
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input type={showPassword ? "text" : "password"} placeholder="Password" className="pl-10 pr-10" value={loginPassword} onChange={e => setLoginPassword(e.target.value)} />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div className="flex justify-end">
                <Link to="#" className="text-sm text-primary hover:underline">
                  Forgot password?
                </Link>
              </div>

              <Button type="submit" variant="forest" className="w-full" disabled={isLoading}>
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="signup">
            <form onSubmit={handleSignup} className="space-y-6">
              <div className="space-y-4">
                <div className="relative">
                  <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input placeholder="Company Name" className="pl-10" value={companyName} onChange={e => setCompanyName(e.target.value)} />
                </div>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input type="email" placeholder="Company Email" className="pl-10" value={signupEmail} onChange={e => setSignupEmail(e.target.value)} />
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input type={showPassword ? "text" : "password"} placeholder="Password" className="pl-10 pr-10" value={signupPassword} onChange={e => setSignupPassword(e.target.value)} />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input type={showPassword ? "text" : "password"} placeholder="Confirm Password" className="pl-10" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
                </div>
              </div>

              <Button type="submit" variant="forest" className="w-full" disabled={isLoading}>
                {isLoading ? "Creating account..." : "Create Account"}
              </Button>
            </form>
          </TabsContent>
        </Tabs>

        <div className="mt-8 text-center">
          <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  </div>;
};
export default CompanyLogin;