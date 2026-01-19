import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../services/apiConfig";

import {
  ArrowRight,
  Check,
  GraduationCap,
  Building,
  Hash,
  Calendar,
  Award,
  Code,
  FileText,
  Briefcase,
  Phone,
  Mail,
  Upload,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const steps = [
  { id: 1, title: "Academic Details" },
  { id: 2, title: "Additional Info" },
  { id: 3, title: "Documents" },
];

const StudentOnboardingPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    registerNumber: "",
    collegeName: "Mumbai Institute of Technology",
    degree: "",
    branch: "",
    yearOfPassing: "",
    cgpa: "",
    skills: "",
    internshipExperience: "",
    alternateNumber: "",
    alternateEmail: "",
    semWiseCGPA: "",
    resumeFile: null as File | null,
    internshipFile: null as File | null,
  });
  const { toast } = useToast();
  const navigate = useNavigate();

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = async () => {
    // Validate required fields for each step
    if (currentStep === 1) {
      if (!formData.registerNumber) {
        toast({
          title: "Validation Error",
          description: "Please enter your register number",
          variant: "destructive"
        });
        return;
      }
      if (!formData.collegeName) {
        toast({
          title: "Validation Error",
          description: "Please select your college",
          variant: "destructive"
        });
        return;
      }
      if (!formData.degree) {
        toast({
          title: "Validation Error",
          description: "Please select your degree",
          variant: "destructive"
        });
        return;
      }
      if (!formData.branch) {
        toast({
          title: "Validation Error",
          description: "Please select your branch/department",
          variant: "destructive"
        });
        return;
      }
      if (!formData.yearOfPassing) {
        toast({
          title: "Validation Error",
          description: "Please select your year of passing",
          variant: "destructive"
        });
        return;
      }
      if (!formData.cgpa) {
        toast({
          title: "Validation Error",
          description: "Please enter your CGPA",
          variant: "destructive"
        });
        return;
      }
    }

    if (currentStep === 2) {
      if (!formData.skills) {
        toast({
          title: "Validation Error",
          description: "Please enter your skills",
          variant: "destructive"
        });
        return;
      }
    }

    if (currentStep === 3) {
      if (!formData.resumeFile) {
        toast({
          title: "Validation Error",
          description: "Please upload your resume",
          variant: "destructive"
        });
        return;
      }
    }

    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      // Final Step: Submit Data
      try {
        const userEmail = localStorage.getItem("userEmail");
        if (!userEmail) {
          toast({
            title: "Error",
            description: "User session not found. Please login again.",
            variant: "destructive"
          });
          navigate("/student/login");
          return;
        }

        const payload = {
          email: userEmail,
          registerNumber: formData.registerNumber,
          collegeName: formData.collegeName,
          degree: formData.degree,
          branch: formData.branch,
          yearOfPassing: formData.yearOfPassing,
          cgpa: parseFloat(formData.cgpa) || 0,
          semWiseCGPA: formData.semWiseCGPA || null,
          skills: formData.skills,
          internshipExperience: formData.internshipExperience || null,
          alternateNumber: formData.alternateNumber || null,
          alternateEmail: formData.alternateEmail || null,
          resumeFile_name: formData.resumeFile ? formData.resumeFile.name : null,
          internshipFile_name: formData.internshipFile ? formData.internshipFile.name : null,
        };

        const response = await fetch(`${API_BASE_URL}/student/onboarding`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.detail || "Onboarding failed");
        }

        toast({
          title: "Onboarding Complete!",
          description: "Your profile has been updated.",
        });

        navigate("/student/approval-pending");
      } catch (error: any) {
        console.error(error);
        const errorMessage = error instanceof Error ? error.message : JSON.stringify(error) || "Submission failed";
        toast({
          title: "Submission Error",
          description: errorMessage,
          variant: "destructive"
        });
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFileChange = (field: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    updateFormData(field, file);
  };

  return (
    <div className="min-h-screen bg-background leaf-pattern flex items-center justify-center p-6">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-6">
            <GraduationCap className="w-7 h-7" />
          </div>

          <h1 className="text-3xl font-serif font-bold italic mb-2">Complete Your Profile</h1>
          <p className="text-muted-foreground">
            Let's set up your student account in a few steps
          </p>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center justify-center gap-0 mb-10">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all ${currentStep > step.id
                  ? "bg-secondary text-secondary-foreground"
                  : currentStep === step.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                  }`}
              >
                {currentStep > step.id ? <Check className="w-5 h-5" /> : step.id}
              </div>
              {index < steps.length - 1 && (
                <div className={`w-20 h-0.5 ${currentStep > step.id ? "bg-secondary" : "bg-border"
                  }`} />
              )}
            </div>
          ))}
        </div>

        {/* Form Card */}
        <div className="bg-card border border-border rounded-2xl p-8 shadow-sm">
          {/* Step 1: Academic Details */}
          {currentStep === 1 && (
            <div className="space-y-5 animate-fade-in">
              <div className="grid md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label htmlFor="registerNumber">Register Number / Roll Number</Label>
                  <div className="relative">
                    <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="registerNumber"
                      placeholder="e.g., 2021CS001"
                      value={formData.registerNumber}
                      onChange={(e) => updateFormData("registerNumber", e.target.value)}
                      className="pl-10 h-12"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="collegeName">College Name</Label>
                  <div className="relative">
                    <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="collegeName"
                      placeholder="Enter your college name"
                      value={formData.collegeName}
                      onChange={(e) => updateFormData("collegeName", e.target.value)}
                      className="pl-10 h-12"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label htmlFor="degree">Degree</Label>
                  <Select value={formData.degree} onValueChange={(val) => updateFormData("degree", val)}>
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Select degree" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="btech">B.Tech</SelectItem>
                      <SelectItem value="be">B.E.</SelectItem>
                      <SelectItem value="mtech">M.Tech</SelectItem>
                      <SelectItem value="mca">MCA</SelectItem>
                      <SelectItem value="mba">MBA</SelectItem>
                      <SelectItem value="bca">BCA</SelectItem>
                      <SelectItem value="bcom">B.Com</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="branch">Branch / Department</Label>
                  <Select value={formData.branch} onValueChange={(val) => updateFormData("branch", val)}>
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Select branch" />
                    </SelectTrigger>
                    <SelectContent side="bottom" align="start" className="max-h-[300px]">
                      <SelectItem value="cse">Computer Science (CSE)</SelectItem>
                      <SelectItem value="it">Information Technology (IT)</SelectItem>
                      <SelectItem value="ece">Electronics & Communication (ECE)</SelectItem>
                      <SelectItem value="ee">Electrical Engineering (EE)</SelectItem>
                      <SelectItem value="me">Mechanical Engineering (ME)</SelectItem>
                      <SelectItem value="ce">Civil Engineering (CE)</SelectItem>
                      <SelectItem value="bcom-general">B.Com (General)</SelectItem>
                      <SelectItem value="bcom-accounting">B.Com (Accounting & Finance)</SelectItem>
                      <SelectItem value="bcom-cs">B.Com (Corporate Secretaryship)</SelectItem>
                      <SelectItem value="bcom-banking">B.Com (Banking & Insurance)</SelectItem>
                      <SelectItem value="bcom-ca">B.Com (Computer Applications)</SelectItem>
                      <SelectItem value="bcom-professional">B.Com (Professional Accounting)</SelectItem>
                      <SelectItem value="bcom-honours">B.Com (Honours)</SelectItem>
                      <SelectItem value="bcom-finance">B.Com (Finance)</SelectItem>
                      <SelectItem value="bcom-taxation">B.Com (Taxation)</SelectItem>
                      <SelectItem value="bcom-marketing">B.Com (Marketing Management)</SelectItem>
                      <SelectItem value="bcom-hrm">B.Com (Human Resource Management)</SelectItem>
                      <SelectItem value="bcom-ib">B.Com (International Business)</SelectItem>
                      <SelectItem value="bcom-ecommerce">B.Com (E-Commerce)</SelectItem>
                      <SelectItem value="bcom-ism">B.Com (Information Systems Management)</SelectItem>
                      <SelectItem value="bcom-analytics">B.Com (Business Analytics)</SelectItem>
                      <SelectItem value="bcom-logistics">B.Com (Logistics & Supply Chain Management)</SelectItem>
                      <SelectItem value="bcom-retail">B.Com (Retail Management)</SelectItem>
                      <SelectItem value="bcom-tourism">B.Com (Tourism & Hospitality Management)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label htmlFor="yearOfPassing">Year of Passing</Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Select value={formData.yearOfPassing} onValueChange={(val) => updateFormData("yearOfPassing", val)}>
                      <SelectTrigger className="h-12 pl-10">
                        <SelectValue placeholder="Select year" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2024">2024</SelectItem>
                        <SelectItem value="2025">2025</SelectItem>
                        <SelectItem value="2026">2026</SelectItem>
                        <SelectItem value="2027">2027</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cgpa">CGPA</Label>
                  <div className="relative">
                    <Award className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="cgpa"
                      type="number"
                      step="0.01"
                      min="0"
                      max="10"
                      placeholder="e.g., 8.5"
                      value={formData.cgpa}
                      onChange={(e) => updateFormData("cgpa", e.target.value)}
                      className="pl-10 h-12"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Additional Details */}
          {currentStep === 2 && (
            <div className="space-y-5 animate-fade-in">
              <div className="space-y-2">
                <Label htmlFor="skills">Skills</Label>
                <div className="relative">
                  <Code className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                  <Textarea
                    id="skills"
                    placeholder="e.g., Python, JavaScript, React, Machine Learning..."
                    value={formData.skills}
                    onChange={(e) => updateFormData("skills", e.target.value)}
                    className="pl-10 min-h-[100px] resize-none"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="internshipExperience">Internship Experience (Optional)</Label>
                <div className="relative">
                  <Briefcase className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                  <Textarea
                    id="internshipExperience"
                    placeholder="Describe your internship experience or type NIL..."
                    value={formData.internshipExperience}
                    onChange={(e) => updateFormData("internshipExperience", e.target.value)}
                    className="pl-10 min-h-[100px] resize-none"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label htmlFor="alternateNumber">Alternate Phone Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="alternateNumber"
                      placeholder="+91 98765 43210"
                      value={formData.alternateNumber}
                      onChange={(e) => updateFormData("alternateNumber", e.target.value)}
                      className="pl-10 h-12"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="alternateEmail">Alternate Email ID</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="alternateEmail"
                      type="email"
                      placeholder="alternate@email.com"
                      value={formData.alternateEmail}
                      onChange={(e) => updateFormData("alternateEmail", e.target.value)}
                      className="pl-10 h-12"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="semWiseCGPA">Semester-wise CGPA</Label>
                <Input
                  id="semWiseCGPA"
                  placeholder="e.g., Sem1: 8.0, Sem2: 8.5, Sem3: 8.2..."
                  value={formData.semWiseCGPA}
                  onChange={(e) => updateFormData("semWiseCGPA", e.target.value)}
                  className="h-12"
                />
              </div>
            </div>
          )}

          {/* Step 3: Documents */}
          {currentStep === 3 && (
            <div className="space-y-6 animate-fade-in">
              <div className="space-y-2">
                <Label>Resume Upload (PDF)</Label>
                <div className="border-2 border-dashed border-border rounded-xl p-6 text-center hover:border-primary/50 transition-colors">
                  {formData.resumeFile ? (
                    <div className="flex items-center justify-center gap-3">
                      <FileText className="w-8 h-8 text-primary" />
                      <div className="text-left">
                        <p className="font-medium">{formData.resumeFile.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {(formData.resumeFile.size / 1024).toFixed(1)} KB
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => updateFormData("resumeFile", null)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ) : (
                    <label className="cursor-pointer block">
                      <Upload className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
                      <p className="font-medium mb-1">Click to upload your resume</p>
                      <p className="text-sm text-muted-foreground">PDF format, max 5MB</p>
                      <input
                        type="file"
                        accept=".pdf"
                        onChange={(e) => handleFileChange("resumeFile", e)}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Internship Certificate (PDF) - Optional</Label>
                <div className="border-2 border-dashed border-border rounded-xl p-6 text-center hover:border-primary/50 transition-colors">
                  {formData.internshipFile ? (
                    <div className="flex items-center justify-center gap-3">
                      <FileText className="w-8 h-8 text-primary" />
                      <div className="text-left">
                        <p className="font-medium">{formData.internshipFile.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {(formData.internshipFile.size / 1024).toFixed(1)} KB
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => updateFormData("internshipFile", null)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ) : (
                    <label className="cursor-pointer block">
                      <Upload className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
                      <p className="font-medium mb-1">Click to upload internship certificate</p>
                      <p className="text-sm text-muted-foreground">PDF format, max 5MB (or skip if NIL)</p>
                      <input
                        type="file"
                        accept=".pdf"
                        onChange={(e) => handleFileChange("internshipFile", e)}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center mt-8 pt-6 border-t border-border">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 1}
            >
              Previous
            </Button>
            <Button onClick={handleNext}>
              {currentStep === 3 ? (
                <>
                  Complete Onboarding <Check className="w-4 h-4 ml-1" />
                </>
              ) : (
                <>
                  Next <ArrowRight className="w-4 h-4 ml-1" />
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentOnboardingPage;
