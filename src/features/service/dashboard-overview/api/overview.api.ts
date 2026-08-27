import api from "@/lib/api";
import { ServiceOverviewStats } from "../types";

export const serviceOverviewApi = {
  async getOverviewStats(): Promise<ServiceOverviewStats> {
    const res = await api.get<{ success: boolean; data: ServiceOverviewStats }>("/service/overview");
    return res.data.data;
  },
};

export default serviceOverviewApi;
