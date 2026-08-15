"use client";

import React, { useState } from "react";
import { Upload, ChevronDown } from "lucide-react";

export interface ProductItem {
  id: string;
  sku: string;
  name: string;
  category: string;
  price: string;
  updated: string;
  stock: number;
  status: "Published" | "Hidden";
  description?: string;
}

interface ProductFormProps {
  initialData?: ProductItem | null;
  onSave: (product: ProductItem) => void;
  onCancel: () => void;
}

const categoryOptions = [
  "Beds & Mattresses",
  "Medication Management",
  "Mobility Aids",
  "Continence Care",
  "Technology & Safety",
  "Moving & Handling",
];

export default function AddProductForm({
  initialData,
  onSave,
  onCancel,
}: ProductFormProps) {
  const [name, setName] = useState(initialData?.name || "");
  const [category, setCategory] = useState(initialData?.category || "");
  const [sku, setSku] = useState(initialData?.sku || "");
  const [price, setPrice] = useState(
    initialData?.price ? initialData.price.replace("$", "") : ""
  );
  const [stock, setStock] = useState(initialData?.stock?.toString() || "");
  const [status, setStatus] = useState<"Published" | "Hidden">(
    initialData?.status || "Published"
  );
  const [description, setDescription] = useState(
    initialData?.description || ""
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const formattedProduct: ProductItem = {
      id: initialData?.id || Date.now().toString(),
      sku: sku.trim() || `SKU-${Math.floor(100 + Math.random() * 900)}`,
      name,
      category: category || "Beds & Mattresses",
      price: price.startsWith("$") ? price : `$${price || "0.00"}`,
      updated: new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      stock: Number(stock) || 0,
      status,
      description,
    };

    onSave(formattedProduct);
  };

  return (
    <div className="w-full bg-white rounded-2xl p-6 sm:p-10 border border-slate-100 shadow-[0_2px_15px_rgba(0,0,0,0.02)]">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Inputs Section */}
          <div className="lg:col-span-7 space-y-5">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-2">
                Product Name
              </label>
              <input
                type="text"
                placeholder="Enter product name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full bg-[#F3F6F9] border border-slate-200/80 rounded-lg px-4 py-2.5 text-xs text-slate-700 placeholder-slate-400 outline-none focus:border-[#236B9E] transition-all"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-2">
                  SKU
                </label>
                <input
                  type="text"
                  placeholder="Enter SKU or generate automatically"
                  value={sku}
                  onChange={(e) => setSku(e.target.value)}
                  className="w-full bg-[#F3F6F9] border border-slate-200/80 rounded-lg px-4 py-2.5 text-xs text-slate-700 placeholder-slate-400 outline-none focus:border-[#236B9E] transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-2">
                  Price
                </label>
                <input
                  type="text"
                  placeholder="e.g., 1-2 years of experience"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full bg-[#F3F6F9] border border-slate-200/80 rounded-lg px-4 py-2.5 text-xs text-slate-700 placeholder-slate-400 outline-none focus:border-[#236B9E] transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-2">
                  Stock Quantity
                </label>
                <input
                  type="number"
                  placeholder="Enter stock quantity"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  className="w-full bg-[#F3F6F9] border border-slate-200/80 rounded-lg px-4 py-2.5 text-xs text-slate-700 placeholder-slate-400 outline-none focus:border-[#236B9E] transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-2">
                  Status
                </label>
                <div className="relative">
                  <select
                    value={status}
                    onChange={(e) =>
                      setStatus(e.target.value as "Published" | "Hidden")
                    }
                    className="w-full bg-[#F3F6F9] border border-slate-200/80 rounded-lg px-4 py-2.5 text-xs text-slate-700 outline-none focus:border-[#236B9E] appearance-none cursor-pointer"
                  >
                    <option value="Published">Published</option>
                    <option value="Hidden">Hidden</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-2">
                Description
              </label>
              <textarea
                rows={8}
                placeholder="Describe your product in detail..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-[#F3F6F9] border border-slate-200/80 rounded-lg px-4 py-3 text-xs text-slate-700 placeholder-slate-400 outline-none focus:border-[#236B9E] transition-all resize-none"
              />
            </div>
          </div>

          {/* Right Category & Photo Upload Section */}
          <div className="lg:col-span-5 space-y-5">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-2">
                Category
              </label>
              <div className="relative">
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-[#F3F6F9] border border-slate-200/80 rounded-lg px-4 py-2.5 text-xs text-slate-700 outline-none focus:border-[#236B9E] appearance-none cursor-pointer"
                >
                  <option value="" disabled>
                    Select Category
                  </option>
                  {categoryOptions.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-2">
                Photo
              </label>
              <div className="border-2 border-dashed border-[#B8D3E6] bg-[#F8FAFC] rounded-xl p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-slate-50/80 transition-all min-h-[220px]">
                <div className="w-11 h-11 rounded-full bg-[#DCEAF5] flex items-center justify-center mb-3 text-[#236B9E]">
                  <Upload className="w-5 h-5" />
                </div>
                <p className="text-xs text-slate-500 font-medium">
                  Drag and drop image here, or click add image
                </p>
              </div>

              <div className="grid grid-cols-5 gap-2 mt-3">
                {[1, 2, 3, 4, 5].map((idx) => (
                  <div
                    key={idx}
                    className="border-2 border-dashed border-[#B8D3E6] rounded-lg py-5 px-1 flex items-center justify-center text-[10px] text-slate-400 font-medium bg-[#F8FAFC] cursor-pointer hover:bg-slate-100 transition-colors"
                  >
                    Image {idx}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-4 pt-6 border-t border-slate-100">
          <button
            type="button"
            onClick={onCancel}
            className="px-8 py-2.5 border border-slate-300 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-8 py-2.5 bg-[#236B9E] hover:bg-[#1D5A85] text-white rounded-lg text-xs font-semibold shadow-sm transition-colors"
          >
            Publish
          </button>
        </div>
      </form>
    </div>
  );
}