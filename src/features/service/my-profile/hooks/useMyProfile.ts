import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import myProfileApi from "../api/my-profile.api";
import { BusinessProfile } from "../types";
import { toast } from "sonner";

export const PROFILE_QUERY_KEY = ["service", "profile"];

export function useMyProfile() {
  return useQuery({
    queryKey: PROFILE_QUERY_KEY,
    queryFn: () => myProfileApi.getProfile(),
  });
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (profile: Partial<BusinessProfile>) => myProfileApi.updateProfile(profile),
    onSuccess: () => {
      toast.success("Business profile updated successfully");
      queryClient.invalidateQueries({ queryKey: PROFILE_QUERY_KEY });
    },
    onError: (err: unknown) => {
      toast.error(err instanceof Error ? err.message : "Failed to update profile");
    },
  });
}
