import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import userManagementApi from "../api/user-management.api";
import { UserListFilter } from "../types";
import { toast } from "sonner";

export const USERS_QUERY_KEY = ["admin", "users"];

export function useUsers(filter?: UserListFilter) {
  return useQuery({
    queryKey: [...USERS_QUERY_KEY, filter],
    queryFn: () => userManagementApi.getUsers(filter),
  });
}

export function useUpdateUserStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      userManagementApi.updateUserStatus(id, status),
    onSuccess: () => {
      toast.success("User status updated successfully");
      queryClient.invalidateQueries({ queryKey: USERS_QUERY_KEY });
    },
    onError: (err: unknown) => {
      toast.error(err instanceof Error ? err.message : "Failed to update user");
    },
  });
}
