"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { User, CheckCircle2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

// Firebase Related
import { collection, onSnapshot } from "firebase/firestore";
import { getFunctions, httpsCallable } from "firebase/functions";
import { db } from "@/lib/firebase";

// Skeleton Related
import { SettingsSkeleton } from "@/app/components/skeletons/SettingsSkeleton";

// CSR Related
import LoginButton from "@/app/components/LoginButton";

// Function: SettingsPage
export default function SettingsPage() {
  const [loading, setLoading] = useState(true);
  const { user, openModal, loading: authLoading } = useAuth();
  const [subscriptionPlan, setSubscriptionPlan] = useState<
    "basic" | "premium" | "premium-plus"
  >("basic");
  const [portalLoading, setPortalLoading] = useState(false);

  // Reset portal loading state when returning to the tab/page from Stripe
  useEffect(() => {
    const handleReset = () => {
      setPortalLoading(false);
    };

    window.addEventListener("focus", handleReset);
    window.addEventListener("pageshow", handleReset);

    return () => {
      window.removeEventListener("focus", handleReset);
      window.removeEventListener("pageshow", handleReset);
    };
  }, []);

  useEffect(() => {
    if (!user) {
      setSubscriptionPlan("basic");
      setLoading(false);
      return;
    }

    // Use onSnapshot for real-time updates from Firestore
    const subsRef = collection(db, `customers/${user.uid}/subscriptions`);

    const unsubscribe = onSnapshot(
      subsRef,
      (querySnapshot) => {
        let foundActivePlan = false;
        console.log("onSnapChat, docs count:", querySnapshot.docs.length);

        querySnapshot.forEach((doc) => {
          const subscriptionData = doc.data();
          const status = subscriptionData.status;
          console.log(
            "status:",
            status,
            "price:",
            subscriptionData.items?.[0]?.price?.id,
          );

          if (status === "active" || status === "trialing") {
            foundActivePlan = true;
            const priceId =
              subscriptionData.items?.[0]?.price?.id || subscriptionData.price;

            if (priceId === "price_1UE86hCP3BXgp01iRGrV7Ldg") {
              setSubscriptionPlan("premium");
            } else if (priceId === "price_1UE8CPCP3BXgp01iJxi3ujwz") {
              setSubscriptionPlan("premium-plus");
            } else {
              setSubscriptionPlan("premium");
            }
          }
        });

        if (!foundActivePlan) {
          setSubscriptionPlan("basic");
        }
        setLoading(false);
      },
      (error) => {
        console.error("Failed to listen to subscription updates:", error);
        setSubscriptionPlan("basic");
        setLoading(false);
      },
    );

    // Cleanup listener on unmount
    return () => unsubscribe();
  }, [user]);

  // Wait for AuthContext to finish
  if (authLoading) {
    return <SettingsSkeleton />;
  }

  // Function to open the Stripe Customer Portal
  const handleManageSubscription = async () => {
    if (!user) return;
    try {
      setPortalLoading(true);

      // Use us-central1 as outlined in the extension documentation
      const functions = getFunctions(db.app, "us-central1");
      const createPortalLink = httpsCallable(
        functions,
        "ext-firestore-stripe-payments-createPortalLink",
      );

      const { data } = (await createPortalLink({
        returnUrl: `${window.location.origin}/settings`,
        locale: "auto",
      })) as { data: { url: string } };

      if (data?.url) {
        window.location.assign(data.url);
      } else {
        throw new Error("No portal URL returned from Stripe extension.");
      }
    } catch (error: any) {
      console.error("Failed to create portal session:", error);
      alert(`Error opening portal: ${error.message || error}`);
      setPortalLoading(false);
    }
  };

  // If user is not logged in, display login
  if (!user) {
    return (
      <div className="w-full">
        <div className="mx-auto max-w-[1070px] px-8 py-10">
          <h1 className="mb-6 text-3xl font-bold text-[#03314b]">Settings</h1>
          <hr className="mb-16 border-gray-200" />

          <div className="flex flex-col items-center justify-center text-center">
            <div className="mb-6 max-w-md">
              <img
                src="/assets/images/login.png"
                alt="Login required"
                className="mx-auto h-64 w-auto object-contain"
              />
            </div>
            <h2 className="mb-3 text-2xl font-bold text-[#03314b]">
              Log in to your account to see your details.
            </h2>
            <p className="mb-6 max-w-sm text-sm text-gray-500">
              You are currently logged out. Log in to view your subscription
              status, saved books, and account details.
            </p>
            <LoginButton />
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return <SettingsSkeleton />;
  }

  return (
    <div className="w-full">
      <div className="mx-auto max-w-[800px] px-8 py-10">
        <h1 className="mb-8 text-3xl font-bold text-[#03314b]">Settings</h1>

        <div className="space-y-6">
          {/* Subscription Section */}
          <div className="rounded-[12px] border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="mb-2 text-lg font-bold text-[#03314b]">
              Your Subscription Plan
            </h3>
            <div className="flex flex-col justify-between gap-4 border-b border-gray-100 py-4 sm:flex-row sm:items-center">
              <div>
                <div className="mb-2 flex items-center gap-2">
                  {subscriptionPlan === "basic" && (
                    <span className="rounded-full bg-gray-100 px-3 py-1 text-sm font-semibold text-gray-600">
                      Basic Plan (Free)
                    </span>
                  )}

                  {subscriptionPlan === "premium" && (
                    <span className="rounded-full bg-[#2bd9d0]/20 px-3 py-1 text-sm font-semibold text-[#03314b]">
                      Premium Plan
                    </span>
                  )}

                  {subscriptionPlan === "premium-plus" && (
                    <span className="rounded-full bg-[#03314b] px-3 py-1 text-sm font-semibold text-[#2bd9d0] shadow-sm">
                      ⭐ Premium-Plus Plan
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-500">
                  {subscriptionPlan === "basic"
                    ? "Upgrade to unlock all books, audio summaries, and offline access."
                    : "You have full access to all audio summaries and features."}
                </p>
              </div>

              {subscriptionPlan === "basic" && (
                <Link
                  href="/settings/choose-plan"
                  className="flex items-center justify-center gap-2 rounded-lg bg-[#2bd97c] px-4 py-2.5 text-sm font-bold whitespace-nowrap text-[#03314b] transition-opacity hover:bg-[#20ba68] hover:opacity-95"
                >
                  Choose a Plan
                </Link>
              )}

              {user && subscriptionPlan !== "basic" && (
                <button
                  onClick={handleManageSubscription}
                  disabled={portalLoading}
                  className="flex items-center justify-center gap-2 rounded-lg bg-[#03314b] px-4 py-2.5 text-sm font-bold whitespace-nowrap text-white transition-opacity hover:bg-[#03314b]/90 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {portalLoading ? (
                    <>
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      <span>Opening Portal...</span>
                    </>
                  ) : (
                    "Manage Subscription"
                  )}
                </button>
              )}
            </div>
            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <CheckCircle2 className="h-4 w-4 text-[#2bd9d0]" />
                <span>
                  {subscriptionPlan === "basic"
                    ? "Standard Library Access"
                    : "Active Subscription (Managed via Stripe)"}
                </span>
              </div>
            </div>
          </div>

          {/* User Email Section */}
          <div className="rounded-[12px] border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-lg font-bold text-[#03314b]">
              Account Details
            </h3>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#f1f6f4] text-[#03314b]">
                  <User className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-xs font-medium tracking-wider text-gray-500 uppercase">
                    Email Address
                  </p>
                  <p className="text-base font-semibold text-gray-800">
                    {user?.isAnonymous
                      ? "Anonymous User"
                      : user?.email || "No email available"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
