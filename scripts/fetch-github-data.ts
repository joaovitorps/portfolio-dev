import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import type { AggregatedLanguages, GitHubRepo, RepoLanguages } from "@/types";

const GITHUB_API_BASE = "https://api.github.com";
const PUBLIC_DIR = path.join(process.cwd(), "public");
const OUTPUT_FILE = path.join(PUBLIC_DIR, "github-data.json");

/**
 * Fetch all public repositories for a GitHub user
 * Filters out forks and archived repos
 */
async function fetchUserRepos(username: string): Promise<GitHubRepo[]> {
  const token = process.env.GITHUB_LANG_TOKEN;

  const headers: HeadersInit = {
    Accept: "application/vnd.github.v3+json",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(
    `${GITHUB_API_BASE}/users/${username}/repos?per_page=100&type=owner`,
    { headers },
  );

  if (!response.ok) {
    throw new Error(
      `GitHub API error: ${response.status} ${response.statusText}`,
    );
  }

  const repos: GitHubRepo[] = await response.json();

  // Filter out forks and archived repos
  return repos.filter((repo) => !repo.fork && !repo.archived);
}

/**
 * Sleep utility for rate limiting
 */
function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Fetch language breakdown for a specific repository
 */
async function fetchRepoLanguages(
  owner: string,
  repo: string,
  retries = 3,
): Promise<RepoLanguages> {
  const token = process.env.GITHUB_LANG_TOKEN;
  const headers: HeadersInit = {
    Accept: "application/vnd.github.v3+json",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const response = await fetch(
        `${GITHUB_API_BASE}/repos/${owner}/${repo}/languages`,
        { headers },
      );

      // Handle rate limiting
      if (response.status === 403 || response.status === 429) {
        const resetTime = response.headers.get("x-ratelimit-reset");
        const retryAfter = response.headers.get("retry-after");

        if (attempt < retries) {
          const waitTime = retryAfter
            ? Number.parseInt(retryAfter, 10) * 1000
            : resetTime
              ? Math.max(
                  Number.parseInt(resetTime, 10) * 1000 - Date.now(),
                  1000,
                )
              : Math.min(1000 * 2 ** attempt, 10000); // Exponential backoff

          await sleep(waitTime);
          continue;
        }
      }

      if (!response.ok) {
        return {};
      }

      return await response.json();
    } catch (_error) {
      if (attempt === retries) {
        return {};
      }
      await sleep(1000 * 2 ** attempt); // Exponential backoff
    }
  }

  return {};
}

/**
 * Import language color function from runtime library
 */
async function getLanguageColor(language: string): Promise<string> {
  // For build time, we need to import dynamically or just return a default
  try {
    const { getLanguageColor: getLangColor } = await import(
      "@/lib/language-colors"
    );
    return getLangColor(language);
  } catch (_error) {
    return "#808080"; // Fallback gray color
  }
}

/**
 * Aggregate language data across multiple repositories
 */
async function aggregateLanguages(
  repos: GitHubRepo[],
): Promise<AggregatedLanguages> {
  const languageMap = new Map<string, number>();

  // Process repos sequentially with delay to avoid rate limiting
  for (const repo of repos) {
    const languages = await fetchRepoLanguages(repo.owner.login, repo.name);

    // Aggregate bytes per language
    for (const [language, bytes] of Object.entries(languages)) {
      languageMap.set(language, (languageMap.get(language) || 0) + bytes);
    }

    // Add small delay between requests (300ms)
    await sleep(300);
  }

  const totalBytes = Array.from(languageMap.values()).reduce(
    (sum, bytes) => sum + bytes,
    0,
  );

  // Convert to LanguageData array with percentages and colors
  const languages = await Promise.all(
    Array.from(languageMap.entries()).map(async ([language, bytes]) => ({
      language,
      bytes,
      percentage: (bytes / totalBytes) * 100,
      color: await getLanguageColor(language),
    })),
  );

  languages.sort((a, b) => b.bytes - a.bytes); // Sort by usage (descending)

  const topLanguages = languages.slice(0, 3).map((l) => l.language);

  return {
    languages,
    totalBytes,
    topLanguages,
  };
}

/**
 * Main function to fetch and aggregate language data for a user
 */
async function getUserLanguageData(
  username: string,
): Promise<AggregatedLanguages> {
  const repos = await fetchUserRepos(username);
  return await aggregateLanguages(repos);
}

async function fetchAndSaveGitHubData(): Promise<void> {
  try {
    // Read portfolio data to get GitHub username
    const portfolioPath = path.join(process.cwd(), "src/data/portfolio.json");
    const portfolioData = JSON.parse(fs.readFileSync(portfolioPath, "utf-8"));
    const username = portfolioData.profile.githubUsername;

    if (!username) {
      console.warn("⚠️  No GitHub username found in portfolio.json");
      return;
    }

    console.log(`📊 Fetching GitHub data for @${username}...`);
    const startTime = Date.now();

    // Fetch GitHub language data
    const languageData = await getUserLanguageData(username);

    const duration = ((Date.now() - startTime) / 1000).toFixed(2);

    // Ensure public directory exists
    if (!fs.existsSync(PUBLIC_DIR)) {
      fs.mkdirSync(PUBLIC_DIR, { recursive: true });
    }

    // Write to file
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(languageData, null, 2));

    const fileSize = (fs.statSync(OUTPUT_FILE).size / 1024).toFixed(2);
    console.log(`✅ GitHub data saved to ${OUTPUT_FILE}`);
    console.log(
      `   📈 Found ${languageData.languages.length} languages across ${languageData.totalBytes} bytes`,
    );
    console.log(`   ⏱️  Completed in ${duration}s`);
    console.log(`   📦 File size: ${fileSize}KB`);
  } catch (error) {
    console.error("❌ Failed to fetch GitHub data:", error);
    console.warn(
      "⚠️  Build will continue, but chart will not have data available",
    );
    // Don't throw - let build succeed
  }
}

fetchAndSaveGitHubData();
