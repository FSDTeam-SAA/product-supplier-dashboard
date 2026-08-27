import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import myServicesApi from "../api/my-services.api";
import { CreateServiceInput } from "../types";
import { toast } from "sonner";

export const SERVICES_QUERY_KEY = ["services"];

export function useMyServices() {
  return useQuery({
    queryKey: SERVICES_QUERY_KEY,
    queryFn: () => myServicesApi.getServices(),
  });
}

export function useCreateService() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (service: CreateServiceInput) => myServicesApi.createService(service),
    onSuccess: () => {
      toast.success("Service created successfully");
      queryClient.invalidateQueries({ queryKey: SERVICES_QUERY_KEY });
    },
    onError: (err: unknown) => {
      const msg = err instanceof Error ? err.message : "Failed to create service";
      toast.error(msg);
    },
  });
}

export function useUpdateService() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<CreateServiceInput> }) =>
      myServicesApi.updateService(id, data),
    onSuccess: () => {
      toast.success("Service updated successfully");
      queryClient.invalidateQueries({ queryKey: SERVICES_QUERY_KEY });
    },
    onError: (err: unknown) => {
      const msg = err instanceof Error ? err.message : "Failed to update service";
      toast.error(msg);
    },
  });
}

export function useDeleteService() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => myServicesApi.deleteService(id),
    onSuccess: () => {
      toast.success("Service deleted successfully");
      queryClient.invalidateQueries({ queryKey: SERVICES_QUERY_KEY });
    },
    onError: (err: unknown) => {
      const msg = err instanceof Error ? err.message : "Failed to delete service";
      toast.error(msg);
    },
  });
}
