"use client";

import Image from "next/image";
import { RiGithubLine, RiLinkedinLine, RiMailLine } from "react-icons/ri";
import { githubContributionsMock } from "@/data/github-mock";
import type { ProfileCardProps } from "@/lib/types";
import { cn } from "@/lib/utils";
import { GitHubGraph } from "./GitHubGraph";
import { ThemeToggle } from "./ThemeToggle";
import { Card } from "./ui/Card";

// Icon mapping for social platforms
const socialIconMap: Record<string, React.ReactNode> = {
  github: <RiGithubLine size={20} />,
  linkedin: <RiLinkedinLine size={20} />,
  email: <RiMailLine size={20} />,
};

export const ProfileCard = ({ profile }: ProfileCardProps) => {
  return (
    <div className="sticky top-6 h-fit">
      <Card>
        {/* Profile Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex-1">
            <div className="relative w-16 h-16 mb-4 rounded-lg overflow-hidden">
              <Image
                src="/v1/assets/pfp.jpg"
                alt={profile.name}
                fill
                className="object-cover"
                sizes="64px"
              />
            </div>
            <h1 className="text-2xl font-bold text-card-foreground mb-1">
              {profile.name}
            </h1>
            <p className="text-sm text-portfolio-secondary font-medium">
              {profile.title}
            </p>
          </div>
          <ThemeToggle />
        </div>

        {/* Bio */}
        <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
          {profile.bio}
        </p>

        {/* Social Links */}
        <div className="mb-6 space-y-3">
          <h2 className="portfolio-card-subtitle uppercase tracking-wider">
            Links
          </h2>
          <div className="flex flex-col gap-2">
            {profile.links.map((link) => (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={cn([
                  "flex",
                  "items-center",
                  "gap-2",
                  "px-3",
                  "py-2",
                  "rounded-md",
                  "bg-muted/50",
                  "hover:bg-muted",
                  "text-foreground",
                  "hover:text-portfolio-secondary",
                  "transition-colors",
                  "duration-200",
                  "text-sm",
                  "font-medium",
                ])}
                title={`Visit ${link.label}`}
              >
                {socialIconMap[link.platform]}
                <span>{link.label}</span>
              </a>
            ))}
          </div>
        </div>

        {/* GitHub Contribution Graph */}
        <div className="border-t border-border pt-6">
          <h2 className="portfolio-card-subtitle uppercase tracking-wider mb-4">
            Contributions
          </h2>
          <GitHubGraph
            data={githubContributionsMock}
            showHeader={false}
            showLegend
          />
        </div>
      </Card>
    </div>
  );
};
