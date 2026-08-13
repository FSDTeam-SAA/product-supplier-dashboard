"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export interface ServiceItem {
  id: string;
  title: string;
  status: "Active" | "Inactive";
  description: string;
  price: string;
  duration: string;
  location: string;
}

export type ServiceFormData = Omit<ServiceItem, "id">;

interface AddServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (newService: ServiceFormData) => void;
}

export default function AddServiceModal({
  isOpen,
  onClose,
  onAdd,
}: AddServiceModalProps) {
  const [formData, setFormData] = useState<ServiceFormData>({
    title: "",
    description: "",
    price: "",
    duration: "",
    location: "Both",
    status: "Active",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(formData);
    // Reset Form
    setFormData({
      title: "",
      description: "",
      price: "",
      duration: "",
      location: "Both",
      status: "Active",
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[620px] p-6 bg-white rounded-xl border-none shadow-xl">
        <DialogHeader className="pb-2">
          <DialogTitle className="text-base font-bold text-[#1E293B]">
            Add New Service
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 pt-1">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-600">Service Name</label>
            <Input
              required
              placeholder="e.g. CQC Compliance Training"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="bg-[#F8FAFC] border-slate-200 text-slate-800 text-xs h-10"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-600">Description</label>
            <Textarea
              rows={3}
              placeholder="Describe your service in detail..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="bg-[#F8FAFC] border-slate-200 text-slate-800 text-xs resize-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-600">Price</label>
              <Input
                placeholder="e.g. £295 per delegate"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="bg-[#F8FAFC] border-slate-200 text-slate-800 text-xs h-10"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-600">Duration</label>
              <Input
                placeholder="e.g. 1 day"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                className="bg-[#F8FAFC] border-slate-200 text-slate-800 text-xs h-10"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-600">Location</label>
              <Select
                value={formData.location}
                onValueChange={(value) => {
                  if (value !== null) {
                    setFormData({ ...formData, location: value });
                  }
                }}
              >
                <SelectTrigger className="bg-[#F8FAFC] border-slate-200 text-slate-800 text-xs h-10">
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Both">Both</SelectItem>
                  <SelectItem value="Online">Online</SelectItem>
                  <SelectItem value="Onsite">Onsite</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-1.5 pt-1">
            <label className="text-xs font-medium text-slate-600 block">Status</label>
            <div className="flex items-center gap-2">
              <Switch
                checked={formData.status === "Active"}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, status: checked ? "Active" : "Inactive" })
                }
                className="data-[state=checked]:bg-[#2B6CB0]"
              />
              <span className="text-xs text-slate-600 font-medium">Active</span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="border-slate-300 text-slate-600 text-xs font-medium px-6 h-9"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-[#2B6CB0] hover:bg-[#2C5282] text-white text-xs font-medium px-6 h-9"
            >
              Save Service
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
