"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  RiArrowLeftLine,
  RiArrowRightLine,
  RiExternalLinkLine,
  RiFolderOpenLine,
  RiGithubLine,
} from "react-icons/ri";
import { cn } from "@/lib/utils";
import type { ProjectsCardProps } from "@/types";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { ButtonLink } from "./ui/button-link";
import { Card, CardContent, CardHeader } from "./ui/card";

const AUTO_ADVANCE_MS = 4000;

export const ProjectsCard = ({ projects }: ProjectsCardProps) => {
  const viewportRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const visibleSlides = isDesktop ? 2 : 1;
  const maxIndex = Math.max(projects.length - visibleSlides, 0);
  const canSlide = maxIndex > 0;

  const controlsLabel = useMemo(() => {
    const visibleProjectCount = Math.min(visibleSlides, projects.length);

    return `${activeIndex + 1}-${activeIndex + visibleProjectCount} of ${
      projects.length
    }`;
  }, [activeIndex, projects.length, visibleSlides]);

  useEffect(() => {
    const desktopQuery = window.matchMedia("(min-width: 768px)");
    const reducedMotionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );

    const syncMediaState = () => {
      setIsDesktop(desktopQuery.matches);
      setPrefersReducedMotion(reducedMotionQuery.matches);
    };

    syncMediaState();
    desktopQuery.addEventListener("change", syncMediaState);
    reducedMotionQuery.addEventListener("change", syncMediaState);

    return () => {
      desktopQuery.removeEventListener("change", syncMediaState);
      reducedMotionQuery.removeEventListener("change", syncMediaState);
    };
  }, []);

  useEffect(() => {
    setActiveIndex((currentIndex) => Math.min(currentIndex, maxIndex));
  }, [maxIndex]);

  useEffect(() => {
    if (!canSlide || isPaused || prefersReducedMotion) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setActiveIndex((currentIndex) => {
        if (currentIndex >= maxIndex) {
          return 0;
        }

        return currentIndex + 1;
      });
    }, AUTO_ADVANCE_MS);

    return () => window.clearInterval(intervalId);
  }, [canSlide, isPaused, maxIndex, prefersReducedMotion]);

  useEffect(() => {
    const viewport = viewportRef.current;
    const activeSlide = slideRefs.current[activeIndex];

    if (!viewport || !activeSlide) {
      return;
    }

    viewport.scrollTo({
      left: activeSlide.offsetLeft - viewport.offsetLeft,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  }, [activeIndex, prefersReducedMotion]);

  const goToPreviousProject = () => {
    setActiveIndex((currentIndex) => {
      if (currentIndex <= 0) {
        return maxIndex;
      }

      return currentIndex - 1;
    });
  };

  const goToNextProject = () => {
    setActiveIndex((currentIndex) => {
      if (currentIndex >= maxIndex) {
        return 0;
      }

      return currentIndex + 1;
    });
  };

  if (!projects.length) {
    return null;
  }

  return (
    <Card
      className="group relative font-mono"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      <CardHeader title="Projects" icon={<RiFolderOpenLine size={24} />} />

      {canSlide && (
        <div
          className={cn(
            "absolute right-6 top-6 flex items-center gap-2 opacity-0",
            "transition-opacity duration-200",
            "group-hover:opacity-100 group-focus-within:opacity-100",
          )}
        >
          <span className="text-xs text-muted-foreground">{controlsLabel}</span>
          <Button
            type="button"
            variant="outline"
            size="icon-sm"
            onClick={goToPreviousProject}
            aria-label="Show previous project"
          >
            <RiArrowLeftLine size={16} />
          </Button>
          <Button
            type="button"
            variant="outline"
            size="icon-sm"
            onClick={goToNextProject}
            aria-label="Show next project"
          >
            <RiArrowRightLine size={16} />
          </Button>
        </div>
      )}

      <CardContent>
        <section
          ref={viewportRef}
          className="overflow-hidden"
          aria-label="Project carousel"
        >
          <div className="flex gap-4">
            {projects.map((project, index) => (
              <article
                key={project.id}
                ref={(node) => {
                  slideRefs.current[index] = node;
                }}
                className={cn(
                  "grid min-w-0 shrink-0 basis-full overflow-hidden",
                  "rounded-lg border border-border bg-background/55",
                  "md:basis-[calc((100%-2rem)/2.45)]",
                )}
              >
                <div className="relative aspect-video overflow-hidden bg-muted">
                  {project.image ? (
                    <Image
                      src={project.image}
                      alt={`${project.title} preview`}
                      loading={index < 2 ? "eager" : "lazy"}
                      sizes="(min-width: 768px) 32vw, 100vw"
                      className="transition-transform duration-500 hover:scale-105"
                      fill
                    />
                  ) : (
                    <div className="flex h-full min-h-44 items-center justify-center text-muted-foreground">
                      <RiFolderOpenLine size={36} />
                    </div>
                  )}
                </div>

                <div className="flex min-w-0 flex-col gap-3 p-3.5">
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h3 className="text-base font-semibold leading-tight text-foreground">
                        {project.title}
                      </h3>

                      <div className="flex">
                        {project.githubLink && (
                          <a
                            href={project.githubLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={cn(
                              "inline-flex h-8 w-8 items-center justify-center rounded-md",
                              "text-muted-foreground transition-colors",
                              "hover:bg-muted hover:text-portfolio-secondary",
                              "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
                            )}
                            title="View GitHub repository"
                          >
                            <RiGithubLine size={20} />
                          </a>
                        )}

                        {project.link && (
                          <ButtonLink
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            variant="transparent"
                            size="sm"
                          >
                            <RiExternalLinkLine size={16} />
                            View project
                          </ButtonLink>
                        )}
                      </div>
                    </div>

                    <p className="text-xs leading-relaxed text-muted-foreground">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5">
                      {project.technologies.map((tech) => (
                        <Badge key={tech} variant="muted" size="sm">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </CardContent>
    </Card>
  );
};
