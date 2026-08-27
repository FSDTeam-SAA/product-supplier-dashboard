export interface SupplierProduct {
  id: string;
  name: string;
  sku: string;
  category: string;
  price: number;
  stock: number;
  status: "In Stock" | "Low Stock" | "Out of Stock";
  image?: string;
  createdAt: string;
}

export interface CreateProductInput {
  name: string;
  sku: string;
  category: string;
  price: number;
  stock: number;
  description?: string;
}
