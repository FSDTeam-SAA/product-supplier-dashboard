import api from "@/lib/api";
export interface ChangePasswordPayload {
  oldPassword: string;
  newPassword: string;
}

export const supplierSecurityApi = {
  async changePassword(payload: ChangePasswordPayload): Promise<void> {
    await api.post("/auth/change-password", payload);
  },
};

export default supplierSecurityApi;
