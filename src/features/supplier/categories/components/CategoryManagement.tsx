"use client";

import { FormEvent, useMemo, useState } from "react";
import { useSession } from "next-auth/react";
import { Eye, Loader2, Pencil, Plus, Search, Trash2, X } from "lucide-react";
import {
  useCategories,
  useCreateCategory,
  useDeleteCategory,
  useUpdateCategory,
} from "../hooks/useCategories";
import { CategoryPayload, ProductCategory } from "../types";

const emptyForm: CategoryPayload = { categoryName: "", description: "", status: "active" };

function formatDate(date?: string) {
  return date
    ? new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "short", year: "numeric" }).format(new Date(date))
    : "—";
}

export default function CategoryManagement() {
  const { data: session, status: sessionStatus } = useSession();
  const { data: categories = [], isLoading, isError, refetch } = useCategories(session?.user?.id);
  const createCategory = useCreateCategory();
  const updateCategory = useUpdateCategory();
  const deleteCategory = useDeleteCategory();
  const [searchTerm, setSearchTerm] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<ProductCategory | null>(null);
  const [viewingCategory, setViewingCategory] = useState<ProductCategory | null>(null);
  const [formData, setFormData] = useState<CategoryPayload>(emptyForm);

  const filteredCategories = useMemo(
    () => categories.filter((category) => [category.categoryName, category.description].filter(Boolean).some((value) => value!.toLowerCase().includes(searchTerm.toLowerCase()))),
    [categories, searchTerm],
  );

  const openForm = (category?: ProductCategory) => {
    setEditingCategory(category ?? null);
    setFormData(category ? { categoryName: category.categoryName, description: category.description ?? "", status: category.status } : emptyForm);
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setEditingCategory(null);
    setFormData(emptyForm);
  };

  const handleSave = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const category = { ...formData, categoryName: formData.categoryName.trim() };
    if (!category.categoryName) return;
    if (editingCategory) await updateCategory.mutateAsync({ id: editingCategory._id, category });
    else await createCategory.mutateAsync(category);
    closeForm();
  };

  const handleDelete = (category: ProductCategory) => {
    if (window.confirm(`Delete “${category.categoryName}”? This cannot be undone.`)) deleteCategory.mutate(category._id);
  };

  const isSaving = createCategory.isPending || updateCategory.isPending;

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input aria-label="Search categories" type="search" placeholder="Search categories..." value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} className="w-full rounded-lg border-0 bg-[#E8EDF2] py-2.5 pl-10 pr-4 text-sm text-slate-800 outline-none transition-all focus:ring-2 focus:ring-[#236B9E]/30" />
        </div>
        <button onClick={() => openForm()} className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#236B9E] px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-[#1D5A85] sm:w-auto"><Plus className="h-4 w-4" />Add Category</button>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200/70 shadow-sm"><div className="overflow-x-auto"><table className="w-full min-w-[800px] border-collapse text-left">
        <thead><tr className="border-b border-slate-200 text-xs font-semibold text-slate-500"><th className="w-[20%] px-6 py-4 text-center">Name</th><th className="w-[38%] px-6 py-4 text-center">Description</th><th className="w-[15%] px-6 py-4 text-center">Added date</th><th className="w-[12%] px-6 py-4 text-center">Status</th><th className="w-[15%] px-6 py-4 text-center">Action</th></tr></thead>
        <tbody className="divide-y divide-slate-200/80 text-xs">
          {isLoading || sessionStatus === "loading" ? <tr><td colSpan={5} className="px-6 py-12 text-center text-slate-500"><Loader2 className="mr-2 inline h-4 w-4 animate-spin" />Loading categories…</td></tr> : null}
          {isError ? <tr><td colSpan={5} className="px-6 py-12 text-center text-sm text-red-600">Could not load categories. <button onClick={() => refetch()} className="font-semibold underline">Try again</button></td></tr> : null}
          {!isLoading && !isError && filteredCategories.length === 0 ? <tr><td colSpan={5} className="px-6 py-12 text-center text-sm text-slate-400">No categories found.</td></tr> : null}
          {!isLoading && !isError && filteredCategories.map((category) => <tr key={category._id} className="transition-colors hover:bg-slate-50/70">
            <td className="px-6 py-5 text-center font-semibold text-slate-700">{category.categoryName}</td><td className="px-6 py-5 text-center leading-relaxed text-slate-500">{category.description || "—"}</td><td className="whitespace-nowrap px-6 py-5 text-center text-slate-500">{formatDate(category.createdAt)}</td><td className="px-6 py-5 text-center"><span className={`inline-block rounded-full px-3.5 py-1 text-[11px] font-medium ${category.status === "active" ? "bg-[#DCFCE7] text-[#16A34A]" : "bg-slate-100 text-slate-500"}`}>{category.status === "active" ? "Active" : "Inactive"}</span></td>
            <td className="px-6 py-5"><div className="flex items-center justify-center gap-3 text-slate-500"><button aria-label={`View ${category.categoryName}`} onClick={() => setViewingCategory(category)} className="transition-colors hover:text-[#236B9E]"><Eye className="h-4 w-4" /></button><button aria-label={`Edit ${category.categoryName}`} onClick={() => openForm(category)} className="transition-colors hover:text-[#236B9E]"><Pencil className="h-4 w-4" /></button><button aria-label={`Delete ${category.categoryName}`} disabled={deleteCategory.isPending} onClick={() => handleDelete(category)} className="transition-colors hover:text-red-500 disabled:cursor-not-allowed disabled:opacity-50"><Trash2 className="h-4 w-4" /></button></div></td>
          </tr>)}
        </tbody>
      </table></div></div>

      {isFormOpen ? <CategoryFormModal category={editingCategory} formData={formData} isSaving={isSaving} onChange={setFormData} onClose={closeForm} onSubmit={handleSave} /> : null}
      {viewingCategory ? <CategoryViewModal category={viewingCategory} onClose={() => setViewingCategory(null)} /> : null}
    </div>
  );
}

