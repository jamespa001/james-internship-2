"use client";

// React Related
import React, { createContext, useContext, useState, useEffect } from "react";

// Firebase Related
import { User, onAuthStateChanged } from "firebase/auth";

// Auth Related
import {
  auth,
  loginWithEmail,
  registerWithEmail,
  loginAsGuest,
  logoutUser,
} from "@/lib/auth";
import { AuthContextType, UserProfile } from "@/types";
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Function: AuthProvider
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"login" | "register">("login");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        // Map raw Firebase user to your UserProfile shape
        const userProfile: UserProfile = {
          uid: firebaseUser.uid,
          email:
            firebaseUser.email || `guest_${firebaseUser.uid}@summarist.com`,
          isAnonymous: firebaseUser.isAnonymous,
          isSubscribed: firebaseUser.isAnonymous
            ? false
            : ((firebaseUser as any).isSubscribed ?? false),
          // Guests default to "basic", others fall back to null
          subscription: firebaseUser.isAnonymous
            ? "basic"
            : ((firebaseUser as any).subscription ?? null),
        };
        setUser(userProfile);
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Modals Related
  const openModal = (mode: "login" | "register") => {
    setModalMode(mode);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Login Related
  const login = async (email: string, pass: string) => {
    const res = await loginWithEmail(email, pass);

    if (!res?.error && res.user) {
      // If your loginWithEmail wrapper returns extra data or you fetch it:
      // Fall back safely or read from the correct source
      const subscriptionTier = (res.user as any).subscription || "basic";

      const userData = {
        email: res.user.email || email,
        isSubscribed:
          subscriptionTier === "premium" || subscriptionTier === "premium-plus",
        subscription: subscriptionTier,
      };

      localStorage.setItem("summarist_user", JSON.stringify(userData));
      closeModal();
    }
    return { error: res.error };
  };

  // Register
  const register = async (email: string, pass: string) => {
    const res = await registerWithEmail(email, pass);
    if (!res.error) {
      // New users start on basic/unsubscribed by default
      const userData = {
        email: res.user?.email || email,
        isSubscribed: false,
        subscription: "basic",
      };
      localStorage.setItem("summarist_user", JSON.stringify(userData));
      closeModal();
    }
    return { error: res.error };
  };

  // Guest Login
  const guestLogin = async () => {
    localStorage.removeItem("summarist_user");
    localStorage.removeItem("myLibraryBooks");
    localStorage.removeItem("finishedBooks");

    const res = await loginAsGuest();
    if (!res.error && res.user) {
      // Use the unique UID so no two guests ever share the same identity
      const userData = {
        email: `guest_${res.user.uid}@summarist.com`,
        isSubscribed: false,
        subscription: "basic",
      };
      localStorage.setItem("summarist_user", JSON.stringify(userData));
      closeModal();
    }
    return { error: res.error };
  };

  // Logout
  const logout = async () => {
    await logoutUser();

    // Clear user-specific data from localStorage
    localStorage.removeItem("summarist_user");
    localStorage.removeItem("myLibraryBooks");
    localStorage.removeItem("finishedBooks");

    localStorage.removeItem("user");
    localStorage.removeItem("isAuthenticated");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isModalOpen,
        modalMode,
        openModal,
        closeModal,
        login,
        register,
        guestLogin,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Function: useAuth
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
