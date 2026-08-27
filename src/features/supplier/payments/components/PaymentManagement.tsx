"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CreditCard, DollarSign, Download, ArrowUpRight } from "lucide-react";
import { PaymentRecord } from "../types";

const initialPayments: PaymentRecord[] = [
  {
    id: "1",
    transactionId: "TXN-984210",
    orderNumber: "ORD-7821",
    amount: 340.0,
    fee: 10.2,
    netPayout: 329.8,
    method: "Bank Transfer",
    status: "Completed",
    date: "2026-08-25",
  },
  {
    id: "2",
    transactionId: "TXN-984211",
    orderNumber: "ORD-7822",
    amount: 1250.0,
    fee: 37.5,
    netPayout: 1212.5,
    method: "Credit Card (Stripe)",
    status: "Completed",
    date: "2026-08-24",
  },
  {
    id: "3",
    transactionId: "TXN-984212",
    orderNumber: "ORD-7825",
    amount: 89.99,
    fee: 2.7,
    netPayout: 87.29,
    method: "Direct Debit",
    status: "Pending",
    date: "2026-08-26",
  },
];

export function PaymentManagement() {
  const [payments] = useState<PaymentRecord[]>(initialPayments);

  const totalEarnings = payments.reduce((acc, curr) => acc + curr.netPayout, 0);

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-[#2A6592]">Payments & Payouts</h2>
          <p className="text-sm text-gray-500">Track earnings, transaction history, and settlement payouts</p>
        </div>
        <Button variant="outline" className="flex items-center gap-2 border-gray-200">
          <Download className="h-4 w-4" />
          Download Statement
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4 border-gray-100 shadow-sm bg-white">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
              <DollarSign className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium">Total Payout Received</p>
              <p className="text-xl font-bold text-gray-800">${totalEarnings.toFixed(2)}</p>
            </div>
          </div>
        </Card>
        <Card className="p-4 border-gray-100 shadow-sm bg-white">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-50 text-[#2A6592] rounded-xl">
              <CreditCard className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium">Processed Transactions</p>
              <p className="text-xl font-bold text-gray-800">{payments.length}</p>
            </div>
          </div>
        </Card>
        <Card className="p-4 border-gray-100 shadow-sm bg-white">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
              <ArrowUpRight className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium">Pending Settlements</p>
              <p className="text-xl font-bold text-gray-800">
                $
                {payments
                  .filter((p) => p.status === "Pending")
                  .reduce((acc, curr) => acc + curr.netPayout, 0)
                  .toFixed(2)}
              </p>
            </div>
          </div>
        </Card>
      </div>

      <Card className="border-gray-100 shadow-sm">
        <CardHeader>
          <CardTitle className="text-base font-semibold text-gray-800">Transaction History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-600">
              <thead className="bg-[#F8FAFC] text-xs font-semibold text-[#5C7184] uppercase border-b border-gray-100">
                <tr>
                  <th className="px-4 py-3">Transaction ID</th>
                  <th className="px-4 py-3">Order</th>
                  <th className="px-4 py-3">Gross Amount</th>
                  <th className="px-4 py-3">Platform Fee</th>
                  <th className="px-4 py-3">Net Payout</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {payments.map((p) => (
                  <tr key={p.id} className="hover:bg-gray-50/50">
                    <td className="px-4 py-3 font-semibold text-gray-900">{p.transactionId}</td>
                    <td className="px-4 py-3 text-[#2A6592]">{p.orderNumber}</td>
                    <td className="px-4 py-3 font-medium">${p.amount.toFixed(2)}</td>
                    <td className="px-4 py-3 text-gray-400">-${p.fee.toFixed(2)}</td>
                    <td className="px-4 py-3 font-bold text-emerald-600">${p.netPayout.toFixed(2)}</td>
                    <td className="px-4 py-3">
                      <Badge
                        variant="outline"
                        className={
                          p.status === "Completed"
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                            : "bg-amber-50 text-amber-700 border-amber-200"
                        }
                      >
                        {p.status}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-gray-500">{p.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default PaymentManagement;
