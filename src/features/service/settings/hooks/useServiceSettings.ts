import { useMutation } from "@tanstack/react-query";
import serviceSettingsApi, { ChangePasswordInput } from "../api/settings.api";
import { toast } from "sonner";

export function useChangePassword() {
  return useMutation({
    mutationFn: (payload: ChangePasswordInput) =>
      serviceSettingsApi.changePassword(payload),
    onSuccess: (res) => {
      toast.success(res.message || "Password changed successfully");
    },
    onError: (err: unknown) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const msg = (err as any)?.response?.data?.message || (err instanceof Error ? err.message : "Failed to change password");
      toast.error(msg);
    },
  });
}
