/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

// ==========================================
// 1. JSON DATA CONFIGURATION
// শুধুমাত্র এই JSON টি পরিবর্তন করলেই পুরো Dashboard & Chart আপডেট হবে
// ==========================================
export const initialChartsData = {
  revenueChart: {
    title: "Revenue",
    subtitle: "Total estimated value (USD)",
    timeframeOptions: ["1M", "3M", "6M", "1Y"],
    selectedTimeframe: "1Y",
    data: [
      { month: "Jan", value: 20 },
      { month: "", value: 20 },
      { month: "", value: 21 },
      { month: "", value: 22 },
      { month: "", value: 22.5 },
      { month: "Feb", value: 23 },
      { month: "", value: 24.2 },
      { month: "", value: 23.5 },
      { month: "", value: 23.8 },
      { month: "Mar", value: 24.5 },
      { month: "", value: 24 },
      { month: "", value: 25.5 },
      { month: "", value: 25 },
      { month: "Apr", value: 26 },
      { month: "", value: 25 },
      { month: "", value: 24.5 },
      { month: "", value: 25.8 },
      { month: "May", value: 27 },
      { month: "", value: 28 },
      { month: "", value: 27.2 },
      { month: "", value: 28.5 },
      { month: "Jun", value: 29 },
      { month: "", value: 28.2 },
      { month: "", value: 29.5 },
      { month: "", value: 28.2 },
      { month: "Jul", value: 28.5 },
      { month: "", value: 27.5 },
      { month: "", value: 28.5 },
      { month: "", value: 29.8 },
      { month: "Aug", value: 29.5 },
      { month: "", value: 29.8 },
      { month: "", value: 29.2 },
      { month: "", value: 31.5 },
      { month: "Sep", value: 32.5 },
      { month: "", value: 32.5 },
      { month: "", value: 32 },
      { month: "", value: 34 },
      { month: "Oct", value: 33.5 },
      { month: "", value: 34.5 },
      { month: "", value: 35.5 },
      { month: "", value: 36.5 },
      { month: "Nov", value: 38 },
      { month: "", value: 37.5 },
      { month: "", value: 36.5 },
      { month: "", value: 37.5 },
      { month: "Dec", value: 36.8 },
    ],
  },
  topProducts: {
    title: "Top 5 Products",
    data: [
      {
        name: "Mobile Hoist System",
        value: 890,
        color: "#00E610", // Bright Green
      },
      {
        name: "Folding Walking Frame",
        value: 313,
        color: "#2870AE", // Slate Blue
      },
      {
        name: "Adjustable Bath Seat",
        value: 313,
        color: "#243746", // Dark Slate Navy
      },
      {
        name: "Lightweight Wheelchair",
        value: 720,
        color: "#FF8C00", // Vibrant Orange
      },
      {
        name: "Electric Hospital Bed",
        value: 313,
        color: "#E600E6", // Magenta / Neon Pink
      },
    ],
  },
};

// ==========================================
// 2. TYPES
// ==========================================
export type ChartsDataType = typeof initialChartsData;

interface AnalyticsChartsProps {
  data?: ChartsDataType;
}

// ==========================================
// 3. CUSTOM TOOLTIP FOR REVENUE
// ==========================================
interface TooltipProps {
  active?: boolean;
  payload?: Array<{ value: number }>;
  label?: string;
}

const CustomRevenueTooltip = ({ active, payload, label }: TooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-slate-200/80 shadow-md rounded-md px-2.5 py-1.5 text-center">
        <p className="text-[10px] text-slate-400 font-medium leading-none mb-1">
          {label || "Value"}
        </p>
        <p className="text-xs font-bold text-slate-800 leading-none">
          ${payload[0].value}K
        </p>
      </div>
    );
  }
  return null;
};

// ==========================================
// 4. MAIN COMPONENT
// ==========================================
export default function AnalyticsCharts({
  data = initialChartsData,
}: AnalyticsChartsProps) {
  const [selectedRange, setSelectedRange] = useState(
    data.revenueChart.selectedTimeframe
  );

  return (
    <div className="w-full p-4 sm:p-6 md:p-8 font-sans">
      <div className="mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* LEFT CARD: REVENUE AREA CHART */}
        <div className="lg:col-span-8 bg-white rounded-2xl p-6 sm:p-7 border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-xl font-bold text-[#1E293B]">
                {data.revenueChart.title}
              </h2>
              <p className="text-xs text-slate-400 font-medium mt-0.5">
                {data.revenueChart.subtitle}
              </p>
            </div>

            {/* Timeframe Filter Buttons */}
            <div className="flex items-center gap-1.5 self-start sm:self-auto">
              {data.revenueChart.timeframeOptions.map((period) => {
                const isActive = selectedRange === period;
                return (
                  <button
                    key={period}
                    onClick={() => setSelectedRange(period)}
                    className={`text-xs px-3 py-1 rounded-full font-medium transition-all ${
                      isActive
                        ? "bg-[#2563EB] text-white shadow-sm"
                        : "border border-slate-200 text-slate-400 hover:text-slate-600 bg-white"
                    }`}
                  >
                    {period}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Area Chart Container */}
          <div className="h-[340px] w-full mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={data.revenueChart.data}
                margin={{ top: 20, right: 10, left: -10, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="revenueFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#4A80D4" stopOpacity={0.25} />
                    <stop offset="100%" stopColor="#4A80D4" stopOpacity={0.03} />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#94A3B8", fontSize: 11 }}
                  dy={10}
                  interval={0}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#94A3B8", fontSize: 11 }}
                  ticks={[0, 10, 20, 30, 40, 50]}
                  tickFormatter={(val) => `$${val}K`}
                />
                <Tooltip content={<CustomRevenueTooltip />} />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#4A80D4"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#revenueFill)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* RIGHT CARD: TOP 5 PRODUCTS DONUT CHART */}
        <div className="lg:col-span-4 bg-white rounded-2xl p-6 sm:p-7 border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] flex flex-col min-h-[445px]">
          {/* Header */}
          <h2 className="text-xl font-bold text-[#1E293B] mb-2">
            {data.topProducts.title}
          </h2>

          {/* Donut Chart */}
          <div className="h-[240px] w-full flex items-center justify-center my-auto">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data.topProducts.data}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={105}
                  stroke="none"
                  startAngle={90}
                  endAngle={-270}
                >
                  {data.topProducts.data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(val: any, name: any) => [
                    `${val} units`,
                    name,
                  ]}
                  contentStyle={{
                    backgroundColor: "#fff",
                    borderRadius: "8px",
                    border: "1px solid #E2E8F0",
                    fontSize: "12px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Product Items Custom Bottom Legend */}
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2.5 pt-4">
            {data.topProducts.data.map((item) => (
              <div
                key={item.name}
                className="flex items-center gap-1.5 text-xs text-slate-500 font-medium"
              >
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: item.color }}
                />
                <span>{item.name}</span>
                <span className="font-bold text-slate-800">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}