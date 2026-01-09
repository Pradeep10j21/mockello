import { Link } from "react-router-dom";
import StudentDashboardLayout from "@/components/StudentDashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Building2, FileText, Clock, ArrowRight, Briefcase, Rocket, Users } from "lucide-react";

const stats = [
  { label: "Eligible Companies", value: "12", icon: Building2, color: "text-primary", bgColor: "bg-primary/10", href: "/student/companies" },
  { label: "Applications Submitted", value: "5", icon: FileText, color: "text-secondary", bgColor: "bg-secondary/10", href: "/student/applications" },
  { label: "Pending Responses", value: "3", icon: Clock, color: "text-accent", bgColor: "bg-accent/10", href: "/student/applications" },
];

const recentCompanies = [
  { id: "1", name: "TechCorp Solutions", initials: "TC", role: "Software Engineer", package: "12-18 LPA", deadline: "Dec 30, 2024", status: "new" },
  { id: "2", name: "DataFlow Inc", initials: "DF", role: "Data Analyst", package: "10-15 LPA", deadline: "Jan 05, 2025", status: "new" },
  { id: "3", name: "CloudNine Systems", initials: "CN", role: "DevOps Engineer", package: "14-20 LPA", deadline: "Jan 10, 2025", status: "applied" },
];

const recentApplications = [
  { company: "FinTech Pro", role: "Backend Developer", appliedOn: "Dec 20, 2024", status: "Under Review" },
  { company: "AI Dynamics", role: "ML Engineer", appliedOn: "Dec 18, 2024", status: "Shortlisted" },
];

const StudentDashboard = () => {
  return (
    <StudentDashboardLayout>
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div><h1 className="text-3xl font-serif font-bold">Dashboard</h1><p className="text-muted-foreground">Track your placement journey and opportunities</p></div>
          <div className="flex gap-2">
            <Link to="/mock-placement">
              <Button className="gap-2">
                <Rocket className="w-4 h-4" />
                Start Mock Placement Drive
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat) => (
            <Link key={stat.label} to={stat.href}>
              <Card className="border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300 cursor-pointer group">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div><p className="text-sm text-muted-foreground mb-1">{stat.label}</p><p className="text-4xl font-bold font-serif">{stat.value}</p></div>
                    <div className={`w-14 h-14 rounded-2xl ${stat.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform`}><stat.icon className={`w-7 h-7 ${stat.color}`} /></div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between"><CardTitle className="font-serif">New Opportunities</CardTitle><Button variant="ghost" size="sm" asChild><Link to="/student/companies">View All <ArrowRight className="w-4 h-4 ml-1" /></Link></Button></CardHeader>
            <CardContent className="space-y-4">
              {recentCompanies.map((company) => (
                <div key={company.id} className="flex items-center justify-between p-4 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary text-primary-foreground flex items-center justify-center font-serif font-bold">{company.initials}</div>
                    <div>
                      <div className="flex items-center gap-2"><p className="font-semibold">{company.name}</p>{company.status === "new" && <Badge variant="secondary" className="text-[10px]">New</Badge>}</div>
                      <p className="text-sm text-muted-foreground">{company.role}</p><p className="text-xs text-primary font-medium">{company.package}</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" asChild><Link to={`/student/companies/${company.id}`}>View</Link></Button>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between"><CardTitle className="font-serif">My Applications</CardTitle><Button variant="ghost" size="sm" asChild><Link to="/student/applications">View All <ArrowRight className="w-4 h-4 ml-1" /></Link></Button></CardHeader>
            <CardContent className="space-y-4">
              {recentApplications.map((app, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 rounded-xl bg-secondary/30">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center"><Briefcase className="w-6 h-6 text-primary" /></div>
                    <div><p className="font-semibold">{app.company}</p><p className="text-sm text-muted-foreground">{app.role}</p><p className="text-xs text-muted-foreground">Applied: {app.appliedOn}</p></div>
                  </div>
                  <Badge variant={app.status === "Shortlisted" ? "secondary" : "outline"}>{app.status}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <Card className="border-border/50 bg-card/50">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center font-serif font-bold text-2xl">RS</div>
                <div><h3 className="font-serif font-bold text-xl">Rahul Sharma</h3><p className="text-muted-foreground">B.Tech CSE | Mumbai Institute of Technology</p><div className="flex items-center gap-4 mt-1"><span className="text-sm font-medium">CGPA: <span className="text-primary">8.5</span></span><span className="text-sm text-muted-foreground">|</span><span className="text-sm font-medium">Year: <span className="text-primary">2025</span></span></div></div>
              </div>
              <Button asChild><Link to="/student/profile">Update Profile</Link></Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </StudentDashboardLayout>
  );
};

export default StudentDashboard;
