export interface PaymentRecord {
  id: string;
  transactionId: string;
  orderNumber: string;
  amount: number;
  fee: number;
  netPayout: number;
  method: string;
  status: "Completed" | "Pending" | "Failed";
  date: string;
}
