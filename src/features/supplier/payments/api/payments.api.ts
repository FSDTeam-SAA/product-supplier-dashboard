import api from "@/lib/api";
import { PaymentRecord } from "../types";

export const paymentsApi = {
  async getPayments(): Promise<PaymentRecord[]> {
    const res = await api.get<{ success: boolean; data: PaymentRecord[] }>("/supplier/payments");
    return res.data.data;
  },
};

export default paymentsApi;
