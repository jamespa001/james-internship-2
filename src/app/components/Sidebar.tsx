"use client";

// Auth Related
import { useAuth } from "@/context/AuthContext";

// Navigation Related
import { useRouter } from "next/navigation";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Bookmark,
  PenTool,
  Search,
  Settings,
  HelpCircle,
  LogOut,
} from "lucide-react";

import { useFont } from "@/context/FontContext";
import { SidebarProps } from "@/types";

// Function: Sidebar
export default function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const pathname = usePathname();
  const { logout } = useAuth();
  const router = useRouter();
  const { fontSize, setFontSize } = useFont();

  // Check if we are currently on a book reader page
  const isPlayerPage = pathname.startsWith("/player/");

  const topNavItems = [
    { name: "For you", href: "/for-you", icon: Home, disabled: false },
    {
      name: "My Library",
      href: "/library",
      icon: Bookmark,
      disabled: false,
    },
    {
      name: "Highlights",
      href: "/highlights",
      icon: PenTool,
      disabled: true,
    },
    { name: "Search", href: "/for-you/search", icon: Search, disabled: true },
  ];

  const bottomNavItems = [
    {
      name: "Settings",
      href: "/settings",
      icon: Settings,
      disabled: false,
    },
    {
      name: "Help & Support",
      href: "/help",
      icon: HelpCircle,
      disabled: true,
    },
  ];

  const handleLogout = async () => {
    try {
      console.log("logging out");
      await logout();
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  // Font size options for the reader
  const fontSizes = [
    { name: "sm", label: "Aa", size: "16px", class: "text-[16px]" },
    { name: "base", label: "Aa", size: "18px", class: "text-[18px]" },
    { name: "lg", label: "Aa", size: "22px", class: "text-[22px]" },
    { name: "xl", label: "Aa", size: "26px", class: "text-[26px]" },
  ];

  return (
    <>
      {/* --- Dark Backdrop Overlay --- */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 transition-opacity md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* --- Sidebar Drawer --- */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex h-full w-72 flex-col bg-white p-1 shadow-xl transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:sticky md:top-0 md:h-screen md:translate-x-0 md:shadow-none ${
          isPlayerPage ? "md:pb-20" : ""
        }`}
      >
        {/* Logo Section */}
        <div className="mb-6 px-6 pt-4 pb-4">
          <figure className="w-40">
            <img
              className="h-auto w-full object-contain"
              src="/assets/images/logo.png"
              alt="Summarist Logo"
            />
          </figure>
        </div>

        {/* Top Navigation Links */}
        <nav className="flex flex-col gap-2">
          {topNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.name}
                href={item.disabled ? "#" : item.href}
                onClick={(e) => {
                  if (item.disabled) e.preventDefault();
                }}
                className={`relative flex items-center gap-4 px-6 py-4 text-base font-normal transition-colors ${
                  item.disabled
                    ? "cursor-not-allowed text-[#032b41]"
                    : "font-medium text-[#032b41] hover:bg-[#f0efef]"
                }`}
              >
                {isActive && !item.disabled && (
                  <span className="absolute top-0 bottom-0 left-0 w-1 bg-[#2bd9d0]" />
                )}
                <Icon className="h-6 w-6 stroke-[1.75]" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Conditionally Render Font Size Controls on Player Pages */}
        {isPlayerPage && (
          <div className="mt-6 px-6">
            <div className="flex items-center gap-4">
              {fontSizes.map((sizeOption) => {
                const isSelected = fontSize === sizeOption.class;
                return (
                  <button
                    key={sizeOption.name}
                    onClick={() => setFontSize(sizeOption.class)}
                    style={{ fontSize: sizeOption.size }}
                    className={`font-semibold transition-colors ${
                      isSelected
                        ? "border-b-2 border-[#2bd9d0] pb-0.5 text-[#2bd9d0]"
                        : "text-[#032b41] hover:text-[#2bd9d0]"
                    }`}
                  >
                    {sizeOption.label}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Bottom Navigation Links & Logout */}
        <div className="mt-auto flex flex-col gap-2 pb-4">
          {bottomNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.name}
                href={item.disabled ? "#" : item.href}
                onClick={(e) => {
                  if (item.disabled) e.preventDefault();
                }}
                className={`relative flex items-center gap-4 px-6 py-4 text-base font-normal transition-colors ${
                  item.disabled
                    ? "cursor-not-allowed font-medium opacity-50"
                    : "font-medium text-[#032b41] hover:bg-[#f0efef]"
                }`}
              >
                {isActive && !item.disabled && (
                  <span className="absolute top-0 bottom-0 left-0 w-1 bg-[#2bd9d0]" />
                )}
                <Icon className="h-6 w-6 stroke-[1.75]" />
                <span>{item.name}</span>
              </Link>
            );
          })}

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-4 px-6 py-4 text-left text-base font-normal text-[#032b41] transition-colors hover:bg-[#f0efef]"
          >
            <LogOut className="h-5 w-5 stroke-[1.75]" />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}
