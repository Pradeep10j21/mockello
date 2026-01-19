import { useNavigate } from "react-router-dom";
import CollegeSidebar from "@/components/CollegeSidebar";
import { Building2, Briefcase, Target, Bell, TrendingUp, Users, Calendar, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { sharedCompanies } from "@/lib/sharedCompanies";

const CollegeDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  const stats = [
    {
      title: "Companies Onboarded",
      value: "48",
      change: "+12%",
      icon: Building2,
      color: "bg-forest-medium",
    },
    {
      title: "Active Opportunities",
      value: "23",
      change: "+8%",
      icon: Briefcase,
      color: "bg-sage",
    },
    {
      title: "Eligible Companies",
      value: "15",
      change: "+5%",
      icon: Target,
      color: "bg-accent",
    },
    {
      title: "Pending Notifications",
      value: "7",
      change: "New",
      icon: Bell,
      color: "bg-earth",
    },
  ];

  // Use shared companies for featured companies
  const featuredCompanies = sharedCompanies.slice(0, 6);

  // Recent activities based on shared companies
  const recentActivities = [
    {
      company: sharedCompanies[0].name,
      logo: sharedCompanies[0].logo,
      action: "Posted new opportunity",
      role: sharedCompanies[0].roles[0],
      time: "2 hours ago",
    },
    {
      company: sharedCompanies[1].name,
      logo: sharedCompanies[1].logo,
      action: "Updated eligibility criteria",
      role: sharedCompanies[1].roles[0],
      time: "5 hours ago",
    },
    {
      company: sharedCompanies[2].name,
      logo: sharedCompanies[2].logo,
      action: "Scheduled campus visit",
      role: sharedCompanies[2].roles[0],
      time: "1 day ago",
    },
    {
      company: sharedCompanies[3].name,
      logo: sharedCompanies[3].logo,
      action: "Requested student list",
      role: sharedCompanies[3].roles[0],
      time: "2 days ago",
    },
  ];

  // Upcoming drives based on shared companies
  const upcomingDrives = [
    { company: sharedCompanies[0].name, logo: sharedCompanies[0].logo, date: "Dec 15, 2024", roles: 3, students: 120 },
    { company: sharedCompanies[4].name, logo: sharedCompanies[4].logo, date: "Dec 18, 2024", roles: 2, students: 85 },
    { company: sharedCompanies[1].name, logo: sharedCompanies[1].logo, date: "Dec 22, 2024", roles: 4, students: 200 },
  ];

  return (
    <div className="flex min-h-screen w-full bg-background">
      <CollegeSidebar onLogout={handleLogout} />

      <main className="flex-1 p-8 overflow-auto">
        {/* Header */}
        <div className="mb-8 flex justify-between items-end">
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground mb-2">
              Welcome Back!
            </h1>
            <p className="text-muted-foreground">
              Here's what's happening with your placements today.
            </p>
          </div>
          <Button onClick={() => navigate("/college/verification")} className="gap-2">
            <Users className="w-4 h-4" />
            Verify Students
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="card-forest flex items-start justify-between animate-fade-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div>
                <p className="text-muted-foreground text-sm mb-1">{stat.title}</p>
                <p className="font-display text-3xl font-bold text-foreground mb-2">
                  {stat.value}
                </p>
                <span className="inline-flex items-center gap-1 text-sm text-sage font-medium">
                  <TrendingUp size={14} />
                  {stat.change}
                </span>
              </div>
              <div className={`w-12 h-12 rounded-xl ${stat.color} flex items-center justify-center`}>
                <stat.icon className="w-6 h-6 text-primary-foreground" />
              </div>
            </div>
          ))}
        </div>

        {/* Featured Companies */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-xl font-semibold text-foreground">
              Featured Companies
            </h2>
            <Button variant="ghost" size="sm" onClick={() => navigate("/college/companies")}>
              View All
              <ArrowUpRight size={14} />
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {featuredCompanies.map((company, index) => (
              <div
                key={company.id}
                className="card-forest hover:shadow-medium transition-all cursor-pointer animate-fade-up"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => navigate(`/college/company/${company.id}`)}
              >
                <div className="flex items-start gap-4">
                  <img
                    src={company.logo}
                    alt={company.name}
                    className="w-14 h-14 rounded-xl object-contain bg-white p-2 shadow-sm"
                    onError={(e) => {
                      e.currentTarget.src = `https://ui-avatars.com/api/?name=${company.name}&background=2D5A4A&color=fff`;
                    }}
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-foreground">{company.name}</h3>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${company.status === "Hiring"
                          ? "bg-sage/20 text-sage"
                          : "bg-accent/20 text-accent"
                        }`}>
                        {company.status}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      {company.roles.join(", ")}
                    </p>
                    <p className="text-sm font-medium text-sage">{company.package}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Activities */}
          <div className="card-forest">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-xl font-semibold text-foreground">
                Recent Activities
              </h2>
              <Button variant="ghost" size="sm">
                View All
                <ArrowUpRight size={14} />
              </Button>
            </div>

            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                >
                  <img
                    src={activity.logo}
                    alt={activity.company}
                    className="w-10 h-10 rounded-lg object-contain bg-white p-1 shadow-sm flex-shrink-0"
                    onError={(e) => {
                      e.currentTarget.src = `https://ui-avatars.com/api/?name=${activity.company}&background=2D5A4A&color=fff`;
                    }}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground truncate">
                      {activity.company}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {activity.action} • {activity.role}
                    </p>
                  </div>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">
                    {activity.time}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Drives */}
          <div className="card-forest">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-xl font-semibold text-foreground">
                Upcoming Placement Drives
              </h2>
              <Button variant="ghost" size="sm">
                Schedule
                <Calendar size={14} />
              </Button>
            </div>

            <div className="space-y-4">
              {upcomingDrives.map((drive, index) => (
                <div
                  key={index}
                  className="p-4 rounded-lg border border-border hover:border-sage transition-colors"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <img
                      src={drive.logo}
                      alt={drive.company}
                      className="w-8 h-8 rounded-lg object-contain bg-white p-1"
                      onError={(e) => {
                        e.currentTarget.src = `https://ui-avatars.com/api/?name=${drive.company}&background=2D5A4A&color=fff`;
                      }}
                    />
                    <h3 className="font-medium text-foreground flex-1">{drive.company}</h3>
                    <span className="text-sm text-sage font-medium">{drive.date}</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Briefcase size={14} />
                      {drive.roles} roles
                    </span>
                    <span className="flex items-center gap-1">
                      <Users size={14} />
                      {drive.students} eligible
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CollegeDashboard;
