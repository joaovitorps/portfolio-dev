"use client";

import { useMemo, useState } from "react";
import { getColorClassForLevel, getTooltipText } from "@/lib/github-utils";
import type { ContributionDay, GitHubGraphProps } from "@/lib/types";

export const GitHubGraph = ({
  data,
  showHeader = true,
  showLegend = true,
}: GitHubGraphProps) => {
  const [hoveredDay, setHoveredDay] = useState<ContributionDay | null>(null);

  const dayLabels = useMemo(() => ["Mon", "Wed", "Fri"].map((day) => day), []);

  const monthLabels = useMemo(() => {
    const months = new Set<string>();
    const labels: { month: string; week: number }[] = [];

    data.weeks.forEach((week) => {
      if (week.days.length > 0) {
        const date = new Date(`${week.days[0].date}T00:00:00`);
        const monthStr = date.toLocaleDateString("en-US", { month: "short" });
        if (!months.has(monthStr) || labels.length === 0) {
          months.add(monthStr);
          labels.push({ month: monthStr, week: week.week });
        }
      }
    });

    return labels;
  }, [data.weeks]);

  const handleMouseMove = (
    _e: React.MouseEvent<HTMLButtonElement>,
    day: ContributionDay,
  ) => {
    setHoveredDay(day);
  };

  const handleMouseLeave = () => {
    setHoveredDay(null);
  };

  return (
    <div className="github-graph">
      {/* Header */}
      {showHeader && (
        <div className="github-graph__header mb-4">
          <div>
            <h3 className="github-graph__title">
              <a
                href={`https://github.com/${data.username}`}
                target="_blank"
                rel="noopener noreferrer"
                className="github-graph__username hover:underline"
              >
                @{data.username}
              </a>
            </h3>
            <p className="text-xs text-muted-foreground mt-1">
              {data.totalContributions} contributions in {data.year}
            </p>
          </div>
        </div>
      )}

      {/* Graph Container */}
      <div className="github-graph__grid-container">
        <div className="relative inline-block">
          {/* Month Labels */}
          <div className="flex mb-2 ml-8">
            {monthLabels.map((label) => (
              <div
                key={label.month}
                className="text-xs text-muted-foreground"
                style={{ width: `${label.week * 14}px` }}
              >
                {label.month}
              </div>
            ))}
          </div>

          {/* Grid */}
          <div className="flex gap-1">
            {/* Day Labels */}
            <div className="flex flex-col gap-1 mr-2 justify-start pt-1">
              {dayLabels.map((day) => (
                <div
                  key={`day-${day}`}
                  className="text-xs text-muted-foreground h-3"
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Contribution Grid */}
            <div className="github-graph__grid">
              {data.weeks.map((week) =>
                week.days.map((day) => {
                  const colorClass = getColorClassForLevel(day.level);
                  const isHovered = hoveredDay?.date === day.date;

                  return (
                    <button
                      key={day.date}
                      type="button"
                      className={`
                        github-graph__cell
                        ${colorClass}
                        ${isHovered ? "ring-2 ring-portfolio-secondary" : ""}
                      `}
                      onMouseMove={(e) => handleMouseMove(e, day)}
                      onMouseLeave={handleMouseLeave}
                      aria-label={getTooltipText(day)}
                      title={getTooltipText(day)}
                    />
                  );
                }),
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Legend */}
      {showLegend && (
        <div className="github-graph__legend mt-4 text-xs">
          <span className="github-graph__legend-label">Less</span>
          <div className="github-graph__legend-squares">
            {[0, 1, 2, 3, 4].map((level) => {
              const colorClass = getColorClassForLevel(
                level as 0 | 1 | 2 | 3 | 4,
              );
              return (
                <div
                  key={`legend-${level}`}
                  className={`github-graph__legend-square ${colorClass}`}
                />
              );
            })}
          </div>
          <span className="github-graph__legend-label">More</span>
        </div>
      )}
    </div>
  );
};
