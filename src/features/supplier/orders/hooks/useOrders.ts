import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import ordersApi from "../api/orders.api";
import { toast } from "sonner";

export const ORDERS_QUERY_KEY = ["supplier", "orders"];

export function useOrders() {
  return useQuery({
    queryKey: ORDERS_QUERY_KEY,
    queryFn: () => ordersApi.getOrders(),
  });
}

export function useUpdateOrderStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      ordersApi.updateOrderStatus(id, status),
    onSuccess: () => {
      toast.success("Order status updated");
      queryClient.invalidateQueries({ queryKey: ORDERS_QUERY_KEY });
    },
    onError: (err: unknown) => {
      toast.error(err instanceof Error ? err.message : "Failed to update order status");
    },
  });
}
