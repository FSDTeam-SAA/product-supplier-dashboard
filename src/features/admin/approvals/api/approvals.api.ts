import api from "@/lib/api";
import { ApprovalRecord, ApprovalStatus } from "../types";

export const approvalsApi = {
  async getApprovals(): Promise<any[]> {
    const res = await api.get<{ message?: string; data: any }>("/dashboard/approvals");
    return res.data.data || [];
  },

  async updateApprovalStatus(id: string, status: ApprovalStatus): Promise<ApprovalRecord> {
    const res = await api.patch<{ success: boolean; data: ApprovalRecord }>(`/admin/approvals/${id}`, {
      status,
    });
    return res.data.data;
  },
};

export default approvalsApi;
