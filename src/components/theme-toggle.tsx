"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { RiMoonLine, RiSunLine } from "react-icons/ri";
import type { ThemeToggleProps } from "@/types";
import { Button } from "./ui/button";

export const ThemeToggle = ({ className = "" }: ThemeToggleProps) => {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <Button variant="ghost" size="icon" disabled />;
  }

  const resolvedTheme = theme === "system" ? systemTheme : theme;
  const isDark = resolvedTheme === "dark";

  const handleToggle = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleToggle}
      className={className}
      aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
      title={`Current theme: ${theme === "system" ? `system (${systemTheme})` : theme}`}
    >
      {isDark ? <RiMoonLine size={20} /> : <RiSunLine size={20} />}
    </Button>
  );
};
