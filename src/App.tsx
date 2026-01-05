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

// Interview Module
import InterviewLandingPage from "./pages/interview/InterviewLandingPage";
import CompanySelection from "./pages/interview/CompanySelection";
import InterviewPage from "./pages/interview/InterviewPage";
import ResultPage from "./pages/interview/ResultPage";

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

          {/* Interview Routes */}
          <Route path="/interview" element={<InterviewLandingPage />} />
          <Route path="/interview/select" element={<CompanySelection />} />
          <Route path="/interview/:companyId" element={<InterviewPage />} />
          <Route path="/interview/result" element={<ResultPage />} />

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
