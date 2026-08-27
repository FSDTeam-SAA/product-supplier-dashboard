import api from "@/lib/api";
import { ServiceItem, CreateServiceInput } from "../types";

export const myServicesApi = {
  async getServices(): Promise<ServiceItem[]> {
    const res = await api.get<{ statusCode: number; success: boolean; message: string; data: ServiceItem[] }>("/services");
    return res.data.data || [];
  },

  async getServiceById(id: string): Promise<ServiceItem> {
    const res = await api.get<{ statusCode: number; success: boolean; message: string; data: ServiceItem }>(`/services/${id}`);
    return res.data.data;
  },

  async createService(service: CreateServiceInput): Promise<ServiceItem> {
    const res = await api.post<{ statusCode: number; success: boolean; message: string; data: ServiceItem }>(
      "/services",
      service
    );
    return res.data.data;
  },

  async updateService(id: string, service: Partial<CreateServiceInput>): Promise<ServiceItem> {
    const res = await api.patch<{ statusCode: number; success: boolean; message: string; data: ServiceItem }>(
      `/services/${id}`,
      service
    );
    return res.data.data;
  },

  async deleteService(id: string): Promise<void> {
    await api.delete(`/services/${id}`);
  },
};

export default myServicesApi;
