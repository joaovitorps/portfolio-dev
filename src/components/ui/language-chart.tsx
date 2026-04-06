// biome-ignore lint/correctness/noNodejsModules: Server component needs to access process.env
import process from "node:process";
// import { unstable_noStore } from "next/cache";
import { generateLanguageSummary } from "@/lib/github";
import type { AggregatedLanguages } from "@/types/github";
import { LanguageChartClient } from "./language-chart-client";

/**
 * Server component for rendering GitHub language distribution
 * Reads pre-built data from /github-data.json (generated at build time)
 * This eliminates API calls at runtime and ensures data is always available
 * Delegates chart rendering to client component (Recharts requires it)
 * Returns null silently if data is unavailable (errors logged to console)
 */
export async function LanguageChart() {
  try {
    // Fetch the pre-built GitHub data file
    // In production, this uses the deployed domain (via Vercel's VERCEL_URL)
    // In dev, this uses localhost
    const baseUrl = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000";

    const bypassSecret = process.env.VERCEL_AUTOMATION_BYPASS_SECRET;
    const headers: HeadersInit = {};

    if (process.env.NODE_ENV !== "development") {
      if (!bypassSecret) {
        console.warn("⚠️  VERCEL_AUTOMATION_BYPASS_SECRET not found.");
        return null;
      }

      headers["x-vercel-protection-bypass"] = bypassSecret;
    }

    const response = await fetch(`${baseUrl}/github-data.json`, {
      cache: "no-store",
      headers,
    });

    if (!response.ok) {
      console.warn(
        "⚠️  GitHub data file not found at /github-data.json. Was the build script executed?",
      );
      return null;
    }

    const languageData: AggregatedLanguages = await response.json();
    const { languages } = languageData;

    if (!languages || languages.length === 0) {
      console.warn("⚠️  No language data available in github-data.json");
      return null;
    }

    return (
      <div className="border-t border-border pt-6">
        <h2 className="portfolio-card-subtitle uppercase tracking-wider mb-4">
          Languages
        </h2>

        <LanguageChartClient languages={languages} />

        <p className="text-sm text-muted-foreground mt-4 leading-relaxed">
          {generateLanguageSummary(languages)}
        </p>
      </div>
    );
  } catch (_error) {
    console.warn(
      "⚠️  Failed to load language data. This is expected during development if the file hasn't been generated yet. Run 'npm run build' to generate it.",
    );
    return null;
  }
}
