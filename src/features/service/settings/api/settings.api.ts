import api from "@/lib/api";

export interface ChangePasswordInput {
  oldPassword: string;
  newPassword: string;
}

export const serviceSettingsApi = {
  async changePassword(payload: ChangePasswordInput): Promise<{ message: string; data?: unknown }> {
    const res = await api.post<{ message: string; data?: unknown }>(
      "/auth/change-password",
      payload
    );
    return res.data;
  },
};

export default serviceSettingsApi;
