"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

export function AdminSettings() {
  const [platformName, setPlatformName] = useState("Product & Supplier Platform");
  const [supportEmail, setSupportEmail] = useState("support@healthcareportal.com");
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [allowRegistration, setAllowRegistration] = useState(true);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Settings saved successfully");
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-xl font-bold text-[#2A6592]">Platform Settings</h2>
        <p className="text-sm text-gray-500">Configure global application and system parameters</p>
      </div>

      <form onSubmit={handleSave} className="space-y-6 max-w-3xl">
        <Card className="border-gray-100 shadow-sm bg-white">
          <CardHeader>
            <CardTitle className="text-base font-semibold text-gray-800">General Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="platformName" className="text-xs font-semibold text-gray-700">
                Platform Name
              </Label>
              <Input
                id="platformName"
                value={platformName}
                onChange={(e) => setPlatformName(e.target.value)}
                className="h-10 border-gray-200"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="supportEmail" className="text-xs font-semibold text-gray-700">
                Support Email
              </Label>
              <Input
                id="supportEmail"
                type="email"
                value={supportEmail}
                onChange={(e) => setSupportEmail(e.target.value)}
                className="h-10 border-gray-200"
              />
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-100 shadow-sm bg-white">
          <CardHeader>
            <CardTitle className="text-base font-semibold text-gray-800">System Preferences</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between py-2 border-b border-gray-50">
              <div>
                <p className="text-sm font-medium text-gray-800">Allow New Registrations</p>
                <p className="text-xs text-gray-500">Allow new suppliers and service providers to register</p>
              </div>
              <Switch checked={allowRegistration} onCheckedChange={setAllowRegistration} />
            </div>

            <div className="flex items-center justify-between py-2">
              <div>
                <p className="text-sm font-medium text-gray-800">Maintenance Mode</p>
                <p className="text-xs text-gray-500">Temporarily restrict access for scheduled maintenance</p>
              </div>
              <Switch checked={maintenanceMode} onCheckedChange={setMaintenanceMode} />
            </div>
          </CardContent>
        </Card>

        <Button type="submit" className="bg-[#2A6592] hover:bg-[#204e71] text-white">
          Save Settings
        </Button>
      </form>
    </div>
  );
}

export default AdminSettings;
