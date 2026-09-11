"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Sparkles } from "lucide-react";

import { collection, addDoc, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { getAuth } from "firebase/auth";

// Function: ChoosePlanPage
export default function ChoosePlanPage() {
  const auth = getAuth();
  const router = useRouter();
  const [currentPlan, setCurrentPlan] = useState<
    "basic" | "premium" | "premium-plus"
  >("basic");

  // Loading and selection states
  const [loading, setLoading] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  // Load the user's subscription from local storage on mount
  useEffect(() => {
    // Reset loading state immediately on mount/return
    setLoading(false);
    setSelectedPlan(null);

    const existingUser = JSON.parse(
      localStorage.getItem("summarist_user") || "{}",
    );
    if (existingUser.subscription) {
      setCurrentPlan(existingUser.subscription);
    }

    // Reset loading state when the user comes back to this tab/page from Stripe
    const handleVisibilityOrFocus = () => {
      if (document.visibilityState === "visible") {
        setLoading(false);
        setSelectedPlan(null);
      }
    };

    window.addEventListener("focus", handleVisibilityOrFocus);
    document.addEventListener("visibilitychange", handleVisibilityOrFocus);

    return () => {
      window.removeEventListener("focus", handleVisibilityOrFocus);
      document.removeEventListener("visibilitychange", handleVisibilityOrFocus);
    };
  }, []);

  const handleSelectPlan = async (
    plan: "premium" | "premium-plus",
    isFreeTrial: boolean = false,
  ) => {
    const user = auth.currentUser;
    if (!user) {
      alert("Please log in to upgrade your plan.");
      return;
    }

    // Map subscription plans to Stripe Price IDs
    let priceId = "";
    if (plan === "premium") {
      priceId = "price_1UE86hCP3BXgp01iRGrV7Ldg";
    } else if (plan === "premium-plus") {
      priceId = "price_1UE8CPCP3BXgp01iJxi3ujwz";
    }

    if (!priceId) return;

    try {
      setLoading(true);
      setSelectedPlan(isFreeTrial ? `${plan}-trial` : `${plan}-direct`);

      // Reference the checkout_sessions subcollection for the logged-in user
      const checkoutSessionsRef = collection(
        db,
        `customers/${user.uid}/checkout_sessions`,
      );

      // Build the session payload required by the Firebase Stripe Extension
      const sessionPayload: any = {
        price: priceId,
        success_url: window.location.origin + "/settings?success=true",
        cancel_url: window.location.origin + "/settings?canceled=true",
      };

      // If it's the free trial button, pass the trial period dynamically
      if (isFreeTrial) {
        sessionPayload.subscription_data = {
          trial_period_days: 7,
        };
      }

      // Add the document to Firestore to trigger the Stripe extension
      const docRef = await addDoc(checkoutSessionsRef, sessionPayload);

      // Listen for the extension to write the Stripe Checkout URL back to the document
      onSnapshot(docRef, (snap) => {
        const data = snap.data();
        if (data?.url) {
          // Redirect the user straight to Stripe's hosted sandbox checkout page
          window.location.assign(data.url);
        }
        if (data?.error) {
          console.error(`Stripe Error: ${data.error.message}`);
          alert(`Checkout error: ${data.error.message}`);
          setLoading(false);
          setSelectedPlan(null);
        }
      });
    } catch (error) {
      console.error("Failed to create checkout session:", error);
      setLoading(false);
      setSelectedPlan(null);
    }
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      {/* Header Section */}
      <div className="mb-20 rounded-2xl bg-[#03314b] px-4 py-16 text-center text-white">
        <div className="mx-auto max-w-3xl">
          <span className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-[#2bd9d0]/20 px-3 py-1 text-xs font-semibold tracking-wider text-[#2bd9d0] uppercase">
            <Sparkles className="h-3.5 w-3.5" /> Subscription Tiers
          </span>
          <h1 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Get unlimited access to many growing book summaries
          </h1>
          <p className="text-base text-gray-300 sm:text-lg">
            Turn dense knowledge into bite-sized insights you can read or listen
            to in minutes.
          </p>
        </div>
      </div>

      <div className="mb-12 text-center">
        <h1 className="text-3xl font-bold text-[#03314b]">
          Choose the right plan for you
        </h1>
        <p className="mt-2 text-gray-600">
          Upgrade to unlock full access to all Summarist features
        </p>
      </div>

      {/* Pricing Grid */}
      <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-3">
        {/* Tier 1: Basic Plan */}
        <div className="flex flex-col rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
          <h3 className="text-xl font-bold text-[#03314b]">Basic</h3>
          <p className="mt-1 text-sm text-gray-500">
            Get started with essential features.
          </p>
          <div className="my-6">
            <span className="text-4xl font-extrabold text-[#03314b]">$0</span>
            <span className="text-gray-500"> / month</span>
          </div>
          <ul className="mb-8 flex-1 space-y-4 text-sm text-gray-600">
            <li className="flex items-center gap-2">
              ✓ Limited daily book summaries
            </li>
            <li className="flex items-center gap-2">
              ✓ Standard audio playback
            </li>
          </ul>
          <button
            disabled={
              loading ||
              currentPlan === "basic" ||
              currentPlan === "premium" ||
              currentPlan === "premium-plus"
            }
            className="w-full rounded-[8px] border border-[#03314b] px-4 py-3 font-semibold text-[#03314b] hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {currentPlan === "basic"
              ? "Current Plan"
              : "Included / Unavailable"}
          </button>
        </div>

        {/* Tier 2: Standard Premium Plan */}
        <div className="flex flex-col rounded-2xl border border-blue-400 bg-white p-8 shadow-md">
          <h3 className="text-xl font-bold text-[#03314b]">Premium</h3>
          <p className="mt-1 text-sm text-gray-500">For the best experience.</p>
          <div className="my-6">
            <span className="text-4xl font-extrabold text-[#03314b]">
              $9.99
            </span>
            <span className="text-gray-500"> / month</span>
          </div>
          <ul className="mb-8 flex-1 space-y-4 text-sm text-gray-600">
            <li className="flex items-center gap-2">
              ✓ Unlimited book summaries
            </li>
            <li className="flex items-center gap-2">
              ✓ Audio narration access
            </li>
            <li className="flex items-center gap-2">✓ Billed monthly</li>
          </ul>
          <button
            onClick={() => handleSelectPlan("premium", false)}
            disabled={
              loading ||
              currentPlan === "premium" ||
              currentPlan === "premium-plus"
            }
            className="flex w-full items-center justify-center gap-2 rounded-[8px] border border-[#03314b] bg-white px-4 py-3 font-semibold text-[#03314b] transition-colors hover:bg-[#2bd9d0]/10 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading && selectedPlan === "premium-direct" ? (
              <>
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-[#03314b] border-t-transparent" />
                <span>Redirecting...</span>
              </>
            ) : currentPlan === "premium" ? (
              "Current Plan"
            ) : currentPlan === "premium-plus" ? (
              "Unavailable (Top Tier Reached)"
            ) : (
              "Upgrade to Premium"
            )}
          </button>
        </div>

        {/* Tier 3: Premium Plus Plan (Recommended) */}
        <div className="relative flex flex-col rounded-2xl border-2 border-[#2bd9d0] bg-white p-8 shadow-xl lg:-translate-y-2">
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-[#2bd9d0] px-4 py-1 text-xs font-bold tracking-wider text-[#03314b] uppercase shadow">
            Recommended
          </div>

          <h3 className="mt-2 text-xl font-bold text-[#03314b]">
            Premium Plus
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            For the best experience with{" "}
            <span className="font-semibold">BIG</span> savings.
          </p>
          <div className="my-6">
            <span className="text-4xl font-extrabold text-[#03314b]">
              $79.99
            </span>
            <span className="text-gray-500"> / year</span>
          </div>
          <ul className="mb-8 flex-1 space-y-4 text-sm text-gray-700">
            <li className="flex items-center gap-2">
              ✓ Unlimited book summaries
            </li>
            <li className="flex items-center gap-2">
              ✓ High-quality audio narration
            </li>
            <li className="flex items-center gap-2">
              ✓ Offline mode & downloads
            </li>
            <li className="flex items-center gap-2">
              ✓ Send to Kindle support
            </li>
          </ul>

          {/* 7-Day Trial Button */}
          <button
            onClick={() => handleSelectPlan("premium-plus", true)}
            disabled={loading || currentPlan === "premium-plus"}
            className="mb-4 flex w-full items-center justify-center gap-2 rounded-[8px] bg-[#2bd9d0] px-4 py-3 font-semibold text-white shadow-md hover:bg-[#03314b]/90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading && selectedPlan === "premium-plus-trial" ? (
              <>
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                <span>Redirecting...</span>
              </>
            ) : currentPlan === "premium-plus" ? (
              "Current Plan"
            ) : (
              "7 Day Free Trial"
            )}
          </button>

          {/* Direct Upgrade Button */}
          <button
            onClick={() => handleSelectPlan("premium-plus", false)}
            disabled={loading || currentPlan === "premium-plus"}
            className="flex w-full items-center justify-center gap-2 rounded-[8px] bg-[#03314b] px-4 py-3 font-semibold text-white shadow-md hover:bg-[#03314b]/90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading && selectedPlan === "premium-plus-direct" ? (
              <>
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                <span>Redirecting...</span>
              </>
            ) : currentPlan === "premium-plus" ? (
              "Current Plan"
            ) : (
              "Upgrade to Premium Plus"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
