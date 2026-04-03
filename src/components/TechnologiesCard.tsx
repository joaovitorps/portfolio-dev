"use client";

import type { TechnologiesCardProps } from "@/lib/types";

export const TechnologiesCard = ({ technologies }: TechnologiesCardProps) => {
  return (
    <div className="portfolio-card">
      <h2 className="portfolio-card-title">Technologies</h2>
      <div className="flex flex-wrap gap-2">
        {technologies.map((tech) => (
          <span
            key={tech}
            className="
              px-3 py-1.5 text-sm
              rounded-full
              bg-portfolio-secondary/10 
              border border-portfolio-secondary/20
              text-portfolio-secondary
              hover:bg-portfolio-secondary/20 
              transition-colors duration-200
            "
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
};
