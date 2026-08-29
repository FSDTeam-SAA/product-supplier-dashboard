import api from "@/lib/api";
import { ProductPayload, SupplierProduct } from "../types";

function toFormData(product: ProductPayload) {
  const formData = new FormData();
  formData.append("productName", product.productName);
  formData.append("categoryId", product.categoryId);
  formData.append("description", product.description ?? "");
  formData.append("status", product.status);
  formData.append("quantity", String(product.quantity));
  formData.append("price", String(product.price));
  product.photos?.forEach((file) => formData.append("photos", file));
  return formData;
}

export const supplierProductsApi = {
  async getProducts(supplierId: string): Promise<SupplierProduct[]> {
    const res = await api.get<{ data: SupplierProduct[] }>(`/products/supplier/${supplierId}`);
    return res.data.data;
  },
  async createProduct(data: ProductPayload): Promise<SupplierProduct> {
    const res = await api.post<{ data: SupplierProduct }>(
      "/products",
      toFormData(data),
      { headers: { "Content-Type": "multipart/form-data" } },
    );
    return res.data.data;
  },
  async updateProduct(id: string, data: ProductPayload): Promise<SupplierProduct> {
    const res = await api.patch<{ data: SupplierProduct }>(
      `/products/${id}`,
      toFormData(data),
      { headers: { "Content-Type": "multipart/form-data" } },
    );
    return res.data.data;
  },
  async deleteProduct(id: string): Promise<void> {
    await api.delete(`/products/${id}`);
  },
};

export default supplierProductsApi;
