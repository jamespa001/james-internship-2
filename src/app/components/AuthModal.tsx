"use client";

import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { RxCross2 } from "react-icons/rx";
import { FaUser } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { loginWithGoogle } from "@/lib/auth";
import { AuthModalProps } from "@/types";

// Function: AuthModal
export default function AuthModal({ onClose }: AuthModalProps) {
  const {
    isModalOpen,
    modalMode,
    closeModal,
    openModal,
    login,
    register,
    guestLogin,
  } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (!isModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    let res;
    if (modalMode === "login") {
      res = await login(email, password);
    } else {
      res = await register(email, password);
    }

    setLoading(false);

    if (res?.error) {
      setError(res?.error);
    } else {
      closeModal();
      router.push("/for-you");
    }
  };

  const handleGuestLogin = async () => {
    setError(null);
    setLoading(true);
    const res = await guestLogin();
    setLoading(false);

    if (res?.error) {
      setError(res?.error);
    } else {
      closeModal();
      router.push("/for-you");
    }
  };

  // Handle Google Login
  const handleGoogleClick = async () => {
    setLoading(true);
    setError(null);

    // Assuming loginWithGoogle returns an object with { error }
    const { error: authError } = await loginWithGoogle();

    setLoading(false);
    if (authError) {
      setError(authError);
    } else {
      closeModal();
      router.push("/for-you");
    }
  };

  // Use onClose if passed, otherwise fall back to context's closeModal
  const handleClose = onClose || closeModal;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      {/* Added overflow-hidden so the rounded corners clip the footer strip correctly */}
      <div className="relative w-full max-w-[400px] overflow-hidden rounded-lg bg-white p-8 pb-16 shadow-2xl">
        {/* Close Button */}
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <RxCross2 size={24} />
        </button>
        {/* Title */}
        <h2 className="mb-6 text-center text-[20px] font-bold text-[#032b41]">
          {modalMode === "login"
            ? "Log in to Summarist"
            : "Sign up to Summarist"}
        </h2>
        {/* Error Message */}
        {error && (
          <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-500">
            {error}
          </div>
        )}
        {/* 1. Guest Login Button */}
        {modalMode === "login" && (
          <>
            <button
              onClick={handleGuestLogin}
              disabled={loading}
              className="relative mb-4 flex w-full items-center justify-center rounded-sm bg-[#3a579d] py-2 font-normal text-white transition hover:opacity-90 disabled:opacity-50"
            >
              <span className="absolute left-2 flex items-center">
                <FaUser size={24} />
              </span>
              <span>Login as a Guest</span>
            </button>

            <div className="relative my-4 flex items-center justify-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <span className="relative bg-white px-3 text-[14px] font-semibold text-[#394547]">
                or
              </span>
            </div>
          </>
        )}
        {/* 2. Google Button */}
        <button
          onClick={handleGoogleClick}
          disabled={loading}
          className="relative mb-4 flex w-full items-center justify-center rounded-sm bg-[#4285f4] py-2 font-normal text-white transition hover:opacity-90 disabled:opacity-50"
          style={{ backgroundColor: "#4285f4" }}
        >
          <span className="absolute left-0.5 flex h-9 w-9 items-center justify-center rounded bg-white">
            <FcGoogle size={20} />
          </span>
          <span>
            {modalMode === "login"
              ? "Login with Google"
              : "Sign up with Google"}
          </span>
        </button>
        <div className="relative my-4 flex items-center justify-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200" />
          </div>
          <span className="relative bg-white px-3 text-[14px] font-semibold text-[#394547]">
            or
          </span>
        </div>
        {/* 3. Email/Password Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="rounded-sm border-2 border-gray-300 p-2 outline-none placeholder:text-sm focus:border-[#2bd97c]"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="rounded-sm border-2 border-gray-300 p-2 outline-none placeholder:text-sm focus:border-[#2bd97c]"
          />
          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center rounded-sm bg-[#2bd97c] py-2 font-normal text-[#032b41] transition hover:opacity-90 disabled:opacity-50"
          >
            {loading
              ? "Loading..."
              : modalMode === "login"
                ? "Login"
                : "Sign up"}
          </button>
        </form>
        {/* Forgot password for login */}
        {modalMode === "login" && (
          <div className="mt-4 text-center">
            <button className="text-sm text-[#2b70c9] hover:underline">
              Forgot your password?
            </button>
          </div>
        )}
        {/* Mode Switcher Footer Strip - Now safely pinned inside the modal card */}
        <div className="absolute inset-x-0 bottom-0 bg-[#f1f6f4] py-4 text-sm text-gray-500">
          {modalMode === "login" ? (
            <div className="flex items-center justify-center gap-1.5">
              <span>Don't have an account?</span>
              <button
                onClick={() => {
                  setError(null);
                  openModal("register");
                }}
                className="font-bold text-[#2b70c9] hover:underline"
              >
                Sign up
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-center gap-1.5">
              <span>Already have an account?</span>
              <button
                onClick={() => {
                  setError(null);
                  openModal("login");
                }}
                className="font-bold text-[#2b70c9] hover:underline"
              >
                Log in
              </button>
            </div>
          )}
        </div>{" "}
      </div>
    </div>
  );
}
