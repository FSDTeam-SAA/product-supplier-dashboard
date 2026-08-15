import React from "react";
import {
  Bookmark,
  Check,
  User,
  Eye,
  MessageSquare,
  Megaphone,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const SupplieroverViewCard = () => {
  const features = [
    "Priority Directory",
    "Featured Badge",
    "Unlimited Enquiries",
    "Analytics Access",
    "20% Ad Discount",
  ];

  const stats = [
    {
      value: "78%",
      label: "Profile Completion",
      icon: User,
    },
    {
      value: "342",
      label: "Profile Views",
      icon: Eye,
    },
    {
      value: "5",
      label: "Total Enquiries",
      icon: MessageSquare,
    },
    {
      value: "2",
      label: "Active Advertisements",
      icon: Megaphone,
    },
  ];

  return (
    <div className="w-full  space-y-4 p-6 ">

      {/* Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => {
          const IconComponent = stat.icon;
          return (
            <Card
              key={idx}
              className="p-4 bg-white rounded-lg shadow-[0px_4px_6px_0px_rgba(0,0,0,0.10)] border-none"
            >
              <CardContent className="p-0 flex justify-between items-center h-full">
                {/* Text Block */}
                <div className="flex flex-col justify-start items-start gap-1">
                  <div className="text-cyan-700 text-3xl font-bold leading-10">
                    {stat.value}
                  </div>
                  <div className="text-zinc-600 text-sm font-normal leading-4">
                    {stat.label}
                  </div>
                </div>

                {/* Icon Container */}
                <div className="size-12 p-3 bg-slate-100 rounded-[100px] flex justify-center items-center shrink-0">
                  <IconComponent className="size-6 text-cyan-700" />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default SupplieroverViewCard;
