import api from "@/lib/api";
import { CouponItem } from "../types";

export const couponManagementApi = {
  async getCoupons(): Promise<any[]> {
    const res = await api.get<{ message?: string; data: any }>("/dashboard/coupons");
    return res.data.data || [];
  },

  async createCoupon(data: Partial<CouponItem>): Promise<CouponItem> {
    const res = await api.post<{ message?: string; data: CouponItem }>("/dashboard/coupons", data);
    return res.data.data;
  },
};

export default couponManagementApi;
