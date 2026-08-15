"use client";

import React, { useState, useMemo } from "react";
import { Search, Eye, Trash2, X } from "lucide-react";

// ==========================================
// 1. DATA TYPES & JSON DATA
// ==========================================
export type OrderStatus = "Pending" | "Processing" | "Delivered" | "Cancelled" | "Shipping";

export interface OrderItem {
  id: string;
  orderId: string;
  customer: string;
  product: string;
  quantity: number;
  totalAmount: string;
  orderDate: string;
  status: OrderStatus;
}

export const initialOrdersData: OrderItem[] = [
  {
    id: "1",
    orderId: "ORD-6227",
    customer: "Roger Kinnaird",
    product: "Mobile Hoist System",
    quantity: 2,
    totalAmount: "$3,600",
    orderDate: "12 Jan 2025",
    status: "Pending",
  },
  {
    id: "2",
    orderId: "ORD-5282",
    customer: "Phil Pearson",
    product: "Lightweight Wheelchair",
    quantity: 5,
    totalAmount: "$2,364",
    orderDate: "18 Jan 2025",
    status: "Cancelled",
  },
  {
    id: "3",
    orderId: "ORD-1672",
    customer: "Scott Arnold",
    product: "Electric Hospital Bed",
    quantity: 4,
    totalAmount: "$2,364",
    orderDate: "20 Jan 2025",
    status: "Processing",
  },
  {
    id: "4",
    orderId: "ORD-1279",
    customer: "Tim Morrell",
    product: "Folding Walking Frame",
    quantity: 2,
    totalAmount: "$2,364",
    orderDate: "02 Feb 2025",
    status: "Pending",
  },
  {
    id: "5",
    orderId: "ORD-9277",
    customer: "MArk",
    product: "Adjustable Bath Seat",
    quantity: 5,
    totalAmount: "$2,364",
    orderDate: "10 Feb 2025",
    status: "Shipping",
  },
  {
    id: "6",
    orderId: "ORD-6279",
    customer: "Sam Hayes",
    product: "Disposable Care Gloves",
    quantity: 1,
    totalAmount: "$2,364",
    orderDate: "10 Feb 2025",
    status: "Delivered",
  },
  {
    id: "7",
    orderId: "ORD-1583",
    customer: "Wayne Gunther",
    product: "Digital Blood Pressure Monitor",
    quantity: 4,
    totalAmount: "$1,200",
    orderDate: "10 Feb 2025",
    status: "Processing",
  },
  {
    id: "8",
    orderId: "ORD-1562",
    customer: "Jason Jordan",
    product: "Dementia Activity Kit",
    quantity: 5,
    totalAmount: "$18,000",
    orderDate: "10 Feb 2025",
    status: "Delivered",
  },
];

const filterTabs = ["All", "Pending", "Processing", "Delivered", "Cancelled"];

