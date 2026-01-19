import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Filter, MapPin, Users, GraduationCap, Eye, Send, CheckCircle, Clock, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import CompanySidebar from "@/components/CompanySidebar";

const collegesData = [
  {
    id: 1,
    name: "IIT Delhi",
    location: "New Delhi",
    students: 8500,
    branches: ["CS", "ECE", "ME", "EE", "Civil"],
    status: "partner",
    tier: "Tier 1",
  },
  {
    id: 2,
    name: "NIT Trichy",
    location: "Tiruchirappalli",
    students: 6200,
    branches: ["CS", "ECE", "ME", "EE", "Chemical"],
    status: "partner",
    tier: "Tier 1",
  },
  {
    id: 3,
    name: "BITS Pilani",
    location: "Pilani, Rajasthan",
    students: 4500,
    branches: ["CS", "ECE", "ME", "Chemical"],
    status: "pending",
    tier: "Tier 1",
  },
  {
    id: 4,
    name: "VIT Vellore",
    location: "Vellore",
    students: 12000,
    branches: ["CS", "ECE", "ME", "EE", "IT"],
    status: "new",
    tier: "Tier 2",
  },
  {
    id: 5,
    name: "SRM Chennai",
    location: "Chennai",
    students: 15000,
    branches: ["CS", "ECE", "ME", "EE", "Civil", "IT"],
    status: "new",
    tier: "Tier 2",
  },
  {
    id: 6,
    name: "IIT Bombay",
    location: "Mumbai",
    students: 9000,
    branches: ["CS", "ECE", "ME", "EE", "Chemical"],
    status: "partner",
    tier: "Tier 1",
  },
];

const CompanyColleges = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [colleges, setColleges] = useState(collegesData);
  const { toast } = useToast();

  const filteredColleges = colleges.filter(
    (college) =>
      college.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      college.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleConnect = (collegeId: number, collegeName: string) => {
    setColleges((prev) =>
      prev.map((c) => (c.id === collegeId ? { ...c, status: "pending" } : c))
    );
    toast({
      title: "Request Sent!",
      description: `Partnership request sent to ${collegeName}`,
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "partner":
        return (
          <Badge className="bg-forest-light/20 text-forest-medium border-0 gap-1">
            <CheckCircle className="w-3 h-3" />
            Partner
          </Badge>
        );
      case "pending":
        return (
          <Badge className="bg-gold/20 text-gold border-0 gap-1">
            <Clock className="w-3 h-3" />
            Pending
          </Badge>
        );
      default:
        return (
          <Badge variant="secondary" className="gap-1">
            <Building2 className="w-3 h-3" />
            New
          </Badge>
        );
    }
  };

  return (
    <CompanySidebar>
      <div className="p-6 lg:p-8 space-y-6">
        {/* Header */}
        <div className="animate-fade-in">
          <h1 className="font-display text-3xl font-bold text-foreground mb-2">
            Partner Colleges
          </h1>
          <p className="text-muted-foreground">
            Browse and connect with colleges for campus recruitment
          </p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 animate-fade-in" style={{ animationDelay: "100ms" }}>
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search by college name or location..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" className="gap-2">
            <Filter className="w-4 h-4" />
            Filters
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-fade-in" style={{ animationDelay: "200ms" }}>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="font-display text-2xl font-bold text-foreground">
                {colleges.filter((c) => c.status === "partner").length}
              </p>
              <p className="text-sm text-muted-foreground">Partners</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="font-display text-2xl font-bold text-foreground">
                {colleges.filter((c) => c.status === "pending").length}
              </p>
              <p className="text-sm text-muted-foreground">Pending</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="font-display text-2xl font-bold text-foreground">
                {colleges.filter((c) => c.tier === "Tier 1").length}
              </p>
              <p className="text-sm text-muted-foreground">Tier 1</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="font-display text-2xl font-bold text-foreground">
                {colleges.reduce((acc, c) => acc + c.students, 0).toLocaleString()}
              </p>
              <p className="text-sm text-muted-foreground">Total Students</p>
            </CardContent>
          </Card>
        </div>

        {/* Colleges Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredColleges.map((college, index) => (
            <Card
              key={college.id}
              className="hover-lift animate-fade-in"
              style={{ animationDelay: `${(index + 3) * 100}ms` }}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-forest-light/20 flex items-center justify-center">
                    <span className="font-display font-bold text-forest-medium">
                      {college.name.split(" ").map((w) => w[0]).join("").slice(0, 2)}
                    </span>
                  </div>
                  {getStatusBadge(college.status)}
                </div>

                <h3 className="font-display font-semibold text-foreground mb-1">
                  {college.name}
                </h3>
                <div className="flex items-center gap-1.5 text-sm text-muted-foreground mb-3">
                  <MapPin className="w-3 h-3" />
                  <span>{college.location}</span>
                </div>

                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-1.5">
                    <Users className="w-4 h-4" />
                    <span>{college.students.toLocaleString()}</span>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {college.tier}
                  </Badge>
                </div>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {college.branches.slice(0, 4).map((branch) => (
                    <Badge key={branch} variant="secondary" className="text-xs bg-muted">
                      {branch}
                    </Badge>
                  ))}
                  {college.branches.length > 4 && (
                    <Badge variant="secondary" className="text-xs bg-muted">
                      +{college.branches.length - 4}
                    </Badge>
                  )}
                </div>

                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1 gap-1.5"
                    asChild
                  >
                    <Link to={`/company/college/${college.id}`}>
                      <Eye className="w-4 h-4" />
                      View
                    </Link>
                  </Button>
                  {college.status === "new" && (
                    <Button
                      variant="forest"
                      size="sm"
                      className="flex-1 gap-1.5"
                      onClick={() => handleConnect(college.id, college.name)}
                    >
                      <Send className="w-4 h-4" />
                      Connect
                    </Button>
                  )}
                  {college.status === "partner" && (
                    <Button variant="sage" size="sm" className="flex-1 gap-1.5">
                      <GraduationCap className="w-4 h-4" />
                      Recruit
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredColleges.length === 0 && (
          <Card className="animate-fade-in">
            <CardContent className="p-12 text-center">
              <GraduationCap className="w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-50" />
              <h3 className="font-display text-lg font-medium text-foreground mb-2">
                No Colleges Found
              </h3>
              <p className="text-muted-foreground">
                Try adjusting your search query
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </CompanySidebar>
  );
};

export default CompanyColleges;
