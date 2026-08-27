import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import jobListingApi from "../api/job-listing.api";
import { toast } from "sonner";

export const JOBS_QUERY_KEY = ["admin", "jobs"];

export function useJobListings() {
  return useQuery({
    queryKey: JOBS_QUERY_KEY,
    queryFn: () => jobListingApi.getJobListings(),
  });
}

export function useUpdateJobStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      jobListingApi.updateJobStatus(id, status),
    onSuccess: () => {
      toast.success("Job status updated");
      queryClient.invalidateQueries({ queryKey: JOBS_QUERY_KEY });
    },
    onError: (err: unknown) => {
      toast.error(err instanceof Error ? err.message : "Failed to update job status");
    },
  });
}
