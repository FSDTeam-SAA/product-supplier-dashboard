"use client";

import React, { useState } from "react";
import { Plus, Pencil, Trash2, DollarSign, Clock, MapPin } from "lucide-react";
import AddServiceModal from "./add-service-modal";
import EditServiceModal from "./edit-service-modal";
import type { ServiceFormData, ServiceItem } from "./add-service-modal";

const servicesDataList: ServiceItem[] = [
  {
    id: "1",
    title: "CQC Compliance Training",
    status: "Active",
    description:
      "Comprehensive training covering all CQC fundamental standards, inspection preparation, and regulatory compliance for care homes and domiciliary providers.",
    price: "£495 per delegate",
    duration: "2 days",
    location: "Both",
  },
  {
    id: "2",
    title: "Health & Safety Level 3",
    status: "Active",
    description:
      "RoSPA-accredited qualification for care sector managers covering risk assessment, COSHH, manual handling and fire safety.",
    price: "£295 per delegate",
    duration: "1 day",
    location: "Online",
  },
  {
    id: "3",
    title: "Safeguarding Adults",
    status: "Active",
    description:
      "Mandatory safeguarding training aligned with the Care Act 2014 and local authority requirements for adult safeguarding.",
    price: "£195 per delegate",
    duration: "6 hours",
    location: "Onsite",
  },
  {
    id: "4",
    title: "Dementia Awareness",
    status: "Inactive",
    description:
      "Evidence-based dementia care training for all care staff levels, covering communication, person-centred care, and behaviour management.",
    price: "£175 per delegate",
    duration: "4 hours",
    location: "Both",
  },
];

export default function ServicesPage() {
  const [services, setServices] = useState<ServiceItem[]>(servicesDataList);

  // Modals States
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  // Handle Add
  const handleAddService = (newService: ServiceFormData) => {
    const serviceWithId = { ...newService, id: Date.now().toString() };
    setServices((prev) => [...prev, serviceWithId]);
    console.log("Added Service:", serviceWithId);
  };

  // Handle Edit Click
  const handleOpenEdit = (service: ServiceItem) => {
    setSelectedService(service);
    setIsEditOpen(true);
  };

  // Handle Save Edit
  const handleEditService = (updatedService: ServiceItem) => {
    setServices((prev) =>
      prev.map((s) => (s.id === updatedService.id ? updatedService : s))
    );
    console.log("Updated Service:", updatedService);
  };

  // Handle Delete
  const handleDeleteService = (id: string) => {
    setServices((prev) => prev.filter((s) => s.id !== id));
  };

  return (
    <div className="bg-[#F8F9FA] min-h-screen p-6 font-sans text-slate-800">
      <div className="space-y-6 ">
        
        {/* Top Header Section */}
        <div className="flex justify-end">
          <button
            onClick={() => setIsAddOpen(true)}
            className="flex items-center gap-2 bg-[#2B6CB0] hover:bg-[#2C5282] text-white font-medium px-5 py-2.5 rounded-lg text-sm transition-all shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Service</span>
          </button>
        </div>

        {/* Services 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-xl p-6 border border-slate-100 shadow-[0_2px_10px_rgba(0,0,0,0.03)] flex flex-col justify-between"
            >
              <div>
                {/* Header: Title & Status Badge */}
                <div className="flex items-center gap-3 mb-3">
                  <h3 className="text-base font-bold text-slate-900">
                    {service.title}
                  </h3>
                  <span
                    className={`text-xs px-3 py-0.5 rounded-full font-medium border ${
                      service.status === "Active"
                        ? "bg-[#E6F4EA] text-[#2E7D32] border-[#C8E6C9]"
                        : "bg-[#F1F3F4] text-[#5F6368] border-[#E0E0E0]"
                    }`}
                  >
                    {service.status}
                  </span>
                </div>

                {/* Description */}
                <p className="text-xs text-slate-500 leading-relaxed mb-6 min-h-[36px]">
                  {service.description}
                </p>

                {/* Details Box Grid (Price, Duration, Location) */}
                <div className="grid grid-cols-3 gap-3 mb-6">
                  {/* Price Box */}
                  <div className="bg-[#F4F5F6] rounded-lg p-3 text-center flex flex-col items-center justify-center">
                    <DollarSign className="w-4 h-4 text-slate-400 mb-1" />
                    <span className="text-[11px] text-slate-400 font-normal mb-0.5">
                      Price
                    </span>
                    <span className="text-xs font-bold text-slate-800">
                      {service.price}
                    </span>
                  </div>

                  {/* Duration Box */}
                  <div className="bg-[#F4F5F6] rounded-lg p-3 text-center flex flex-col items-center justify-center">
                    <Clock className="w-4 h-4 text-slate-400 mb-1" />
                    <span className="text-[11px] text-slate-400 font-normal mb-0.5">
                      Duration
                    </span>
                    <span className="text-xs font-bold text-slate-800">
                      {service.duration}
                    </span>
                  </div>

                  {/* Location Box */}
                  <div className="bg-[#F4F5F6] rounded-lg p-3 text-center flex flex-col items-center justify-center">
                    <MapPin className="w-4 h-4 text-slate-400 mb-1" />
                    <span className="text-[11px] text-slate-400 font-normal mb-0.5">
                      Location
                    </span>
                    <span className="text-xs font-bold text-slate-800">
                      {service.location}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons Footer */}
              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={() => handleOpenEdit(service)}
                  className="flex-1 bg-[#EFEFEF] hover:bg-[#E2E8F0] text-slate-600 text-xs font-semibold py-2.5 rounded-md flex items-center justify-center gap-2 transition-colors"
                >
                  <Pencil className="w-3.5 h-3.5" />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => handleDeleteService(service.id)}
                  className="flex items-center gap-1.5 text-red-500 hover:text-red-600 text-xs font-medium px-3 py-2.5 rounded-md transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Separated Add Modal */}
        <AddServiceModal
          isOpen={isAddOpen}
          onClose={() => setIsAddOpen(false)}
          onAdd={handleAddService}
        />

        {/* Separated Edit Modal */}
        <EditServiceModal
          key={selectedService?.id ?? "no-service-selected"}
          isOpen={isEditOpen}
          onClose={() => setIsEditOpen(false)}
          onEdit={handleEditService}
          serviceData={selectedService}
        />

      </div>
    </div>
  );
}
