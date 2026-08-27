import api from "@/lib/api";
import { AdminGeneralSettings } from "../types";

export const adminSettingsApi = {
  async getSettings(): Promise<AdminGeneralSettings> {
    const res = await api.get<{ success: boolean; data: AdminGeneralSettings }>("/admin/settings");
    return res.data.data;
  },

  async updateSettings(settings: Partial<AdminGeneralSettings>): Promise<AdminGeneralSettings> {
    const res = await api.put<{ success: boolean; data: AdminGeneralSettings }>(
      "/admin/settings",
      settings
    );
    return res.data.data;
  },
};

export default adminSettingsApi;
