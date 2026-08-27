export type UserRole = "Company" | "Agency" | "Supplier" | "Provider" | "Carer";
export type ApprovalStatus = "Pending" | "Approved" | "Rejected";
export type StatusFilterTab = "All" | "Approved" | "Rejected";

export interface ApprovalRecord {
  id: string;
  name: string;
  role: UserRole;
  email: string;
  location: string;
  status: ApprovalStatus;
}
