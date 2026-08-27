"use client";

import React, { useState } from "react";
import { Plus, Pencil, Trash2, DollarSign, Clock, MapPin, Loader2 } from "lucide-react";
import AddServiceModal from "./add-service-modal";
import EditServiceModal from "./edit-service-modal";
import {
  useMyServices,
  useCreateService,
  useUpdateService,
  useDeleteService,
} from "../hooks/useMyServices";
import { ServiceItem, CreateServiceInput } from "../types";

export default function ServicesPage() {
  const { data: serverServices, isLoading, isError } = useMyServices();
  const createServiceMutation = useCreateService();
  const updateServiceMutation = useUpdateService();
  const deleteServiceMutation = useDeleteService();

  // Modals States
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  // Handle Add
  const handleAddService = (newService: CreateServiceInput) => {
    createServiceMutation.mutate(newService);
  };

  // Handle Open Edit Click
  const handleOpenEdit = (service: ServiceItem) => {
    setSelectedService(service);
    setIsEditOpen(true);
  };

  // Handle Save Edit
  const handleEditService = (id: string, updatedService: Partial<CreateServiceInput>) => {
    updateServiceMutation.mutate({ id, data: updatedService });
  };

  // Handle Delete
  const handleDeleteService = (id: string) => {
    if (confirm("Are you sure you want to delete this service?")) {
      deleteServiceMutation.mutate(id);
    }
  };

  const services: ServiceItem[] = serverServices || [];

  return (
    <div className="bg-[#F8F9FA] min-h-screen p-6 font-sans text-slate-800">
      <div className="space-y-6">
        {/* Top Header Section */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-slate-900">My Services</h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Manage your offered services, pricing, and availability
            </p>
          </div>
          <button
            onClick={() => setIsAddOpen(true)}
            className="flex items-center gap-2 bg-[#2B6CB0] hover:bg-[#2C5282] text-white font-medium px-5 py-2.5 rounded-lg text-sm transition-all shadow-sm cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Service</span>
          </button>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-xl border border-slate-100 shadow-sm">
            <Loader2 className="w-8 h-8 text-[#2B6CB0] animate-spin mb-3" />
            <p className="text-sm text-slate-500 font-medium">Loading your services from server...</p>
          </div>
        )}

        {/* Error State */}
        {!isLoading && isError && (
          <div className="p-6 bg-red-50 text-red-700 rounded-xl border border-red-200 text-sm">
            Failed to load services. Please ensure your backend is running at http://localhost:8080 and you are logged in.
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !isError && services.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-xl border border-slate-100 shadow-sm text-center">
            <p className="text-base font-semibold text-slate-700 mb-1">No services found</p>
            <p className="text-xs text-slate-500 mb-5">Click &quot;Add New Service&quot; to create your first service</p>
            <button
              onClick={() => setIsAddOpen(true)}
              className="flex items-center gap-2 bg-[#2B6CB0] hover:bg-[#2C5282] text-white font-medium px-5 py-2 rounded-lg text-xs transition-all cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Create Service</span>
            </button>
          </div>
        )}

        {/* Services 2-Column Grid */}
        {!isLoading && services.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {services.map((service) => {
              const serviceId = service._id || service.id || "";
              const serviceTitle = service.serviceName || service.title || "Untitled Service";
              const isActive =
                service.status?.toLowerCase() === "active" || service.status === "Active";

              return (
                <div
                  key={serviceId}
                  className="bg-white rounded-xl p-6 border border-slate-100 shadow-[0_2px_10px_rgba(0,0,0,0.03)] flex flex-col justify-between hover:shadow-md transition-shadow"
                >
                  <div>
                    {/* Header: Title & Status Badge */}
                    <div className="flex items-center justify-between gap-3 mb-3">
                      <h3 className="text-base font-bold text-slate-900 truncate">
                        {serviceTitle}
                      </h3>
                      <span
                        className={`text-xs px-3 py-0.5 rounded-full font-medium border capitalize shrink-0 ${
                          isActive
                            ? "bg-[#E6F4EA] text-[#2E7D32] border-[#C8E6C9]"
                            : "bg-[#F1F3F4] text-[#5F6368] border-[#E0E0E0]"
                        }`}
                      >
                        {service.status || "active"}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-xs text-slate-500 leading-relaxed mb-6 min-h-[36px]">
                      {service.description || "No description provided."}
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
                          ${service.price}
                        </span>
                      </div>

                      {/* Duration Box */}
                      <div className="bg-[#F4F5F6] rounded-lg p-3 text-center flex flex-col items-center justify-center">
                        <Clock className="w-4 h-4 text-slate-400 mb-1" />
                        <span className="text-[11px] text-slate-400 font-normal mb-0.5">
                          Duration
                        </span>
                        <span className="text-xs font-bold text-slate-800">
                          {service.duration} mins
                        </span>
                      </div>

                      {/* Location Box */}
                      <div className="bg-[#F4F5F6] rounded-lg p-3 text-center flex flex-col items-center justify-center">
                        <MapPin className="w-4 h-4 text-slate-400 mb-1" />
                        <span className="text-[11px] text-slate-400 font-normal mb-0.5">
                          Location
                        </span>
                        <span className="text-xs font-bold text-slate-800">
                          {typeof service.location === "boolean"
                            ? service.location
                              ? "Onsite/Online"
                              : "Online Only"
                            : service.location || "Both"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons Footer */}
                  <div className="flex items-center gap-3 pt-2 border-t border-slate-50">
                    <button
                      onClick={() => handleOpenEdit(service)}
                      className="flex-1 bg-[#EFEFEF] hover:bg-[#E2E8F0] text-slate-600 text-xs font-semibold py-2.5 rounded-md flex items-center justify-center gap-2 transition-colors cursor-pointer"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => handleDeleteService(serviceId)}
                      disabled={deleteServiceMutation.isPending}
                      className="flex items-center gap-1.5 text-red-500 hover:text-red-600 hover:bg-red-50 text-xs font-medium px-3 py-2.5 rounded-md transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Separated Add Modal */}
        <AddServiceModal
          isOpen={isAddOpen}
          onClose={() => setIsAddOpen(false)}
          onAdd={handleAddService}
          isLoading={createServiceMutation.isPending}
        />

        {/* Separated Edit Modal */}
        <EditServiceModal
          key={selectedService?._id || selectedService?.id || "no-service"}
          isOpen={isEditOpen}
          onClose={() => setIsEditOpen(false)}
          onEdit={handleEditService}
          serviceData={selectedService}
          isLoading={updateServiceMutation.isPending}
        />
      </div>
    </div>
  );
}
