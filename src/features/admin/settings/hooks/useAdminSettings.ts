import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import adminSettingsApi from "../api/settings.api";
import { AdminGeneralSettings } from "../types";
import { toast } from "sonner";

export const ADMIN_SETTINGS_KEY = ["admin", "settings"];

export function useAdminSettings() {
  return useQuery({
    queryKey: ADMIN_SETTINGS_KEY,
    queryFn: () => adminSettingsApi.getSettings(),
  });
}

export function useUpdateAdminSettings() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (settings: Partial<AdminGeneralSettings>) =>
      adminSettingsApi.updateSettings(settings),
    onSuccess: () => {
      toast.success("Platform settings updated");
      queryClient.invalidateQueries({ queryKey: ADMIN_SETTINGS_KEY });
    },
    onError: (err: unknown) => {
      toast.error(err instanceof Error ? err.message : "Failed to update settings");
    },
  });
}
