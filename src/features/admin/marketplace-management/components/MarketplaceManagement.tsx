"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingBag, Store, TrendingUp, Filter } from "lucide-react";
import { MarketplaceItem } from "../types";

const initialItems: MarketplaceItem[] = [
  {
    id: "1",
    name: "Standard Wheelchair (Foldable)",
    category: "Mobility Aids",
    supplier: "Mobility Plus Supplies",
    price: 189.99,
    stock: 45,
    status: "Published",
    totalSales: 124,
  },
  {
    id: "2",
    name: "Digital Blood Pressure Monitor",
    category: "Diagnostics",
    supplier: "MedEquip Direct",
    price: 49.5,
    stock: 120,
    status: "Published",
    totalSales: 350,
  },
  {
    id: "3",
    name: "Adjustable Hospital Bed",
    category: "Furniture",
    supplier: "Comfort Healthcare Ltd",
    price: 1250.0,
    stock: 12,
    status: "Under Review",
    totalSales: 8,
  },
];

export function MarketplaceManagement() {
  const [items] = useState<MarketplaceItem[]>(initialItems);

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-[#2A6592]">Marketplace Management</h2>
          <p className="text-sm text-gray-500">Oversee all supplier products, categories, and marketplace sales</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2 border-gray-200">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4 border-gray-100 shadow-sm bg-white">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-50 text-[#2A6592] rounded-xl">
              <ShoppingBag className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium">Total Products</p>
              <p className="text-xl font-bold text-gray-800">{items.length}</p>
            </div>
          </div>
        </Card>
        <Card className="p-4 border-gray-100 shadow-sm bg-white">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
              <Store className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium">Published Items</p>
              <p className="text-xl font-bold text-gray-800">
                {items.filter((i) => i.status === "Published").length}
              </p>
            </div>
          </div>
        </Card>
        <Card className="p-4 border-gray-100 shadow-sm bg-white">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-purple-50 text-purple-600 rounded-xl">
              <TrendingUp className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium">Total Items Sold</p>
              <p className="text-xl font-bold text-gray-800">
                {items.reduce((acc, curr) => acc + curr.totalSales, 0)}
              </p>
            </div>
          </div>
        </Card>
      </div>

      <Card className="border-gray-100 shadow-sm">
        <CardHeader>
          <CardTitle className="text-base font-semibold text-gray-800">Marketplace Products</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-600">
              <thead className="bg-[#F8FAFC] text-xs font-semibold text-[#5C7184] uppercase border-b border-gray-100">
                <tr>
                  <th className="px-4 py-3">Product Name</th>
                  <th className="px-4 py-3">Category</th>
                  <th className="px-4 py-3">Supplier</th>
                  <th className="px-4 py-3">Price</th>
                  <th className="px-4 py-3">Stock</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {items.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50/50">
                    <td className="px-4 py-3 font-semibold text-gray-900">{item.name}</td>
                    <td className="px-4 py-3 text-gray-500">{item.category}</td>
                    <td className="px-4 py-3 text-[#2A6592]">{item.supplier}</td>
                    <td className="px-4 py-3 font-medium text-gray-900">${item.price.toFixed(2)}</td>
                    <td className="px-4 py-3">{item.stock} in stock</td>
                    <td className="px-4 py-3">
                      <Badge
                        variant="outline"
                        className={
                          item.status === "Published"
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                            : "bg-amber-50 text-amber-700 border-amber-200"
                        }
                      >
                        {item.status}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Button variant="ghost" size="sm" className="text-[#2A6592] hover:bg-blue-50">
                        Manage
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

export default MarketplaceManagement;
