"use client";

import Image from "next/image";
import { RiGithubLine, RiLinkedinLine, RiMailLine } from "react-icons/ri";
import { generateLanguageSummary } from "@/lib/github";
import type { LanguageData, ProfileData } from "@/types";
import { TextRotatorHeadline } from "./text-rotator-headline";
import { ThemeToggle } from "./theme-toggle";
import { ButtonLink } from "./ui/button-link";
import { Card } from "./ui/card";

// import { LanguageChart } from "./ui/language-chart";

// Icon mapping for social platforms
const socialIconMap: Record<string, React.ReactNode> = {
  github: <RiGithubLine size={20} />,
  linkedin: <RiLinkedinLine size={20} />,
  email: <RiMailLine size={20} />,
};

interface ProfileCardClientProps {
  profile: ProfileData;
  languageData?: LanguageData[];
}

export const ProfileCardClient = ({
  profile,
  languageData,
}: ProfileCardClientProps) => {
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
        <h2 className="portfolio-card-subtitle uppercase tracking-wider">
          Links
        </h2>
        <div className="flex gap-2">
          {profile.links.map((link) => (
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
      </div>

      {languageData && languageData.length > 0 && (
        <div className="border-t border-border pt-6">
          <h2 className="portfolio-card-subtitle uppercase tracking-wider mb-4">
            Languages
          </h2>
          {/* <LanguageChart data={languageData} /> */}
          <p className="text-sm text-muted-foreground mt-4 leading-relaxed">
            {generateLanguageSummary(languageData)}
          </p>
        </div>
      )}
    </Card>
  );
};
