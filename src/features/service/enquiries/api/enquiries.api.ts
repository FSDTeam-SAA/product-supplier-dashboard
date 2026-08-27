import api from "@/lib/api";
import { EnquiryItem } from "../types";

export const enquiriesApi = {
  async getEnquiries(): Promise<EnquiryItem[]> {
    const res = await api.get<{ success: boolean; data: EnquiryItem[] }>("/service/enquiries");
    return res.data.data;
  },

  async updateEnquiryStatus(id: string, status: string): Promise<EnquiryItem> {
    const res = await api.patch<{ success: boolean; data: EnquiryItem }>(
      `/service/enquiries/${id}`,
      { status }
    );
    return res.data.data;
  },
};

export default enquiriesApi;
