import type { ContributionDay } from "@/lib/types";

/**
 * Convert contribution count to intensity level (0-4)
 */
export function getContributionLevel(count: number): 0 | 1 | 2 | 3 | 4 {
  if (count === 0) return 0;
  if (count <= 5) return 1;
  if (count <= 15) return 2;
  if (count <= 30) return 3;
  return 4;
}

/**
 * Get CSS class for contribution color based on level
 */
export function getColorClassForLevel(level: 0 | 1 | 2 | 3 | 4): string {
  const colors: Record<number, string> = {
    0: "bg-muted/10 dark:bg-muted/10",
    1: "bg-chart-1/50 dark:bg-chart-1/50",
    2: "bg-chart-1/75 dark:bg-chart-1/75",
    3: "bg-chart-1/90 dark:bg-chart-1/90",
    4: "bg-chart-1 dark:bg-chart-1",
  };
  return colors[level] || colors[0];
}

/**
 * Get background color value for CSS-in-JS styling
 */
export function getColorValueForLevel(
  level: 0 | 1 | 2 | 3 | 4,
  isDark = false,
): string {
  // These would be derived from CSS variables in a real implementation
  // For now, returning placeholder values that correspond to chart-1 color
  const colors: Record<number, string> = {
    0: isDark ? "rgba(135, 206, 235, 0.1)" : "rgba(135, 206, 235, 0.1)",
    1: isDark ? "rgba(135, 206, 235, 0.5)" : "rgba(135, 206, 235, 0.5)",
    2: isDark ? "rgba(135, 206, 235, 0.75)" : "rgba(135, 206, 235, 0.75)",
    3: isDark ? "rgba(135, 206, 235, 0.9)" : "rgba(135, 206, 235, 0.9)",
    4: isDark ? "rgb(135, 206, 235)" : "rgb(135, 206, 235)",
  };
  return colors[level] || colors[0];
}

/**
 * Format date string for display
 * @param dateStr - ISO format date string (e.g., "2026-04-02")
 * @returns Formatted date (e.g., "Apr 2")
 */
export function formatDateShort(dateStr: string): string {
  const date = new Date(`${dateStr}T00:00:00`);
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

/**
 * Format date for full display
 * @param dateStr - ISO format date string
 * @returns Formatted date (e.g., "April 2, 2026")
 */
export function formatDateFull(dateStr: string): string {
  const date = new Date(`${dateStr}T00:00:00`);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/**
 * Get month abbreviation from date string
 */
export function getMonthAbbr(dateStr: string): string {
  const date = new Date(`${dateStr}T00:00:00`);
  return date.toLocaleDateString("en-US", { month: "short" });
}

/**
 * Get day of week abbreviation
 * @param dayIndex - 0-6 (Sunday-Saturday)
 */
export function getDayOfWeekAbbr(dayIndex: number): string {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[dayIndex] || "";
}

/**
 * Calculate total contributions from a ContributionDay array
 */
export function calculateTotal(days: ContributionDay[]): number {
  return days.reduce((sum, day) => sum + day.count, 0);
}

/**
 * Get tooltip text for a contribution day
 */
export function getTooltipText(day: ContributionDay): string {
  const date = formatDateFull(day.date);
  const contribution =
    day.count === 1 ? "1 contribution" : `${day.count} contributions`;
  return `${contribution} on ${date}`;
}

/**
 * Get the starting date of a week (Monday)
 * Assumes week starts on Monday
 */
export function getWeekStartDate(dateStr: string): string {
  const date = new Date(`${dateStr}T00:00:00`);
  const day = date.getDay();
  const diff = date.getDate() - day + (day === 0 ? -6 : 1);
  const monday = new Date(date.setDate(diff));
  return monday.toISOString().split("T")[0];
}

/**
 * Format contribution count with appropriate label
 */
export function formatContributionCount(count: number): string {
  if (count === 0) return "No contributions";
  if (count === 1) return "1 contribution";
  return `${count} contributions`;
}
