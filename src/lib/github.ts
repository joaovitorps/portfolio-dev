import type { LanguageData } from "@/types";

/**
 * Generate a natural language summary of top languages
 * Pure utility function - no side effects, no API calls
 */
export function generateLanguageSummary(languages: LanguageData[]): string {
  if (languages.length === 0) {
    return "No language data available";
  }

  const top3 = languages.slice(0, 3);

  if (languages.length === 1) {
    return `Primarily working with ${top3[0].language}`;
  }

  if (languages.length === 2) {
    return `Mostly working with ${top3[0].language} (${top3[0].percentage.toFixed(0)}%) and ${top3[1].language} (${top3[1].percentage.toFixed(0)}%)`;
  }

  // 3+ languages
  const [first, second, ...rest] = top3;
  const restNames = rest.map((l) => l.language).join(", ");
  const otherCount = languages.length - 2;

  if (otherCount === 1) {
    return `Primarily ${first.language} (${first.percentage.toFixed(0)}%) and ${second.language} (${second.percentage.toFixed(0)}%), with some ${restNames}`;
  }

  return `Primarily ${first.language} (${first.percentage.toFixed(0)}%) and ${second.language} (${second.percentage.toFixed(0)}%), with ${restNames} and ${otherCount - 1} other ${otherCount - 1 === 1 ? "language" : "languages"}`;
}
