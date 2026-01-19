import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ApprovalPending from "./pages/ApprovalPending";

// College Module
import CollegeLogin from "./pages/college/CollegeLogin";
import CollegeOnboarding from "./pages/college/CollegeOnboarding";
import CollegeDashboard from "./pages/college/CollegeDashboard";
import CollegeProfile from "./pages/college/CollegeProfile";
import CollegeCompanies from "./pages/college/CollegeCompanies";
import CompanyDetail from "./pages/college/CompanyDetail";
import CollegeAnalytics from "./pages/college/CollegeAnalytics";

// Admin Module
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminAnalytics from "./pages/admin/AdminAnalytics";
import AdminColleges from "./pages/admin/AdminColleges";
import AdminCompanies from "./pages/admin/AdminCompanies";
import AdminStudents from "./pages/admin/AdminStudents";

// Company Module
import CompanyLogin from "./pages/company/CompanyLogin";
import CompanyOnboarding from "./pages/company/CompanyOnboarding";
import CompanyDashboard from "./pages/company/CompanyDashboard";
import CompanyProfile from "./pages/company/CompanyProfile";
import CompanyJobCriteria from "./pages/company/CompanyJobCriteria";
import CompanyColleges from "./pages/company/CompanyColleges";
import CollegeDetail from "./pages/company/CollegeDetail";
import CompanyUpdates from "./pages/company/CompanyUpdates";
import InterviewPerformance from "./pages/company/InterviewPerformance";

// Student Module
import StudentLandingPage from "./pages/student/StudentLandingPage";
import StudentAuthPage from "./pages/student/StudentAuthPage";
import StudentOnboardingPage from "./pages/student/StudentOnboardingPage";
import StudentDashboard from "./pages/student/StudentDashboard";
import StudentCompaniesPage from "./pages/student/StudentCompaniesPage";
import StudentCompanyDetailPage from "./pages/student/StudentCompanyDetailPage";
import StudentApplicationsPage from "./pages/student/StudentApplicationsPage";
import StudentProfilePage from "./pages/student/StudentProfilePage";
import StudentApprovalPending from "./pages/student/StudentApprovalPending";
import CollegeStudentVerification from "./pages/college/CollegeStudentVerification";

// Mock Placement Module
import MockelloLanding from "./pages/mock-placement/MockelloLanding";
import MockPlacementAssessment from "./pages/mock-placement/MockPlacementAssessment";
import MockPlacementResults from "./pages/mock-placement/MockPlacementResults";

// GD Room Module
import GDPortal from "./pages/gd-room/GDPortal";
import WaitingRoom from "./pages/gd-room/WaitingRoom";
import GDRoom from "./pages/gd-room/GDRoom";
import GDResult from "./pages/gd-room/GDResult";

// Interview Sim Module
import InterviewSetup from "./pages/interview-sim/InterviewSetup";
import InterviewSession from "./pages/interview-sim/InterviewSession";
import InterviewResult from "./pages/interview-sim/InterviewResult";
import InterviewResultDraft from "./pages/interview-sim/InterviewResultDraft";
import HRInterviewPortal from "./pages/company/HRInterviewPortal";
import DebugAudio from "./pages/DebugAudio";

// TechPrep Module
import TechPrepLanding from "./pages/techprep/TechPrepLanding";
import TechPrepDepartmentSelection from "./pages/techprep/TechPrepDepartmentSelection";
import TechPrepInstructions from "./pages/techprep/TechPrepInstructions";
import TechPrepTest from "./pages/techprep/TechPrepTest";
import TechPrepResults from "./pages/techprep/TechPrepResults";

// Interview Module
import InterviewLandingPage from "./pages/interview/InterviewLandingPage";
import CompanySelection from "./pages/interview/CompanySelection";
import InterviewPage from "./pages/interview/InterviewPage";
import ResultPage from "./pages/interview/ResultPage";

