import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, MapPin, Globe, Clock, Check, Calendar, CheckCircle } from "lucide-react";
import StudentDashboardLayout from "@/components/StudentDashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

const companyData = {
  id: "1", name: "TechCorp Solutions", initials: "TC", tagline: "Innovating Tomorrow's Technology",
  location: "Mumbai, Maharashtra", website: "www.techcorp.com", employees: "5,000+",
  about: "TechCorp Solutions is a leading technology company specializing in enterprise software solutions, cloud computing, and AI-driven products.",
  role: "Software Engineer", roleDescription: "Design, develop and maintain high-quality software applications. Collaborate with cross-functional teams to define and implement new features.",
  eligibility: { cgpa: "7.0+", branches: ["CSE", "IT", "ECE"], backlogs: "No active backlogs", skills: ["Programming", "Problem Solving", "Communication"] },
  driveDate: "January 15, 2025", mode: "On-Campus", package: "12-18 LPA"
};

const StudentCompanyDetailPage = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [registered, setRegistered] = useState(false);

  const handleRegister = () => {
    setRegistered(true);
    toast({ title: "Registration Successful!", description: "You have successfully registered for this company." });
  };

  if (registered) {
    return (
      <StudentDashboardLayout>
        <div className="max-w-md mx-auto text-center py-20">
          <div className="w-20 h-20 rounded-full bg-secondary/20 flex items-center justify-center mx-auto mb-6"><CheckCircle className="w-10 h-10 text-secondary" /></div>
          <h1 className="text-3xl font-serif font-bold mb-4">Registration Successful!</h1>
          <p className="text-muted-foreground mb-8">You have successfully registered for {companyData.name}. We'll notify you about the next steps.</p>
          <div className="flex gap-4 justify-center"><Button asChild><Link to="/student/applications">View Applications</Link></Button><Button variant="outline" asChild><Link to="/student/dashboard">Back to Dashboard</Link></Button></div>
        </div>
      </StudentDashboardLayout>
    );
  }

  return (
    <StudentDashboardLayout>
      <div className="space-y-8">
        <Link to="/student/companies" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"><ArrowLeft className="w-4 h-4" />Back to Companies</Link>

        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-20 h-20 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center font-serif font-bold text-2xl">{companyData.initials}</div>
            <div><h1 className="text-3xl font-serif font-bold">{companyData.name}</h1><p className="text-muted-foreground mb-2">{companyData.tagline}</p><div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground"><span className="flex items-center gap-1"><MapPin className="w-4 h-4" />{companyData.location}</span><span className="flex items-center gap-1"><Globe className="w-4 h-4" />{companyData.website}</span></div></div>
          </div>
          <Button size="lg" onClick={handleRegister}><Check className="w-4 h-4 mr-2" />Register for Company</Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-border/50 bg-card/50"><CardHeader><CardTitle className="font-serif">About Company</CardTitle></CardHeader><CardContent><p className="text-muted-foreground">{companyData.about}</p></CardContent></Card>
            <Card className="border-border/50 bg-card/50"><CardHeader><CardTitle className="font-serif">Job Role & Description</CardTitle></CardHeader><CardContent><h4 className="font-semibold text-lg mb-2">{companyData.role}</h4><p className="text-muted-foreground">{companyData.roleDescription}</p><div className="mt-4 flex gap-4"><Badge variant="secondary">{companyData.package}</Badge><Badge variant="outline">{companyData.mode}</Badge></div></CardContent></Card>
          </div>
          <div className="space-y-6">
            <Card className="border-border/50 bg-card/50"><CardHeader><CardTitle className="font-serif">Eligibility Criteria</CardTitle></CardHeader><CardContent className="space-y-4"><div><p className="text-sm text-muted-foreground">Minimum CGPA</p><p className="text-xl font-bold">{companyData.eligibility.cgpa}</p></div><div><p className="text-sm text-muted-foreground mb-2">Eligible Branches</p><div className="flex flex-wrap gap-2">{companyData.eligibility.branches.map(b => <Badge key={b} variant="outline">{b}</Badge>)}</div></div><div><p className="text-sm text-muted-foreground">Backlogs</p><p className="font-semibold">{companyData.eligibility.backlogs}</p></div></CardContent></Card>
            <Card className="border-secondary/30 bg-secondary/5"><CardContent className="p-6 text-center"><Calendar className="w-8 h-8 text-secondary mx-auto mb-2" /><p className="font-semibold">Drive Date</p><p className="text-lg font-bold text-secondary">{companyData.driveDate}</p></CardContent></Card>
          </div>
        </div>
      </div>
    </StudentDashboardLayout>
  );
};

export default StudentCompanyDetailPage;
