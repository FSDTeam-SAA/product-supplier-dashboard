export interface ProductCategory {
  _id: string;
  categoryName: string;
  description?: string;
  status: "active" | "deactivate";
  createdAt: string;
  updatedAt: string;
  supplierId: string;
}

export interface CategoryPayload {
  categoryName: string;
  description?: string;
  status: ProductCategory["status"];
}
