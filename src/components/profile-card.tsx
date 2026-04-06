import Image from "next/image";
import { Suspense } from "react";
import { FaLinkedin } from "react-icons/fa6";
import { IoIosMailUnread } from "react-icons/io";

import { SiGithub, SiHackerrank } from "react-icons/si";
import { TbFileCvFilled } from "react-icons/tb";
import type { ProfileCardProps } from "@/types";
import { TextRotatorHeadline } from "./text-rotator-headline";
import { ThemeToggle } from "./theme-toggle";
import { ButtonLink } from "./ui/button-link";
import { Card } from "./ui/card";
import { LanguageChart } from "./ui/language-chart";
import { LanguageChartSkeleton } from "./ui/language-chart-skeleton";

// Icon mapping for social platforms
const socialIconMap: Record<string, React.ReactNode> = {
  github: <SiGithub size={20} />,
  linkedin: <FaLinkedin size={20} />,
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

      <TextRotatorHeadline profile={profile} className="mb-6" />

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
                className="group hover:bg-secondary hover:text-secondary-foreground transition-all duration-initial overflow-hidden hover:w-auto hover:px-3"
              >
                <span className="flex items-center gap-1 whitespace-nowrap">
                  {socialIconMap[link.platform]}
                  <span className="hidden group-hover:inline text-xs">
                    {link.label}
                  </span>
                </span>
              </ButtonLink>
            ))}
          <ButtonLink
            href={`mailto:${profile.email}`}
            variant="transparent"
            size="icon"
            className="group hover:bg-secondary hover:text-secondary-foreground transition-all duration-initial overflow-hidden hover:w-auto hover:px-3"
            title="Email me"
          >
            <span className="flex items-center gap-1 whitespace-nowrap">
              <IoIosMailUnread size={20} />
              <span className="hidden group-hover:inline text-xs">
                Email me
              </span>
            </span>
          </ButtonLink>
          <ButtonLink
            href="https://github.com/joaovitorps/releases"
            target="_blank"
            rel="noopener noreferrer"
            variant="transparent"
            size="icon"
            className="group hover:bg-secondary hover:text-secondary-foreground transition-all duration-initial overflow-hidden hover:w-auto hover:px-3"
            title="Download CV"
          >
            <span className="flex items-center gap-1 whitespace-nowrap">
              <TbFileCvFilled size={20} />
              <span className="hidden group-hover:inline text-xs">
                Download CV
              </span>
            </span>
          </ButtonLink>
        </div>
      </div>

      <Suspense fallback={<LanguageChartSkeleton />}>
        <LanguageChart />
      </Suspense>
    </Card>
  );
};
