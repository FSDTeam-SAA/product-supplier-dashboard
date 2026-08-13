"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Pencil, Check, Wand2 } from "lucide-react";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

// Zod Validation Schema
const formSchema = z.object({
  companyName: z.string().min(2, "Company name must be at least 2 characters."),
  businessDescription: z
    .string()
    .min(10, "Description must be at least 10 characters."),
  emailAddress: z.string().email("Please enter a valid email address."),
  phoneNumber: z.string().min(6, "Please enter a valid phone number."),
  website: z.string().url("Please enter a valid URL (e.g. https://domain.com)"),
  serviceCoverageArea: z.string().min(2, "Coverage area is required."),
  businessRegistrationNumber: z
    .string()
    .min(2, "Registration number is required."),
});

type FormValues = z.infer<typeof formSchema>;

export default function BusinessProfileForm() {
  // Section Edit States
  const [editBusinessInfo, setEditBusinessInfo] = useState(false);
  const [editContactInfo, setEditContactInfo] = useState(false);
  const [editCoverageInfo, setEditCoverageInfo] = useState(false);

  // React Hook Form Setup
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      companyName: "ProTrain UK Ltd",
      businessDescription:
        "ProTrain UK is a specialist training provider exclusively serving the care sector. We deliver CQC-compliant training programmes across England and Wales, helping care organisations meet their regulatory obligations while investing in the professional development of their workforce.",
      emailAddress: "info@protrainuk.co.uk",
      phoneNumber: "0800 123 456",
      website: "www.protrainuk.co.uk",
      serviceCoverageArea: "Nationwide",
      businessRegistrationNumber: "12345678",
    },
  });

  // Submit Handler (Console logs all data)
  function onSubmit(values: FormValues) {
    console.log("=== Profile Form Submitted Successfully ===");
    console.log(values);

    // Auto lock edit mode after saving
    setEditBusinessInfo(false);
    setEditContactInfo(false);
    setEditCoverageInfo(false);
  }

  return (
    <div className="w-full mx-auto space-y-4 font-sans bg-transparent">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Header Banner & Profile Section */}
          <Card className="overflow-hidden border-none shadow-[0px_2px_4px_rgba(0,0,0,0.02)] rounded-md bg-[#F4F5F7]">
            {/* Banner Area */}
            <div className="relative h-48 w-full bg-slate-300">
              <Image
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1200"
                alt="Banner Image"
                className="object-cover"
                fill
              />
              <button
                type="button"
                className="absolute top-4 right-4 size-6 bg-[#363259] hover:bg-[#2c2847] text-white rounded-full flex items-center justify-center transition-all shadow-md z-10"
                title="Edit Cover Photo"
              >
                <Pencil className="w-3 h-3" />
              </button>
            </div>

            {/* Profile Avatar & Title */}
            <div className="px-6 pb-6 relative flex flex-col sm:flex-row items-start sm:items-end gap-4 -mt-16">
              <div className="relative z-10">
                <div className="relative size-32 rounded-full border-[4px] border-[#F4F5F7] overflow-hidden bg-white shadow-sm shrink-0">
                  <Image
                    src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=300"
                    alt="Profile Logo"
                    fill
                    className="object-cover"
                  />
                </div>
                <button
                  type="button"
                  className="absolute bottom-1 right-1 size-6 bg-[#363259] hover:bg-[#2c2847] text-white rounded-full flex items-center justify-center transition-all shadow-sm ring-[3px] ring-[#F4F5F7]"
                  title="Edit Logo"
                >
                  <Pencil className="w-3 h-3" />
                </button>
              </div>

              <div className="text-left mb-2">
                <h1 className="text-xl font-bold text-[#334155]">
                  ProTrain UK Ltd
                </h1>
                <p className="text-[13px] text-[#64748B] font-medium">
                  Training Center
                </p>
              </div>
            </div>
          </Card>

          {/* 1. Business Information Card */}
          <Card className="p-5 border-none shadow-[0px_2px_4px_rgba(0,0,0,0.02)] rounded-md bg-[#F4F5F7]">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-[13px] font-bold text-[#334155]">
                Business Information
              </h2>
              <button
                type="button"
                onClick={() => setEditBusinessInfo(!editBusinessInfo)}
                className="text-slate-400 hover:text-slate-600 transition-colors"
              >
                {editBusinessInfo ? (
                  <Check className="w-4 h-4 text-emerald-600" />
                ) : (
                  <Wand2 className="w-4 h-4" />
                )}
              </button>
            </div>

            <div className="space-y-4">
              <FormField
                control={form.control}
                name="companyName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[11px] font-bold text-[#475569]">
                      Company Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={!editBusinessInfo}
                        className="bg-transparent border-[#cbd5e1] focus-visible:ring-cyan-700 text-[#475569] font-normal disabled:opacity-90 h-9 rounded-sm"
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="businessDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[11px] font-bold text-[#475569]">
                      Business Description
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        rows={3}
                        disabled={!editBusinessInfo}
                        className="bg-transparent border-[#cbd5e1] focus-visible:ring-cyan-700 text-[#475569] font-normal leading-relaxed resize-none disabled:opacity-90 rounded-sm text-sm"
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
            </div>
          </Card>

          {/* 2. Contact Information Card */}
          <Card className="p-5 border-none shadow-[0px_2px_4px_rgba(0,0,0,0.02)] rounded-md bg-[#F4F5F7]">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-[13px] font-bold text-[#334155]">
                Contact Information
              </h2>
              <button
                type="button"
                onClick={() => setEditContactInfo(!editContactInfo)}
                className="text-slate-400 hover:text-slate-600 transition-colors"
              >
                {editContactInfo ? (
                  <Check className="w-4 h-4 text-emerald-600" />
                ) : (
                  <Wand2 className="w-4 h-4" />
                )}
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="emailAddress"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[11px] font-bold text-[#475569]">
                        Email Address
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={!editContactInfo}
                          className="bg-transparent border-[#cbd5e1] focus-visible:ring-cyan-700 text-[#475569] font-normal disabled:opacity-90 h-9 rounded-sm"
                        />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[11px] font-bold text-[#475569]">
                        Phone Number
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={!editContactInfo}
                          className="bg-transparent border-[#cbd5e1] focus-visible:ring-cyan-700 text-[#475569] font-normal disabled:opacity-90 h-9 rounded-sm"
                        />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="website"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[11px] font-bold text-[#475569]">
                      Website
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={!editContactInfo}
                        className="bg-transparent border-[#cbd5e1] focus-visible:ring-cyan-700 text-[#475569] font-normal disabled:opacity-90 h-9 rounded-sm"
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
            </div>
          </Card>

          {/* 3. Coverage & Registration Card */}
          <Card className="p-5 border-none shadow-[0px_2px_4px_rgba(0,0,0,0.02)] rounded-md bg-[#F4F5F7]">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-[13px] font-bold text-[#334155]">
                Coverage & Registration
              </h2>
              <button
                type="button"
                onClick={() => setEditCoverageInfo(!editCoverageInfo)}
                className="text-slate-400 hover:text-slate-600 transition-colors"
              >
                {editCoverageInfo ? (
                  <Check className="w-4 h-4 text-emerald-600" />
                ) : (
                  <Wand2 className="w-4 h-4" />
                )}
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="serviceCoverageArea"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[11px] font-bold text-[#475569]">
                      Service Coverage Area
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={!editCoverageInfo}
                        className="bg-transparent border-[#cbd5e1] focus-visible:ring-cyan-700 text-[#475569] font-normal disabled:opacity-90 h-9 rounded-sm"
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="businessRegistrationNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[11px] font-bold text-[#475569]">
                      Business Registration Number
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={!editCoverageInfo}
                        className="bg-transparent border-[#cbd5e1] focus-visible:ring-cyan-700 text-[#475569] font-normal disabled:opacity-90 h-9 rounded-sm"
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
            </div>
          </Card>
        </form>
      </Form>
    </div>
  );
}
