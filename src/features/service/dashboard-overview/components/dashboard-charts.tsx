"use client"

import React from "react"
import { Info } from "lucide-react"
import { Area, AreaChart, Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

// Dynamic Data for Profile Views (Area Chart)
const profileViewsData = [
  { week: "W1", views: 180 },
  { week: "W2", views: 240 },
  { week: "W3", views: 380 },
  { week: "W4", views: 610 },
  { week: "W5", views: 530 },
  { week: "W6", views: 720 },
  { week: "W7", views: 510 },
  { week: "W8", views: 400 },
]

// Dynamic Data for Monthly Enquiries (Bar Chart)
const enquiriesData = [
  { month: "Aug", enquiries: 5 },
  { month: "Sep", enquiries: 8 },
  { month: "Oct", enquiries: 6 },
  { month: "Nov", enquiries: 11 },
  { month: "Dec", enquiries: 14 },
  { month: "Jan", enquiries: 9 },
]

// Chart Configuration for Shadcn
const chartConfig = {
  views: {
    label: "Views",
    color: "#2b72a8", // Blue color matching design
  },
  enquiries: {
    label: "Enquiries",
    color: "#2b72a8",
  },
} satisfies ChartConfig

export default function DashboardCharts() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 w-full ">
      
      {/* 1. Profile Views Area Chart (Takes 2 Columns on Large Screens) */}
      <Card className="lg:col-span-2 border-none shadow-[0px_4px_6px_0px_rgba(0,0,0,0.05)] rounded-xl">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-1.5">
            <CardTitle className="text-base font-bold text-slate-800">
              Profile Views — Last 8 Weeks
            </CardTitle>
            <Info className="w-4 h-4 text-slate-400 cursor-pointer" />
          </div>
          <CardDescription className="text-xs text-slate-400">
            Last 8 weeks
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-2">
          <ChartContainer config={chartConfig} className="h-[250px] w-full">
            <AreaChart
              data={profileViewsData}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <defs>
                <linearGradient id="viewsGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2b72a8" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#2b72a8" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} strokeDasharray="3 3" opacity={0.3} />
              <XAxis
                dataKey="week"
                tickLine={false}
                axisLine={false}
                tickMargin={10}
                className="text-xs text-slate-400"
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={10}
                domain={[0, 800]}
                ticks={[0, 200, 400, 600]}
                className="text-xs text-slate-400"
              />
              <ChartTooltip content={<ChartTooltipContent indicator="line" />} />
              <Area
                type="monotone"
                dataKey="views"
                stroke="#2b72a8"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#viewsGradient)"
              />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* 2. Monthly Enquiries Bar Chart (Takes 1 Column) */}
      <Card className="border-none shadow-[0px_4px_6px_0px_rgba(0,0,0,0.05)] rounded-xl">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-1.5">
            <CardTitle className="text-base font-bold text-slate-800">
              Monthly Enquiries
            </CardTitle>
            <Info className="w-4 h-4 text-slate-400 cursor-pointer" />
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <ChartContainer config={chartConfig} className="h-[250px] w-full">
            <BarChart
              data={enquiriesData}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <CartesianGrid vertical={false} strokeDasharray="3 3" opacity={0.3} />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={10}
                className="text-xs text-slate-400"
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={10}
                domain={[0, 18]}
                ticks={[0, 3, 6, 9, 12, 15, 18]}
                className="text-xs text-slate-400"
              />
              <ChartTooltip content={<ChartTooltipContent hideLabel />} />
              <Bar
                dataKey="enquiries"
                fill="#2b72a8"
                radius={[6, 6, 0, 0]}
              />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

    </div>
  )
}