import api from "@/lib/api";
import { StoreProfile } from "../types";

export const storeProfileApi = {
  async getProfile(): Promise<StoreProfile> {
    const res = await api.get<{ data: StoreProfile }>("/product-supplier/get-my-profile");
    return res.data.data;
  },

  async updateProfile(profile: Partial<StoreProfile>): Promise<StoreProfile> {
    const res = await api.patch<{ data: StoreProfile }>(
      "/product-supplier/update-my-profile",
      profile
    );
    return res.data.data;
  },
};

export default storeProfileApi;
