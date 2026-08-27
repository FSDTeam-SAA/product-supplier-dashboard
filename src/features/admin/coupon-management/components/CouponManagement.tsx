"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Plus, Tag, Ticket, Percent } from "lucide-react";
import { CouponItem } from "../types";

const initialCoupons: CouponItem[] = [
  {
    id: "1",
    code: "WELCOME20",
    discountType: "percentage",
    discountValue: 20,
    expiryDate: "2026-12-31",
    status: "Active",
    usageCount: 142,
  },
  {
    id: "2",
    code: "SUMMER50",
    discountType: "fixed",
    discountValue: 50,
    expiryDate: "2026-09-30",
    status: "Active",
    usageCount: 88,
  },
  {
    id: "3",
    code: "SPECIAL10",
    discountType: "percentage",
    discountValue: 10,
    expiryDate: "2026-06-30",
    status: "Expired",
    usageCount: 310,
  },
];

export function CouponManagement() {
  const [coupons] = useState<CouponItem[]>(initialCoupons);

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-[#2A6592]">Coupon Management</h2>
          <p className="text-sm text-gray-500">Create, manage and track promotional coupons</p>
        </div>
        <Button className="bg-[#2A6592] hover:bg-[#204e71] text-white flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Create New Coupon
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4 border-gray-100 shadow-sm bg-white">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-50 text-[#2A6592] rounded-xl">
              <Ticket className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium">Total Coupons</p>
              <p className="text-xl font-bold text-gray-800">{coupons.length}</p>
            </div>
          </div>
        </Card>
        <Card className="p-4 border-gray-100 shadow-sm bg-white">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
              <Tag className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium">Active Coupons</p>
              <p className="text-xl font-bold text-gray-800">
                {coupons.filter((c) => c.status === "Active").length}
              </p>
            </div>
          </div>
        </Card>
        <Card className="p-4 border-gray-100 shadow-sm bg-white">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-purple-50 text-purple-600 rounded-xl">
              <Percent className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium">Total Redeemed</p>
              <p className="text-xl font-bold text-gray-800">
                {coupons.reduce((acc, curr) => acc + curr.usageCount, 0)}
              </p>
            </div>
          </div>
        </Card>
      </div>

      <Card className="border-gray-100 shadow-sm">
        <CardHeader>
          <CardTitle className="text-base font-semibold text-gray-800">All Coupons</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-600">
              <thead className="bg-[#F8FAFC] text-xs font-semibold text-[#5C7184] uppercase border-b border-gray-100">
                <tr>
                  <th className="px-4 py-3">Code</th>
                  <th className="px-4 py-3">Discount</th>
                  <th className="px-4 py-3">Expiry Date</th>
                  <th className="px-4 py-3">Usage</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {coupons.map((coupon) => (
                  <tr key={coupon.id} className="hover:bg-gray-50/50">
                    <td className="px-4 py-3 font-semibold text-[#2A6592]">
                      <span className="bg-blue-50 px-2 py-1 rounded border border-blue-200">
                        {coupon.code}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-medium">
                      {coupon.discountType === "percentage"
                        ? `${coupon.discountValue}% Off`
                        : `$${coupon.discountValue} Off`}
                    </td>
                    <td className="px-4 py-3 text-gray-500">{coupon.expiryDate}</td>
                    <td className="px-4 py-3">{coupon.usageCount} times</td>
                    <td className="px-4 py-3">
                      <Badge
                        variant="outline"
                        className={
                          coupon.status === "Active"
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                            : "bg-gray-50 text-gray-600 border-gray-200"
                        }
                      >
                        {coupon.status}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Button variant="ghost" size="sm" className="text-[#2A6592] hover:bg-blue-50">
                        Edit
                      </Button>
                    </td>
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

export default CouponManagement;
