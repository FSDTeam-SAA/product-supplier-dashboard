"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutGrid,
  FolderOpen,
  Package,
  History,
  FileText,
  Store,
  ShieldCheck,
  LogOut,
  User,
  Briefcase,
  MessageSquare,
  Settings,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import Image from "next/image";

const supplierNavigation = [
  { name: "Overview", href: "/supplier", icon: LayoutGrid },
  { name: "Categories", href: "/supplier/categories", icon: FolderOpen },
  { name: "Products", href: "/supplier/products", icon: Package },
  { name: "Orders", href: "/supplier/orders", icon: History },
  { name: "Payments", href: "/supplier/payments", icon: FileText },
  { name: "Store Profile", href: "/supplier/store-profile", icon: Store },
  { name: "Security", href: "/supplier/security", icon: ShieldCheck },
];

const serviceNavigation = [
  { name: "Dashboard Overview", href: "/servicedashboard-overview", icon: LayoutGrid },
  { name: "My Profile", href: "/service/my-profile", icon: User },
  { name: "My Services", href: "/service/my-services", icon: Briefcase },
  { name: "Enquiries", href: "/service/enquiries", icon: MessageSquare },
  { name: "Settings", href: "/service/settings", icon: Settings },
];

export function DashboardSidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isSupplier = pathname.startsWith("/supplier");
  const navigation = isSupplier ? supplierNavigation : serviceNavigation;

  const handleLogout = () => {
    setOpen(false);
    signOut({ callbackUrl: "/" });
  };

  return (
    <aside className="flex flex-col w-[260px] bg-[#EEF2F6] border-r border-gray-200 h-screen relative">
      {/* Logo / Title */}
      <div className="pt-8 pb-6 flex justify-center">
        <Image
          src="/logo.png"
          alt="Logo"
          width={80}
          height={80}
          className="h-16 w-auto"
        />
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-4 space-y-2 overflow-y-auto">
        {navigation.map((item) => {
          const isActive = pathname.startsWith(item.href);

          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all",
                isActive
                  ? "bg-[#2A6592] text-white shadow-sm"
                  : "text-[#5C7184] hover:bg-[#E3E9EF] hover:text-[#2A6592]"
              )}
            >
              <item.icon
                className={cn(
                  "h-5 w-5",
                  isActive ? "text-white" : "text-[#5C7184]"
                )}
              />
              {item.name}
            </Link>
          );
        })}
        
        {/* If it's the Service sidebar, Logout is just part of the list at the bottom */}
        {!isSupplier && (
          <button
            onClick={() => setOpen(true)}
            className="flex items-center gap-3 w-full px-4 py-3 mt-4 rounded-lg text-sm font-medium text-[#2A6592] hover:bg-[#E3E9EF] transition-all"
          >
            <LogOut className="h-5 w-5" />
            Log Out
          </button>
        )}
      </nav>

      {/* Logout for Supplier sidebar (at the very bottom edge with gray background) */}
      {isSupplier && (
        <div className="bg-[#E5E9ED] mt-auto">
          <button
            onClick={() => setOpen(true)}
            className="flex items-center gap-3 w-full px-6 py-4 text-sm font-medium text-[#F05252] hover:bg-[#D8DDE3] transition-colors"
          >
            <LogOut className="h-5 w-5" />
            Log Out
          </button>
        </div>
      )}

      {/* Logout Confirmation Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Confirm Logout</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-gray-500">
            Are you sure you want to log out? You will need to log in again to access your dashboard.
          </p>
          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleLogout}>
              Logout
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </aside>
  );
}
