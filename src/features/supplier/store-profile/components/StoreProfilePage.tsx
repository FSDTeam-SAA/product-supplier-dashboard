"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Store, Upload, Check } from "lucide-react";
import { toast } from "sonner";

export function StoreProfilePage() {
  const [storeName, setStoreName] = useState("Apex Healthcare Supplies Ltd");
  const [tagline, setTagline] = useState("Premium Medical Equipment & Healthcare Solutions");
  const [email, setEmail] = useState("sales@apexhealthcare.co.uk");
  const [phone, setPhone] = useState("+44 20 7946 0912");
  const [address, setAddress] = useState("12 Medical Park Way, Suite 4B");
  const [city, setCity] = useState("London");
  const [postcode, setPostcode] = useState("EC1A 1BB");
  const [country, setCountry] = useState("United Kingdom");
  const [about, setAbout] = useState(
    "Apex Healthcare Supplies is a verified supplier of certified hospital beds, mobility aids, PPE, and specialist diagnostics to care homes and NHS providers across the UK."
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Store profile updated successfully");
  };

  return (
    <div className="p-6 space-y-6 max-w-4xl">
      <div>
        <h2 className="text-xl font-bold text-[#2A6592]">Store Profile</h2>
        <p className="text-sm text-gray-500">Manage your public supplier store front, contact info, and branding</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card className="border-gray-100 shadow-sm bg-white">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Store className="h-5 w-5 text-[#2A6592]" />
              <CardTitle className="text-base font-semibold text-gray-800">Store Branding</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-xs font-semibold text-gray-700">Store Name</Label>
                <Input
                  value={storeName}
                  onChange={(e) => setStoreName(e.target.value)}
                  required
                  className="h-10"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-semibold text-gray-700">Tagline / Slogan</Label>
                <Input
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  className="h-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-semibold text-gray-700">About Store / Business Bio</Label>
              <Textarea
                rows={4}
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                className="resize-none"
              />
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-100 shadow-sm bg-white">
          <CardHeader>
            <CardTitle className="text-base font-semibold text-gray-800">Contact & Address</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-xs font-semibold text-gray-700">Business Email</Label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-10"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-semibold text-gray-700">Phone Number</Label>
                <Input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  className="h-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-semibold text-gray-700">Street Address</Label>
              <Input
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="h-10"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label className="text-xs font-semibold text-gray-700">City</Label>
                <Input value={city} onChange={(e) => setCity(e.target.value)} className="h-10" />
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-semibold text-gray-700">Postcode / ZIP</Label>
                <Input
                  value={postcode}
                  onChange={(e) => setPostcode(e.target.value)}
                  className="h-10"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-semibold text-gray-700">Country</Label>
                <Input
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="h-10"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Button type="submit" className="bg-[#2A6592] hover:bg-[#204e71] text-white flex items-center gap-2">
          <Check className="h-4 w-4" />
          Save Changes
        </Button>
      </form>
    </div>
  );
}

export default StoreProfilePage;
