import { useNavigate, Link } from "react-router-dom";
import CollegeSidebar from "@/components/CollegeSidebar";
import { Search, Filter, Eye, MapPin, Briefcase, Users, CheckCircle, Clock, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { sharedCompanies } from "@/lib/sharedCompanies";

const CollegeCompanies = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handleLogout = () => {
    navigate("/");
  };

  const getEligibilityBadge = (status: string) => {
    switch (status) {
      case "eligible":
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-sage/20 text-forest-medium text-sm font-medium">
            <CheckCircle size={14} />
            Eligible
          </span>
        );
      case "pending":
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-accent/20 text-accent text-sm font-medium">
            <Clock size={14} />
            Pending
          </span>
        );
      case "not_eligible":
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-destructive/20 text-destructive text-sm font-medium">
            <XCircle size={14} />
            Not Eligible
          </span>
        );
      default:
        return null;
    }
  };

  const filteredCompanies = sharedCompanies.filter((company) =>
    company.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex min-h-screen w-full bg-background">
      <CollegeSidebar onLogout={handleLogout} />

      <main className="flex-1 p-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground mb-2">
              Companies
            </h1>
            <p className="text-muted-foreground">
              Browse and connect with registered companies
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search companies..."
                className="pl-10 w-64 input-forest"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline">
              <Filter size={16} />
              Filters
            </Button>
          </div>
        </div>

        {/* Companies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCompanies.map((company, index) => (
            <div
              key={company.id}
              className="card-forest animate-fade-up"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <img
                    src={company.logo}
                    alt={company.name}
                    className="w-12 h-12 rounded-xl object-contain bg-white p-2 shadow-sm"
                    onError={(e) => {
                      e.currentTarget.src = `https://ui-avatars.com/api/?name=${company.name}&background=2D5A4A&color=fff`;
                    }}
                  />
                  <div>
                    <h3 className="font-semibold text-foreground">{company.name}</h3>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <MapPin size={12} />
                      {company.location}
                    </p>
                  </div>
                </div>
                {getEligibilityBadge(company.eligibility)}
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Briefcase size={14} className="text-sage" />
                  <span>{company.roles.join(", ")}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Users size={14} className="text-sage" />
                  <span>{company.openings} openings</span>
                </div>
                <div className="text-sm">
                  <span className="text-muted-foreground">Package: </span>
                  <span className="font-medium text-forest-medium">{company.package}</span>
                </div>
              </div>

              <Button variant="outline" className="w-full" asChild>
                <Link to={`/college/company/${company.id}`}>
                  <Eye size={16} />
                  View Profile
                </Link>
              </Button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default CollegeCompanies;
