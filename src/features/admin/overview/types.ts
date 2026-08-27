export interface AdminStatItem {
  id: string;
  title: string;
  value: string | number;
  change?: string;
  changeType?: "increase" | "decrease" | "neutral";
}

export interface RevenueDataPoint {
  month: string;
  revenue: number;
  orders: number;
}

export interface AdminOverviewData {
  stats: AdminStatItem[];
  revenueData: RevenueDataPoint[];
}
