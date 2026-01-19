import { useNavigate } from "react-router-dom";
import AdminSidebar from "@/components/AdminSidebar";
import { Building2, Search, CheckCircle, XCircle, Eye, Settings, AlertTriangle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";

const AdminCompanies = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "pending" | "maintenance">("all");

  const [companies, setCompanies] = useState([
    { id: 1, name: "Tata Consultancy Services", industry: "IT Services", employees: "600,000+", status: "active", hires: 2450, logo: "https://logo.clearbit.com/tcs.com" },
    { id: 2, name: "Wipro", industry: "IT Services", employees: "250,000+", status: "active", hires: 1820, logo: "https://logo.clearbit.com/wipro.com" },
    { id: 3, name: "Infosys", industry: "IT Services", employees: "340,000+", status: "active", hires: 2100, logo: "https://logo.clearbit.com/infosys.com" },
    { id: 4, name: "Accenture", industry: "Consulting", employees: "700,000+", status: "active", hires: 1560, logo: "https://logo.clearbit.com/accenture.com" },
    { id: 5, name: "Zoho Corporation", industry: "Software", employees: "15,000+", status: "active", hires: 890, logo: "https://logo.clearbit.com/zoho.com" },
    { id: 6, name: "Tech Mahindra", industry: "IT Services", employees: "150,000+", status: "maintenance", hires: 980, logo: "https://logo.clearbit.com/techmahindra.com" },
    { id: 7, name: "InnoTech Solutions", industry: "Software", employees: "500+", status: "pending", hires: 0, logo: "" },
    { id: 8, name: "DataWave Analytics", industry: "Data Science", employees: "200+", status: "pending", hires: 0, logo: "" },
    { id: 9, name: "Cognizant", industry: "IT Services", employees: "350,000+", status: "active", hires: 1750, logo: "https://logo.clearbit.com/cognizant.com" },
    { id: 10, name: "HCL Technologies", industry: "IT Services", employees: "210,000+", status: "maintenance", hires: 1420, logo: "https://logo.clearbit.com/hcltech.com" },
  ]);

  const handleApprove = (id: number) => {
    setCompanies(companies.map(c => c.id === id ? { ...c, status: "active" } : c));
    toast.success("Company approved successfully!");
  };

  const handleReject = (id: number) => {
    setCompanies(companies.filter(c => c.id !== id));
    toast.info("Company registration rejected");
  };

  const handleToggleMaintenance = (id: number) => {
    setCompanies(companies.map(c => {
      if (c.id === id) {
        const newStatus = c.status === "maintenance" ? "active" : "maintenance";
        toast.success(`Company ${newStatus === "maintenance" ? "put under maintenance" : "restored"}`);
        return { ...c, status: newStatus };
      }
      return c;
    }));
  };

  const filteredCompanies = companies.filter(company => {
    const matchesSearch = company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         company.industry.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || company.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="flex min-h-screen w-full bg-background">
      <AdminSidebar onLogout={handleLogout} />

      <main className="flex-1 p-8 overflow-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold text-foreground mb-2">
            Companies Management
          </h1>
          <p className="text-muted-foreground">
            Manage and monitor all registered companies and service maintenance
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
            <Input
              placeholder="Search companies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 input-forest"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            <Button
              variant={statusFilter === "all" ? "default" : "outline"}
              onClick={() => setStatusFilter("all")}
              size="sm"
            >
              All
            </Button>
            <Button
              variant={statusFilter === "active" ? "default" : "outline"}
              onClick={() => setStatusFilter("active")}
              size="sm"
            >
              Active
            </Button>
            <Button
              variant={statusFilter === "pending" ? "default" : "outline"}
              onClick={() => setStatusFilter("pending")}
              size="sm"
            >
              Pending
            </Button>
            <Button
              variant={statusFilter === "maintenance" ? "default" : "outline"}
              onClick={() => setStatusFilter("maintenance")}
              size="sm"
            >
              <AlertTriangle size={14} className="mr-1" />
              Maintenance
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="card-forest">
            <p className="text-sm text-muted-foreground">Total Companies</p>
            <p className="font-display text-2xl font-bold text-foreground">{companies.length}</p>
          </div>
          <div className="card-forest">
            <p className="text-sm text-muted-foreground">Active</p>
            <p className="font-display text-2xl font-bold text-sage">{companies.filter(c => c.status === "active").length}</p>
          </div>
          <div className="card-forest">
            <p className="text-sm text-muted-foreground">Pending</p>
            <p className="font-display text-2xl font-bold text-accent">{companies.filter(c => c.status === "pending").length}</p>
          </div>
          <div className="card-forest">
            <p className="text-sm text-muted-foreground">Under Maintenance</p>
            <p className="font-display text-2xl font-bold text-earth">{companies.filter(c => c.status === "maintenance").length}</p>
          </div>
        </div>

        {/* Companies Table */}
        <div className="card-forest overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-4 px-4 text-sm font-medium text-muted-foreground">Company</th>
                  <th className="text-left py-4 px-4 text-sm font-medium text-muted-foreground">Industry</th>
                  <th className="text-left py-4 px-4 text-sm font-medium text-muted-foreground">Employees</th>
                  <th className="text-left py-4 px-4 text-sm font-medium text-muted-foreground">Total Hires</th>
                  <th className="text-left py-4 px-4 text-sm font-medium text-muted-foreground">Status</th>
                  <th className="text-left py-4 px-4 text-sm font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCompanies.map((company) => (
                  <tr key={company.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        {company.logo ? (
                          <img
                            src={company.logo}
                            alt={company.name}
                            className="w-10 h-10 rounded-lg object-contain bg-white p-1"
                            onError={(e) => {
                              e.currentTarget.src = `https://ui-avatars.com/api/?name=${company.name}&background=2D5A4A&color=fff`;
                            }}
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-lg bg-gold-light flex items-center justify-center">
                            <Building2 size={18} className="text-earth" />
                          </div>
                        )}
                        <span className="font-medium text-foreground">{company.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-muted-foreground">{company.industry}</td>
                    <td className="py-4 px-4 text-muted-foreground">{company.employees}</td>
                    <td className="py-4 px-4">
                      {company.hires > 0 ? (
                        <span className="text-sage font-medium">{company.hires.toLocaleString()}</span>
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </td>
                    <td className="py-4 px-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        company.status === "active" 
                          ? "bg-sage/20 text-sage" 
                          : company.status === "pending"
                          ? "bg-accent/20 text-accent"
                          : "bg-earth/20 text-earth"
                      }`}>
                        {company.status === "active" ? "Active" : company.status === "pending" ? "Pending" : "Maintenance"}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        {company.status === "pending" ? (
                          <>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="text-sage hover:bg-sage/20"
                              onClick={() => handleApprove(company.id)}
                            >
                              <CheckCircle size={16} />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="text-destructive hover:bg-destructive/20"
                              onClick={() => handleReject(company.id)}
                            >
                              <XCircle size={16} />
                            </Button>
                          </>
                        ) : (
                          <>
                            <Button size="sm" variant="ghost">
                              <Eye size={16} />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              className={company.status === "maintenance" ? "text-sage" : "text-earth"}
                              onClick={() => handleToggleMaintenance(company.id)}
                              title={company.status === "maintenance" ? "Restore" : "Put under maintenance"}
                            >
                              {company.status === "maintenance" ? <RefreshCw size={16} /> : <Settings size={16} />}
                            </Button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminCompanies;
