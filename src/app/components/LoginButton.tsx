"use client";

// AuthContext Related
import { useAuth } from "@/context/AuthContext";

// Function: LoginButton
export default function LoginButton() {
  const { openModal } = useAuth();

  return (
    <button
      onClick={() => openModal("login")}
      className="mt-8 flex h-10 w-full max-w-[300px] cursor-pointer items-center justify-center rounded bg-[#2bd97c] text-base text-[#032b41] transition-colors duration-200 hover:bg-[#20ba68]"
    >
      Login
    </button>
  );
}
