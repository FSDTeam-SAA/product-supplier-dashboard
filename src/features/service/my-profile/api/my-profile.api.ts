import api from "@/lib/api";
import { BusinessProfile } from "../types";

export const myProfileApi = {
  async getProfile(): Promise<any> {
    const res = await api.get<{ message?: string; data: any }>("/service-provider/get-my-profile");
    return res.data.data;
  },

  async updateProfile(profile: Partial<BusinessProfile>): Promise<any> {
    const res = await api.patch<{ message?: string; data: any }>(
      "/service-provider/update-my-profile",
      profile
    );
    return res.data.data;
  },
};

export default myProfileApi;
