"use client";

import type { ExperienceCardProps } from "@/lib/types";

export const ExperienceCard = ({ experiences }: ExperienceCardProps) => {
  return (
    <div className="portfolio-card">
      <h2 className="portfolio-card-title">Experience</h2>
      <div className="timeline">
        {experiences.map((exp, idx) => (
          <div key={exp.id} className="timeline-item">
            {idx < experiences.length - 1 && <div className="timeline-line" />}
            <div className="timeline-dot" />
            <div className="timeline-content">
              <div className="flex items-start justify-between mb-1">
                <div>
                  <h3 className="font-semibold text-foreground">{exp.role}</h3>
                  <p className="text-xs text-muted-foreground">{exp.company}</p>
                </div>
                <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">
                  {exp.period}
                </span>
              </div>
              <p className="text-sm text-muted-foreground mb-2">
                {exp.description}
              </p>
              {exp.technologies && (
                <div className="flex flex-wrap gap-1">
                  {exp.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs px-2 py-0.5 rounded bg-muted text-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
