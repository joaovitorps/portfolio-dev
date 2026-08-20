"use client";

import {
  Pie,
  PieChart,
  PieSectorShapeProps,
  ResponsiveContainer,
  Sector,
  Tooltip,
} from "recharts";
import { LanguageData } from "@/types";

interface LanguageChartClientProps {
  languages: LanguageData[];
}

export const LanguageChart = ({ languages }: LanguageChartClientProps) => {
  if (!languages || languages.length === 0) {
    return null;
  }

  return (
    <ResponsiveContainer width="100%" height={200}>
      <PieChart>
        <Pie
          data={languages}
          shape={(props: PieSectorShapeProps) => {
            const languageFromPayload: LanguageData = props.payload;

            return (
              <Sector
                {...props}
                fill={languageFromPayload.color}
                className="outline-none focus:outline-none"
              />
            );
          }}
          innerRadius={60}
          outerRadius={80}
          dataKey="bytes"
        />
        <Tooltip
          content={({ active, payload }) => {
            if (!active || !payload?.length) {
              return null;
            }

            const data: LanguageData = payload[0].payload;
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
  );
};
