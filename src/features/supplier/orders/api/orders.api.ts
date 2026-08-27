import api from "@/lib/api";
import { OrderItem } from "../types";

export const ordersApi = {
  async getOrders(): Promise<OrderItem[]> {
    const res = await api.get<{ success: boolean; data: OrderItem[] }>("/supplier/orders");
    return res.data.data;
  },

  async updateOrderStatus(id: string, status: string): Promise<OrderItem> {
    const res = await api.patch<{ success: boolean; data: OrderItem }>(
      `/supplier/orders/${id}/status`,
      { status }
    );
    return res.data.data;
  },
};

export default ordersApi;
