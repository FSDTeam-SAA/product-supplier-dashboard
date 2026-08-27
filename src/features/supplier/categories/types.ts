export interface ProductCategory {
  id: string;
  name: string;
  description: string;
  productCount: number;
  status: "Active" | "Inactive";
  createdAt: string;
}
