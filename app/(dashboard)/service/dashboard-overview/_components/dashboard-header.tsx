import React from 'react';
import { 
  Bookmark, 
  Check, 
  User, 
  Eye, 
  MessageSquare, 
  Megaphone 
} from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function ServiceDashboardHeader() {
  const features = [
    'Priority Directory',
    'Featured Badge',
    'Unlimited Enquiries',
    'Analytics Access',
    '20% Ad Discount',
  ];

  const stats = [
    {
      value: '78%',
      label: 'Profile Completion',
      icon: User,
    },
    {
      value: '342',
      label: 'Profile Views',
      icon: Eye,
    },
    {
      value: '5',
      label: 'Total Enquiries',
      icon: MessageSquare,
    },
    {
      value: '2',
      label: 'Active Advertisements',
      icon: Megaphone,
    },
  ];

  return (
    <div className="w-full  space-y-4 font-['Wix_Madefor_Text',sans-serif]">
      {/* Upper Plan Section */}
      <div className="w-full p-6 bg-cyan-700 rounded-2xl flex flex-col justify-center items-start gap-2.5">
        <div className="w-full flex flex-col justify-start items-start gap-4">
          
          {/* Header Info */}
          <div className="w-full flex flex-col justify-start items-start gap-2">
            <div className="w-full flex flex-col justify-start items-start gap-1">
              
              {/* Badge Label */}
              <div className="inline-flex justify-start items-center gap-1">
                <Bookmark className="w-4 h-4 text-slate-300" />
                <span className="text-slate-300 text-xs font-semibold font-['Inter'] uppercase leading-4">
                  Current Plan
                </span>
              </div>

              {/* Title */}
              <h1 className="text-white text-3xl font-bold leading-10">
                Premium
              </h1>
            </div>

            {/* Subtitle / Renewal Date */}
            <p className="text-slate-300 text-sm font-normal leading-5">
              £59.00/month · Renews 1 February 2025
            </p>
          </div>

          {/* Features Badges List */}
          <div className="w-full flex flex-wrap justify-start items-center gap-2">
            {features.map((feature, idx) => (
              <Badge
                key={idx}
                variant="secondary"
                className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-[100px] border-none font-normal text-xs leading-4 flex items-center gap-1.5"
              >
                <Check className="w-3 h-3 text-white stroke-[2.5]" />
                {feature}
              </Badge>
            ))}
          </div>

        </div>
      </div>

      {/* Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => {
          const IconComponent = stat.icon;
          return (
            <Card key={idx} className="p-4 bg-white rounded-lg shadow-[0px_4px_6px_0px_rgba(0,0,0,0.10)] border-none">
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
}