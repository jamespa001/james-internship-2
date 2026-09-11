import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  signInAnonymously,
} from "firebase/auth";

import { app } from "./firebase";

export const auth = getAuth(app);

// Login Error Messages
export function getFriendlyAuthError(errorCode: string): string {
  switch (errorCode) {
    case "auth/invalid-email":
      return "Invalid email";
    case "auth/email-already-in-use":
      return "Email already in use";
    case "auth/weak-password":
      return "Short password";
    case "auth/user-not-found":
    case "auth/wrong-password":
    case "auth/invalid-credential":
      return "User not found";
    default:
      return "An authentication error occurred. Please try again.";
  }
}

// Register with Email
export async function registerWithEmail(email: string, pass: string) {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      pass,
    );
    return { user: userCredential.user, error: null };
  } catch (error: any) {
    return { user: null, error: getFriendlyAuthError(error.code) };
  }
}

// Login as Guest
export async function loginAsGuest() {
  try {
    const userCredential = await signInAnonymously(auth);
    return { user: userCredential.user, error: null };
  } catch (err: any) {
    return {
      user: null,
      error:
        err.message || "An authentication error occurred. Please try again.",
    };
  }
}

// Login with Email
export async function loginWithEmail(email: string, pass: string) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, pass);
    return { user: userCredential.user, error: null };
  } catch (error: any) {
    return { user: null, error: getFriendlyAuthError(error.code) };
  }
}

// Google Login
const googleProvider = new GoogleAuthProvider();
export async function loginWithGoogle() {
  try {
    const userCredential = await signInWithPopup(auth, googleProvider);
    return { user: userCredential.user, error: null };
  } catch (error: any) {
    return { user: null, error: getFriendlyAuthError(error.code) };
  }
}

// Logout User
export async function logoutUser() {
  try {
    await signOut(auth);
    return { error: null };
  } catch (error: any) {
    return { error: error.message };
  }
}
