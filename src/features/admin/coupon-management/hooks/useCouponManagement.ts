import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import couponManagementApi from "../api/coupon-management.api";
import { CouponItem } from "../types";
import { toast } from "sonner";

export const COUPONS_QUERY_KEY = ["admin", "coupons"];

export function useCoupons() {
  return useQuery({
    queryKey: COUPONS_QUERY_KEY,
    queryFn: () => couponManagementApi.getCoupons(),
  });
}

export function useCreateCoupon() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (coupon: Partial<CouponItem>) => couponManagementApi.createCoupon(coupon),
    onSuccess: () => {
      toast.success("Coupon created successfully");
      queryClient.invalidateQueries({ queryKey: COUPONS_QUERY_KEY });
    },
    onError: (err: unknown) => {
      toast.error(err instanceof Error ? err.message : "Failed to create coupon");
    },
  });
}
