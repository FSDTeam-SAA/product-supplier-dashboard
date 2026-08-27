export interface EnquiryItem {
  id: string;
  senderName: string;
  senderEmail: string;
  senderPhone?: string;
  serviceRequested: string;
  message: string;
  date: string;
  status: "New" | "In Progress" | "Resolved";
}
