"use client";

import React, { useState, useMemo } from "react";
import { Search, Plus, Trash2, Edit3, X } from "lucide-react";

// ==========================================
// 1. JSON DATA CONFIGURATION
// ==========================================
export const initialCategoriesData = [
  {
    id: "1",
    name: "Beds & Mattresses",
    description:
      "Comfortable care beds and pressure-relief mattresses designed for home and healthcare environments.",
    addedDate: "12 Jan 2025",
    productsCount: 251,
    status: "Active",
  },
  {
    id: "2",
    name: "Medication Management",
    description:
      "Products that help organize, administer, and manage medications safely and accurately.",
    addedDate: "18 Jan 2025",
    productsCount: 45,
    status: "Active",
  },
  {
    id: "3",
    name: "Mobility Aids",
    description:
      "Equipment that supports safe movement, independence, and everyday mobility for individuals.",
    addedDate: "20 Jan 2025",
    productsCount: 154,
    status: "Active",
  },
  {
    id: "4",
    name: "Continence Care",
    description:
      "Essential products designed to support personal hygiene, comfort, and continence management.",
    addedDate: "02 Feb 2025",
    productsCount: 251,
    status: "Active",
  },
  {
    id: "5",
    name: "Technology & Safety",
    description:
      "Smart devices and safety solutions that enhance monitoring, communication, and independent living.",
    addedDate: "10 Feb 2025",
    productsCount: 45,
    status: "Active",
  },
  {
    id: "6",
    name: "Moving & Handling",
    description:
      "Equipment for safely lifting, transferring, and repositioning individuals while reducing caregiver strain.",
    addedDate: "10 Feb 2025",
    productsCount: 154,
    status: "Active",
  },
];

export interface CategoryItem {
  id: string;
  name: string;
  description: string;
  addedDate: string;
  productsCount: number;
  status: "Active" | "Inactive";
}

// ==========================================
// 2. MAIN COMPONENT
// ==========================================
export default function CategoryManagement() {
  const [categories, setCategories] = useState<CategoryItem[]>();
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<CategoryItem | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    productsCount: 0,
    status: "Active" as "Active" | "Inactive",
  });

  // Filter based on Search
  const filteredCategories = useMemo(() => {
    return categories?.filter(
      (item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [categories, searchTerm]);

  // Delete Category
  const handleDelete = (id: string) => {
    setCategories((prev) => prev?.filter((item) => item.id !== id) ?? prev);
  };

  // Open Modal for Create or Edit
  const openModal = (item?: CategoryItem) => {
    if (item) {
      setEditingItem(item);
      setFormData({
        name: item.name,
        description: item.description,
        productsCount: item.productsCount,
        status: item.status,
      });
    } else {
      setEditingItem(null);
      setFormData({
        name: "",
        description: "",
        productsCount: 0,
        status: "Active",
      });
    }
    setIsModalOpen(true);
  };

  // Save Modal Action
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    if (editingItem) {
      setCategories((prev) =>
        (prev ?? []).map((item) =>
          item.id === editingItem.id ? { ...item, ...formData } : item
        )
      );
    } else {
      const newCategory: CategoryItem = {
        id: Date.now().toString(),
        name: formData.name,
        description: formData.description,
        addedDate: new Date().toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }),
        productsCount: Number(formData.productsCount) || 0,
        status: formData.status,
      };
      setCategories((prev) => [newCategory, ...(prev ?? [])]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="">
      <div className="space-y-6">
        
        {/* Top Controls: Search Bar & Add Category Button */}
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
            onClick={() => openModal()}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#236B9E] hover:bg-[#1D5A85] text-white font-medium px-5 py-2.5 rounded-lg text-sm transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Add Category</span>
          </button>
        </div>

        {/* Data Table */}
        <div className="rounded-2xl border border-slate-200/70 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[900px]">
              {/* Table Header */}
              <thead>
                <tr className="border-b border-slate-200 text-xs font-semibold text-slate-500">
                  <th className="py-4 px-6 text-center w-[18%]">Name</th>
                  <th className="py-4 px-6 text-center w-[36%]">Description</th>
                  <th className="py-4 px-6 text-center w-[13%]">Added date</th>
                  <th className="py-4 px-6 text-center w-[13%]">Products Count</th>
                  <th className="py-4 px-6 text-center w-[10%]">Status</th>
                  <th className="py-4 px-6 text-center w-[10%]">Action</th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody className="divide-y divide-slate-200/80 text-xs">
                {filteredCategories && filteredCategories.length > 0 ? (
                  filteredCategories.map((item) => (
                    <tr
                      key={item.id}
                      className="hover:bg-slate-50/70 transition-colors"
                    >
                      {/* Name */}
                      <td className="py-5 px-6 font-semibold text-slate-700 text-center">
                        {item.name}
                      </td>

                      {/* Description */}
                      <td className="py-5 px-6 text-slate-500 text-center leading-relaxed">
                        {item.description}
                      </td>

                      {/* Added Date */}
                      <td className="py-5 px-6 text-slate-500 text-center whitespace-nowrap">
                        {item.addedDate}
                      </td>

                      {/* Products Count */}
                      <td className="py-5 px-6 text-slate-600 text-center font-medium">
                        {item.productsCount}
                      </td>

                      {/* Status Badge */}
                      <td className="py-5 px-6 text-center">
                        <span
                          className={`inline-block px-3.5 py-1 rounded-full text-[11px] font-medium ${
                            item.status === "Active"
                              ? "bg-[#DCFCE7] text-[#16A34A]"
                              : "bg-[#F1F5F9] text-slate-400"
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>

                      {/* Action Icons */}
                      <td className="py-5 px-6 text-center">
                        <div className="flex items-center justify-center gap-3 text-slate-500">
                          <button
                            onClick={() => openModal(item)}
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
                      colSpan={6}
                      className="text-center py-10 text-slate-400 text-sm"
                    >
                      No categories found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal for Add / Edit Category */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 border border-slate-100 animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <h3 className="text-base font-bold text-slate-800">
                  {editingItem ? "Edit Category" : "Add New Category"}
                </h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-slate-400 hover:text-slate-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSave} className="mt-4 space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    Category Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:border-[#236B9E]"
                    placeholder="e.g. Mobility Aids"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    Description
                  </label>
                  <textarea
                    rows={3}
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:border-[#236B9E] resize-none"
                    placeholder="Provide a brief description..."
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">
                      Products Count
                    </label>
                    <input
                      type="number"
                      value={formData.productsCount}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          productsCount: Number(e.target.value),
                        })
                      }
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:border-[#236B9E]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">
                      Status
                    </label>
                    <select
                      value={formData.status}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          status: e.target.value as "Active" | "Inactive",
                        })
                      }
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:border-[#236B9E] bg-white"
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 text-xs font-semibold bg-[#236B9E] hover:bg-[#1D5A85] text-white rounded-lg transition-colors"
                  >
                    {editingItem ? "Update" : "Create"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}