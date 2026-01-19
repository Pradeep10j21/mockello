import { useNavigate } from "react-router-dom";
import AdminSidebar from "@/components/AdminSidebar";
import { Users, Search, GraduationCap, Briefcase, TrendingUp, AlertTriangle, RefreshCw, Eye, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";

const AdminStudents = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "placed" | "maintenance">("all");

  const [studentGroups, setStudentGroups] = useState([
    { id: 1, college: "IIT Delhi", totalStudents: 4500, placed: 4140, active: 360, status: "active" },
    { id: 2, college: "BITS Pilani", totalStudents: 3800, placed: 3344, active: 456, status: "active" },
    { id: 3, college: "VIT Vellore", totalStudents: 8500, placed: 7225, active: 1275, status: "active" },
    { id: 4, college: "NIT Trichy", totalStudents: 3200, placed: 2880, active: 320, status: "active" },
    { id: 5, college: "PSG College", totalStudents: 4200, placed: 3654, active: 546, status: "maintenance" },
    { id: 6, college: "SRM University", totalStudents: 12000, placed: 9840, active: 2160, status: "active" },
    { id: 7, college: "IIIT Hyderabad", totalStudents: 2800, placed: 2632, active: 168, status: "active" },
    { id: 8, college: "Manipal IT", totalStudents: 6500, placed: 5525, active: 975, status: "maintenance" },
  ]);

  const totalStudents = studentGroups.reduce((acc, g) => acc + g.totalStudents, 0);
  const totalPlaced = studentGroups.reduce((acc, g) => acc + g.placed, 0);
  const totalActive = studentGroups.reduce((acc, g) => acc + g.active, 0);

  const handleToggleMaintenance = (id: number) => {
    setStudentGroups(studentGroups.map(g => {
      if (g.id === id) {
        const newStatus = g.status === "maintenance" ? "active" : "maintenance";
        toast.success(`Student records ${newStatus === "maintenance" ? "put under maintenance" : "restored"}`);
        return { ...g, status: newStatus };
      }
      return g;
    }));
  };

  const filteredGroups = studentGroups.filter(group => {
    const matchesSearch = group.college.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || 
                          (statusFilter === "maintenance" && group.status === "maintenance") ||
                          (statusFilter === "active" && group.status === "active");
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="flex min-h-screen w-full bg-background">
      <AdminSidebar onLogout={handleLogout} />

      <main className="flex-1 p-8 overflow-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold text-foreground mb-2">
            Students Overview
          </h1>
          <p className="text-muted-foreground">
            Monitor student records and service maintenance by college
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="card-forest flex items-start justify-between">
            <div>
              <p className="text-muted-foreground text-sm mb-1">Total Students</p>
              <p className="font-display text-3xl font-bold text-foreground">{totalStudents.toLocaleString()}</p>
              <span className="text-sm text-sage">Across all colleges</span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-forest-medium flex items-center justify-center">
              <Users className="w-6 h-6 text-primary-foreground" />
            </div>
          </div>
          <div className="card-forest flex items-start justify-between">
            <div>
              <p className="text-muted-foreground text-sm mb-1">Placed Students</p>
              <p className="font-display text-3xl font-bold text-foreground">{totalPlaced.toLocaleString()}</p>
              <span className="text-sm text-sage">{((totalPlaced / totalStudents) * 100).toFixed(1)}% placement rate</span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-sage flex items-center justify-center">
              <Briefcase className="w-6 h-6 text-primary-foreground" />
            </div>
          </div>
          <div className="card-forest flex items-start justify-between">
            <div>
              <p className="text-muted-foreground text-sm mb-1">Active Seekers</p>
              <p className="font-display text-3xl font-bold text-foreground">{totalActive.toLocaleString()}</p>
              <span className="text-sm text-accent">Looking for opportunities</span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-primary-foreground" />
            </div>
          </div>
          <div className="card-forest flex items-start justify-between">
            <div>
              <p className="text-muted-foreground text-sm mb-1">Under Maintenance</p>
              <p className="font-display text-3xl font-bold text-foreground">{studentGroups.filter(g => g.status === "maintenance").length}</p>
              <span className="text-sm text-earth">Colleges in maintenance</span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-earth flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-primary-foreground" />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
            <Input
              placeholder="Search by college..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 input-forest"
            />
          </div>
          <div className="flex gap-2">
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
              variant={statusFilter === "maintenance" ? "default" : "outline"}
              onClick={() => setStatusFilter("maintenance")}
              size="sm"
            >
              <AlertTriangle size={14} className="mr-1" />
              Maintenance
            </Button>
          </div>
        </div>

        {/* Student Groups Table */}
        <div className="card-forest overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-4 px-4 text-sm font-medium text-muted-foreground">College</th>
                  <th className="text-left py-4 px-4 text-sm font-medium text-muted-foreground">Total Students</th>
                  <th className="text-left py-4 px-4 text-sm font-medium text-muted-foreground">Placed</th>
                  <th className="text-left py-4 px-4 text-sm font-medium text-muted-foreground">Active Seekers</th>
                  <th className="text-left py-4 px-4 text-sm font-medium text-muted-foreground">Placement %</th>
                  <th className="text-left py-4 px-4 text-sm font-medium text-muted-foreground">Status</th>
                  <th className="text-left py-4 px-4 text-sm font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredGroups.map((group) => (
                  <tr key={group.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-sage-light flex items-center justify-center">
                          <GraduationCap size={18} className="text-forest-medium" />
                        </div>
                        <span className="font-medium text-foreground">{group.college}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-muted-foreground">{group.totalStudents.toLocaleString()}</td>
                    <td className="py-4 px-4 text-sage font-medium">{group.placed.toLocaleString()}</td>
                    <td className="py-4 px-4 text-accent">{group.active.toLocaleString()}</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-sage rounded-full transition-all"
                            style={{ width: `${(group.placed / group.totalStudents) * 100}%` }}
                          />
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {((group.placed / group.totalStudents) * 100).toFixed(0)}%
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        group.status === "active" 
                          ? "bg-sage/20 text-sage" 
                          : "bg-earth/20 text-earth"
                      }`}>
                        {group.status === "active" ? "Active" : "Maintenance"}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="ghost">
                          <Eye size={16} />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className={group.status === "maintenance" ? "text-sage" : "text-earth"}
                          onClick={() => handleToggleMaintenance(group.id)}
                          title={group.status === "maintenance" ? "Restore" : "Put under maintenance"}
                        >
                          {group.status === "maintenance" ? <RefreshCw size={16} /> : <Settings size={16} />}
                        </Button>
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

export default AdminStudents;