function CategoryFormModal({ category, formData, isSaving, onChange, onClose, onSubmit }: { category: ProductCategory | null; formData: CategoryPayload; isSaving: boolean; onChange: (data: CategoryPayload) => void; onClose: () => void; onSubmit: (event: FormEvent<HTMLFormElement>) => void }) {
  return <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"><div role="dialog" aria-modal="true" aria-labelledby="category-form-title" className="w-full max-w-md rounded-xl border border-slate-100 bg-white p-6 shadow-xl"><div className="flex items-center justify-between border-b border-slate-100 pb-4"><h2 id="category-form-title" className="text-base font-bold text-slate-800">{category ? "Edit Category" : "Add New Category"}</h2><button aria-label="Close" onClick={onClose} className="text-slate-400 hover:text-slate-600"><X className="h-5 w-5" /></button></div><form onSubmit={onSubmit} className="mt-4 space-y-4"><label className="block text-xs font-semibold text-slate-600">Category Name<input required value={formData.categoryName} onChange={(event) => onChange({ ...formData, categoryName: event.target.value })} className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-[#236B9E]" placeholder="e.g. Mobility Aids" /></label><label className="block text-xs font-semibold text-slate-600">Description<textarea rows={3} value={formData.description} onChange={(event) => onChange({ ...formData, description: event.target.value })} className="mt-1 w-full resize-none rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-[#236B9E]" placeholder="Provide a brief description..." /></label><label className="block text-xs font-semibold text-slate-600">Status<select value={formData.status} onChange={(event) => onChange({ ...formData, status: event.target.value as CategoryPayload["status"] })} className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-[#236B9E]"><option value="active">Active</option><option value="deactivate">Inactive</option></select></label><div className="flex justify-end gap-3 border-t border-slate-100 pt-4"><button type="button" onClick={onClose} className="rounded-lg px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100">Cancel</button><button disabled={isSaving} type="submit" className="rounded-lg bg-[#236B9E] px-5 py-2 text-xs font-semibold text-white hover:bg-[#1D5A85] disabled:opacity-60">{isSaving ? "Saving…" : category ? "Update" : "Create"}</button></div></form></div></div>;
}

function CategoryViewModal({ category, onClose }: { category: ProductCategory; onClose: () => void }) {
  return <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"><div role="dialog" aria-modal="true" aria-labelledby="category-view-title" className="w-full max-w-md rounded-xl border border-slate-100 bg-white p-6 shadow-xl"><div className="flex items-center justify-between border-b border-slate-100 pb-4"><h2 id="category-view-title" className="text-base font-bold text-slate-800">Category details</h2><button aria-label="Close" onClick={onClose} className="text-slate-400 hover:text-slate-600"><X className="h-5 w-5" /></button></div><dl className="mt-5 space-y-4 text-sm"><div><dt className="text-xs font-semibold uppercase tracking-wide text-slate-400">Name</dt><dd className="mt-1 font-medium text-slate-800">{category.categoryName}</dd></div><div><dt className="text-xs font-semibold uppercase tracking-wide text-slate-400">Description</dt><dd className="mt-1 leading-relaxed text-slate-600">{category.description || "No description provided."}</dd></div><div className="grid grid-cols-2 gap-4"><div><dt className="text-xs font-semibold uppercase tracking-wide text-slate-400">Status</dt><dd className="mt-1 text-slate-700">{category.status === "active" ? "Active" : "Inactive"}</dd></div><div><dt className="text-xs font-semibold uppercase tracking-wide text-slate-400">Created</dt><dd className="mt-1 text-slate-700">{formatDate(category.createdAt)}</dd></div></div></dl><div className="mt-6 flex justify-end"><button onClick={onClose} className="rounded-lg bg-[#236B9E] px-5 py-2 text-xs font-semibold text-white hover:bg-[#1D5A85]">Close</button></div></div></div>;
}
