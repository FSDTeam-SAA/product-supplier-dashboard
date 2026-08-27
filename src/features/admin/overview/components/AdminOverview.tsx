"use client";

import React from "react";
import StatsCards from "./StatsCards";
import RevenueChartCard from "./RevenueChartCard";
import ApprovalsAndJobListings from "./ApprovalsAndJobListings";

export function AdminOverview() {
  return (
    <div className="space-y-6">
      <StatsCards />
      <RevenueChartCard />
      <ApprovalsAndJobListings />
    </div>
  );
}

export default AdminOverview;
