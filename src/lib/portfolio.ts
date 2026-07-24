import process from "node:process";
import localPortfolioDataRaw from "@/data/portfolio.json" with { type: "json" };
import type { PortfolioData } from "@/types";

const localPortfolioData = localPortfolioDataRaw as PortfolioData;

export async function getPortfolioData(): Promise<PortfolioData> {
  const gistUrl = process.env.PORTFOLIO_GIST_URL;

  if (!gistUrl) {
    return localPortfolioData;
  }

  try {
    // Revalidate remote Gist cache every hour (3600 seconds) via ISR
    const response = await fetch(gistUrl, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error(`HTTP error status: ${response.status}`);
    }

    const remoteData: PortfolioData = await response.json();

    return {
      ...remoteData,
      profile: {
        ...remoteData.profile,
        resumeUrl: {
          download:
            remoteData.profile.resumeUrl?.download ||
            localPortfolioData.profile.resumeUrl?.download,
          preview:
            remoteData.profile.resumeUrl?.preview ||
            localPortfolioData.profile.resumeUrl?.preview,
        },
      },
    };
  } catch (error) {
    // Return local static json if remote fetch encounters a network or parsing failure
    console.error(
      "Failed to fetch remote portfolio data, falling back to local dataset:",
      error,
    );
    return localPortfolioData;
  }
}
