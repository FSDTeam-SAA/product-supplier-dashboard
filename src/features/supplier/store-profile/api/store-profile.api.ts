import api from "@/lib/api";
import { StoreProfile } from "../types";

export const storeProfileApi = {
  async getProfile(): Promise<any> {
    const res = await api.get<{ message?: string; data: any }>("/product-supplier/get-my-profile");
    return res.data.data;
  },

  async updateProfile(profile: Partial<StoreProfile>): Promise<any> {
    const res = await api.patch<{ message?: string; data: any }>(
      "/product-supplier/update-my-profile",
      profile
    );
    return res.data.data;
  },
};

export default storeProfileApi;
