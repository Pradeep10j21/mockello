import { Building2, MapPin, Globe, Users, Mail, Phone, Briefcase, Edit, Shield, CheckCircle, FileText, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import CompanySidebar from "@/components/CompanySidebar";
import { getCompanyData, isNewCompany } from "@/lib/companyStore";

const CompanyProfile = () => {
  const companyData = getCompanyData();
  const isNew = isNewCompany();

  // If no company data, show placeholder
  if (isNew || !companyData) {
    return (
      <CompanySidebar>
        <div className="p-6 lg:p-8 flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <Building2 className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
            <h2 className="font-display text-xl font-semibold text-foreground mb-2">
              No Profile Data
            </h2>
            <p className="text-muted-foreground mb-4">
              Complete your company registration to see your profile here.
            </p>
            <Button onClick={() => window.location.href = "/company/onboarding"}>
              Complete Registration
            </Button>
          </div>
        </div>
      </CompanySidebar>
    );
  }

  // Generate initials from company name
  const initials = companyData.companyName
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <CompanySidebar>
      <div className="p-6 lg:p-8 space-y-6">
        {/* Profile Header */}
        <Card className="overflow-hidden animate-fade-in">
          {/* Cover Banner */}
          <div className="h-32 bg-gradient-to-r from-forest-dark via-forest-medium to-forest-light" />
          
          <CardContent className="relative pt-0 pb-6">
            {/* Company Avatar */}
            <div className="absolute -top-12 left-6">
              <div className="w-24 h-24 rounded-2xl bg-card border-4 border-card flex items-center justify-center shadow-lg">
                <span className="font-display text-2xl font-bold text-forest-medium">{initials}</span>
              </div>
            </div>

            {/* Edit Button */}
            <div className="flex justify-end pt-4">
              <Button variant="outline" className="gap-2">
                <Edit className="w-4 h-4" />
                Edit Profile
              </Button>
            </div>

            {/* Company Info */}
            <div className="mt-8 space-y-4">
              <div className="flex items-center gap-3 flex-wrap">
                <h1 className="font-display text-2xl font-bold text-foreground">
                  {companyData.companyName}
                </h1>
                <Badge variant="secondary" className="gap-1 bg-forest-light/20 text-forest-medium">
                  <CheckCircle className="w-3 h-3" />
                  Registered
                </Badge>
              </div>
              <p className="text-muted-foreground">{companyData.companyType} • {companyData.industry}</p>

              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Briefcase className="w-4 h-4" />
                  <span>{companyData.industry}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span>{companyData.headquarters}</span>
                </div>
                {companyData.website && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Globe className="w-4 h-4" />
                    <a href={companyData.website.startsWith("http") ? companyData.website : `https://${companyData.website}`} className="hover:text-foreground transition-colors" target="_blank" rel="noopener noreferrer">
                      {companyData.website.replace(/^https?:\/\//, "")}
                    </a>
                  </div>
                )}
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Users className="w-4 h-4" />
                  <span>{companyData.employeeCount} employees</span>
                </div>
              </div>

              {companyData.gstNumber && (
                <div className="text-sm text-muted-foreground">
                  <span className="font-medium">GST: </span>{companyData.gstNumber}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* About Section */}
          <Card className="lg:col-span-2 animate-fade-in" style={{ animationDelay: "100ms" }}>
            <CardHeader>
              <CardTitle className="font-display flex items-center gap-2">
                <Building2 className="w-5 h-5 text-forest-medium" />
                About Company
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                {companyData.description}
              </p>
              
              {companyData.workCulture && (
                <div>
                  <h4 className="font-medium text-foreground mb-2">Work Culture</h4>
                  <p className="text-muted-foreground text-sm">{companyData.workCulture}</p>
                </div>
              )}
              
              {companyData.benefits && (
                <div>
                  <h4 className="font-medium text-foreground mb-2">Benefits</h4>
                  <p className="text-muted-foreground text-sm">{companyData.benefits}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* HR Contact Card */}
          <Card className="animate-fade-in" style={{ animationDelay: "200ms" }}>
            <CardHeader>
              <CardTitle className="font-display flex items-center gap-2">
                <Shield className="w-5 h-5 text-forest-medium" />
                HR Contact
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-forest-light/20 flex items-center justify-center">
                  <span className="font-medium text-forest-medium">
                    {companyData.hrName.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-foreground">{companyData.hrName}</p>
                  <p className="text-sm text-muted-foreground">{companyData.hrDesignation || "HR Manager"}</p>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <a
                    href={`mailto:${companyData.hrEmail}`}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {companyData.hrEmail}
                  </a>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <a
                    href={`tel:${companyData.hrPhone}`}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {companyData.hrPhone}
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recruitment Info */}
        <Card className="animate-fade-in" style={{ animationDelay: "300ms" }}>
          <CardHeader>
            <CardTitle className="font-display flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-forest-medium" />
              Recruitment Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Hiring Frequency</p>
                <p className="font-medium text-foreground">{companyData.hiringFrequency}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Recruitment Mode</p>
                <p className="font-medium text-foreground">{companyData.recruitmentMode.join(", ")}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Package Range</p>
                <p className="font-medium text-foreground">{companyData.packageRange || "Not specified"}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Min CGPA Required</p>
                <p className="font-medium text-foreground">{companyData.minCgpa || "Not specified"}</p>
              </div>
            </div>

            {companyData.typicalRoles && (
              <div className="mt-6 pt-4 border-t border-border">
                <p className="text-sm text-muted-foreground mb-2">Typical Roles</p>
                <p className="text-foreground">{companyData.typicalRoles}</p>
              </div>
            )}

            {companyData.preferredBranches.length > 0 && (
              <div className="mt-4">
                <p className="text-sm text-muted-foreground mb-2">Preferred Branches</p>
                <div className="flex flex-wrap gap-2">
                  {companyData.preferredBranches.map((branch) => (
                    <Badge key={branch} variant="secondary">{branch}</Badge>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Internship Info (if offered) */}
        {companyData.internshipOffered && (
          <Card className="animate-fade-in" style={{ animationDelay: "400ms" }}>
            <CardHeader>
              <CardTitle className="font-display flex items-center gap-2">
                <Award className="w-5 h-5 text-forest-medium" />
                Internship Program
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Stipend</p>
                  <p className="font-medium text-foreground">{companyData.internshipStipend || "Not specified"}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Duration</p>
                  <p className="font-medium text-foreground">{companyData.internshipDuration || "Not specified"}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Type</p>
                  <p className="font-medium text-foreground">{companyData.internshipType || "Not specified"}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">PPO Conversion</p>
                  <p className="font-medium text-foreground">{companyData.internshipConversion || "Not specified"}</p>
                </div>
              </div>
              {companyData.internshipRoles && (
                <div className="mt-4 pt-4 border-t border-border">
                  <p className="text-sm text-muted-foreground mb-2">Internship Roles/Domains</p>
                  <p className="text-foreground">{companyData.internshipRoles}</p>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="animate-fade-in" style={{ animationDelay: "500ms" }}>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 rounded-xl bg-forest-light/20 flex items-center justify-center mx-auto mb-3">
                <Building2 className="w-6 h-6 text-forest-medium" />
              </div>
              <p className="font-display text-2xl font-bold text-foreground">0</p>
              <p className="text-sm text-muted-foreground">Partner Colleges</p>
            </CardContent>
          </Card>
          <Card className="animate-fade-in" style={{ animationDelay: "600ms" }}>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 rounded-xl bg-forest-light/20 flex items-center justify-center mx-auto mb-3">
                <Briefcase className="w-6 h-6 text-forest-medium" />
              </div>
              <p className="font-display text-2xl font-bold text-foreground">0</p>
              <p className="text-sm text-muted-foreground">Active Job Posts</p>
            </CardContent>
          </Card>
          <Card className="animate-fade-in" style={{ animationDelay: "700ms" }}>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 rounded-xl bg-forest-light/20 flex items-center justify-center mx-auto mb-3">
                <Users className="w-6 h-6 text-forest-medium" />
              </div>
              <p className="font-display text-2xl font-bold text-foreground">0</p>
              <p className="text-sm text-muted-foreground">Eligible Candidates</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </CompanySidebar>
  );
};

export default CompanyProfile;
