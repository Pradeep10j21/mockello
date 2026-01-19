import { useNavigate, useParams, Link } from "react-router-dom";
import CollegeSidebar from "@/components/CollegeSidebar";
import { Building2, MapPin, Globe, Mail, Phone, Briefcase, GraduationCap, Clock, DollarSign, Users, ArrowLeft, Send, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const CompanyDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const handleLogout = () => {
    navigate("/");
  };

  // Mock company data
  const company = {
    id: id,
    name: "TechCorp Solutions",
    logo: "TC",
    tagline: "Innovating Tomorrow's Technology",
    location: "Mumbai, Maharashtra",
    website: "www.techcorp.com",
    email: "hr@techcorp.com",
    phone: "+91 22 1234 5678",
    about:
      "TechCorp Solutions is a leading technology company specializing in enterprise software solutions, cloud computing, and AI-driven products. With over 5,000 employees across 15 countries, we're committed to building innovative solutions that transform businesses.",
    founded: "2010",
    employees: "5,000+",
    industry: "Information Technology",
    roles: [
      {
        title: "Software Engineer",
        type: "Full-time",
        experience: "0-2 years",
        package: "12-15 LPA",
        openings: 10,
      },
      {
        title: "Data Analyst",
        type: "Full-time",
        experience: "0-1 years",
        package: "8-10 LPA",
        openings: 5,
      },
    ],
    eligibility: {
      cgpa: "7.0+",
      branches: ["CSE", "IT", "ECE", "EE"],
      backlogs: "No active backlogs",
      skills: ["Programming", "Problem Solving", "Communication"],
    },
    process: [
      "Online Assessment",
      "Technical Interview (2 rounds)",
      "HR Interview",
      "Offer Letter",
    ],
  };

  const handleApply = () => {
    toast.success("Application submitted! Students have been notified.");
  };

  return (
    <div className="flex min-h-screen w-full bg-background">
      <CollegeSidebar onLogout={handleLogout} />

      <main className="flex-1 p-8">
        {/* Back Button */}
        <Link
          to="/college/companies"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          <ArrowLeft size={16} />
          <span>Back to Companies</span>
        </Link>

        {/* Company Header */}
        <div className="card-forest mb-8">
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <div className="w-20 h-20 rounded-2xl bg-primary flex items-center justify-center text-primary-foreground text-2xl font-bold shadow-medium">
              {company.logo}
            </div>
            <div className="flex-1">
              <h1 className="font-display text-3xl font-bold text-foreground mb-1">
                {company.name}
              </h1>
              <p className="text-muted-foreground mb-3">{company.tagline}</p>
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <MapPin size={14} className="text-sage" />
                  {company.location}
                </span>
                <span className="flex items-center gap-1">
                  <Globe size={14} className="text-sage" />
                  {company.website}
                </span>
                <span className="flex items-center gap-1">
                  <Users size={14} className="text-sage" />
                  {company.employees} employees
                </span>
              </div>
            </div>
            <Button variant="forest" size="lg" onClick={handleApply}>
              <Send size={16} />
              Apply / Notify Students
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* About */}
            <div className="card-forest">
              <h2 className="font-display text-xl font-semibold text-foreground mb-4">
                About Company
              </h2>
              <p className="text-muted-foreground leading-relaxed">{company.about}</p>
            </div>

            {/* Job Roles */}
            <div className="card-forest">
              <h2 className="font-display text-xl font-semibold text-foreground mb-6">
                Available Positions
              </h2>
              <div className="space-y-4">
                {company.roles.map((role, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-lg bg-muted/50 border border-border"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-foreground">{role.title}</h3>
                        <p className="text-sm text-muted-foreground">{role.type}</p>
                      </div>
                      <span className="px-3 py-1 rounded-full bg-sage/20 text-forest-medium text-sm font-medium">
                        {role.openings} openings
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm">
                      <span className="flex items-center gap-1 text-muted-foreground">
                        <Clock size={14} />
                        {role.experience}
                      </span>
                      <span className="flex items-center gap-1 text-forest-medium font-medium">
                        <DollarSign size={14} />
                        {role.package}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Selection Process */}
            <div className="card-forest">
              <h2 className="font-display text-xl font-semibold text-foreground mb-6">
                Selection Process
              </h2>
              <div className="relative">
                {company.process.map((step, index) => (
                  <div key={index} className="flex items-start gap-4 pb-6 last:pb-0">
                    <div className="relative">
                      <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
                        {index + 1}
                      </div>
                      {index < company.process.length - 1 && (
                        <div className="absolute top-8 left-1/2 -translate-x-1/2 w-0.5 h-6 bg-border" />
                      )}
                    </div>
                    <div className="pt-1">
                      <p className="font-medium text-foreground">{step}</p>
                    </div>
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
                Eligibility Criteria
              </h2>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Minimum CGPA</p>
                  <p className="font-medium text-foreground">{company.eligibility.cgpa}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Eligible Branches</p>
                  <div className="flex flex-wrap gap-2">
                    {company.eligibility.branches.map((branch) => (
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
                  <p className="font-medium text-foreground">{company.eligibility.backlogs}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Required Skills</p>
                  <div className="space-y-2">
                    {company.eligibility.skills.map((skill) => (
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
                  href={`mailto:${company.email}`}
                  className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Mail size={18} className="text-sage" />
                  <span>{company.email}</span>
                </a>
                <a
                  href={`tel:${company.phone}`}
                  className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Phone size={18} className="text-sage" />
                  <span>{company.phone}</span>
                </a>
                <a
                  href={`https://${company.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Globe size={18} className="text-sage" />
                  <span>{company.website}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CompanyDetail;
