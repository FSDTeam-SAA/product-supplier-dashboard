import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import supplierSecurityApi from "../api/security.api";
import { toast } from "sonner";

export const SUPPLIER_SECURITY_KEY = ["supplier", "security"];

export function useSupplierSecurity() {
  return useQuery({
    queryKey: SUPPLIER_SECURITY_KEY,
    queryFn: () => supplierSecurityApi.getSecuritySettings(),
  });
}

export function useToggleTwoFactor() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (enabled: boolean) => supplierSecurityApi.toggleTwoFactor(enabled),
    onSuccess: (_, enabled) => {
      toast.success(enabled ? "2FA has been enabled" : "2FA has been disabled");
      queryClient.invalidateQueries({ queryKey: SUPPLIER_SECURITY_KEY });
    },
    onError: (err: unknown) => {
      toast.error(err instanceof Error ? err.message : "Failed to update 2FA");
    },
  });
}
