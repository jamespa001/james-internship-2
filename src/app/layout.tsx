// Metadata Related
import type { Metadata } from "next";

// Styles Related
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// Auth Related
import { AuthProvider } from "@/context/AuthContext";
import AuthModal from "./components/AuthModal";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Summarist",
  description: "Gain more knowledge in less time",
};

// Function: RootLayout
export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <AuthProvider>
          <AuthModal />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
