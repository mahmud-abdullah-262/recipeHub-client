"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Check, Power } from "@gravity-ui/icons";
import { Moon, Sun } from "lucide-react";

export function ToggolBtn() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // হাইড্রেশন এরর এড়াতে মাউন্ট হওয়া পর্যন্ত অপেক্ষা করুন
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // বর্তমান থিম ডার্ক কিনা তা চেক করা হচ্ছে
  const isDark = theme === "dark";

  return (
    <button
      aria-label="Toggle Theme"
      className={`relative inline-flex items-center h-[31px] w-[51px] rounded-full p-1 transition-colors ${
        isDark ? "bg-primary shadow-[0_0_12px_rgba(6,182,212,0.5)]" : "bg-secondary"
      }`}
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      <span className="sr-only">Toggle Theme</span>
      <span
        className={`size-[27px] bg-white rounded-full shadow-sm flex items-center justify-center transition-transform ${
          isDark ? "translate-x-[22px] shadow-lg" : ""
        }`}
      >
        {isDark ? (
          <Moon className="size-4 text-primary" />
        ) : (
          <Sun className="size-4 text-secondary" />
        )}
      </span>
    </button>
  );
}