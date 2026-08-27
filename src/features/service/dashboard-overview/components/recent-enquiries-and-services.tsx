import React from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Dummy Data for Enquiries
const recentEnquiries = [
  {
    id: 1,
    company: "Sunrise Care Group",
    service: "CQC Compliance Training",
    date: "2 Jan 2025",
  },
  {
    id: 2,
    company: "Bluebird Homecare Ltd",
    service: "Health & Safety Level 3",
    date: "30 Dec 2024",
  },
  {
    id: 3,
    company: "Brightwater Residential",
    service: "Safeguarding Adults",
    date: "28 Dec 2024",
  },
  {
    id: 4,
    company: "Harmony Care Services",
    service: "Dementia Awareness",
    date: "20 Dec 2024",
  },
]

// Dummy Data for My Services
const myServices = [
  {
    id: 1,
    title: "CQC Compliance Training",
    price: "£495 per delegate",
    status: "Active",
  },
  {
    id: 2,
    title: "Health & Safety Level 3",
    price: "£295 per delegate",
    status: "Active",
  },
  {
    id: 3,
    title: "Safeguarding Adults",
    price: "£195 per delegate",
    status: "Active",
  },
  {
    id: 4,
    title: "Dementia Awareness",
    price: "£175 per delegate",
    status: "Inactive",
  },
]

export default function RecentEnquiriesAndServices() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full font-sans">
      {/* 1. Recent Enquiries Card */}
      <Card className="border-none shadow-[0px_4px_6px_0px_rgba(0,0,0,0.05)] rounded-2xl bg-white p-2">
        <CardHeader className="flex flex-row items-center justify-between pb-4 pt-2 px-4">
          <CardTitle className="text-base font-bold text-slate-800">
            Recent Enquiries
          </CardTitle>
          <Link
            href="#"
            className="text-xs font-semibold text-[#2b72a8] underline hover:text-[#1e527b] transition-colors"
          >
            View All
          </Link>                         
        </CardHeader>
        <CardContent className="px-4 pb-2 pt-0">
          <div className="divide-y divide-slate-100">
            {recentEnquiries.map((item) => (
              <div
                key={item.id}
                className="py-3.5 flex items-center justify-between text-xs sm:text-sm first:pt-0 last:pb-0"
              >
                <div className="font-semibold text-slate-700 w-1/3 truncate">
                  {item.company}
                </div>
                <div className="text-slate-400 text-xs w-1/3 text-center truncate">
                  {item.service}
                </div>
                <div className="text-slate-400 text-xs w-1/3 text-right">
                  {item.date}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 2. My Services Card */}
      <Card className="border-none shadow-[0px_4px_6px_0px_rgba(0,0,0,0.05)] rounded-2xl bg-white p-2">
        <CardHeader className="flex flex-row items-center justify-between pb-4 pt-2 px-4">
          <CardTitle className="text-base font-bold text-slate-800">
            My Services
          </CardTitle>
          <Link
            href="#"
            className="text-xs font-semibold text-[#2b72a8] underline hover:text-[#1e527b] transition-colors"
          >
            View All
          </Link>
        </CardHeader>
        <CardContent className="px-4 pb-2 pt-0">
          <div className="divide-y divide-slate-100">
            {myServices.map((service) => (
              <div
                key={service.id}
                className="py-3 flex items-center justify-between text-xs sm:text-sm first:pt-0 last:pb-0"
              >
                <div className="font-semibold text-slate-700 w-2/5 truncate">
                  {service.title}
                </div>
                <div className="text-slate-400 text-xs w-2/5 text-center truncate">
                  {service.price}
                </div>
                <div className="w-1/5 flex justify-end">
                  {service.status === "Active" ? (
                    <Badge
                      variant="outline"
                      className="border-emerald-200 bg-emerald-50/50 text-emerald-600 font-medium text-[11px] px-3 py-0.5 rounded-full hover:bg-emerald-50"
                    >
                      Active
                    </Badge>
                  ) : (
                    <Badge
                      variant="outline"
                      className="border-slate-200 bg-slate-50 text-slate-400 font-medium text-[11px] px-3 py-0.5 rounded-full hover:bg-slate-50"
                    >
                      Inactive
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}