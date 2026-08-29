"use client";

import { FormEvent, useState } from "react";
import { Check, KeyRound, Loader2, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { useChangeSupplierPassword } from "../hooks/useSupplierSecurity";

const inputClass = "mt-1.5 w-full rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-800 outline-none transition focus:border-[#236B9E] focus:ring-2 focus:ring-[#236B9E]/15";

export default function SupplierSecurity() {
  const changePassword = useChangeSupplierPassword();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (newPassword !== confirmPassword) return toast.error("New passwords do not match");
    if (newPassword.length < 6) return toast.error("New password must be at least 6 characters");
    await changePassword.mutateAsync({ oldPassword, newPassword });
    setOldPassword(""); setNewPassword(""); setConfirmPassword("");
  };
  return <div className="w-full space-y-6 p-6 lg:p-8"><div className="flex items-start gap-3"><span className="rounded-xl bg-[#236B9E]/10 p-3 text-[#236B9E]"><ShieldCheck className="h-6 w-6" /></span><div><h1 className="text-2xl font-bold text-slate-800">Account Security</h1><p className="mt-1 text-sm text-slate-500">Keep your supplier account secure by updating your password regularly.</p></div></div><section className="w-full rounded-2xl border border-slate-200 bg-white shadow-sm"><div className="flex items-center gap-3 border-b border-slate-100 px-6 py-5"><span className="rounded-lg bg-[#236B9E]/10 p-2 text-[#236B9E]"><KeyRound className="h-5 w-5" /></span><div><h2 className="font-semibold text-slate-800">Change password</h2><p className="mt-0.5 text-sm text-slate-500">Use a strong password with at least 6 characters.</p></div></div><form onSubmit={submit} className="grid gap-5 p-6 md:grid-cols-2 xl:grid-cols-3"><Field label="Current password"><input required type="password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} className={inputClass} autoComplete="current-password" /></Field><Field label="New password"><input required type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className={inputClass} autoComplete="new-password" /></Field><Field label="Confirm new password"><input required type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className={inputClass} autoComplete="new-password" /></Field><div className="flex justify-end md:col-span-2 xl:col-span-3"><button disabled={changePassword.isPending} className="inline-flex items-center gap-2 rounded-lg bg-[#236B9E] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#1D5A85] disabled:opacity-60">{changePassword.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}{changePassword.isPending ? "Updating…" : "Update password"}</button></div></form></section></div>;
}

function Field({ label, children }: { label: string; children: React.ReactNode }) { return <label className="block text-sm font-semibold text-slate-700">{label}{children}</label>; }
