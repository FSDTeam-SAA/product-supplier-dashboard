import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import approvalsApi from "../api/approvals.api";
import { ApprovalStatus } from "../types";
import { toast } from "sonner";

export const APPROVALS_QUERY_KEY = ["admin", "approvals"];

export function useApprovals() {
  return useQuery({
    queryKey: APPROVALS_QUERY_KEY,
    queryFn: () => approvalsApi.getApprovals(),
  });
}

export function useUpdateApprovalStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: ApprovalStatus }) =>
      approvalsApi.updateApprovalStatus(id, status),
    onSuccess: (_, variables) => {
      toast.success(`User status updated to ${variables.status}`);
      queryClient.invalidateQueries({ queryKey: APPROVALS_QUERY_KEY });
    },
    onError: (err: unknown) => {
      toast.error(err instanceof Error ? err.message : "Failed to update status");
    },
  });
}
