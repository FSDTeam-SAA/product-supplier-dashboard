"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { ImagePlus, X } from "lucide-react";
import { ProductCategory } from "../../categories/types";
import { ProductPayload, SupplierProduct } from "../types";

interface Props {
  categories: ProductCategory[];
  initialData?: SupplierProduct | null;
  isSubmitting: boolean;
  onSave: (product: ProductPayload) => Promise<void>;
  onCancel: () => void;
}

const fieldClass = "mt-1.5 w-full rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-800 outline-none transition focus:border-[#236B9E] focus:ring-2 focus:ring-[#236B9E]/15";
const getCategoryId = (product?: SupplierProduct | null) => typeof product?.categoryId === "string" ? product.categoryId : product?.categoryId?._id ?? "";

export default function AddProductForm({ categories, initialData, isSubmitting, onSave, onCancel }: Props) {
  const [data, setData] = useState<ProductPayload>({ productName: initialData?.productName ?? "", categoryId: getCategoryId(initialData), description: initialData?.description ?? "", status: initialData?.status ?? "active", quantity: initialData?.quantity ?? 0, price: initialData?.price ?? 0 });
  const [photos, setPhotos] = useState<File[]>([]);
  const previews = photos.map((file) => URL.createObjectURL(file));

  const selectPhotos = (event: ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(event.target.files ?? []).filter((file) => file.size <= 5 * 1024 * 1024);
    setPhotos((current) => [...current, ...selected].slice(0, 5));
    event.target.value = "";
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await onSave({ ...data, productName: data.productName.trim(), photos });
  };

  return <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"><form onSubmit={submit} className="space-y-7"><div className="grid gap-5 lg:grid-cols-2"><Field label="Product name"><input required value={data.productName} onChange={(event) => setData({ ...data, productName: event.target.value })} className={fieldClass} placeholder="e.g. Lightweight wheelchair" /></Field><Field label="Category"><select required value={data.categoryId} onChange={(event) => setData({ ...data, categoryId: event.target.value })} className={fieldClass}><option value="">Select a category</option>{categories.map((category) => <option key={category._id} value={category._id}>{category.categoryName}</option>)}</select></Field><Field label="Price"><input required min="0" step="0.01" type="number" value={data.price} onChange={(event) => setData({ ...data, price: Number(event.target.value) })} className={fieldClass} /></Field><Field label="Stock quantity"><input required min="0" type="number" value={data.quantity} onChange={(event) => setData({ ...data, quantity: Number(event.target.value) })} className={fieldClass} /></Field><Field label="Status"><select value={data.status} onChange={(event) => setData({ ...data, status: event.target.value as ProductPayload["status"] })} className={fieldClass}><option value="active">Active</option><option value="deactivate">Inactive</option></select></Field></div><Field label="Description"><textarea rows={4} value={data.description} onChange={(event) => setData({ ...data, description: event.target.value })} className={fieldClass} placeholder="Describe this product..." /></Field><section><div className="mb-3 flex items-center justify-between"><div><h2 className="text-sm font-semibold text-slate-800">Product photos</h2><p className="mt-1 text-xs text-slate-500">Upload up to 5 images, 5 MB each.</p></div><label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-[#236B9E] px-3 py-2 text-xs font-semibold text-[#236B9E] transition hover:bg-[#236B9E]/5"><ImagePlus className="h-4 w-4" />Add photos<input className="sr-only" type="file" accept="image/*" multiple onChange={selectPhotos} /></label></div><div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">{previews.map((url, index) => <div key={url} className="group relative aspect-square overflow-hidden rounded-xl border border-slate-200 bg-slate-50"><img src={url} alt={`New product image ${index + 1}`} className="h-full w-full object-cover" /><button type="button" aria-label={`Remove image ${index + 1}`} onClick={() => setPhotos((items) => items.filter((_, itemIndex) => itemIndex !== index))} className="absolute right-2 top-2 rounded-full bg-white p-1 text-slate-600 opacity-0 shadow transition group-hover:opacity-100 focus:opacity-100"><X className="h-3.5 w-3.5" /></button></div>)}{initialData?.photo?.map((url, index) => !previews.length ? <div key={url} className="aspect-square overflow-hidden rounded-xl border border-slate-200 bg-slate-50"><img src={url} alt={`Current product image ${index + 1}`} className="h-full w-full object-cover" /></div> : null) ?? null}{!previews.length && !initialData?.photo?.length ? <label className="col-span-full flex min-h-32 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 text-center transition hover:border-[#236B9E]/50 hover:bg-[#236B9E]/5"><ImagePlus className="mb-2 h-5 w-5 text-[#236B9E]" /><span className="text-sm font-medium text-slate-700">Select product images</span><span className="mt-1 text-xs text-slate-500">PNG, JPG, WEBP up to 5 MB</span><input className="sr-only" type="file" accept="image/*" multiple onChange={selectPhotos} /></label> : null}</div></section>{categories.length === 0 ? <p className="rounded-lg bg-amber-50 px-3 py-2 text-xs text-amber-700">Create a category before adding a product.</p> : null}<div className="flex justify-end gap-3 border-t border-slate-100 pt-5"><button type="button" onClick={onCancel} className="rounded-lg px-5 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-100">Cancel</button><button disabled={isSubmitting || categories.length === 0} className="rounded-lg bg-[#236B9E] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#1D5A85] disabled:cursor-not-allowed disabled:opacity-60">{isSubmitting ? "Uploading…" : initialData ? "Update product" : "Add product"}</button></div></form></div>;
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="block text-sm font-semibold text-slate-700">{label}{children}</label>;
}
