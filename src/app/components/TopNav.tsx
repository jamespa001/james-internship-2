"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

// Function: TopNav
export default function TopNav() {
  const [isOpen, setIsOpen] = useState(false);
  const { openModal } = useAuth();

  return (
    <>
      {/* Desktop Links */}
      <nav className="hidden items-center gap-6 md:flex">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            openModal("login");
          }}
          className="cursor-pointer text-[#032b41] hover:text-[#2bd97c]"
        >
          Login
        </a>
        <a href="#" className="cursor-not-allowed text-[#032b41]">
          About
        </a>
        <a href="#" className="cursor-not-allowed text-[#032b41]">
          Contact
        </a>
        <a href="#" className="cursor-not-allowed text-[#032b41]">
          Help
        </a>
      </nav>

      {/* Mobile Hamburger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="rounded-md p-2 text-[#032b41] focus:outline-none md:hidden"
        aria-label="Toggle Menu"
      >
        <span className="text-2xl">{isOpen ? "✕" : "☰"}</span>
      </button>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <nav className="absolute top-16 right-0 left-0 z-50 flex flex-col gap-4 border-b bg-white p-6 shadow-lg md:hidden">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setIsOpen(false);
              openModal("login");
            }}
            className="cursor-pointer text-[#032b41] hover:text-[#2bd97c]"
          >
            Login
          </a>
          <a
            href="#"
            className="cursor-not-allowed text-[#032b41]"
            onClick={() => setIsOpen(false)}
          >
            About
          </a>
          <a
            href="#"
            className="cursor-not-allowed text-[#032b41]"
            onClick={() => setIsOpen(false)}
          >
            Contact
          </a>
          <a
            href="#"
            className="cursor-not-allowed text-[#032b41]"
            onClick={() => setIsOpen(false)}
          >
            Help
          </a>
        </nav>
      )}
    </>
  );
}
