import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, MapPin, Building2, Eye, DollarSign } from "lucide-react";
import StudentDashboardLayout from "@/components/StudentDashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const companies = [
  { id: "1", name: "TechCorp Solutions", initials: "TC", location: "Mumbai", role: "Software Engineer", package: "12-18 LPA", deadline: "Dec 30, 2024" },
  { id: "2", name: "DataFlow Inc", initials: "DF", location: "Bangalore", role: "Data Analyst", package: "10-15 LPA", deadline: "Jan 05, 2025" },
  { id: "3", name: "CloudNine Systems", initials: "CN", location: "Pune", role: "DevOps Engineer", package: "14-20 LPA", deadline: "Jan 10, 2025" },
  { id: "4", name: "FinTech Pro", initials: "FP", location: "Delhi", role: "Backend Developer", package: "12-16 LPA", deadline: "Jan 15, 2025" },
  { id: "5", name: "AI Dynamics", initials: "AI", location: "Hyderabad", role: "ML Engineer", package: "18-25 LPA", deadline: "Jan 20, 2025" },
  { id: "6", name: "GreenEnergy Corp", initials: "GE", location: "Chennai", role: "Software Developer", package: "10-14 LPA", deadline: "Jan 25, 2025" },
];

const StudentCompaniesPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const filteredCompanies = companies.filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()) || c.role.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <StudentDashboardLayout>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div><h1 className="text-3xl font-serif font-bold">Eligible Companies</h1><p className="text-muted-foreground">Companies matching your profile and qualifications</p></div>
          <div className="relative"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" /><Input placeholder="Search companies..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-9 w-64 bg-card" /></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCompanies.map((company) => (
            <Card key={company.id} className="border-border/50 bg-card/50 hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-14 h-14 rounded-xl bg-primary text-primary-foreground flex items-center justify-center font-serif font-bold text-lg">{company.initials}</div>
                  <div className="flex-1"><h3 className="font-semibold text-lg">{company.name}</h3><p className="text-sm text-muted-foreground flex items-center gap-1"><MapPin className="w-3 h-3" />{company.location}</p></div>
                  <Badge variant="secondary">Eligible</Badge>
                </div>
                <div className="space-y-2 mb-4">
                  <p className="text-sm"><Building2 className="w-4 h-4 inline mr-2 text-muted-foreground" />{company.role}</p>
                  <p className="text-sm font-medium text-primary"><DollarSign className="w-4 h-4 inline mr-1" />{company.package}</p>
                  <p className="text-xs text-muted-foreground">Deadline: {company.deadline}</p>
                </div>
                <Button asChild variant="outline" className="w-full"><Link to={`/student/companies/${company.id}`}><Eye className="w-4 h-4 mr-2" />View Details</Link></Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </StudentDashboardLayout>
  );
};

export default StudentCompaniesPage;
