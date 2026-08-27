import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import storeProfileApi from "../api/store-profile.api";
import { StoreProfile } from "../types";
import { toast } from "sonner";

export const STORE_PROFILE_KEY = ["supplier", "store-profile"];

export function useStoreProfile() {
  return useQuery({
    queryKey: STORE_PROFILE_KEY,
    queryFn: () => storeProfileApi.getProfile(),
  });
}

export function useUpdateStoreProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (profile: Partial<StoreProfile>) => storeProfileApi.updateProfile(profile),
    onSuccess: () => {
      toast.success("Store profile updated successfully");
      queryClient.invalidateQueries({ queryKey: STORE_PROFILE_KEY });
    },
    onError: (err: unknown) => {
      toast.error(err instanceof Error ? err.message : "Failed to update store profile");
    },
  });
}
