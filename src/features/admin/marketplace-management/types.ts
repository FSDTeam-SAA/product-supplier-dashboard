export interface MarketplaceItem {
  id: string;
  name: string;
  category: string;
  supplier: string;
  price: number;
  stock: number;
  status: "Published" | "Under Review" | "Suspended";
  totalSales: number;
}
