import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import marketplaceManagementApi from "../api/marketplace-management.api";
import { toast } from "sonner";

export const MARKETPLACE_QUERY_KEY = ["admin", "marketplace"];

export function useMarketplaceItems() {
  return useQuery({
    queryKey: MARKETPLACE_QUERY_KEY,
    queryFn: () => marketplaceManagementApi.getMarketplaceItems(),
  });
}

export function useUpdateMarketplaceItemStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      marketplaceManagementApi.updateItemStatus(id, status),
    onSuccess: () => {
      toast.success("Item status updated successfully");
      queryClient.invalidateQueries({ queryKey: MARKETPLACE_QUERY_KEY });
    },
    onError: (err: unknown) => {
      toast.error(err instanceof Error ? err.message : "Failed to update item status");
    },
  });
}
