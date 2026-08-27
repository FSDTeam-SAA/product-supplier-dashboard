import api from "@/lib/api";
import { MarketplaceItem } from "../types";

export const marketplaceManagementApi = {
  async getMarketplaceItems(): Promise<any[]> {
    const res = await api.get<{ message?: string; data: any }>("/dashboard/marketplace");
    return res.data.data || [];
  },

  async updateItemStatus(id: string, status: string): Promise<MarketplaceItem> {
    const res = await api.patch<{ message?: string; data: MarketplaceItem }>(
      `/dashboard/marketplace/${id}`,
      { status }
    );
    return res.data.data;
  },
};

export default marketplaceManagementApi;
