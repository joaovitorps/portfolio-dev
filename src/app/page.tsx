"use client";

import { AboutCard } from "@/components/AboutCard";
import { ExperienceCard } from "@/components/ExperienceCard";
import { ProfileCard } from "@/components/ProfileCard";
import { ProjectsCard } from "@/components/ProjectsCard";
import { TechnologiesCard } from "@/components/TechnologiesCard";
import portfolioDataRaw from "@/data/portfolio.json";
import type { PortfolioData } from "@/lib/types";

const portfolioData = portfolioDataRaw as PortfolioData;

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 p-4 sm:p-6 lg:p-8 h-screen lg:h-auto">
        {/* Left Column: Profile Card (Full Height on Desktop, Stack on Mobile) */}
        <div className="lg:sticky lg:top-8 h-fit">
          <ProfileCard profile={portfolioData.profile} />
        </div>

        {/* Right Column: Content Cards (2-column on Desktop) */}
        <div className="lg:col-span-2 space-y-6 overflow-y-auto lg:max-h-[calc(100vh-4rem)]">
          {/* About Card */}
          <AboutCard content={portfolioData.about} />

          {/* Experience Card */}
          <ExperienceCard experiences={portfolioData.experience} />

          {/* Technologies Card */}
          <TechnologiesCard technologies={portfolioData.technologies} />

          {/* Projects Card */}
          <ProjectsCard projects={portfolioData.projects} />
        </div>
      </div>
    </main>
  );
}
