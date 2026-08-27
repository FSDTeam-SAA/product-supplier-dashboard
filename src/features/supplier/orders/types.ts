export interface OrderItem {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  itemsCount: number;
  totalAmount: number;
  paymentStatus: "Paid" | "Pending" | "Failed";
  fulfillmentStatus: "Delivered" | "Processing" | "Shipped" | "Cancelled";
  orderDate: string;
}
