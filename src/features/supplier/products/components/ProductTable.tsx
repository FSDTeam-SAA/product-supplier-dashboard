"use client";

import React, { useState, useMemo } from "react";
import { Search, Plus, Trash2, Edit3, ArrowLeft } from "lucide-react";
import AddProductForm, { ProductItem } from "./AddProductForm";

// Initial Mock JSON Data
export const initialProductsData: ProductItem[] = [
  {
    id: "1",
    sku: "MHS-001",
    name: "Mobile Hoist System",
    category: "Beds & Mattresses",
    price: "$169.43",
    updated: "12 Jan 2025",
    stock: 251,
    status: "Published",
    description: "Mobile Hoist System for patient lifting and transfer.",
  },
  {
    id: "2",
    sku: "WHC-002",
    name: "Lightweight Wheelchair",
    category: "Medication Management",
    price: "$450.54",
    updated: "18 Jan 2025",
    stock: 45,
    status: "Hidden",
    description: "Compact, foldable lightweight wheelchair.",
  },
  {
    id: "3",
    sku: "HBD-003",
    name: "Electric Hospital Bed",
    category: "Mobility Aids",
    price: "$473.85",
    updated: "20 Jan 2025",
    stock: 154,
    status: "Published",
    description: "Full motorized hospital grade bed.",
  },
  {
    id: "4",
    sku: "WLK-004",
    name: "Folding Walking Frame",
    category: "Continence Care",
    price: "$293.01",
    updated: "02 Feb 2025",
    stock: 251,
    status: "Published",
    description: "Durable aluminum folding walking frame.",
  },
  {
    id: "5",
    sku: "BST-005",
    name: "Adjustable Bath Seat",
    category: "Technology & Safety",
    price: "$275.43",
    updated: "10 Feb 2025",
    stock: 45,
    status: "Published",
    description: "Non-slip height adjustable bath chair.",
  },
  {
    id: "6",
    sku: "PPE-006",
    name: "Disposable Care Gloves",
    category: "Moving & Handling",
    price: "$106.58",
    updated: "10 Feb 2025",
    stock: 154,
    status: "Published",
    description: "Nitrile medical examination gloves.",
  },
  {
    id: "7",
    sku: "MON-007",
    name: "Digital Blood Pressure Monitor",
    category: "Technology & Safety",
    price: "$767.50",
    updated: "10 Feb 2025",
    stock: 45,
    status: "Published",
    description: "Automatic arm digital BP measuring device.",
  },
  {
    id: "8",
    sku: "DEM-008",
    name: "Dementia Activity Kit",
    category: "Technology & Safety",
    price: "$328.85",
    updated: "10 Feb 2025",
    stock: 45,
    status: "Published",
    description: "Cognitive therapy sensory activity game kit.",
  },
];

export default function ProductTable() {
  const [products, setProducts] = useState<ProductItem[]>(initialProductsData);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ProductItem | null>(
    null,
  );

  // Search Filter
  const filteredProducts = useMemo(() => {
    return products.filter(
      (item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [products, searchTerm]);

  // Delete Item
  const handleDelete = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  // Open Edit Mode
  const handleEdit = (item: ProductItem) => {
    setEditingProduct(item);
    setIsAdding(true);
  };

  // Save (Create or Update)
  const handleSaveProduct = (product: ProductItem) => {
    if (editingProduct) {
      setProducts((prev) =>
        prev.map((item) => (item.id === product.id ? product : item)),
      );
    } else {
      setProducts((prev) => [product, ...prev]);
    }
    setIsAdding(false);
    setEditingProduct(null);
  };

  return (
    <div className=" font-sans text-slate-700">
      <div className=" space-y-6">
        {isAdding ? (
          <div>
            <button
              onClick={() => {
                setIsAdding(false);
                setEditingProduct(null);
              }}
              className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 mb-4 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Products</span>
            </button>
            <AddProductForm
              initialData={editingProduct}
              onSave={handleSaveProduct}
              onCancel={() => {
                setIsAdding(false);
                setEditingProduct(null);
              }}
            />
          </div>
        ) : (
          <>
            {/* Top Toolbar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
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

              <button
                onClick={() => {
                  setEditingProduct(null);
                  setIsAdding(true);
                }}
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#236B9E] hover:bg-[#1D5A85] text-white font-medium px-5 py-2.5 rounded-lg text-sm transition-colors shadow-sm"
              >
                <Plus className="w-4 h-4" />
                <span>Add Product</span>
              </button>
            </div>

            {/* Table Container */}
            <div className="bg-[#F8FAFC] rounded-2xl border border-slate-200/70 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-center border-collapse min-w-[950px]">
                  <thead>
                    <tr className="border-b border-slate-200 text-xs font-semibold text-slate-500">
                      <th className="py-4 px-4 w-[11%]">SKU</th>
                      <th className="py-4 px-4 w-[18%]">Product Name</th>
                      <th className="py-4 px-4 w-[16%]">Category</th>
                      <th className="py-4 px-4 w-[11%]">Price</th>
                      <th className="py-4 px-4 w-[12%]">Updated</th>
                      <th className="py-4 px-4 w-[10%]">Stock</th>
                      <th className="py-4 px-4 w-[11%]">Status</th>
                      <th className="py-4 px-4 w-[11%]">Action</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-200/80 text-xs">
                    {filteredProducts.length > 0 ? (
                      filteredProducts.map((item) => (
                        <tr
                          key={item.id}
                          className="hover:bg-slate-50/70 transition-colors"
                        >
                          <td className="py-5 px-4 text-slate-500 font-normal">
                            {item.sku}
                          </td>
                          <td className="py-5 px-4 font-semibold text-slate-700">
                            {item.name}
                          </td>
                          <td className="py-5 px-4 text-slate-500 font-normal">
                            {item.category}
                          </td>
                          <td className="py-5 px-4 font-semibold text-slate-700">
                            {item.price}
                          </td>
                          <td className="py-5 px-4 text-slate-500 font-normal whitespace-nowrap">
                            {item.updated}
                          </td>
                          <td className="py-5 px-4 text-slate-600 font-medium">
                            {item.stock}
                          </td>
                          <td className="py-5 px-4">
                            <span
                              className={`inline-block px-3.5 py-1 rounded-full text-[11px] font-medium ${
                                item.status === "Published"
                                  ? "bg-[#DCFCE7] text-[#16A34A]"
                                  : "bg-[#FFE4E6] text-[#E11D48]"
                              }`}
                            >
                              {item.status}
                            </span>
                          </td>
                          <td className="py-5 px-4">
                            <div className="flex items-center justify-center gap-3 text-slate-500">
                              <button
                                onClick={() => handleEdit(item)}
                                title="Edit"
                                className="hover:text-[#236B9E] transition-colors"
                              >
                                <Edit3 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDelete(item.id)}
                                title="Delete"
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
                          No products found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
