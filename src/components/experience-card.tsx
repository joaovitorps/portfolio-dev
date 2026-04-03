"use client";

import type { ExperienceCardProps } from "@/lib/types";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardHeader } from "./ui/card";

export const ExperienceCard = ({ experiences }: ExperienceCardProps) => {
  return (
    <Card>
      <CardHeader title="Experience" />
      <CardContent>
        <div className="timeline">
          {experiences.map((exp, idx) => (
            <div key={exp.id} className="timeline-item">
              {idx < experiences.length - 1 && (
                <div className="timeline-line" />
              )}
              <div className="timeline-dot" />
              <div className="timeline-content">
                <div className="flex items-start justify-between mb-1">
                  <div>
                    <h3 className="font-semibold text-foreground">
                      {exp.role}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {exp.company}
                    </p>
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
                      <Badge key={tech} variant="muted" size="sm">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
