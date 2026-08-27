"use client";

import React from "react";
import SupplieroverViewCard from "./supplieroverViewCard";
import DynamicDashboard from "./supplierChart";

export function SupplierOverview() {
  return (
    <div className="space-y-6">
      <SupplieroverViewCard />
      <DynamicDashboard />
    </div>
  );
}

export default SupplierOverview;
