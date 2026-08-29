"use client";

import { FormEvent, useEffect, useState } from "react";
import { Check, Loader2, Store } from "lucide-react";
import { useStoreProfile, useUpdateStoreProfile } from "../hooks/useStoreProfile";
import { StoreProfile } from "../types";

const emptyProfile: StoreProfile = { name: "", email: "", phoneNumber: "", storeName: "", description: "", websiteLink: "", state: "", country: "", address: "", postCode: "" };
const inputClass = "mt-1.5 w-full rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-800 outline-none transition focus:border-[#236B9E] focus:ring-2 focus:ring-[#236B9E]/15";

export default function StoreProfilePage() {
  const profileQuery = useStoreProfile();
  const updateProfile = useUpdateStoreProfile();
  const [profile, setProfile] = useState<StoreProfile>(emptyProfile);
  useEffect(() => {
    if (!profileQuery.data) return;
    const syncProfile = window.setTimeout(() => setProfile({ ...emptyProfile, ...profileQuery.data }), 0);
    return () => window.clearTimeout(syncProfile);
  }, [profileQuery.data]);
  const submit = async (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); await updateProfile.mutateAsync(profile); };
  if (profileQuery.isLoading) return <div className="flex min-h-64 items-center justify-center text-slate-500"><Loader2 className="mr-2 h-5 w-5 animate-spin" />Loading store profile…</div>;
  if (profileQuery.isError) return <div className="rounded-xl border border-red-100 bg-red-50 p-5 text-sm text-red-700">Could not load store profile. <button onClick={() => profileQuery.refetch()} className="font-semibold underline">Try again</button></div>;
  const change = (key: keyof StoreProfile, value: string) => setProfile((current) => ({ ...current, [key]: value }));
  return <div className="w-full space-y-6 p-6 lg:p-8"><div className="flex items-start gap-3"><span className="rounded-xl bg-[#236B9E]/10 p-3 text-[#236B9E]"><Store className="h-6 w-6" /></span><div><h1 className="text-2xl font-bold text-slate-800">Store Profile</h1><p className="mt-1 text-sm text-slate-500">Manage your supplier store details, contact information, and public description.</p></div></div><form onSubmit={submit} className="space-y-6"><section className="rounded-2xl border border-slate-200 bg-white shadow-sm"><div className="border-b border-slate-100 px-6 py-5"><h2 className="font-semibold text-slate-800">Store details</h2><p className="mt-1 text-sm text-slate-500">Information shown with your supplier store.</p></div><div className="grid gap-5 p-6 md:grid-cols-2 xl:grid-cols-3"><Field label="Store name"><input required value={profile.storeName} onChange={(e) => change("storeName", e.target.value)} className={inputClass} /></Field><Field label="Contact person"><input required value={profile.name} onChange={(e) => change("name", e.target.value)} className={inputClass} /></Field><Field label="Website"><input type="url" value={profile.websiteLink} onChange={(e) => change("websiteLink", e.target.value)} className={inputClass} placeholder="https://example.com" /></Field><Field label="About store" wide><textarea required rows={5} value={profile.description} onChange={(e) => change("description", e.target.value)} className={inputClass} /></Field></div></section><section className="rounded-2xl border border-slate-200 bg-white shadow-sm"><div className="border-b border-slate-100 px-6 py-5"><h2 className="font-semibold text-slate-800">Contact & location</h2><p className="mt-1 text-sm text-slate-500">Keep these details current for customers.</p></div><div className="grid gap-5 p-6 md:grid-cols-2 xl:grid-cols-3"><Field label="Business email"><input required type="email" value={profile.email} onChange={(e) => change("email", e.target.value)} className={inputClass} /></Field><Field label="Phone number"><input required value={profile.phoneNumber} onChange={(e) => change("phoneNumber", e.target.value)} className={inputClass} /></Field><Field label="Country"><input required value={profile.country} onChange={(e) => change("country", e.target.value)} className={inputClass} /></Field><Field label="Address" wide><input required value={profile.address} onChange={(e) => change("address", e.target.value)} className={inputClass} /></Field><Field label="State / region"><input required value={profile.state} onChange={(e) => change("state", e.target.value)} className={inputClass} /></Field><Field label="Postcode"><input required value={profile.postCode} onChange={(e) => change("postCode", e.target.value)} className={inputClass} /></Field></div></section><div className="flex justify-end"><button disabled={updateProfile.isPending} className="inline-flex items-center gap-2 rounded-lg bg-[#236B9E] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#1D5A85] disabled:opacity-60">{updateProfile.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}{updateProfile.isPending ? "Saving…" : "Save changes"}</button></div></form></div>;
}

function Field({ label, wide, children }: { label: string; wide?: boolean; children: React.ReactNode }) { return <label className={`block text-sm font-semibold text-slate-700 ${wide ? "md:col-span-2 xl:col-span-3" : ""}`}>{label}{children}</label>; }
