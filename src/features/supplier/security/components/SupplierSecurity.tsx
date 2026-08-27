"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Shield, Key, Smartphone, Laptop } from "lucide-react";
import { toast } from "sonner";

export function SupplierSecurity() {
  const [twoFactor, setTwoFactor] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }
    toast.success("Password changed successfully");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="p-6 space-y-6 max-w-4xl">
      <div>
        <h2 className="text-xl font-bold text-[#2A6592]">Account Security</h2>
        <p className="text-sm text-gray-500">Manage your credentials, 2-Factor authentication, and active sessions</p>
      </div>

      <Card className="border-gray-100 shadow-sm bg-white">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Key className="h-5 w-5 text-[#2A6592]" />
            <CardTitle className="text-base font-semibold text-gray-800">Change Password</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handlePasswordChange} className="space-y-4 max-w-md">
            <div className="space-y-2">
              <Label className="text-xs font-semibold text-gray-700">Current Password</Label>
              <Input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
                className="h-10"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-semibold text-gray-700">New Password</Label>
              <Input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                className="h-10"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-semibold text-gray-700">Confirm New Password</Label>
              <Input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="h-10"
              />
            </div>
            <Button type="submit" className="bg-[#2A6592] hover:bg-[#204e71] text-white">
              Update Password
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card className="border-gray-100 shadow-sm bg-white">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-emerald-600" />
            <CardTitle className="text-base font-semibold text-gray-800">Two-Factor Authentication (2FA)</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-800">Require 2FA verification on login</p>
              <p className="text-xs text-gray-500">Adds an extra layer of security using an authenticator app</p>
            </div>
            <Switch checked={twoFactor} onCheckedChange={setTwoFactor} />
          </div>
        </CardContent>
      </Card>

      <Card className="border-gray-100 shadow-sm bg-white">
        <CardHeader>
          <CardTitle className="text-base font-semibold text-gray-800">Active Devices & Sessions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100">
            <div className="flex items-center gap-3">
              <Laptop className="h-5 w-5 text-[#2A6592]" />
              <div>
                <p className="text-sm font-medium text-gray-800">Windows PC — Chrome Browser</p>
                <p className="text-xs text-gray-500">Current Session • London, UK</p>
              </div>
            </div>
            <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200" variant="outline">
              Active Now
            </Badge>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100">
            <div className="flex items-center gap-3">
              <Smartphone className="h-5 w-5 text-gray-500" />
              <div>
                <p className="text-sm font-medium text-gray-800">iPhone 15 — Safari</p>
                <p className="text-xs text-gray-500">Last active 2 hours ago • London, UK</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700 text-xs">
              Revoke
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default SupplierSecurity;
