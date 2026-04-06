"use client";

import type { PieSectorShapeProps } from "recharts";
import { Pie, PieChart, ResponsiveContainer, Sector, Tooltip } from "recharts";
import type { LanguageData } from "@/types/github";

interface LanguageChartClientProps {
  languages: LanguageData[];
}

export function LanguageChartClient({ languages }: LanguageChartClientProps) {
  if (!languages || languages.length === 0) {
    return null;
  }

  const chartData = languages.map((lang) => ({
    name: lang.language,
    value: lang.bytes,
    percentage: lang.percentage,
    color: lang.color,
  }));

  return (
    <div className="w-full">
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={2}
            dataKey="value"
            shape={(props: PieSectorShapeProps) => (
              <Sector
                {...props}
                fill={props.payload.color}
                className="outline-none focus:outline-none"
              />
            )}
          />
          <Tooltip
            content={({ active, payload }) => {
              if (!active || !payload?.length) {
                return null;
              }
              const data = payload[0].payload;
              return (
                <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
                  <p className="text-sm font-semibold text-foreground">
                    {data.name}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {data.percentage.toFixed(1)}%
                  </p>
                </div>
              );
            }}
          />
        </PieChart>
      </ResponsiveContainer>

      <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
        {languages.slice(0, 8).map((lang) => (
          <div key={lang.language} className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-sm shrink-0"
              style={{ backgroundColor: lang.color }}
            />
            <span className="text-foreground truncate">{lang.language}</span>
            <span className="text-muted-foreground ml-auto">
              {lang.percentage.toFixed(1)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
