export interface JobListingItem {
  id: string;
  title: string;
  company: string;
  location: string;
  type: "Full-Time" | "Part-Time" | "Contract";
  status: "Active" | "Closed" | "Draft";
  applicantsCount: number;
  postedDate: string;
}
