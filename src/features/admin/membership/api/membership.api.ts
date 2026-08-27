import api from "@/lib/api";
import { MembershipPlan } from "../types";

export const membershipApi = {
  async getPlans(): Promise<MembershipPlan[]> {
    const res = await api.get<{ success: boolean; data: MembershipPlan[] }>("/admin/memberships");
    return res.data.data;
  },

  async updatePlan(id: string, plan: Partial<MembershipPlan>): Promise<MembershipPlan> {
    const res = await api.put<{ success: boolean; data: MembershipPlan }>(
      `/admin/memberships/${id}`,
      plan
    );
    return res.data.data;
  },
};

export default membershipApi;
