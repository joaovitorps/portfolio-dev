import type {
  ContributionDay,
  ContributionWeek,
  GitHubContributions,
} from "@/lib/types";

/**
 * Generate mock GitHub contribution data for demonstration.
 * This creates realistic patterns with weekday activity being higher than weekends.
 */
function generateMockContributions(): GitHubContributions {
  const weeks: ContributionWeek[] = [];
  const today = new Date();
  const year = today.getFullYear();

  // Go back 52 weeks
  const currentDate = new Date(today);
  currentDate.setDate(currentDate.getDate() - 364);

  for (let week = 0; week < 52; week++) {
    const days: ContributionDay[] = [];

    for (let dayOfWeek = 0; dayOfWeek < 7; dayOfWeek++) {
      const dateStr = currentDate.toISOString().split("T")[0];

      // Simulate activity patterns
      let count = 0;

      // Weekends (Saturday and Sunday) have lower activity
      if (dayOfWeek === 5 || dayOfWeek === 6) {
        count = Math.random() > 0.6 ? Math.floor(Math.random() * 8) : 0;
      } else {
        // Weekdays have higher activity
        count = Math.floor(Math.random() * 25);

        // Add some "streaks" (periods of high activity)
        if (Math.random() > 0.7) {
          count = Math.floor(Math.random() * 35) + 10;
        }
      }

      // Determine level based on count
      let level: 0 | 1 | 2 | 3 | 4 = 0;
      if (count > 30) level = 4;
      else if (count > 15) level = 3;
      else if (count > 6) level = 2;
      else if (count > 0) level = 1;

      days.push({
        date: dateStr,
        count,
        level,
      });

      currentDate.setDate(currentDate.getDate() + 1);
    }

    weeks.push({
      week,
      days,
    });
  }

  const totalContributions = weeks.reduce(
    (total, week) => total + week.days.reduce((sum, day) => sum + day.count, 0),
    0,
  );

  return {
    username: "joaovitorps",
    totalContributions,
    year,
    weeks,
    lastUpdated: new Date().toISOString(),
  };
}

export const githubContributionsMock: GitHubContributions =
  generateMockContributions();
