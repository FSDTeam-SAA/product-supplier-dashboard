import api from "@/lib/api";
import { UserRecord, UserListFilter } from "../types";

export const userManagementApi = {
  async getUsers(params?: UserListFilter): Promise<any[]> {
    const res = await api.get<{ message?: string; data: any }>("/dashboard/users", {
      params,
    });
    return res.data.data || [];
  },

  async updateUserStatus(id: string, status: string): Promise<UserRecord> {
    const res = await api.patch<{ success: boolean; data: UserRecord }>(`/admin/users/${id}/status`, {
      status,
    });
    return res.data.data;
  },

  async deleteUser(id: string): Promise<void> {
    await api.delete(`/admin/users/${id}`);
  },
};

export default userManagementApi;
