export type ProductStatus = "active" | "deactivate";

export interface ProductCategoryReference {
  _id: string;
  categoryName: string;
}

export interface SupplierProduct {
  _id: string;
  productName: string;
  categoryId: string | ProductCategoryReference | null;
  description?: string;
  status: ProductStatus;
  quantity: number;
  photo?: string[];
  price: number;
  createdAt: string;
  updatedAt: string;
}

export interface ProductPayload {
  productName: string;
  categoryId: string;
  description?: string;
  status: ProductStatus;
  quantity: number;
  photo?: string[];
  photos?: File[];
  price: number;
}
