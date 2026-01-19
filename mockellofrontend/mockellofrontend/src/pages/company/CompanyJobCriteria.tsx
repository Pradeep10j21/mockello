import { useState } from "react";
import { 
  Plus, Edit, Trash2, ChevronDown, ChevronUp, Briefcase, Users, 
  GraduationCap, IndianRupee, MapPin, Clock, FileText, CheckCircle,
  X, Building2, Award, Calendar, ClipboardList, FileCheck, MessageSquare, Search
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import CompanySidebar from "@/components/CompanySidebar";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const branches = [
  "Computer Science",
  "Electronics",
  "Mechanical",
  "Civil",
  "Electrical",
  "Information Technology",
  "Chemical",
  "Biotechnology",
  "MBA",
  "BBA",
  "B.Com",
  "B.Com (General)",
  "B.Com (Accounting & Finance)",
  "B.Com (Corporate Secretaryship)",
  "B.Com (Banking & Insurance)",
  "B.Com (Computer Applications)",
  "B.Com (Professional Accounting)",
  "B.Com (Honours)",
  "B.Com (Finance)",
  "B.Com (Taxation)",
  "B.Com (Marketing Management)",
  "B.Com (Human Resource Management)",
  "B.Com (International Business)",
  "B.Com (E-Commerce)",
  "B.Com (Information Systems Management)",
  "B.Com (Business Analytics)",
  "B.Com (Logistics & Supply Chain Management)",
  "B.Com (Retail Management)",
  "B.Com (Tourism & Hospitality Management)",
];

const indianColleges = [
  // IITs
  "Indian Institute of Technology Bombay (IIT Bombay)",
  "Indian Institute of Technology Delhi (IIT Delhi)",
  "Indian Institute of Technology Madras (IIT Madras)",
  "Indian Institute of Technology Kanpur (IIT Kanpur)",
  "Indian Institute of Technology Kharagpur (IIT Kharagpur)",
  "Indian Institute of Technology Roorkee (IIT Roorkee)",
  "Indian Institute of Technology Guwahati (IIT Guwahati)",
  "Indian Institute of Technology Hyderabad (IIT Hyderabad)",
  // NITs
  "National Institute of Technology Trichy (NIT Trichy)",
  "National Institute of Technology Surathkal (NITK)",
  "National Institute of Technology Warangal (NIT Warangal)",
  // Tamil Nadu Colleges
  "Vellore Institute of Technology (VIT Vellore)",
  "SRM Institute of Science and Technology (SRM Chennai)",
  "PSG College of Technology (PSG Tech)",
  "Thiagarajar College of Engineering (TCE Madurai)",
  "Amrita School of Engineering, Coimbatore",
  "SSN College of Engineering, Chennai",
  "Sri Venkateswara College of Engineering (SVCE Chennai)",
  "Kongu Engineering College, Erode",
  "St. Joseph's College of Engineering, Chennai",
  "Velammal Engineering College, Chennai",
  "Kumaraguru College of Technology, Coimbatore",
  "Rajalakshmi Engineering College, Chennai",
  "Sathyabama Institute of Science and Technology, Chennai",
  "Saveetha Engineering College, Chennai",
  "Vel Tech Rangarajan Dr. Sagunthala R&D Institute, Chennai",
  "Jeppiaar Engineering College, Chennai",
  "Mepco Schlenk Engineering College, Sivakasi",
  "Hindustan Institute of Technology and Science, Chennai",
  "Sri Sairam Engineering College, Chennai",
  "RMK Engineering College, Chennai",
  "Adhiyamaan College of Engineering, Hosur",
  "Anna University, Chennai",
  "Coimbatore Institute of Technology (CIT)",
  "Government College of Technology (GCT Coimbatore)",
  "National Institute of Technology Puducherry (NIT Puducherry)",
  "Indian Institute of Information Technology Tiruchirappalli (IIIT Trichy)",
  "Kalasalingam Academy of Research and Education, Srivilliputhur",
  // Other Top Colleges
  "Birla Institute of Technology and Science Pilani (BITS Pilani)",
  "Delhi Technological University (DTU)",
  "Netaji Subhas University of Technology (NSUT)",
  "Manipal Institute of Technology (MIT Manipal)",
  "International Institute of Information Technology Hyderabad (IIIT Hyderabad)",
  "International Institute of Information Technology Bangalore (IIIT Bangalore)",
  "Punjab Engineering College (PEC Chandigarh)",
  "College of Engineering Pune (COEP)",
  "National Institute of Engineering Mysore (NIE Mysore)",
  "Thapar Institute of Engineering and Technology (TIET)",
  "Amity University",
  "Lovely Professional University (LPU)",
  "Chandigarh University",
  "KIIT University",
  "Jadavpur University",
  "Indian Institute of Science Bangalore (IISc Bangalore)",
  // Management Institutes
  "Indian Institute of Management Ahmedabad (IIM Ahmedabad)",
  "Indian Institute of Management Bangalore (IIM Bangalore)",
  "Indian Institute of Management Calcutta (IIM Calcutta)",
  "Xavier School of Management (XLRI)",
  "Symbiosis Institute of Business Management (SIBM)",
];

const jobTypes = [
  "Full-Time",
  "Part-Time",
  "Internship",
  "Contract",
  "Freelance",
];

interface JobPosting {
  id: number;
  jobTitle: string;
  jobType: string;
  location: string;
  workMode: string;
  branches: string[];
  colleges: string[];
  cgpa: number;
  batch: number;
  salaryMin: string;
  salaryMax: string;
  openings: number;
  responsibilities: string;
  skills: string;
  workingHours: string;
  benefits: string;
  applicationProcess: string;
  documentsNeeded: string;
  interviewProcess: string;
  additionalInfo: string;
  postedDate: string;
  status: "active" | "closed" | "draft";
}

const existingJobs: JobPosting[] = [
  {
    id: 1,
    jobTitle: "Software Development Engineer",
    jobType: "Full-Time",
    location: "Bangalore, Karnataka",
    workMode: "Hybrid",
    branches: ["Computer Science", "Information Technology"],
    colleges: [],
    cgpa: 7.5,
    batch: 2025,
    salaryMin: "12",
    salaryMax: "18",
    openings: 15,
    responsibilities: "Design and develop scalable software solutions. Collaborate with cross-functional teams. Write clean, maintainable code.",
    skills: "Java, Python, Data Structures, Algorithms, SQL, Git",
    workingHours: "9 AM - 6 PM (Flexible)",
    benefits: "Health Insurance, Stock Options, Learning Budget, Team Outings",
    applicationProcess: "Apply through portal → Online Assessment → Technical Interview → HR Round",
    documentsNeeded: "Resume, Mark sheets, ID Proof, Passport-size photo",
    interviewProcess: "3 rounds - Coding Test, Technical Interview, HR Discussion",
    additionalInfo: "Relocation assistance provided. 6 months probation period.",
    postedDate: "2024-01-15",
    status: "active",
  },
  {
    id: 2,
    jobTitle: "Data Analyst",
    jobType: "Full-Time",
    location: "Mumbai, Maharashtra",
    workMode: "On-site",
    branches: ["Computer Science", "Electronics", "Electrical"],
    colleges: [],
    cgpa: 7.0,
    batch: 2025,
    salaryMin: "8",
    salaryMax: "12",
    openings: 8,
    responsibilities: "Analyze large datasets. Create reports and dashboards. Provide data-driven insights.",
    skills: "Python, SQL, Excel, Tableau, Power BI, Statistics",
    workingHours: "9 AM - 6 PM",
    benefits: "Health Insurance, Performance Bonus, Gym Membership",
    applicationProcess: "Apply → Aptitude Test → Case Study → Interview",
    documentsNeeded: "Resume, Academic certificates, Portfolio (if any)",
    interviewProcess: "2 rounds - Case Study Presentation, HR Round",
    additionalInfo: "Training program for first 3 months.",
    postedDate: "2024-01-10",
    status: "active",
  },
];

const CompanyJobCriteria = () => {
  const [showForm, setShowForm] = useState(false);
  const [jobs, setJobs] = useState<JobPosting[]>(existingJobs);
  const [expandedJob, setExpandedJob] = useState<number | null>(null);
  const { toast } = useToast();

  // Form state
  const [jobTitle, setJobTitle] = useState("");
  const [jobType, setJobType] = useState("");
  const [location, setLocation] = useState("");
  const [workMode, setWorkMode] = useState("");
  const [selectedBranches, setSelectedBranches] = useState<string[]>([]);
  const [selectedColleges, setSelectedColleges] = useState<string[]>([]);
  const [collegeSearch, setCollegeSearch] = useState("");
  const [minCgpa, setMinCgpa] = useState("");
  const [batch, setBatch] = useState("");
  const [salaryMin, setSalaryMin] = useState("");
  const [salaryMax, setSalaryMax] = useState("");
  const [openings, setOpenings] = useState("");
  const [responsibilities, setResponsibilities] = useState("");
  const [skills, setSkills] = useState("");
  const [workingHours, setWorkingHours] = useState("");
  const [benefits, setBenefits] = useState("");
  const [applicationProcess, setApplicationProcess] = useState("");
  const [documentsNeeded, setDocumentsNeeded] = useState("");
  const [interviewProcess, setInterviewProcess] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");

  // Filter colleges based on search
  const filteredColleges = indianColleges.filter((college) =>
    college.toLowerCase().includes(collegeSearch.toLowerCase())
  );

  // Choose all filtered colleges
  const handleChooseAllColleges = () => {
    const newSelections = [...new Set([...selectedColleges, ...filteredColleges])];
    setSelectedColleges(newSelections);
  };

  // Remove all filtered colleges
  const handleRemoveAllColleges = () => {
    setSelectedColleges(selectedColleges.filter((college) => !filteredColleges.includes(college)));
  };

  const handleBranchToggle = (branch: string) => {
    setSelectedBranches((prev) =>
      prev.includes(branch) ? prev.filter((b) => b !== branch) : [...prev, branch]
    );
  };

  const handleCollegeToggle = (college: string) => {
    setSelectedColleges((prev) =>
      prev.includes(college) ? prev.filter((c) => c !== college) : [...prev, college]
    );
  };

  const handleSubmit = () => {
    if (!jobTitle || !jobType || !location || selectedBranches.length === 0 || !minCgpa || !batch || !salaryMin || !openings || !responsibilities || !skills) {
      toast({
        title: "Missing Fields",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const newJob: JobPosting = {
      id: jobs.length + 1,
      jobTitle,
      jobType,
      location,
      workMode: workMode || "On-site",
      branches: selectedBranches,
      colleges: selectedColleges,
      cgpa: parseFloat(minCgpa),
      batch: parseInt(batch),
      salaryMin,
      salaryMax: salaryMax || salaryMin,
      openings: parseInt(openings),
      responsibilities,
      skills,
      workingHours: workingHours || "9 AM - 6 PM",
      benefits: benefits || "As per company policy",
      applicationProcess: applicationProcess || "Apply through portal",
      documentsNeeded: documentsNeeded || "Resume, ID Proof",
      interviewProcess: interviewProcess || "To be communicated",
      additionalInfo,
      postedDate: new Date().toISOString().split('T')[0],
      status: "active",
    };

    setJobs([newJob, ...jobs]);
    setShowForm(false);
    resetForm();
    toast({
      title: "Job Posted Successfully!",
      description: "Your job vacancy is now live",
    });
  };

  const resetForm = () => {
    setJobTitle("");
    setJobType("");
    setLocation("");
    setWorkMode("");
    setSelectedBranches([]);
    setSelectedColleges([]);
    setCollegeSearch("");
    setMinCgpa("");
    setBatch("");
    setSalaryMin("");
    setSalaryMax("");
    setOpenings("");
    setResponsibilities("");
    setSkills("");
    setWorkingHours("");
    setBenefits("");
    setApplicationProcess("");
    setDocumentsNeeded("");
    setInterviewProcess("");
    setAdditionalInfo("");
  };

  const handleDelete = (id: number) => {
    setJobs(jobs.filter((j) => j.id !== id));
    toast({
      title: "Deleted",
      description: "Job posting removed successfully",
    });
  };

  const toggleJobExpand = (id: number) => {
    setExpandedJob(expandedJob === id ? null : id);
  };

  return (
    <CompanySidebar>
      <div className="p-4 md:p-6 lg:p-8 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 animate-fade-in">
          <div>
            <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">
              Job Postings
            </h1>
            <p className="text-muted-foreground">
              Create and manage your job vacancies
            </p>
          </div>
          <Button
            variant="forest"
            className="gap-2"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? (
              <>
                <X className="w-4 h-4" />
                Cancel
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" />
                Post New Job
              </>
            )}
          </Button>
        </div>

        {/* Add New Job Form */}
        {showForm && (
          <Card className="animate-fade-in border-forest-light/30">
            <CardHeader>
              <CardTitle className="font-display flex items-center gap-2">
                <Briefcase className="w-5 h-5" />
                New Job Posting
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Section 1: Basic Job Details */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-foreground flex items-center gap-2 border-b border-border pb-2">
                  <FileText className="w-4 h-4" />
                  Basic Job Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">
                      Job Title *
                    </label>
                    <Input
                      placeholder="e.g., Software Development Engineer"
                      value={jobTitle}
                      onChange={(e) => setJobTitle(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">
                      Job Type *
                    </label>
                    <Select value={jobType} onValueChange={setJobType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        {jobTypes.map((type) => (
                          <SelectItem key={type} value={type}>{type}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">
                      Number of Openings *
                    </label>
                    <Input
                      type="number"
                      placeholder="e.g., 10"
                      value={openings}
                      onChange={(e) => setOpenings(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Section 2: Location & Work Mode */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-foreground flex items-center gap-2 border-b border-border pb-2">
                  <MapPin className="w-4 h-4" />
                  Location & Work Mode
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">
                      Job Location *
                    </label>
                    <Input
                      placeholder="e.g., Bangalore, Karnataka"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">
                      Work Mode
                    </label>
                    <Select value={workMode} onValueChange={setWorkMode}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select mode" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="On-site">On-site</SelectItem>
                        <SelectItem value="Remote">Remote</SelectItem>
                        <SelectItem value="Hybrid">Hybrid</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Section 3: Eligibility Criteria */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-foreground flex items-center gap-2 border-b border-border pb-2">
                  <GraduationCap className="w-4 h-4" />
                  Eligibility Criteria
                </h3>
                <div>
                  <label className="text-sm font-medium text-foreground mb-3 block">
                    Eligible Branches *
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {branches.map((branch) => (
                      <div key={branch} className="flex items-center space-x-2">
                        <Checkbox
                          id={branch}
                          checked={selectedBranches.includes(branch)}
                          onCheckedChange={() => handleBranchToggle(branch)}
                        />
                        <label
                          htmlFor={branch}
                          className="text-sm text-foreground cursor-pointer"
                        >
                          {branch}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-3 block">
                    Eligible Colleges
                  </label>
                  
                  {/* Search Bar */}
                  <div className="mb-3">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                      <Input
                        type="text"
                        placeholder="Search colleges..."
                        value={collegeSearch}
                        onChange={(e) => setCollegeSearch(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  {/* Choose All / Remove All Buttons */}
                  <div className="flex gap-2 mb-3">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={handleChooseAllColleges}
                      className="flex-1"
                    >
                      Choose All ({filteredColleges.length})
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={handleRemoveAllColleges}
                      className="flex-1"
                    >
                      Remove All
                    </Button>
                  </div>

                  {/* College List */}
                  <div className="max-h-60 overflow-y-auto border border-border rounded-lg p-4 space-y-2">
                    {filteredColleges.length > 0 ? (
                      filteredColleges.map((college) => (
                        <div key={college} className="flex items-center space-x-2">
                          <Checkbox
                            id={`college-${college}`}
                            checked={selectedColleges.includes(college)}
                            onCheckedChange={() => handleCollegeToggle(college)}
                          />
                          <label
                            htmlFor={`college-${college}`}
                            className="text-sm text-foreground cursor-pointer flex-1"
                          >
                            {college}
                          </label>
                        </div>
                      ))
                    ) : (
                      <div className="text-sm text-muted-foreground text-center py-4">
                        No colleges found matching your search
                      </div>
                    )}
                  </div>
                  
                  {selectedColleges.length > 0 && (
                    <div className="mt-2 text-sm text-muted-foreground">
                      {selectedColleges.length} college(s) selected
                    </div>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">
                      Minimum CGPA *
                    </label>
                    <Input
                      type="number"
                      step="0.1"
                      placeholder="e.g., 7.0"
                      value={minCgpa}
                      onChange={(e) => setMinCgpa(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">
                      Year of Passing *
                    </label>
                    <Select value={batch} onValueChange={setBatch}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select year" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2024">2024</SelectItem>
                        <SelectItem value="2025">2025</SelectItem>
                        <SelectItem value="2026">2026</SelectItem>
                        <SelectItem value="2027">2027</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Section 4: Roles & Responsibilities */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-foreground flex items-center gap-2 border-b border-border pb-2">
                  <ClipboardList className="w-4 h-4" />
                  Roles & Responsibilities
                </h3>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">
                    Job Responsibilities *
                  </label>
                  <Textarea
                    placeholder="Describe the key responsibilities and duties for this role..."
                    rows={4}
                    value={responsibilities}
                    onChange={(e) => setResponsibilities(e.target.value)}
                  />
                </div>
              </div>

              {/* Section 5: Skills & Qualifications */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-foreground flex items-center gap-2 border-b border-border pb-2">
                  <Award className="w-4 h-4" />
                  Required Skills & Qualifications
                </h3>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">
                    Skills Required *
                  </label>
                  <Textarea
                    placeholder="e.g., Java, Python, Data Structures, Communication Skills..."
                    rows={3}
                    value={skills}
                    onChange={(e) => setSkills(e.target.value)}
                  />
                </div>
              </div>

              {/* Section 6: Salary & Benefits */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-foreground flex items-center gap-2 border-b border-border pb-2">
                  <IndianRupee className="w-4 h-4" />
                  Salary & Benefits
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">
                      Salary Min (LPA) *
                    </label>
                    <Input
                      type="number"
                      placeholder="e.g., 8"
                      value={salaryMin}
                      onChange={(e) => setSalaryMin(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">
                      Salary Max (LPA)
                    </label>
                    <Input
                      type="number"
                      placeholder="e.g., 15"
                      value={salaryMax}
                      onChange={(e) => setSalaryMax(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">
                      Working Hours
                    </label>
                    <Input
                      placeholder="e.g., 9 AM - 6 PM"
                      value={workingHours}
                      onChange={(e) => setWorkingHours(e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">
                    Benefits & Perks
                  </label>
                  <Textarea
                    placeholder="e.g., Health Insurance, Stock Options, Flexible Hours, Learning Budget..."
                    rows={2}
                    value={benefits}
                    onChange={(e) => setBenefits(e.target.value)}
                  />
                </div>
              </div>

              {/* Section 7: Application Process */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-foreground flex items-center gap-2 border-b border-border pb-2">
                  <FileCheck className="w-4 h-4" />
                  Application Process
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">
                      How to Apply
                    </label>
                    <Textarea
                      placeholder="Describe the application steps..."
                      rows={2}
                      value={applicationProcess}
                      onChange={(e) => setApplicationProcess(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">
                      Documents Needed
                    </label>
                    <Textarea
                      placeholder="e.g., Resume, Mark sheets, ID Proof..."
                      rows={2}
                      value={documentsNeeded}
                      onChange={(e) => setDocumentsNeeded(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Section 8: Interview Process */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-foreground flex items-center gap-2 border-b border-border pb-2">
                  <MessageSquare className="w-4 h-4" />
                  Interview Process
                </h3>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">
                    Interview Rounds & Process
                  </label>
                  <Textarea
                    placeholder="e.g., Round 1: Online Assessment, Round 2: Technical Interview, Round 3: HR Discussion..."
                    rows={3}
                    value={interviewProcess}
                    onChange={(e) => setInterviewProcess(e.target.value)}
                  />
                </div>
              </div>

              {/* Section 9: Additional Information */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-foreground flex items-center gap-2 border-b border-border pb-2">
                  <Building2 className="w-4 h-4" />
                  Additional Information
                </h3>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">
                    Any Other Details
                  </label>
                  <Textarea
                    placeholder="Any additional information candidates should know..."
                    rows={2}
                    value={additionalInfo}
                    onChange={(e) => setAdditionalInfo(e.target.value)}
                  />
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex gap-3 justify-end pt-4 border-t border-border">
                <Button variant="outline" onClick={() => { setShowForm(false); resetForm(); }}>
                  Cancel
                </Button>
                <Button variant="forest" onClick={handleSubmit} className="gap-2">
                  <CheckCircle className="w-4 h-4" />
                  Publish Job
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Existing Job Postings */}
        <div className="space-y-4">
          {jobs.map((job, index) => (
            <Card
              key={job.id}
              className="hover-lift animate-fade-in overflow-hidden"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-0">
                {/* Job Header - Always Visible */}
                <div 
                  className="p-4 md:p-6 cursor-pointer"
                  onClick={() => toggleJobExpand(job.id)}
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-forest-light/20 flex items-center justify-center shrink-0">
                        <Briefcase className="w-6 h-6 text-forest-medium" />
                      </div>
                      <div className="space-y-1">
                        <h3 className="font-display text-lg font-semibold text-foreground">
                          {job.jobTitle}
                        </h3>
                        <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                          <Badge variant="secondary" className="bg-forest-light/20 text-forest-medium">
                            {job.jobType}
                          </Badge>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {job.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Users className="w-3 h-3" />
                            {job.openings} openings
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-2 pt-1">
                          {job.branches.slice(0, 3).map((branch) => (
                            <Badge key={branch} variant="outline" className="text-xs">
                              {branch}
                            </Badge>
                          ))}
                          {job.branches.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{job.branches.length - 3} more
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="flex items-center gap-1 text-forest-medium font-semibold">
                          <IndianRupee className="w-4 h-4" />
                          {job.salaryMin}-{job.salaryMax} LPA
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Min CGPA: {job.cgpa} | Batch {job.batch}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-destructive hover:text-destructive"
                          onClick={(e) => { e.stopPropagation(); handleDelete(job.id); }}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                        {expandedJob === job.id ? (
                          <ChevronUp className="w-5 h-5 text-muted-foreground" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-muted-foreground" />
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Expanded Details */}
                {expandedJob === job.id && (
                  <div className="border-t border-border p-4 md:p-6 bg-muted/30 animate-fade-in space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <h4 className="text-sm font-semibold text-foreground flex items-center gap-2 mb-2">
                            <ClipboardList className="w-4 h-4" />
                            Roles & Responsibilities
                          </h4>
                          <p className="text-sm text-muted-foreground whitespace-pre-line">{job.responsibilities}</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold text-foreground flex items-center gap-2 mb-2">
                            <Award className="w-4 h-4" />
                            Required Skills
                          </h4>
                          <p className="text-sm text-muted-foreground">{job.skills}</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold text-foreground flex items-center gap-2 mb-2">
                            <Clock className="w-4 h-4" />
                            Working Hours
                          </h4>
                          <p className="text-sm text-muted-foreground">{job.workingHours}</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold text-foreground flex items-center gap-2 mb-2">
                            <Building2 className="w-4 h-4" />
                            Benefits
                          </h4>
                          <p className="text-sm text-muted-foreground">{job.benefits}</p>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <h4 className="text-sm font-semibold text-foreground flex items-center gap-2 mb-2">
                            <FileCheck className="w-4 h-4" />
                            Application Process
                          </h4>
                          <p className="text-sm text-muted-foreground">{job.applicationProcess}</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold text-foreground flex items-center gap-2 mb-2">
                            <FileText className="w-4 h-4" />
                            Documents Needed
                          </h4>
                          <p className="text-sm text-muted-foreground">{job.documentsNeeded}</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold text-foreground flex items-center gap-2 mb-2">
                            <MessageSquare className="w-4 h-4" />
                            Interview Process
                          </h4>
                          <p className="text-sm text-muted-foreground">{job.interviewProcess}</p>
                        </div>
                        {job.additionalInfo && (
                          <div>
                            <h4 className="text-sm font-semibold text-foreground flex items-center gap-2 mb-2">
                              <Calendar className="w-4 h-4" />
                              Additional Information
                            </h4>
                            <p className="text-sm text-muted-foreground">{job.additionalInfo}</p>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex justify-between items-center pt-4 border-t border-border">
                      <span className="text-xs text-muted-foreground">
                        Posted on: {new Date(job.postedDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </span>
                      <Badge className={job.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}>
                        {job.status === 'active' ? 'Active' : 'Closed'}
                      </Badge>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {jobs.length === 0 && (
          <Card className="animate-fade-in">
            <CardContent className="p-12 text-center">
              <Briefcase className="w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-50" />
              <h3 className="font-display text-lg font-medium text-foreground mb-2">
                No Job Postings Yet
              </h3>
              <p className="text-muted-foreground mb-4">
                Start by creating your first job vacancy
              </p>
              <Button variant="forest" onClick={() => setShowForm(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Post First Job
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </CompanySidebar>
  );
};

export default CompanyJobCriteria;
