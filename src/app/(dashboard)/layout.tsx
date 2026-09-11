"use client";

import React from "react";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Sidebar from "../components/Sidebar";
import HeaderSearch from "../components/HeaderSearch";
import { Menu } from "lucide-react";
import { FontProvider } from "@/context/FontContext";

// Function: DashboardLayout
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // Check if we are on the settings page
  const isSettingsPage = pathname?.includes("/settings");
  const isChoosePlan = pathname?.includes("/settings/choose-plan");

  useEffect(() => {
    // Only redirect if loading is completely finished
    if (!loading && !user && (!isSettingsPage || isChoosePlan)) {
      router.push("/");
    }
  }, [user, loading, router, isSettingsPage, isChoosePlan]);

  // If no user and not on settings, render nothing while redirecting
  if (!user && !isSettingsPage) {
    return null;
  }

  return (
    <FontProvider>
      <div className="flex min-h-screen flex-col bg-white md:flex-row">
        {/* Sidebar Drawer */}
        <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

        <main className="min-w-0 flex-1 overflow-y-auto bg-white">
          {/* --- Mobile Top Header Row --- */}
          <div className="flex items-center gap-4 border-b border-gray-200 px-4 py-3 md:hidden">
            <div className="flex-1">
              <HeaderSearch />
            </div>
            <button
              onClick={() => setIsOpen(true)}
              className="flex-shrink-0 rounded-lg p-2 text-gray-700 hover:bg-gray-100 focus:outline-none"
              aria-label="Open Menu"
            >
              <Menu size={24} />
            </button>
          </div>

          {/* --- Desktop Search Header --- */}
          <div className="hidden md:block">
            <HeaderSearch />
          </div>

          {children}
        </main>
      </div>
    </FontProvider>
  );
}
