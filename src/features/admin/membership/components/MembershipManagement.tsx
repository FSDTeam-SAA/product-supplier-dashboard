"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Plus, Shield, Award, Sparkles } from "lucide-react";
import { MembershipPlan } from "../types";

const initialPlans: MembershipPlan[] = [
  {
    id: "1",
    name: "Standard Provider",
    price: 49,
    billingCycle: "monthly",
    features: [
      "Access to standard care job board",
      "Up to 5 service listings",
      "Direct client messaging",
      "Standard support",
    ],
    activeSubscribers: 85,
    status: "Active",
  },
  {
    id: "2",
    name: "Premium Healthcare Agency",
    price: 149,
    billingCycle: "monthly",
    features: [
      "Unlimited job listings",
      "Verified agency badge",
      "Priority customer placement",
      "Full API & analytics access",
      "24/7 Dedicated account manager",
    ],
    activeSubscribers: 42,
    status: "Active",
  },
  {
    id: "3",
    name: "Supplier Enterprise",
    price: 299,
    billingCycle: "monthly",
    features: [
      "Featured marketplace listings",
      "Zero commission on first 50 sales",
      "Bulk inventory upload",
      "Direct organization procurement integration",
    ],
    activeSubscribers: 19,
    status: "Active",
  },
];

export function MembershipManagement() {
  const [plans] = useState<MembershipPlan[]>(initialPlans);

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-[#2A6592]">Membership & Subscription Plans</h2>
          <p className="text-sm text-gray-500">Configure tiers, pricing, and subscriber permissions</p>
        </div>
        <Button className="bg-[#2A6592] hover:bg-[#204e71] text-white flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Create New Plan
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <Card
            key={plan.id}
            className="flex flex-col justify-between border-gray-200 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden bg-white"
          >
            {plan.name.includes("Premium") && (
              <div className="absolute top-0 right-0 bg-[#2A6592] text-white text-[10px] font-bold px-3 py-1 rounded-bl-lg uppercase tracking-wider">
                Popular
              </div>
            )}
            <CardHeader className="pb-4">
              <div className="flex items-center gap-2 mb-2">
                {plan.name.includes("Standard") ? (
                  <Shield className="h-5 w-5 text-[#2A6592]" />
                ) : plan.name.includes("Premium") ? (
                  <Sparkles className="h-5 w-5 text-amber-500" />
                ) : (
                  <Award className="h-5 w-5 text-purple-600" />
                )}
                <CardTitle className="text-lg font-bold text-gray-800">{plan.name}</CardTitle>
              </div>
              <div className="flex items-baseline gap-1 mt-2">
                <span className="text-3xl font-extrabold text-[#2A6592]">${plan.price}</span>
                <span className="text-xs text-gray-500 font-medium">/{plan.billingCycle}</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {plan.activeSubscribers} active organizations subscribed
              </p>
            </CardHeader>
            <CardContent className="flex-1 space-y-4">
              <div className="space-y-2 border-t border-gray-100 pt-4">
                {plan.features.map((feat, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-gray-600">
                    <Check className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </CardContent>
            <div className="p-6 pt-0 border-t border-gray-50 mt-auto">
              <Button
                variant="outline"
                className="w-full border-[#2A6592] text-[#2A6592] hover:bg-blue-50 text-xs font-semibold"
              >
                Edit Plan Settings
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default MembershipManagement;
