export interface CouponItem {
  id: string;
  code: string;
  discountType: "percentage" | "fixed";
  discountValue: number;
  appliesTo?: "ALL" | "DELIVERY" | "SUBSCRIPTION" | "PRODUCT";
  expiryDate: string;
  status: "Active" | "Expired" | "Disabled";
  usageCount: number;
}
