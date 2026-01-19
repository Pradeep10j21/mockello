import StudentDashboardLayout from "@/components/StudentDashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, CheckCircle, XCircle } from "lucide-react";

const applications = [
  { company: "TechCorp Solutions", role: "Software Engineer", appliedOn: "Dec 20, 2024", status: "Under Review" },
  { company: "DataFlow Inc", role: "Data Analyst", appliedOn: "Dec 18, 2024", status: "Shortlisted" },
  { company: "CloudNine Systems", role: "DevOps Engineer", appliedOn: "Dec 15, 2024", status: "Interview Scheduled" },
  { company: "FinTech Pro", role: "Backend Developer", appliedOn: "Dec 10, 2024", status: "Rejected" },
  { company: "AI Dynamics", role: "ML Engineer", appliedOn: "Dec 05, 2024", status: "Offer Received" },
];

const StudentApplicationsPage = () => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Shortlisted": case "Interview Scheduled": case "Offer Received": return <Badge variant="secondary">{status}</Badge>;
      case "Rejected": return <Badge variant="destructive">{status}</Badge>;
      default: return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Shortlisted": case "Interview Scheduled": case "Offer Received": return <CheckCircle className="w-5 h-5 text-secondary" />;
      case "Rejected": return <XCircle className="w-5 h-5 text-destructive" />;
      default: return <Clock className="w-5 h-5 text-accent" />;
    }
  };

  return (
    <StudentDashboardLayout>
      <div className="space-y-8">
        <div><h1 className="text-3xl font-serif font-bold">My Applications</h1><p className="text-muted-foreground">Track your job applications and their status</p></div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[{ label: "Total", value: applications.length, color: "text-foreground" },
            { label: "Pending", value: applications.filter(a => a.status === "Under Review").length, color: "text-accent" },
            { label: "Shortlisted", value: applications.filter(a => ["Shortlisted", "Interview Scheduled"].includes(a.status)).length, color: "text-secondary" },
            { label: "Offers", value: applications.filter(a => a.status === "Offer Received").length, color: "text-primary" }
          ].map(stat => (
            <Card key={stat.label} className="border-border/50 bg-card/50"><CardContent className="p-4 text-center"><p className={`text-3xl font-bold font-serif ${stat.color}`}>{stat.value}</p><p className="text-sm text-muted-foreground">{stat.label}</p></CardContent></Card>
          ))}
        </div>

        <div className="space-y-4">
          {applications.map((app, idx) => (
            <Card key={idx} className="border-border/50 bg-card/50">
              <CardContent className="p-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {getStatusIcon(app.status)}
                  <div><p className="font-semibold text-lg">{app.company}</p><p className="text-muted-foreground">{app.role}</p><p className="text-xs text-muted-foreground">Applied: {app.appliedOn}</p></div>
                </div>
                {getStatusBadge(app.status)}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </StudentDashboardLayout>
  );
};

export default StudentApplicationsPage;
