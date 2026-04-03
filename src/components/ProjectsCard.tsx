"use client";

import { RiExternalLinkLine, RiGithubLine } from "react-icons/ri";
import type { ProjectsCardProps } from "@/lib/types";
import { cn } from "@/lib/utils";

export const ProjectsCard = ({ projects }: ProjectsCardProps) => {
  return (
    <div className="portfolio-card">
      <h2 className="portfolio-card-title">Projects</h2>
      <div className="space-y-4">
        {projects.map((project) => (
          <div
            key={project.id}
            className="pb-4 border-b border-border last:border-b-0 last:pb-0"
          >
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-semibold text-foreground">{project.title}</h3>
              {(project.link || project.githubLink) && (
                <div className="flex gap-2">
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        "text-muted-foreground",
                        "hover:text-portfolio-secondary",
                        "transition-colors",
                      )}
                      title="Visit project"
                    >
                      <RiExternalLinkLine size={18} />
                    </a>
                  )}
                  {project.githubLink && (
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        "text-muted-foreground",
                        "hover:text-portfolio-secondary",
                        "transition-colors",
                      )}
                      title="View on GitHub"
                    >
                      <RiGithubLine size={18} />
                    </a>
                  )}
                </div>
              )}
            </div>
            <p className="text-sm text-muted-foreground mb-2">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-1">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className={cn(
                    "text-xs px-2 py-0.5",
                    "rounded",
                    "bg-muted text-foreground",
                  )}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
