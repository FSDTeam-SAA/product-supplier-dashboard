import api from "@/lib/api";
import { AdminOverviewData } from "../types";

export const adminOverviewApi = {
  async getOverviewData(): Promise<any> {
    const res = await api.get<{ message?: string; data: any }>("/dashboard/overview");
    return res.data.data;
  },
  async getChartData(year?: number): Promise<any> {
    const res = await api.get<{ message?: string; data: any }>("/dashboard/chart", {
      params: { year },
    });
    return res.data.data;
  },
};

export default adminOverviewApi;
