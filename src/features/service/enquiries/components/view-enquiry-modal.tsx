"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export interface EnquiryDetails {
  id: string;
  companyName: string;
  service: string;
  enquiryMessage: string;
  dateReceived: string;
}

interface ViewEnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: EnquiryDetails | null;
}

export default function ViewEnquiryModal({
  isOpen,
  onClose,
  data,
}: ViewEnquiryModalProps) {
  if (!data) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[550px] p-6 bg-white rounded-xl border-none shadow-xl font-sans">
        {/* Title / Company Name */}
        <DialogHeader className="pb-2">
          <DialogTitle className="text-xl font-bold text-[#1E293B]">
            {data.companyName}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 text-left pt-2">
          {/* Service Name */}
          <div className="space-y-1">
            <h4 className="text-xs font-semibold text-slate-700">
              Service Name
            </h4>
            <p className="text-xs text-slate-400">
              {data.service}
            </p>
          </div>

          {/* Enquiry Message */}
          <div className="space-y-1">
            <h4 className="text-xs font-semibold text-slate-700">
              Enquirie
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              {data.enquiryMessage}
            </p>
          </div>

          {/* Date Received */}
          <div className="space-y-1">
            <h4 className="text-xs font-semibold text-slate-700">
              Date Received
            </h4>
            <p className="text-xs text-slate-400">
              {data.dateReceived}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}