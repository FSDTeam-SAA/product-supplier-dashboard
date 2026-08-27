export interface CouponItem {
  id: string;
  code: string;
  discountType: "percentage" | "fixed";
  discountValue: number;
  expiryDate: string;
  status: "Active" | "Expired" | "Disabled";
  usageCount: number;
}
