import { useMutation } from "@tanstack/react-query";
import supplierSecurityApi from "../api/security.api";
import { ChangePasswordPayload } from "../api/security.api";
import { toast } from "sonner";

export function useChangeSupplierPassword() {
  return useMutation({
    mutationFn: (payload: ChangePasswordPayload) => supplierSecurityApi.changePassword(payload),
    onSuccess: () => toast.success("Password changed successfully"),
    onError: (err: unknown) => {
      toast.error(err instanceof Error ? err.message : "Failed to change password");
    },
  });
}
