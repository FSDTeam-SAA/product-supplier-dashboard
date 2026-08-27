"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Briefcase, Users, CheckCircle2 } from "lucide-react";
import { JobListingItem } from "../types";

const initialJobs: JobListingItem[] = [
  {
    id: "1",
    title: "Senior Care Specialist",
    company: "Care First Ltd",
    location: "London, UK",
    type: "Full-Time",
    status: "Active",
    applicantsCount: 18,
    postedDate: "2026-08-20",
  },
  {
    id: "2",
    title: "Medical Equipment Supplier",
    company: "Apex Healthcare",
    location: "Manchester, UK",
    type: "Contract",
    status: "Active",
    applicantsCount: 6,
    postedDate: "2026-08-22",
  },
  {
    id: "3",
    title: "Care Assistant (Night Shift)",
    company: "Sunrise Care Home",
    location: "Birmingham, UK",
    type: "Part-Time",
    status: "Draft",
    applicantsCount: 0,
    postedDate: "2026-08-25",
  },
];

export function JobListing() {
  const [jobs] = useState<JobListingItem[]>(initialJobs);

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-[#2A6592]">Job Listings Management</h2>
          <p className="text-sm text-gray-500">Monitor and manage all posted jobs and applications</p>
        </div>
        <Button className="bg-[#2A6592] hover:bg-[#204e71] text-white flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Post New Job
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4 border-gray-100 shadow-sm bg-white">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-50 text-[#2A6592] rounded-xl">
              <Briefcase className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium">Total Postings</p>
              <p className="text-xl font-bold text-gray-800">{jobs.length}</p>
            </div>
          </div>
        </Card>
        <Card className="p-4 border-gray-100 shadow-sm bg-white">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
              <CheckCircle2 className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium">Active Jobs</p>
              <p className="text-xl font-bold text-gray-800">
                {jobs.filter((j) => j.status === "Active").length}
              </p>
            </div>
          </div>
        </Card>
        <Card className="p-4 border-gray-100 shadow-sm bg-white">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-purple-50 text-purple-600 rounded-xl">
              <Users className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium">Total Applicants</p>
              <p className="text-xl font-bold text-gray-800">
                {jobs.reduce((acc, curr) => acc + curr.applicantsCount, 0)}
              </p>
            </div>
          </div>
        </Card>
      </div>

      <Card className="border-gray-100 shadow-sm">
        <CardHeader>
          <CardTitle className="text-base font-semibold text-gray-800">Recent Job Posts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-600">
              <thead className="bg-[#F8FAFC] text-xs font-semibold text-[#5C7184] uppercase border-b border-gray-100">
                <tr>
                  <th className="px-4 py-3">Job Title</th>
                  <th className="px-4 py-3">Company</th>
                  <th className="px-4 py-3">Location</th>
                  <th className="px-4 py-3">Type</th>
                  <th className="px-4 py-3">Applicants</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {jobs.map((job) => (
                  <tr key={job.id} className="hover:bg-gray-50/50">
                    <td className="px-4 py-3 font-semibold text-gray-900">{job.title}</td>
                    <td className="px-4 py-3 text-[#2A6592]">{job.company}</td>
                    <td className="px-4 py-3 text-gray-500">{job.location}</td>
                    <td className="px-4 py-3">
                      <Badge variant="outline" className="text-xs">
                        {job.type}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 font-medium text-gray-700">{job.applicantsCount}</td>
                    <td className="px-4 py-3">
                      <Badge
                        variant="outline"
                        className={
                          job.status === "Active"
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                            : "bg-gray-50 text-gray-600 border-gray-200"
                        }
                      >
                        {job.status}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Button variant="ghost" size="sm" className="text-[#2A6592] hover:bg-blue-50">
                        View
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default JobListing;
