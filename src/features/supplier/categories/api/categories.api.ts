import api from "@/lib/api";
import { ProductCategory } from "../types";

export const categoriesApi = {
  async getCategories(): Promise<ProductCategory[]> {
    const res = await api.get<{ success: boolean; data: ProductCategory[] }>("/supplier/categories");
    return res.data.data;
  },

  async createCategory(category: Partial<ProductCategory>): Promise<ProductCategory> {
    const res = await api.post<{ success: boolean; data: ProductCategory }>(
      "/supplier/categories",
      category
    );
    return res.data.data;
  },

  async updateCategory(id: string, category: Partial<ProductCategory>): Promise<ProductCategory> {
    const res = await api.put<{ success: boolean; data: ProductCategory }>(
      `/supplier/categories/${id}`,
      category
    );
    return res.data.data;
  },

  async deleteCategory(id: string): Promise<void> {
    await api.delete(`/supplier/categories/${id}`);
  },
};

export default categoriesApi;
