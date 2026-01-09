import { useNavigate } from "react-router-dom";
import AdminSidebar from "@/components/AdminSidebar";
import { API_BASE_URL } from "../../services/apiConfig";

import { GraduationCap, Building2, Users, Clock, TrendingUp, CheckCircle, XCircle, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { toast } from "sonner";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  const stats = [
    {
      title: "Total Colleges",
      value: "156",
      change: "+8 this month",
      icon: GraduationCap,
      color: "bg-forest-medium",
    },
    {
      title: "Total Companies",
      value: "1,247",
      change: "+45 this month",
      icon: Building2,
      color: "bg-sage",
    },
    {
      title: "Total Students",
      value: "52,840",
      change: "+2.3k this month",
      icon: Users,
      color: "bg-accent",
    },
    {
      title: "Pending Approvals",
      value: "23",
      change: "Needs attention",
      icon: Clock,
      color: "bg-earth",
    },
  ];

  /* API Integration State */
  const [pendingColleges, setPendingColleges] = useState<any[]>([]);
  const [pendingCompanies, setPendingCompanies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch Logic
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [collegesRes, companiesRes] = await Promise.all([
          fetch(`${API_BASE_URL}/admin/pending-colleges`),
          fetch(`${API_BASE_URL}/admin/pending-companies`)
        ]);


        if (collegesRes.ok) {
          const data = await collegesRes.json();
          // Map to UI format if needed, or use directly
          setPendingColleges(data.map((c: any) => ({
            id: c._id,
            name: c.collegeName,
            location: c.location || "N/A",
            email: c.email, // Needed for verification
            date: "Pending" // We don't have date in DB yet
          })));
        }

        if (companiesRes.ok) {
          const data = await companiesRes.json();
          setPendingCompanies(data.map((c: any) => ({
            id: c._id,
            name: c.companyName,
            industry: c.industry || "N/A",
            email: c.email,
            date: "Pending"
          })));
        }
      } catch (error) {
        console.error("Failed to fetch pending approvals", error);
        toast.error("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleApproveCollege = async (email: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/verify-college/${email}`, {

        method: "POST"
      });
      if (response.ok) {
        setPendingColleges(pendingColleges.filter((c) => c.email !== email));
        toast.success(`College ${email} approved successfully!`);
      } else {
        toast.error("Failed to approve college");
      }
    } catch (e) {
      toast.error("Error connecting to server");
    }
  };

  const handleRejectCollege = (id: number) => {
    // For MVP just remove from view or implement delete endpoint later
    // setPendingColleges(pendingColleges.filter((c) => c.id !== id));
    toast.info("Reject functionality not implemented in MVP");
  };

  const handleApproveCompany = async (email: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/verify-company/${email}`, {

        method: "POST"
      });
      if (response.ok) {
        setPendingCompanies(pendingCompanies.filter((c) => c.email !== email));
        toast.success(`Company ${email} approved successfully!`);
      } else {
        toast.error("Failed to approve company");
      }
    } catch (e) {
      toast.error("Error connecting to server");
    }
  };

  const handleRejectCompany = (id: number) => {
    toast.info("Reject functionality not implemented in MVP");
  };

  return (
    <div className="flex min-h-screen w-full bg-background">
      <AdminSidebar onLogout={handleLogout} />

      <main className="flex-1 p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold text-foreground mb-2">
            Admin Dashboard
          </h1>
          <p className="text-muted-foreground">
            Welcome back, Super Admin. Here's your platform overview.
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Pending College Approvals */}
          <div className="card-forest">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-xl font-semibold text-foreground">
                Pending College Approvals
              </h2>
              <span className="px-3 py-1 rounded-full bg-accent/20 text-accent text-sm font-medium">
                {pendingColleges.length} pending
              </span>
            </div>

            {pendingColleges.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">
                No pending college approvals
              </p>
            ) : (
              <div className="space-y-4">
                {pendingColleges.map((college) => (
                  <div
                    key={college.id}
                    className="flex items-center justify-between p-4 rounded-lg bg-muted/50 border border-border"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-sage-light flex items-center justify-center">
                        <GraduationCap size={18} className="text-forest-medium" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{college.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {college.location} • {college.date}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-sage hover:text-forest-medium hover:bg-sage/20"
                        onClick={() => handleApproveCollege(college.email)}
                      >
                        <CheckCircle size={18} />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-destructive hover:bg-destructive/20"
                        onClick={() => handleRejectCollege(college.id)}
                      >
                        <XCircle size={18} />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Pending Company Approvals */}
          <div className="card-forest">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-xl font-semibold text-foreground">
                Pending Company Approvals
              </h2>
              <span className="px-3 py-1 rounded-full bg-accent/20 text-accent text-sm font-medium">
                {pendingCompanies.length} pending
              </span>
            </div>

            {pendingCompanies.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">
                No pending company approvals
              </p>
            ) : (
              <div className="space-y-4">
                {pendingCompanies.map((company) => (
                  <div
                    key={company.id}
                    className="flex items-center justify-between p-4 rounded-lg bg-muted/50 border border-border"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-gold-light flex items-center justify-center">
                        <Building2 size={18} className="text-earth" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{company.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {company.industry} • {company.date}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-sage hover:text-forest-medium hover:bg-sage/20"
                        onClick={() => handleApproveCompany(company.email)}
                      >
                        <CheckCircle size={18} />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-destructive hover:bg-destructive/20"
                        onClick={() => handleRejectCompany(company.id)}
                      >
                        <XCircle size={18} />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 card-forest">
          <h2 className="font-display text-xl font-semibold text-foreground mb-6">
            Quick Actions
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-auto py-4 flex-col gap-2">
              <GraduationCap size={24} />
              <span>Manage Colleges</span>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex-col gap-2">
              <Building2 size={24} />
              <span>Manage Companies</span>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex-col gap-2">
              <Users size={24} />
              <span>View Students</span>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex-col gap-2">
              <Eye size={24} />
              <span>View Analytics</span>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
