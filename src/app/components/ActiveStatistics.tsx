"use client";

import { useState, useEffect } from "react";
import { ActiveStatisticsProps } from "@/types";

// Function: ActiveStatistics
export default function ActiveStatistics({
  items,
  intervalTime = 2000,
}: ActiveStatisticsProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  // Safeguard against empty or undefined items
  if (!items || items.length === 0) return null;

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % items.length);
    }, intervalTime);

    return () => clearInterval(interval);
  }, [items.length, intervalTime]);

  return (
    <>
      {items.map((item, index) => {
        const isActive = index === activeIndex;
        return (
          <div
            key={index}
            className={`text-[32px] font-medium transition-colors duration-300 ${
              isActive ? "text-[#2bd97c]" : "text-[#6b757b]"
            }`}
          >
            {item}
          </div>
        );
      })}
    </>
  );
}