// Technical Interview Module (External)
import TechnicalInterviewLandingPage from "./pages/technical-interview/InterviewLandingPage";
import TechnicalCompanySelection from "./pages/technical-interview/CompanySelection";
import TechnicalInterviewPage from "./pages/technical-interview/InterviewPage";
import TechnicalResultPage from "./pages/technical-interview/ResultPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Landing Page */}
          <Route path="/" element={<Index />} />

          {/* College Routes */}
          <Route path="/college/login" element={<CollegeLogin />} />
          <Route path="/college/onboarding" element={<CollegeOnboarding />} />
          <Route path="/college/dashboard" element={<CollegeDashboard />} />
          <Route path="/college/verification" element={<CollegeStudentVerification />} />
          <Route path="/college/profile" element={<CollegeProfile />} />
          <Route path="/college/companies" element={<CollegeCompanies />} />
          <Route path="/college/company/:id" element={<CompanyDetail />} />
          <Route path="/college/eligibility" element={<CollegeAnalytics />} />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/colleges" element={<AdminColleges />} />
          <Route path="/admin/companies" element={<AdminCompanies />} />
          <Route path="/admin/students" element={<AdminStudents />} />
          <Route path="/admin/analytics" element={<AdminAnalytics />} />

          {/* Company Routes */}
          <Route path="/company/login" element={<CompanyLogin />} />
          <Route path="/company/onboarding" element={<CompanyOnboarding />} />
          <Route path="/company/dashboard" element={<CompanyDashboard />} />
          <Route path="/company/profile" element={<CompanyProfile />} />
          <Route path="/company/criteria" element={<CompanyJobCriteria />} />
          <Route path="/company/colleges" element={<CompanyColleges />} />
          <Route path="/company/college/:id" element={<CollegeDetail />} />
          <Route path="/company/updates" element={<CompanyUpdates />} />
          <Route path="/company/dict" element={<InterviewPerformance />} /> {/* Using 'dict' as a shorthand or you can use /performance */}
          <Route path="/company/performance" element={<InterviewPerformance />} />

          {/* Student Portal Routes */}
          <Route path="/student" element={<StudentLandingPage />} />
          <Route path="/student/login" element={<StudentAuthPage />} />
          <Route path="/student/auth" element={<StudentAuthPage />} />
          <Route path="/student/approval-pending" element={<StudentApprovalPending />} />
          <Route path="/student/onboarding" element={<StudentOnboardingPage />} />
          <Route path="/student/dashboard" element={<StudentDashboard />} />
          <Route path="/student/companies" element={<StudentCompaniesPage />} />
          <Route path="/student/companies/:id" element={<StudentCompanyDetailPage />} />
          <Route path="/student/applications" element={<StudentApplicationsPage />} />
          <Route path="/student/profile" element={<StudentProfilePage />} />

          {/* Mock Placement Routes */}
          <Route path="/mock-placement" element={<MockelloLanding />} />
          <Route path="/mock-placement/assessment" element={<MockPlacementAssessment />} />
          <Route path="/mock-placement/results" element={<MockPlacementResults />} />

          {/* GD Room Routes */}
          <Route path="/gd-portal" element={<GDPortal />} />
          <Route path="/gd-portal/waiting-room" element={<WaitingRoom />} />
          <Route path="/gd-portal/gd-room" element={<GDRoom />} />
          <Route path="/gd-portal/result" element={<GDResult />} />

          {/* TechPrep Assessment Routes */}
          <Route path="/techprep" element={<TechPrepLanding />} />
          <Route path="/techprep/select" element={<TechPrepDepartmentSelection />} />
          <Route path="/techprep/instructions" element={<TechPrepInstructions />} />
          <Route path="/techprep/test" element={<TechPrepTest />} />
          <Route path="/techprep/results" element={<TechPrepResults />} />

          {/* Technical Interview Module (External Integration) */}
          <Route path="/technical-interview" element={<TechnicalInterviewLandingPage />} />
          <Route path="/technical-interview/select" element={<TechnicalCompanySelection />} />
          <Route path="/technical-interview/:companyId" element={<TechnicalInterviewPage />} />
          <Route path="/technical-interview/result" element={<TechnicalResultPage />} />

          {/* AI Interview Route (Part of Mock Placement Flow) */}
          <Route path="/ai-interview" element={<InterviewSetup />} />

          {/* Interview Simulator Routes (Standalone) */}
          <Route path="/interview" element={<InterviewSetup />} />
          <Route path="/interview/session" element={<InterviewSession />} />
          <Route path="/interview/result" element={<InterviewResult />} /> {/* Result Page */}
          <Route path="/interview/result" element={<InterviewResult />} /> {/* Result Page */}
          {/* <Route path="/test/result-ui" element={<InterviewResultDraft />} /> */}

          {/* HR Interview Portal */}
          <Route path="/hr-interview-panel" element={<HRInterviewPortal />} />
          <Route path="/hr-portal" element={<HRInterviewPortal />} />
          <Route path="/debug-audio" element={<DebugAudio />} />

          {/* Legacy Interview Routes (Deprecated) */}
          {/* <Route path="/interview" element={<InterviewLandingPage />} /> */}
          {/* <Route path="/interview/select" element={<CompanySelection />} /> */}
          {/* <Route path="/interview/:companyId" element={<InterviewPage />} /> */}
          {/* <Route path="/interview/result" element={<ResultPage />} /> */}

          {/* Common Routes */}
          <Route path="/approval-pending" element={<ApprovalPending />} />

          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
