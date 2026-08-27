import api from "@/lib/api";
import { JobListingItem } from "../types";

export const jobListingApi = {
  async getJobListings(): Promise<any[]> {
    const res = await api.get<{ message?: string; data: any }>("/dashboard/jobs");
    return res.data.data || [];
  },

  async updateJobStatus(id: string, status: string): Promise<JobListingItem> {
    const res = await api.patch<{ message?: string; data: JobListingItem }>(`/dashboard/jobs/${id}`, {
      status,
    });
    return res.data.data;
  },
};

export default jobListingApi;
