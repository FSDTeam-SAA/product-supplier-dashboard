import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import enquiriesApi from "../api/enquiries.api";
import { toast } from "sonner";

export const ENQUIRIES_QUERY_KEY = ["service", "enquiries"];

export function useEnquiries() {
  return useQuery({
    queryKey: ENQUIRIES_QUERY_KEY,
    queryFn: () => enquiriesApi.getEnquiries(),
  });
}

export function useUpdateEnquiryStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      enquiriesApi.updateEnquiryStatus(id, status),
    onSuccess: () => {
      toast.success("Enquiry status updated");
      queryClient.invalidateQueries({ queryKey: ENQUIRIES_QUERY_KEY });
    },
    onError: (err: unknown) => {
      toast.error(err instanceof Error ? err.message : "Failed to update enquiry");
    },
  });
}
