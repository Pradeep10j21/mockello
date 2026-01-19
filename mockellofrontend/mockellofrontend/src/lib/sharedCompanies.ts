// Shared companies data for college portal
// This ensures consistency between dashboard and companies page

export interface SharedCompany {
  id: number;
  name: string;
  logo: string;
  location: string;
  roles: string[];
  package: string;
  status: "Hiring" | "Upcoming";
  eligibility: "eligible" | "pending" | "not_eligible";
  openings: number;
}

export const sharedCompanies: SharedCompany[] = [
  {
    id: 1,
    name: "TCS",
    logo: "https://logo.clearbit.com/tcs.com",
    location: "Mumbai",
    roles: ["Software Engineer", "System Analyst"],
    package: "7-12 LPA",
    status: "Hiring",
    eligibility: "eligible",
    openings: 50,
  },
  {
    id: 2,
    name: "Wipro",
    logo: "https://logo.clearbit.com/wipro.com",
    location: "Bangalore",
    roles: ["Project Engineer", "Developer"],
    package: "6-10 LPA",
    status: "Hiring",
    eligibility: "eligible",
    openings: 35,
  },
  {
    id: 3,
    name: "Zoho",
    logo: "https://logo.clearbit.com/zoho.com",
    location: "Chennai",
    roles: ["Software Developer", "QA Engineer"],
    package: "8-15 LPA",
    status: "Upcoming",
    eligibility: "pending",
    openings: 20,
  },
  {
    id: 4,
    name: "Accenture",
    logo: "https://logo.clearbit.com/accenture.com",
    location: "Hyderabad",
    roles: ["Associate SE", "Analyst"],
    package: "6-9 LPA",
    status: "Hiring",
    eligibility: "eligible",
    openings: 40,
  },
  {
    id: 5,
    name: "Infosys",
    logo: "https://logo.clearbit.com/infosys.com",
    location: "Pune",
    roles: ["Systems Engineer", "Trainee"],
    package: "5-8 LPA",
    status: "Hiring",
    eligibility: "eligible",
    openings: 60,
  },
  {
    id: 6,
    name: "Cognizant",
    logo: "https://logo.clearbit.com/cognizant.com",
    location: "Delhi",
    roles: ["Programmer Analyst", "Graduate Trainee"],
    package: "5-9 LPA",
    status: "Upcoming",
    eligibility: "pending",
    openings: 30,
  },
];

export const getCompanyById = (id: number): SharedCompany | undefined => {
  return sharedCompanies.find(company => company.id === id);
};
