import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import membershipApi from "../api/membership.api";
import { toast } from "sonner";

export const MEMBERSHIP_QUERY_KEY = ["admin", "memberships"];

export function useMembershipPlans() {
  return useQuery({
    queryKey: MEMBERSHIP_QUERY_KEY,
    queryFn: () => membershipApi.getPlans(),
  });
}

export function useUpdateMembershipPlan() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, plan }: { id: string; plan: Parameters<typeof membershipApi.updatePlan>[1] }) =>
      membershipApi.updatePlan(id, plan),
    onSuccess: () => {
      toast.success("Plan updated successfully");
      queryClient.invalidateQueries({ queryKey: MEMBERSHIP_QUERY_KEY });
    },
    onError: (err: unknown) => {
      toast.error(err instanceof Error ? err.message : "Failed to update plan");
    },
  });
}
