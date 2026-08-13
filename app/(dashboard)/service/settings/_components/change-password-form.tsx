"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Eye, EyeOff, Check, X } from "lucide-react";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

// Zod Validation Schema
const passwordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Must contain at least one uppercase letter")
      .regex(/[a-z]/, "Must contain at least one lowercase letter")
      .regex(/[0-9]/, "Must contain at least one number")
      .regex(/[@$!%*?&#^()_+\-=\[\]{};':"\\|,.<>\/?]/, "Must contain at least one special character")
      .refine((val) => !/\s/.test(val), "No spaces allowed"),
    confirmPassword: z.string().min(1, "Please confirm your new password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type PasswordFormValues = z.infer<typeof passwordSchema>;

export default function ChangePasswordForm() {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const form = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    mode: "onChange",
  });

  const newPasswordValue = form.watch("newPassword") || "";

  // Real-time Dynamic Validation Rule Checks

  const validationRules = [
    {
      id: "length",
      label: "Minimum 8-12 characters (recommend 12+ for stronger security).",
      isValid: newPasswordValue.length >= 8,
    },
    {
      id: "uppercase",
      label: "At least one uppercase letter must.",
      isValid: /[A-Z]/.test(newPasswordValue),
    },
    {
      id: "lowercase",
      label: "At least one lowercase letter must.",
      isValid: /[a-z]/.test(newPasswordValue),
    },
    {
      id: "number",
      label: "At least one number must (0-9).",
      isValid: /[0-9]/.test(newPasswordValue),
    },
    {
      id: "specialChar",
      label: "At least special character (! @ # $ % ^ & * etc.).",
      isValid: /[@$!%*?&#^()_+\-=\[\]{};':"\\|,.<>\/?]/.test(newPasswordValue),
    },
    {
      id: "noSpace",
      label: "No spaces allowed.",
      isValid: newPasswordValue.length > 0 && !/\s/.test(newPasswordValue),
    },
  ];

  // Submit Handler
  function onSubmit(values: PasswordFormValues) {
    console.log("=== Password Updated Successfully ===");
    console.log("Password Form Data:", values);
    alert("Password updated successfully!");
    form.reset();
  }

  return (
    <div className="w-full max-w-none font-sans">
      <Card className="w-full max-w-none p-6 sm:p-8 border-none bg-[#eef3f7] rounded-xl shadow-xs">
        <h2 className="text-lg font-semibold text-slate-800 mb-6">
          Changes Password
        </h2>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
            
            {/* Password Inputs Row 1: Current & New */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Current Password */}
              <FormField
                control={form.control}
                name="currentPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-semibold text-slate-700">
                      Current Password
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          {...field}
                          type={showCurrent ? "text" : "password"}
                          placeholder="********"
                          className="bg-[#f5f8fa] border-slate-200 text-slate-800 text-sm h-11 pr-10 focus-visible:ring-cyan-700"
                        />
                        <button
                          type="button"
                          onClick={() => setShowCurrent(!showCurrent)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700"
                        >
                          {showCurrent ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage className="text-xs text-red-500" />
                  </FormItem>
                )}
              />

              {/* New Password */}
              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-semibold text-slate-700">
                      New Password
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          {...field}
                          type={showNew ? "text" : "password"}
                          placeholder="********"
                          className="bg-[#f5f8fa] border-slate-200 text-slate-800 text-sm h-11 pr-10 focus-visible:ring-cyan-700"
                        />
                        <button
                          type="button"
                          onClick={() => setShowNew(!showNew)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700"
                        >
                          {showNew ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage className="text-xs text-red-500" />
                  </FormItem>
                )}
              />
            </div>

            {/* Confirm New Password (Full Width with Red Border Focus/Error Style) */}
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel className="text-xs font-semibold text-slate-700">
                    Confirm New Password
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        {...field}
                        type={showConfirm ? "text" : "password"}
                        placeholder="********"
                        className={`bg-[#f5f8fa] text-slate-800 text-sm h-11 pr-10 transition-colors ${
                          fieldState.error
                            ? "border-red-400 focus-visible:ring-red-400"
                            : "border-slate-200 focus-visible:ring-cyan-700"
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirm(!showConfirm)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700"
                      >
                        {showConfirm ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage className="text-xs text-red-500" />
                </FormItem>
              )}
            />

            {/* Validation Checklists Section */}
            <div className="space-y-2 pt-2">
              {validationRules.map((rule) => (
                <div
                  key={rule.id}
                  className="flex items-center gap-2 text-xs transition-colors"
                >
                  {rule.isValid ? (
                    <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[2.5] shrink-0" />
                  ) : (
                    <X className="w-3.5 h-3.5 text-red-500 stroke-[2.5] shrink-0" />
                  )}
                  <span
                    className={
                      rule.isValid
                        ? "text-emerald-700 font-medium"
                        : "text-red-500 font-medium"
                    }
                  >
                    {rule.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Footer Buttons */}
            <div className="flex items-center justify-end gap-3 pt-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => form.reset()}
                className="border-slate-300 text-slate-700 hover:bg-slate-100 font-medium text-xs h-9 px-6 bg-transparent"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-[#2b6ba8] hover:bg-[#205282] text-white font-medium text-xs h-9 px-6 transition-colors"
              >
                Save Changes
              </Button>
            </div>

          </form>
        </Form>
      </Card>
    </div>
  );
}
