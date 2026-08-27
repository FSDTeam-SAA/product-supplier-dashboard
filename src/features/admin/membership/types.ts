export interface MembershipPlan {
  id: string;
  name: string;
  price: number;
  billingCycle: "monthly" | "yearly";
  features: string[];
  activeSubscribers: number;
  status: "Active" | "Archived";
}
