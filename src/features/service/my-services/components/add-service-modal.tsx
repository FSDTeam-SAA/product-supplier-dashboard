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
import { CreateServiceInput } from "../types";

interface AddServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (newService: CreateServiceInput) => void;
  isLoading?: boolean;
}

export default function AddServiceModal({
  isOpen,
  onClose,
  onAdd,
  isLoading = false,
}: AddServiceModalProps) {
  const [serviceName, setServiceName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState("");
  const [locationType, setLocationType] = useState("Both");
  const [status, setStatus] = useState<"active" | "deactivate">("active");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({
      serviceName,
      description,
      price: Number(price) || 0,
      duration: Number(duration) || 60,
      location: locationType !== "Online",
      status,
    });
    // Reset Form
    setServiceName("");
    setDescription("");
    setPrice("");
    setDuration("");
    setLocationType("Both");
    setStatus("active");
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
              placeholder="e.g. Home Cleaning"
              value={serviceName}
              onChange={(e) => setServiceName(e.target.value)}
              className="bg-[#F8FAFC] border-slate-200 text-slate-800 text-xs h-10"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-600">Description</label>
            <Textarea
              rows={3}
              placeholder="Describe your service in detail..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="bg-[#F8FAFC] border-slate-200 text-slate-800 text-xs resize-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-600">Price ($)</label>
              <Input
                type="number"
                required
                placeholder="e.g. 120"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="bg-[#F8FAFC] border-slate-200 text-slate-800 text-xs h-10"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-600">Duration (mins)</label>
              <Input
                type="number"
                required
                placeholder="e.g. 60"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="bg-[#F8FAFC] border-slate-200 text-slate-800 text-xs h-10"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-slate-600">Location</label>
              <Select
                value={locationType}
                onValueChange={(value) => {
                  if (value !== null) {
                    setLocationType(value);
                  }
                }}
              >
                <SelectTrigger className="bg-[#F8FAFC] border-slate-200 text-slate-800 text-xs h-10">
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Both">Both (Onsite/Online)</SelectItem>
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
                checked={status === "active"}
                onCheckedChange={(checked) =>
                  setStatus(checked ? "active" : "deactivate")
                }
                className="data-[state=checked]:bg-[#2B6CB0]"
              />
              <span className="text-xs text-slate-600 font-medium capitalize">{status}</span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="border-slate-300 text-slate-600 text-xs font-medium px-6 h-9 cursor-pointer"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-[#2B6CB0] hover:bg-[#2C5282] text-white text-xs font-medium px-6 h-9 cursor-pointer"
            >
              {isLoading ? "Saving..." : "Save Service"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
