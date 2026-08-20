import Image from "next/image";
import { Suspense } from "react";
import { FaLinkedin } from "react-icons/fa6";
import { IoIosMailUnread } from "react-icons/io";

import { SiGithub, SiHackerrank } from "react-icons/si";
import { TbFileCvFilled } from "react-icons/tb";
import { LanguageChartSkeleton } from "@/features/most-used-languages/components/language-chart-skeleton";
import { MostUsedLanguages } from "@/features/most-used-languages/components/most-used-languages";
import type { ProfileCardProps } from "@/types";
import { TextRotatorHeadline } from "./text-rotator-headline";
import { ThemeToggle } from "./theme-toggle";
import { ButtonLink } from "./ui/button-link";
import { Card } from "./ui/card";
import { CartoonButton } from "./ui/cartoon-button";

// Icon mapping for social platforms
const socialIconMap: Record<string, React.ReactNode> = {
  github: <SiGithub size={20} />,
  linkedin: <FaLinkedin size={20} />,
  hackerrank: <SiHackerrank size={20} />,
};

function buildPictureURL(picture: string) {
  const githubAvatarsDomain = process.env.NEXT_PUBLIC_GITHUB_AVATARS_DOMAIN;
  const pictureURL = `https://${githubAvatarsDomain}/${picture}`;

  return pictureURL;
}

export const ProfileCard = async ({ profile }: ProfileCardProps) => {
  return (
    <Card className="lg:h-[calc(100vh-4rem)] overflow-y-scroll">
      <div className="flex items-start justify-between">
        <div className="relative w-16 h-16 mb-4 rounded-lg overflow-hidden">
          <Image
            src={buildPictureURL(profile.picture)}
            alt={profile.name}
            fill
            className="object-cover"
            sizes="64px"
          />
        </div>
        <div>
          <ThemeToggle />
        </div>
      </div>
      <div className="flex items-center mb-6 justify-between">
        <div>
          <h1 className="text-2xl font-bold text-card-foreground mb-1">
            {profile.name}
          </h1>
          <p className="text-sm text-portfolio-secondary font-medium">
            {profile.title}
          </p>
        </div>
        <div>
          <CartoonButton
            href="/v1/index.html"
            label="check `/v1` here"
            color="bg-[#ff6b35]"
          />
        </div>
      </div>

      <TextRotatorHeadline profile={profile} className="mb-5 h-12" />

      <div className="flex justify-between gap-2 space-y-3">
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
              className="group px-6 hover:bg-secondary hover:text-secondary-foreground transition-all duration-initial overflow-hidden hover:w-auto hover:px-3"
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
          className="group px-6 hover:bg-secondary hover:text-secondary-foreground transition-all duration-initial overflow-hidden hover:w-auto hover:px-3"
          title="Email me"
        >
          <span className="flex items-center gap-1 whitespace-nowrap">
            <IoIosMailUnread size={20} />
            <span className="hidden group-hover:inline text-xs">Email me</span>
          </span>
        </ButtonLink>
        <ButtonLink
          href="/resume"
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

      <Suspense fallback={<LanguageChartSkeleton />}>
        <MostUsedLanguages />
      </Suspense>
    </Card>
  );
};
