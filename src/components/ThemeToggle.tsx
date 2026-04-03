"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { RiMoonLine, RiSunLine } from "react-icons/ri";
import type { ThemeToggleProps } from "@/lib/types";
import { cn } from "@/lib/utils";

export const ThemeToggle = ({ className = "" }: ThemeToggleProps) => {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className={cn("w-10 h-10", className)} />;
  }

  // Determine the resolved theme (what's actually being used)
  const resolvedTheme = theme === "system" ? systemTheme : theme;
  const isDark = resolvedTheme === "dark";

  // Toggle between light and dark
  const handleToggle = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      className={cn(
        "inline-flex items-center justify-center",
        "w-10 h-10 rounded-md",
        "bg-muted hover:bg-muted/80",
        "text-foreground transition-colors duration-200",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
        className,
      )}
      aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
      title={`Current theme: ${theme === "system" ? `system (${systemTheme})` : theme}`}
    >
      {isDark ? <RiMoonLine size={20} /> : <RiSunLine size={20} />}
    </button>
  );
};
