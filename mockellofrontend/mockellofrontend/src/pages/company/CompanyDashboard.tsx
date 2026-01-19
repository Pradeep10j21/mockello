import { Building2, Users, Briefcase, Bell, TrendingUp, TrendingDown, Clock, CheckCircle, AlertCircle, Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import CompanySidebar from "@/components/CompanySidebar";
import { getCompanyData, isNewCompany } from "@/lib/companyStore";
import { useNavigate } from "react-router-dom";

const CompanyDashboard = () => {
  const navigate = useNavigate();
  const companyData = getCompanyData();
  const isNew = isNewCompany();

  // Empty stats for new companies
  const emptyStats = [
    {
      title: "Partner Colleges",
      value: "0",
      change: "Get started",
      trend: "neutral",
      icon: Building2,
    },
    {
      title: "Active Job Posts",
      value: "0",
      change: "Post your first job",
      trend: "neutral",
      icon: Briefcase,
    },
    {
      title: "Eligible Candidates",
      value: "0",
      change: "Connect with colleges",
      trend: "neutral",
      icon: Users,
    },
    {
      title: "Notifications",
      value: "0",
      change: "No new updates",
      trend: "neutral",
      icon: Bell,
    },
  ];

  const populatedStats = [
    {
      title: "Partner Colleges",
      value: "24",
      change: "+3 this month",
      trend: "up",
      icon: Building2,
    },
    {
      title: "Active Job Posts",
      value: "8",
      change: "2 expiring soon",
      trend: "neutral",
      icon: Briefcase,
    },
    {
      title: "Eligible Candidates",
      value: "1,234",
      change: "+156 new profiles",
      trend: "up",
      icon: Users,
    },
    {
      title: "Notifications",
      value: "12",
      change: "5 unread",
      trend: "neutral",
      icon: Bell,
    },
  ];

  const stats = isNew ? emptyStats : populatedStats;

  const recentActivity = isNew ? [] : [
    {
      type: "success",
      message: "New partnership with IIT Delhi approved",
      time: "2 hours ago",
      icon: CheckCircle,
    },
    {
      type: "info",
      message: "45 new candidates match your SDE role",
      time: "5 hours ago",
      icon: Users,
    },
    {
      type: "warning",
      message: "Job posting for Data Analyst expires in 3 days",
      time: "1 day ago",
      icon: AlertCircle,
    },
    {
      type: "success",
      message: "NIT Trichy accepted your partnership request",
      time: "2 days ago",
      icon: CheckCircle,
    },
    {
      type: "info",
      message: "Interview scheduled with 5 candidates",
      time: "3 days ago",
      icon: Clock,
    },
  ];

  const companyName = companyData?.companyName || "Company";

  return (
    <CompanySidebar>
      <div className="p-6 lg:p-8 space-y-8">
        {/* Header */}
        <div className="animate-fade-in">
          <h1 className="font-display text-3xl font-bold text-foreground mb-2">
            Welcome{isNew ? "" : " back"}, {companyName}!
          </h1>
          <p className="text-muted-foreground">
            {isNew
              ? "Your company profile is ready. Start by posting jobs and connecting with colleges."
              : "Here's what's happening with your recruitment today."}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card
              key={stat.title}
              className="hover-lift animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">{stat.title}</p>
                    <p className="font-display text-3xl font-bold text-foreground">
                      {stat.value}
                    </p>
                    <div className="flex items-center gap-1 mt-2">
                      {stat.trend === "up" && (
                        <TrendingUp className="w-4 h-4 text-forest-medium" />
                      )}
                      {stat.trend === "down" && (
                        <TrendingDown className="w-4 h-4 text-destructive" />
                      )}
                      <span
                        className={`text-xs ${stat.trend === "up"
                          ? "text-forest-medium"
                          : stat.trend === "down"
                            ? "text-destructive"
                            : "text-muted-foreground"
                          }`}
                      >
                        {stat.change}
                      </span>
                    </div>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-forest-light/20 flex items-center justify-center">
                    <stat.icon className="w-6 h-6 text-forest-medium" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recruitment Analytics Placeholder */}
          <Card className="lg:col-span-2 animate-fade-in" style={{ animationDelay: "400ms" }}>
            <CardHeader>
              <CardTitle className="font-display">Recruitment Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center bg-muted/30 rounded-lg">
                <div className="text-center text-muted-foreground">
                  <TrendingUp className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p className="font-medium">Analytics Dashboard</p>
                  <p className="text-sm">
                    {isNew ? "Start recruiting to see analytics" : "Charts and insights coming soon"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="animate-fade-in" style={{ animationDelay: "500ms" }}>
            <CardHeader>
              <CardTitle className="font-display">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              {recentActivity.length === 0 ? (
                <div className="h-48 flex items-center justify-center text-center">
                  <div className="text-muted-foreground">
                    <Clock className="w-10 h-10 mx-auto mb-3 opacity-50" />
                    <p className="font-medium">No activity yet</p>
                    <p className="text-sm">Your recent activities will appear here</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex gap-3">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${activity.type === "success"
                          ? "bg-forest-light/20 text-forest-medium"
                          : activity.type === "warning"
                            ? "bg-gold/20 text-gold"
                            : "bg-muted text-muted-foreground"
                          }`}
                      >
                        <activity.icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-foreground line-clamp-2">
                          {activity.message}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {activity.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="animate-fade-in" style={{ animationDelay: "600ms" }}>
          <CardHeader>
            <CardTitle className="font-display">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <button
                onClick={() => {
                  const sid = 'session-' + Math.floor(1000 + Math.random() * 9000);
                  navigate(`/hr-interview-panel?session=${sid}&role=interviewer`);
                }}
                className="p-4 rounded-xl bg-forest-medium/10 hover:bg-forest-medium/20 transition-colors text-center group border border-forest-medium/30"
              >
                <Users className="w-6 h-6 mx-auto mb-2 text-forest-medium group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium text-foreground">Conduct Interview</span>
              </button>
              <button
                onClick={() => navigate("/company/job-criteria")}
                className="p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors text-center group"
              >
                <Briefcase className="w-6 h-6 mx-auto mb-2 text-forest-medium group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium text-foreground">Post New Job</span>
              </button>
              <button
                onClick={() => navigate("/company/colleges")}
                className="p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors text-center group"
              >
                <Building2 className="w-6 h-6 mx-auto mb-2 text-forest-medium group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium text-foreground">Find Colleges</span>
              </button>
              <button className="p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors text-center group">
                <Users className="w-6 h-6 mx-auto mb-2 text-forest-medium group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium text-foreground">View Candidates</span>
              </button>
              <button
                onClick={() => navigate("/company/updates")}
                className="p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors text-center group"
              >
                <Bell className="w-6 h-6 mx-auto mb-2 text-forest-medium group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium text-foreground">Notifications</span>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </CompanySidebar>
  );
};

export default CompanyDashboard;
