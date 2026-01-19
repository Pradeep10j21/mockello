import { useNavigate, useParams, Link } from "react-router-dom";
import CompanySidebar from "@/components/CompanySidebar";
import { Building2, MapPin, Globe, Mail, Phone, GraduationCap, Clock, Users, ArrowLeft, Send, CheckCircle, TrendingUp, Award, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const CollegeDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const handleLogout = () => {
    navigate("/");
  };

  // Mock college data
  const college = {
    id: id,
    name: "IIT Delhi",
    logo: "ID",
    tagline: "Excellence in Education and Research",
    location: "New Delhi",
    website: "www.iitd.ac.in",
    email: "admin@iitd.ac.in",
    phone: "+91 11 2659 7135",
    about:
      "IIT Delhi is one of the premier engineering institutes in India, established in 1961. The institute offers undergraduate, postgraduate, and doctoral programs in various engineering and science disciplines. Known for its strong research culture and industry collaborations, IIT Delhi has produced numerous successful engineers and entrepreneurs.",
    founded: "1961",
    students: "8500+",
    branches: ["CSE", "ECE", "ME", "EE", "Civil", "Chemical"],
    tier: "Tier 1",
    status: "partner",
    eligibility: {
      cgpa: "8.0+",
      branches: ["CSE", "ECE", "ME", "EE", "IT"],
      backlogs: "No active backlogs",
      skills: ["Programming", "Problem Solving", "Communication"],
    },
    placementStats: {
      averagePackage: "15.5 LPA",
      highestPackage: "45 LPA",
      placementRate: "92%",
      topRecruiters: ["Google", "Microsoft", "Amazon", "Adobe", "Goldman Sachs"],
      totalOffers: "850+",
    },
    facilities: [
      "State-of-the-art laboratories and research centers",
      "Modern library with extensive digital resources",
      "Industry collaboration centers",
      "Career development and placement cell",
      "Entrepreneurship and innovation hub",
    ],
  };

  const handleConnect = () => {
    toast.success("Partnership request sent to " + college.name);
  };

  return (
    <div className="flex min-h-screen w-full bg-background">
      <CompanySidebar>
        <main className="flex-1 p-8">
          {/* Back Button */}
          <Link
            to="/company/colleges"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
          >
            <ArrowLeft size={16} />
            <span>Back to Colleges</span>
          </Link>

          {/* College Header */}
          <div className="card-forest mb-8">
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              <div className="w-20 h-20 rounded-2xl bg-primary flex items-center justify-center text-primary-foreground text-2xl font-bold shadow-medium">
                {college.logo}
              </div>
              <div className="flex-1">
                <h1 className="font-display text-3xl font-bold text-foreground mb-1">
                  {college.name}
                </h1>
                <p className="text-muted-foreground mb-3">{college.tagline}</p>
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <MapPin size={14} className="text-sage" />
                    {college.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Globe size={14} className="text-sage" />
                    {college.website}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users size={14} className="text-sage" />
                    {college.students} students
                  </span>
                </div>
              </div>
              {college.status === "new" && (
                <Button variant="forest" size="lg" onClick={handleConnect}>
                  <Send size={16} />
                  Connect
                </Button>
              )}
              {college.status === "partner" && (
                <Button variant="sage" size="lg" onClick={handleConnect}>
                  <GraduationCap size={16} />
                  Recruit
                </Button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* About */}
              <div className="card-forest">
                <h2 className="font-display text-xl font-semibold text-foreground mb-4">
                  About College
                </h2>
                <p className="text-muted-foreground leading-relaxed">{college.about}</p>
              </div>

              {/* Available Branches */}
              <div className="card-forest">
                <h2 className="font-display text-xl font-semibold text-foreground mb-6">
                  Available Branches
                </h2>
                <div className="flex flex-wrap gap-2">
                  {college.branches.map((branch) => (
                    <span
                      key={branch}
                      className="px-3 py-1 rounded-full bg-muted text-sm text-foreground"
                    >
                      {branch}
                    </span>
                  ))}
                </div>
              </div>

              {/* Placement Statistics */}
              <div className="card-forest">
                <h2 className="font-display text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  Placement Statistics
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-6">
                  <div className="p-4 rounded-xl bg-secondary/30 border border-border">
                    <p className="text-sm text-muted-foreground mb-1">Average Package</p>
                    <p className="text-2xl font-bold text-primary">{college.placementStats.averagePackage}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-secondary/30 border border-border">
                    <p className="text-sm text-muted-foreground mb-1">Highest Package</p>
                    <p className="text-2xl font-bold text-secondary">{college.placementStats.highestPackage}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-secondary/30 border border-border">
                    <p className="text-sm text-muted-foreground mb-1">Placement Rate</p>
                    <p className="text-2xl font-bold text-accent">{college.placementStats.placementRate}</p>
                  </div>
                </div>
                <div className="mb-4">
                  <p className="text-sm text-muted-foreground mb-2">Total Offers (Last Year)</p>
                  <p className="text-lg font-semibold text-foreground">{college.placementStats.totalOffers}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-3">Top Recruiters</p>
                  <div className="flex flex-wrap gap-2">
                    {college.placementStats.topRecruiters.map((recruiter) => (
                      <span
                        key={recruiter}
                        className="px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20"
                      >
                        {recruiter}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Facilities & Infrastructure */}
              <div className="card-forest">
                <h2 className="font-display text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-primary" />
                  Facilities & Infrastructure
                </h2>
                <div className="space-y-3">
                  {college.facilities.map((facility, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted/70 transition-colors">
                      <CheckCircle size={18} className="text-sage mt-0.5 flex-shrink-0" />
                      <p className="text-foreground">{facility}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Eligibility Criteria */}
              <div className="card-forest">
                <h2 className="font-display text-xl font-semibold text-foreground mb-6">
                  Student Eligibility
                </h2>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Minimum CGPA</p>
                    <p className="font-medium text-foreground">{college.eligibility.cgpa}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Eligible Branches</p>
                    <div className="flex flex-wrap gap-2">
                      {college.eligibility.branches.map((branch) => (
                        <span
                          key={branch}
                          className="px-2 py-1 rounded bg-muted text-sm text-foreground"
                        >
                          {branch}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Backlogs</p>
                    <p className="font-medium text-foreground">{college.eligibility.backlogs}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Required Skills</p>
                    <div className="space-y-2">
                      {college.eligibility.skills.map((skill) => (
                        <div key={skill} className="flex items-center gap-2 text-sm">
                          <CheckCircle size={14} className="text-sage" />
                          <span className="text-foreground">{skill}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact */}
              <div className="card-forest">
                <h2 className="font-display text-xl font-semibold text-foreground mb-6">
                  Contact Information
                </h2>
                <div className="space-y-4">
                  <a
                    href={`mailto:${college.email}`}
                    className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Mail size={18} className="text-sage" />
                    <span>{college.email}</span>
                  </a>
                  <a
                    href={`tel:${college.phone}`}
                    className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Phone size={18} className="text-sage" />
                    <span>{college.phone}</span>
                  </a>
                  <a
                    href={`https://${college.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Globe size={18} className="text-sage" />
                    <span>{college.website}</span>
                  </a>
                </div>
              </div>

              {/* College Stats */}
              <div className="card-forest">
                <h2 className="font-display text-xl font-semibold text-foreground mb-6">
                  College Statistics
                </h2>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Tier</p>
                    <p className="font-medium text-foreground">{college.tier}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Total Students</p>
                    <p className="font-medium text-foreground">{college.students}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Founded</p>
                    <p className="font-medium text-foreground">{college.founded}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </CompanySidebar>
    </div>
  );
};

export default CollegeDetail;

