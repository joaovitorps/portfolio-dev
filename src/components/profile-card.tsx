import Image from "next/image";
import { Suspense } from "react";
import { RiDownloadLine, RiGithubLine, RiLinkedinLine } from "react-icons/ri";
import { SiHackerrank } from "react-icons/si";
import type { ProfileCardProps } from "@/types";
import { ThemeToggle } from "./theme-toggle";
import { ButtonLink } from "./ui/button-link";
import { Card } from "./ui/card";
import { LanguageChart } from "./ui/language-chart";
import { LanguageChartSkeleton } from "./ui/language-chart-skeleton";

// Icon mapping for social platforms
const socialIconMap: Record<string, React.ReactNode> = {
  github: <RiGithubLine size={20} />,
  linkedin: <RiLinkedinLine size={20} />,
  hackerrank: <SiHackerrank size={20} />,
};

export const ProfileCard = async ({ profile }: ProfileCardProps) => {
  return (
    <Card className="h-full">
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

      <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
        {profile.bio}
      </p>

      <div className="mb-6 space-y-3">
        <div className="flex gap-2">
          {profile.links
            .filter((link) => link.platform !== "email")
            .map((link) => (
              <ButtonLink
                variant="transparent"
                size="icon"
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                title={`Visit ${link.label}`}
              >
                {socialIconMap[link.platform]}
              </ButtonLink>
            ))}
        </div>
        <div className="grid grid-cols-2 gap-2 pt-2">
          <ButtonLink
            href={`mailto:${profile.email}`}
            variant="default"
            size="sm"
            className="w-full"
          >
            Email me
          </ButtonLink>
          <ButtonLink
            href="https://github.com/joaovitorps/releases"
            target="_blank"
            rel="noopener noreferrer"
            variant="default"
            size="sm"
            className="w-full flex items-center justify-center gap-2"
          >
            <RiDownloadLine size={16} />
            Download CV
          </ButtonLink>
        </div>
      </div>

      <Suspense fallback={<LanguageChartSkeleton />}>
        <LanguageChart />
      </Suspense>
    </Card>
  );
};
