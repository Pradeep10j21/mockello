import { useNavigate } from "react-router-dom";
import AdminSidebar from "@/components/AdminSidebar";
import { TrendingUp, Users, Building2, GraduationCap, Target, Briefcase } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts";

const AdminAnalytics = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  // Platform growth data
  const platformGrowth = [
    { month: "Jul", colleges: 120, companies: 850, students: 35000 },
    { month: "Aug", colleges: 128, companies: 920, students: 38000 },
    { month: "Sep", colleges: 138, companies: 1020, students: 42000 },
    { month: "Oct", colleges: 145, companies: 1120, students: 46000 },
    { month: "Nov", colleges: 152, companies: 1200, students: 50000 },
    { month: "Dec", colleges: 156, companies: 1247, students: 52840 },
  ];

  // Placement statistics by region
  const regionData = [
    { region: "North", placements: 12500, color: "hsl(var(--sage))" },
    { region: "South", placements: 18200, color: "hsl(var(--forest-medium))" },
    { region: "East", placements: 8500, color: "hsl(var(--accent))" },
    { region: "West", placements: 15600, color: "hsl(var(--earth))" },
    { region: "Central", placements: 6200, color: "hsl(var(--gold))" },
  ];

  // Industry-wise distribution
  const industryData = [
    { industry: "IT Services", companies: 420, placements: 18500 },
    { industry: "Banking", companies: 180, placements: 8200 },
    { industry: "Consulting", companies: 95, placements: 5400 },
    { industry: "Manufacturing", companies: 220, placements: 7800 },
    { industry: "Healthcare", companies: 85, placements: 3200 },
    { industry: "E-commerce", companies: 145, placements: 6500 },
  ];

  // Monthly registrations
  const registrationData = [
    { month: "Jul", colleges: 8, companies: 45 },
    { month: "Aug", colleges: 12, companies: 78 },
    { month: "Sep", colleges: 15, companies: 112 },
    { month: "Oct", colleges: 10, companies: 95 },
    { month: "Nov", colleges: 8, companies: 82 },
    { month: "Dec", colleges: 6, companies: 52 },
  ];

  const stats = [
    {
      title: "Total Placements",
      value: "52,840",
      change: "+18% this quarter",
      icon: Target,
      color: "bg-forest-medium",
    },
    {
      title: "Active Colleges",
      value: "156",
      change: "+8 this month",
      icon: GraduationCap,
      color: "bg-sage",
    },
    {
      title: "Active Companies",
      value: "1,247",
      change: "+45 this month",
      icon: Building2,
      color: "bg-accent",
    },
    {
      title: "Avg. Package",
      value: "7.8 LPA",
      change: "+12% from last year",
      icon: TrendingUp,
      color: "bg-earth",
    },
  ];

  return (
    <div className="flex min-h-screen w-full bg-background">
      <AdminSidebar onLogout={handleLogout} />

      <main className="flex-1 p-8 overflow-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold text-foreground mb-2">
            Platform Analytics
          </h1>
          <p className="text-muted-foreground">
            Overview of platform performance and growth metrics
          </p>
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

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Platform Growth */}
          <div className="card-forest">
            <h2 className="font-display text-xl font-semibold text-foreground mb-6">
              Platform Growth
            </h2>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={platformGrowth}>
                  <defs>
                    <linearGradient id="colorColleges" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--sage))" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="hsl(var(--sage))" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorCompanies" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--accent))" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="hsl(var(--accent))" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="colleges"
                    stroke="hsl(var(--sage))"
                    fillOpacity={1}
                    fill="url(#colorColleges)"
                    name="Colleges"
                  />
                  <Area
                    type="monotone"
                    dataKey="companies"
                    stroke="hsl(var(--accent))"
                    fillOpacity={1}
                    fill="url(#colorCompanies)"
                    name="Companies"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Regional Distribution */}
          <div className="card-forest">
            <h2 className="font-display text-xl font-semibold text-foreground mb-6">
              Regional Distribution
            </h2>
            <div className="h-[300px] flex items-center">
              <ResponsiveContainer width="50%" height="100%">
                <PieChart>
                  <Pie
                    data={regionData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="placements"
                  >
                    {regionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex-1 space-y-2">
                {regionData.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-sm text-muted-foreground">
                      {item.region}: {item.placements.toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Charts Row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Industry-wise Distribution */}
          <div className="card-forest">
            <h2 className="font-display text-xl font-semibold text-foreground mb-6">
              Industry-wise Distribution
            </h2>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={industryData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis type="number" stroke="hsl(var(--muted-foreground))" />
                  <YAxis dataKey="industry" type="category" stroke="hsl(var(--muted-foreground))" width={100} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar dataKey="companies" fill="hsl(var(--sage))" name="Companies" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Monthly Registrations */}
          <div className="card-forest">
            <h2 className="font-display text-xl font-semibold text-foreground mb-6">
              Monthly Registrations
            </h2>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={registrationData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="colleges"
                    stroke="hsl(var(--forest-medium))"
                    strokeWidth={2}
                    name="Colleges"
                    dot={{ fill: "hsl(var(--forest-medium))" }}
                  />
                  <Line
                    type="monotone"
                    dataKey="companies"
                    stroke="hsl(var(--accent))"
                    strokeWidth={2}
                    name="Companies"
                    dot={{ fill: "hsl(var(--accent))" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminAnalytics;
