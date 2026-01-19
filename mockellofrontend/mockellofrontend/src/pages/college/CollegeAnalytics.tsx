import { useNavigate } from "react-router-dom";
import CollegeSidebar from "@/components/CollegeSidebar";
import { TrendingUp, Users, Briefcase, Target, GraduationCap, Building2 } from "lucide-react";
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

const CollegeAnalytics = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  // Placement trend data (last 5 years)
  const placementTrend = [
    { year: "2020", placed: 320, total: 450, percentage: 71 },
    { year: "2021", placed: 380, total: 480, percentage: 79 },
    { year: "2022", placed: 420, total: 500, percentage: 84 },
    { year: "2023", placed: 465, total: 520, percentage: 89 },
    { year: "2024", placed: 485, total: 530, percentage: 92 },
  ];

  // Package distribution
  const packageData = [
    { range: "3-5 LPA", students: 120, color: "hsl(var(--sage))" },
    { range: "5-8 LPA", students: 180, color: "hsl(var(--forest-medium))" },
    { range: "8-12 LPA", students: 95, color: "hsl(var(--accent))" },
    { range: "12-20 LPA", students: 55, color: "hsl(var(--earth))" },
    { range: "20+ LPA", students: 35, color: "hsl(var(--gold))" },
  ];

  // Department-wise placement
  const departmentData = [
    { dept: "CSE", placed: 145, total: 150 },
    { dept: "ECE", placed: 98, total: 120 },
    { dept: "Mech", placed: 75, total: 100 },
    { dept: "Civil", placed: 55, total: 80 },
    { dept: "EEE", placed: 62, total: 80 },
  ];

  // Monthly recruitment activity
  const monthlyActivity = [
    { month: "Aug", companies: 5, offers: 20 },
    { month: "Sep", companies: 12, offers: 65 },
    { month: "Oct", companies: 18, offers: 120 },
    { month: "Nov", companies: 15, offers: 95 },
    { month: "Dec", companies: 22, offers: 140 },
    { month: "Jan", companies: 8, offers: 45 },
  ];

  // Top recruiters
  const topRecruiters = [
    { company: "TCS", hires: 48, logo: "https://logo.clearbit.com/tcs.com" },
    { company: "Wipro", hires: 35, logo: "https://logo.clearbit.com/wipro.com" },
    { company: "Infosys", hires: 42, logo: "https://logo.clearbit.com/infosys.com" },
    { company: "Accenture", hires: 28, logo: "https://logo.clearbit.com/accenture.com" },
    { company: "Zoho", hires: 22, logo: "https://logo.clearbit.com/zoho.com" },
  ];

  const stats = [
    {
      title: "Placement Rate",
      value: "92%",
      change: "+3% from last year",
      icon: TrendingUp,
      color: "bg-forest-medium",
    },
    {
      title: "Average Package",
      value: "8.2 LPA",
      change: "+15% from last year",
      icon: Target,
      color: "bg-sage",
    },
    {
      title: "Students Placed",
      value: "485",
      change: "Out of 530",
      icon: GraduationCap,
      color: "bg-accent",
    },
    {
      title: "Companies Visited",
      value: "78",
      change: "+12 from last year",
      icon: Building2,
      color: "bg-earth",
    },
  ];

  return (
    <div className="flex min-h-screen w-full bg-background">
      <CollegeSidebar onLogout={handleLogout} />

      <main className="flex-1 p-8 overflow-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold text-foreground mb-2">
            Placement Analytics
          </h1>
          <p className="text-muted-foreground">
            Track your college's placement performance and trends
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
          {/* Placement Trend */}
          <div className="card-forest">
            <h2 className="font-display text-xl font-semibold text-foreground mb-6">
              Placement Trend (5 Years)
            </h2>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={placementTrend}>
                  <defs>
                    <linearGradient id="colorPlaced" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--sage))" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="hsl(var(--sage))" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="year" stroke="hsl(var(--muted-foreground))" />
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
                    dataKey="percentage"
                    stroke="hsl(var(--sage))"
                    fillOpacity={1}
                    fill="url(#colorPlaced)"
                    name="Placement %"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Package Distribution */}
          <div className="card-forest">
            <h2 className="font-display text-xl font-semibold text-foreground mb-6">
              Package Distribution
            </h2>
            <div className="h-[300px] flex items-center">
              <ResponsiveContainer width="50%" height="100%">
                <PieChart>
                  <Pie
                    data={packageData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="students"
                  >
                    {packageData.map((entry, index) => (
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
                {packageData.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-sm text-muted-foreground">
                      {item.range}: {item.students}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Charts Row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Department-wise Placement */}
          <div className="card-forest">
            <h2 className="font-display text-xl font-semibold text-foreground mb-6">
              Department-wise Placement
            </h2>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={departmentData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis type="number" stroke="hsl(var(--muted-foreground))" />
                  <YAxis dataKey="dept" type="category" stroke="hsl(var(--muted-foreground))" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar dataKey="placed" fill="hsl(var(--sage))" name="Placed" radius={[0, 4, 4, 0]} />
                  <Bar dataKey="total" fill="hsl(var(--border))" name="Total" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Monthly Activity */}
          <div className="card-forest">
            <h2 className="font-display text-xl font-semibold text-foreground mb-6">
              Monthly Recruitment Activity
            </h2>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyActivity}>
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
                    dataKey="companies"
                    stroke="hsl(var(--forest-medium))"
                    strokeWidth={2}
                    name="Companies"
                    dot={{ fill: "hsl(var(--forest-medium))" }}
                  />
                  <Line
                    type="monotone"
                    dataKey="offers"
                    stroke="hsl(var(--accent))"
                    strokeWidth={2}
                    name="Offers"
                    dot={{ fill: "hsl(var(--accent))" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Top Recruiters */}
        <div className="card-forest">
          <h2 className="font-display text-xl font-semibold text-foreground mb-6">
            Top Recruiters
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {topRecruiters.map((recruiter, index) => (
              <div
                key={index}
                className="flex flex-col items-center p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
              >
                <img
                  src={recruiter.logo}
                  alt={recruiter.company}
                  className="w-16 h-16 object-contain rounded-lg bg-white p-2 mb-3"
                  onError={(e) => {
                    e.currentTarget.src = `https://ui-avatars.com/api/?name=${recruiter.company}&background=2D5A4A&color=fff`;
                  }}
                />
                <p className="font-medium text-foreground text-center">{recruiter.company}</p>
                <p className="text-sm text-sage">{recruiter.hires} hires</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default CollegeAnalytics;
