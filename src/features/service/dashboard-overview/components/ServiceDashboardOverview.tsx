"use client";

import React from "react";
import ServiceDashboardHeader from "./dashboard-header";
import DashboardCharts from "./dashboard-charts";
import RecentEnquiriesAndServices from "./recent-enquiries-and-services";

export function ServiceDashboardOverview() {
  return (
    <div className="p-6 space-y-4">
      <ServiceDashboardHeader />
      <DashboardCharts />
      <RecentEnquiriesAndServices />
    </div>
  );
}

export default ServiceDashboardOverview;
