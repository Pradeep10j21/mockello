import { useNavigate } from "react-router-dom";
import AdminSidebar from "@/components/AdminSidebar";
import { GraduationCap, Search, CheckCircle, XCircle, Eye, MoreHorizontal, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";

const AdminColleges = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "pending">("all");

  const [colleges, setColleges] = useState([
    { id: 1, name: "Indian Institute of Technology, Delhi", location: "New Delhi", students: 4500, status: "active", placements: 92 },
    { id: 2, name: "BITS Pilani", location: "Rajasthan", students: 3800, status: "active", placements: 88 },
    { id: 3, name: "VIT Vellore", location: "Tamil Nadu", students: 8500, status: "active", placements: 85 },
    { id: 4, name: "NIT Trichy", location: "Tamil Nadu", students: 3200, status: "active", placements: 90 },
    { id: 5, name: "ABC Engineering College", location: "Delhi", students: 1200, status: "pending", placements: 0 },
    { id: 6, name: "XYZ Institute of Technology", location: "Mumbai", students: 2400, status: "pending", placements: 0 },
    { id: 7, name: "PSG College of Technology", location: "Coimbatore", students: 4200, status: "active", placements: 87 },
    { id: 8, name: "SRM University", location: "Chennai", students: 12000, status: "active", placements: 82 },
  ]);

  const handleApprove = (id: number) => {
    setColleges(colleges.map(c => c.id === id ? { ...c, status: "active" } : c));
    toast.success("College approved successfully!");
  };

  const handleReject = (id: number) => {
    setColleges(colleges.filter(c => c.id !== id));
    toast.info("College registration rejected");
  };

  const filteredColleges = colleges.filter(college => {
    const matchesSearch = college.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         college.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || college.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="flex min-h-screen w-full bg-background">
      <AdminSidebar onLogout={handleLogout} />

      <main className="flex-1 p-8 overflow-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold text-foreground mb-2">
            Colleges Management
          </h1>
          <p className="text-muted-foreground">
            Manage and monitor all registered colleges
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
            <Input
              placeholder="Search colleges..."
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
              variant={statusFilter === "pending" ? "default" : "outline"}
              onClick={() => setStatusFilter("pending")}
              size="sm"
            >
              Pending
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="card-forest">
            <p className="text-sm text-muted-foreground">Total Colleges</p>
            <p className="font-display text-2xl font-bold text-foreground">{colleges.length}</p>
          </div>
          <div className="card-forest">
            <p className="text-sm text-muted-foreground">Active Colleges</p>
            <p className="font-display text-2xl font-bold text-sage">{colleges.filter(c => c.status === "active").length}</p>
          </div>
          <div className="card-forest">
            <p className="text-sm text-muted-foreground">Pending Approval</p>
            <p className="font-display text-2xl font-bold text-accent">{colleges.filter(c => c.status === "pending").length}</p>
          </div>
        </div>

        {/* Colleges Table */}
        <div className="card-forest overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-4 px-4 text-sm font-medium text-muted-foreground">College</th>
                  <th className="text-left py-4 px-4 text-sm font-medium text-muted-foreground">Location</th>
                  <th className="text-left py-4 px-4 text-sm font-medium text-muted-foreground">Students</th>
                  <th className="text-left py-4 px-4 text-sm font-medium text-muted-foreground">Placement %</th>
                  <th className="text-left py-4 px-4 text-sm font-medium text-muted-foreground">Status</th>
                  <th className="text-left py-4 px-4 text-sm font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredColleges.map((college) => (
                  <tr key={college.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-sage-light flex items-center justify-center">
                          <GraduationCap size={18} className="text-forest-medium" />
                        </div>
                        <span className="font-medium text-foreground">{college.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-muted-foreground">{college.location}</td>
                    <td className="py-4 px-4 text-muted-foreground">{college.students.toLocaleString()}</td>
                    <td className="py-4 px-4">
                      {college.status === "active" ? (
                        <span className="text-sage font-medium">{college.placements}%</span>
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </td>
                    <td className="py-4 px-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        college.status === "active" 
                          ? "bg-sage/20 text-sage" 
                          : "bg-accent/20 text-accent"
                      }`}>
                        {college.status === "active" ? "Active" : "Pending"}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        {college.status === "pending" ? (
                          <>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="text-sage hover:bg-sage/20"
                              onClick={() => handleApprove(college.id)}
                            >
                              <CheckCircle size={16} />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="text-destructive hover:bg-destructive/20"
                              onClick={() => handleReject(college.id)}
                            >
                              <XCircle size={16} />
                            </Button>
                          </>
                        ) : (
                          <Button size="sm" variant="ghost">
                            <Eye size={16} />
                          </Button>
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

export default AdminColleges;
