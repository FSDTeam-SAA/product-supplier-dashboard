import api from "@/lib/api";
import { SecuritySettings } from "../types";

export const supplierSecurityApi = {
  async getSecuritySettings(): Promise<SecuritySettings> {
    const res = await api.get<{ success: boolean; data: SecuritySettings }>("/supplier/security");
    return res.data.data;
  },

  async toggleTwoFactor(enabled: boolean): Promise<{ success: boolean }> {
    const res = await api.post<{ success: boolean }>("/supplier/security/2fa", { enabled });
    return res.data;
  },
};

export default supplierSecurityApi;