// ==========================================
// 2. MAIN COMPONENT
// ==========================================
export default function OrderManagement() {
  const [orders, setOrders] = useState<OrderItem[]>(initialOrdersData);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [viewingOrder, setViewingOrder] = useState<OrderItem | null>(null);

  // Status Badge Styling Helper
  const getStatusBadgeStyle = (status: OrderStatus) => {
    switch (status) {
      case "Pending":
        return "bg-[#FEF3C7] text-[#D97706]";
      case "Cancelled":
        return "bg-[#FCE7F3] text-[#E11D48]";
      case "Processing":
        return "bg-[#E0E7FF] text-[#4F46E5]";
      case "Shipping":
        return "bg-[#F3E8FF] text-[#A855F7]";
      case "Delivered":
        return "bg-[#DCFCE7] text-[#16A34A]";
      default:
        return "bg-slate-100 text-slate-600";
    }
  };

  // Filter & Search Logic
  const filteredOrders = useMemo(() => {
    return orders.filter((item) => {
      const matchesSearch =
        item.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.product.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        selectedStatus === "All" || item.status === selectedStatus;

      return matchesSearch && matchesStatus;
    });
  }, [orders, searchTerm, selectedStatus]);

  // Delete Action
  const handleDelete = (id: string) => {
    setOrders((prev) => prev.filter((order) => order.id !== id));
  };

  return (
    <div className="min-h-screen  font-sans text-slate-700">
      <div className=" mx-auto space-y-6">
        
        {/* Top Controls: Search Bar & Filter Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Search Input */}
          <div className="relative w-full sm:w-[320px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#E8EDF2] text-slate-800 placeholder-slate-400 pl-10 pr-4 py-2.5 rounded-lg text-sm border-none outline-none focus:ring-2 focus:ring-[#236B9E]/30 transition-all"
            />
          </div>

          {/* Filter Status Pills */}
          <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
            {filterTabs.map((tab) => {
              const isActive = selectedStatus === tab;
              return (
                <button
                  key={tab}
                  onClick={() => setSelectedStatus(tab)}
                  className={`text-xs px-4 py-1.5 rounded-full font-normal transition-all border ${
                    isActive
                      ? "border-slate-500 text-slate-800 bg-white shadow-xs"
                      : "border-slate-300 text-slate-500 bg-transparent hover:border-slate-400"
                  }`}
                >
                  {tab}
                </button>
              );
            })}
          </div>
        </div>

        {/* Orders Table Container */}
        <div className="bg-[#F8FAFC] rounded-2xl border border-slate-200/70 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-center border-collapse min-w-[950px]">
              {/* Table Head */}
              <thead>
                <tr className="border-b border-slate-200 text-xs font-semibold text-slate-500">
                  <th className="py-4 px-4 w-[11%]">Order ID</th>
                  <th className="py-4 px-4 w-[16%]">Customer</th>
                  <th className="py-4 px-4 w-[20%]">Product</th>
                  <th className="py-4 px-4 w-[9%]">Quantity</th>
                  <th className="py-4 px-4 w-[12%]">Total Amount</th>
                  <th className="py-4 px-4 w-[12%]">Order Date</th>
                  <th className="py-4 px-4 w-[10%]">Status</th>
                  <th className="py-4 px-4 w-[10%]">Action</th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody className="divide-y divide-slate-200/80 text-xs">
                {filteredOrders.length > 0 ? (
                  filteredOrders.map((item) => (
                    <tr
                      key={item.id}
                      className="hover:bg-slate-50/70 transition-colors"
                    >
                      <td className="py-5 px-4 text-slate-500 font-normal">
                        {item.orderId}
                      </td>
                      <td className="py-5 px-4 text-slate-600 font-normal">
                        {item.customer}
                      </td>
                      <td className="py-5 px-4 text-slate-600 font-normal">
                        {item.product}
                      </td>
                      <td className="py-5 px-4 text-slate-600 font-normal">
                        {item.quantity}
                      </td>
                      <td className="py-5 px-4 text-slate-600 font-normal">
                        {item.totalAmount}
                      </td>
                      <td className="py-5 px-4 text-slate-500 font-normal whitespace-nowrap">
                        {item.orderDate}
                      </td>
                      <td className="py-5 px-4">
                        <span
                          className={`inline-block px-3.5 py-1 rounded-full text-[11px] font-medium ${getStatusBadgeStyle(
                            item.status
                          )}`}
                        >
                          {item.status}
                        </span>
                      </td>
                      <td className="py-5 px-4">
                        <div className="flex items-center justify-center gap-3 text-slate-500">
                          <button
                            onClick={() => setViewingOrder(item)}
                            title="View Details"
                            className="hover:text-[#236B9E] transition-colors"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(item.id)}
                            title="Delete Order"
                            className="hover:text-red-500 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={8}
                      className="text-center py-10 text-slate-400 text-sm"
                    >
                      No orders found matching criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* View Order Modal */}
        {viewingOrder && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 border border-slate-100 animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <h3 className="text-base font-bold text-slate-800">
                  Order Details ({viewingOrder.orderId})
                </h3>
                <button
                  onClick={() => setViewingOrder(null)}
                  className="text-slate-400 hover:text-slate-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="mt-4 space-y-3 text-xs">
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-400 font-medium">Customer:</span>
                  <span className="text-slate-700 font-semibold">{viewingOrder.customer}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-400 font-medium">Product:</span>
                  <span className="text-slate-700 font-semibold">{viewingOrder.product}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-400 font-medium">Quantity:</span>
                  <span className="text-slate-700 font-semibold">{viewingOrder.quantity}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-400 font-medium">Total Amount:</span>
                  <span className="text-slate-700 font-semibold">{viewingOrder.totalAmount}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-400 font-medium">Order Date:</span>
                  <span className="text-slate-700 font-semibold">{viewingOrder.orderDate}</span>
                </div>
                <div className="flex justify-between py-1 items-center">
                  <span className="text-slate-400 font-medium">Status:</span>
                  <span
                    className={`inline-block px-3 py-0.5 rounded-full text-[11px] font-medium ${getStatusBadgeStyle(
                      viewingOrder.status
                    )}`}
                  >
                    {viewingOrder.status}
                  </span>
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setViewingOrder(null)}
                  className="px-5 py-2 bg-[#236B9E] hover:bg-[#1D5A85] text-white rounded-lg text-xs font-semibold transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}