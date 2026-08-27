import api from "@/lib/api";
import { SupplierProduct, CreateProductInput } from "../types";

export const supplierProductsApi = {
  async getProducts(): Promise<SupplierProduct[]> {
    const res = await api.get<{ success: boolean; data: SupplierProduct[] }>("/supplier/products");
    return res.data.data;
  },

  async createProduct(data: CreateProductInput): Promise<SupplierProduct> {
    const res = await api.post<{ success: boolean; data: SupplierProduct }>("/supplier/products", data);
    return res.data.data;
  },

  async updateProduct(id: string, data: Partial<SupplierProduct>): Promise<SupplierProduct> {
    const res = await api.put<{ success: boolean; data: SupplierProduct }>(
      `/supplier/products/${id}`,
      data
    );
    return res.data.data;
  },

  async deleteProduct(id: string): Promise<void> {
    await api.delete(`/supplier/products/${id}`);
  },
};

export default supplierProductsApi;
