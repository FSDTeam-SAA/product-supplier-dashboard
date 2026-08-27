import api from "@/lib/api";
import { SupplierOverviewStats } from "../types";

export const supplierOverviewApi = {
  async getOverview(): Promise<SupplierOverviewStats> {
    const res = await api.get<{ success: boolean; data: SupplierOverviewStats }>("/supplier/overview");
    return res.data.data;
  },
};

export default supplierOverviewApi;
