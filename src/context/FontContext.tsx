"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { FontContextType } from "@/types";

const FontContext = createContext<FontContextType | undefined>(undefined);

// Function: FontProvider
export function FontProvider({ children }: { children: ReactNode }) {
  const [fontSize, setFontSize] = useState("text-[16px]");

  return (
    <FontContext.Provider value={{ fontSize, setFontSize }}>
      {children}
    </FontContext.Provider>
  );
}

// Function: useFont
export function useFont() {
  const context = useContext(FontContext);
  if (!context) {
    throw new Error("useFont must be used within a FontProvider");
  }
  return context;
}
