import { useQuery } from "@tanstack/react-query";
import paymentsApi from "../api/payments.api";

export const PAYMENTS_QUERY_KEY = ["supplier", "payments"];

export function usePayments() {
  return useQuery({
    queryKey: PAYMENTS_QUERY_KEY,
    queryFn: () => paymentsApi.getPayments(),
  });
}
