// Shared company data store
// This simulates data that would normally come from a database

export interface CompanyData {
  // Basic Info
  companyName: string;
  gstNumber: string;
  industry: string;
  companyType: string;
  registrationNumber: string;
  yearEstablished: string;
  headquarters: string;
  branchLocations: string;
  website: string;
  linkedIn: string;
  
  // Contact Details
  hrName: string;
  hrDesignation: string;
  hrEmail: string;
  hrPhone: string;
  altContactName: string;
  altContactEmail: string;
  altContactPhone: string;
  companyAddress: string;
  pincode: string;
  
  // Recruitment Info
  hiringFrequency: string;
  recruitmentMode: string[];
  typicalRoles: string;
  preferredBranches: string[];
  minCgpa: string;
  packageRange: string;
  internshipOffered: boolean;
  internshipStipend: string;
  internshipDuration: string;
  internshipType: string;
  internshipConversion: string;
  internshipRoles: string;
  
  // About Company
  description: string;
  employeeCount: string;
  workCulture: string;
  benefits: string;
  certificateFileNames: string[];
}

const COMPANY_STORAGE_KEY = "genz_placify_company_data";

export const getCompanyData = (): CompanyData | null => {
  const data = localStorage.getItem(COMPANY_STORAGE_KEY);
  if (data) {
    try {
      return JSON.parse(data);
    } catch {
      return null;
    }
  }
  return null;
};

export const saveCompanyData = (data: CompanyData): void => {
  localStorage.setItem(COMPANY_STORAGE_KEY, JSON.stringify(data));
};

export const clearCompanyData = (): void => {
  localStorage.removeItem(COMPANY_STORAGE_KEY);
};

export const isNewCompany = (): boolean => {
  return getCompanyData() === null;
};
