"use client";

import React, { useState } from "react";
import { Eye, ChevronLeft, ChevronRight } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import ViewEnquiryModal, { EnquiryDetails } from "./view-enquiry-modal";

interface EnquiryRow {
  id: string;
  companyName: string;
  subText: string;
  service: string;
  enquiryMessage: string;
  dateReceived: string;
  status: "New" | "Read" | "Replied" | "Closed";
}

const enquiriesData: EnquiryRow[] = [
  {
    id: "1",
    companyName: "Sunrise Care Group",
    subText: "Hello, we have a new care home opening...",
    service: "CQC Compliance Training",
    enquiryMessage:
      "Hello, we have a new care home opening in soon, could you train some of my fellow people. So that they can have a full on experince",
    dateReceived: "2 Jan 2025",
    status: "New",
  },
  {
    id: "2",
    companyName: "Bluebird Homecare Ltd",
    subText: "We are looking for H&S training for our te...",
    service: "Health & Safety Level 3",
    enquiryMessage:
      "We are looking for H&S training for our team members across all branches.",
    dateReceived: "30 Dec 2024",
    status: "Read",
  },
  {
    id: "3",
    companyName: "Brightwater Residential",
    subText: "We require safeguarding training for our...",
    service: "Safeguarding Adults",
    enquiryMessage:
      "We require safeguarding training for our new recruits as soon as possible.",
    dateReceived: "28 Dec 2024",
    status: "Replied",
  },
  {
    id: "4",
    companyName: "Harmony Care Services",
    subText: "Can you deliver dementia awareness trai...",
    service: "Dementia Awareness",
    enquiryMessage:
      "Can you deliver dementia awareness training on-site at our care facility?",
    dateReceived: "20 Dec 2024",
    status: "Closed",
  },
  {
    id: "5",
    companyName: "Oakwood Care Ltd",
    subText: "Good afternoon, we are preparing for an i...",
    service: "CQC Compliance Training",
    enquiryMessage:
      "Good afternoon, we are preparing for an upcoming CQC inspection next month.",
    dateReceived: "18 Dec 2024",
    status: "Replied",
  },
];

export default function EnquiriesTable() {
  const [selectedEnquiry, setSelectedEnquiry] = useState<EnquiryDetails | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // View Button Click Handler
  const handleViewDetails = (row: EnquiryRow) => {
    setSelectedEnquiry({
      id: row.id,
      companyName: row.companyName,
      service: row.service,
      enquiryMessage: row.enquiryMessage,
      dateReceived: row.dateReceived,
    });
    setIsModalOpen(true);
  };

  const renderStatusBadge = (status: EnquiryRow["status"]) => {
    switch (status) {
      case "New":
        return (
          <Badge className="bg-[#e8f2f8] text-[#2b72a8] hover:bg-[#e8f2f8] font-medium text-xs px-4 py-1 rounded-full border-none shadow-none">
            New
          </Badge>
        );
      case "Read":
        return (
          <Badge className="bg-[#ecefe2]/80 text-[#8c9083] hover:bg-[#ecefe2]/80 font-medium text-xs px-4 py-1 rounded-full border-none shadow-none">
            Read
          </Badge>
        );
      case "Replied":
        return (
          <Badge className="bg-[#e6f4ea] text-[#34a853] hover:bg-[#e6f4ea] font-medium text-xs px-4 py-1 rounded-full border-none shadow-none">
            Replied
          </Badge>
        );
      case "Closed":
        return (
          <Badge className="bg-[#fef7e0] text-[#b08800] hover:bg-[#fef7e0] font-medium text-xs px-4 py-1 rounded-full border-none shadow-none">
            Closed
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full ">
      {/* Table Card */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] overflow-hidden mb-6">
        <Table>
          <TableHeader>
            <TableRow className="bg-[#eef3f7] hover:bg-[#eef3f7] border-b-0">
              <TableHead className="w-[30%] text-slate-500 font-semibold text-xs py-3.5 pl-6">
                Company
              </TableHead>
              <TableHead className="w-[25%] text-slate-500 font-semibold text-xs py-3.5">
                Service
              </TableHead>
              <TableHead className="w-[20%] text-slate-500 font-semibold text-xs py-3.5">
                Date Received
              </TableHead>
              <TableHead className="w-[15%] text-center text-slate-500 font-semibold text-xs py-3.5">
                Status
              </TableHead>
              <TableHead className="w-[10%] text-right text-slate-500 font-semibold text-xs py-3.5 pr-8">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {enquiriesData.map((row) => (
              <TableRow
                key={row.id}
                className="hover:bg-slate-50/60 border-b border-slate-100 last:border-none transition-colors"
              >
                <TableCell className="py-4 pl-6">
                  <div className="flex flex-col gap-0.5">
                    <span className="font-bold text-xs sm:text-sm text-slate-800">
                      {row.companyName}
                    </span>
                    <span className="text-xs text-slate-400 font-normal truncate max-w-[280px]">
                      {row.subText}
                    </span>
                  </div>
                </TableCell>

                <TableCell className="py-4 text-xs sm:text-sm text-slate-500 font-normal">
                  {row.service}
                </TableCell>

                <TableCell className="py-4 text-xs sm:text-sm text-slate-500 font-normal">
                  {row.dateReceived}
                </TableCell>

                <TableCell className="py-4 text-center">
                  {renderStatusBadge(row.status)}
                </TableCell>

                {/* View Action Button */}
                <TableCell className="py-4 text-right pr-8">
                  <button
                    onClick={() => handleViewDetails(row)}
                    className="p-1.5 rounded-md hover:bg-slate-100 text-[#1e3a8a] transition-colors"
                    title="View Details"
                  >
                    <Eye className="w-5 h-5 stroke-[1.75]" />
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-2">
        <p className="text-xs text-slate-400 font-medium">
          Showing 1 to 5 of 12 results
        </p>

        <div className="flex items-center gap-1.5">
          <button className="w-8 h-8 rounded-md border border-slate-200 bg-white flex items-center justify-center text-slate-400 hover:bg-slate-50">
            <ChevronLeft className="w-4 h-4" />
          </button>
          
          <button className="w-8 h-8 rounded-md bg-[#090a2a] text-white font-medium text-xs flex items-center justify-center">
            1
          </button>
          
          <button className="w-8 h-8 rounded-md border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 font-medium text-xs flex items-center justify-center">
            2
          </button>
          
          <button className="w-8 h-8 rounded-md border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 font-medium text-xs flex items-center justify-center">
            3
          </button>
          
          <button className="w-8 h-8 rounded-md border border-slate-200 bg-white text-slate-400 font-medium text-xs flex items-center justify-center cursor-default">
            ...
          </button>
          
          <button className="w-8 h-8 rounded-md border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 font-medium text-xs flex items-center justify-center">
            8
          </button>
          
          <button className="w-8 h-8 rounded-md border border-slate-200 bg-white flex items-center justify-center text-slate-400 hover:bg-slate-50">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Connected Enquiry View Modal */}
      <ViewEnquiryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        data={selectedEnquiry}
      />
    </div>
  );
}