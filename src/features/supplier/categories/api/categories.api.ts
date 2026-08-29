import api from "@/lib/api";
import { CategoryPayload, ProductCategory } from "../types";

export const categoriesApi = {
  async getCategories(supplierId: string): Promise<ProductCategory[]> {
    const res = await api.get<{ success: boolean; data: ProductCategory[] }>(
      `/product-categories/supplier/${supplierId}`,
    );
    return res.data.data;
  },

  async createCategory(category: CategoryPayload): Promise<ProductCategory> {
    const res = await api.post<{ success: boolean; data: ProductCategory }>(
      "/product-categories",
      category
    );
    return res.data.data;
  },

  async updateCategory(id: string, category: CategoryPayload): Promise<ProductCategory> {
    const res = await api.patch<{ success: boolean; data: ProductCategory }>(
      `/product-categories/${id}`,
      category
    );
    return res.data.data;
  },

  async deleteCategory(id: string): Promise<void> {
    await api.delete(`/product-categories/${id}`);
  },
};

export default categoriesApi;
