"use client";

import type { AboutCardProps } from "@/lib/types";

export const AboutCard = ({ content }: AboutCardProps) => {
  return (
    <div className="portfolio-card">
      <h2 className="portfolio-card-title">About</h2>
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground leading-relaxed">
          {content}
        </p>
      </div>
    </div>
  );
};
