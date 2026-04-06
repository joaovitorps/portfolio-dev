import { AboutCard } from "@/components/about-card";
import { ExperienceCard } from "@/components/experience-card";
import { ProfileCard } from "@/components/profile-card";
import { TechnologiesCard } from "@/components/technologies-card";
import portfolioDataRaw from "@/data/portfolio.json";
import type { PortfolioData } from "@/types";

const portfolioData = portfolioDataRaw as PortfolioData;

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <div className="grid grid-cols-1 lg:flex gap-6 lg:gap-8 p-4 sm:p-6 lg:p-8 h-auto">
        {/* Left Column: Profile Card (Full Height on Desktop, Stack on Mobile) */}
        <div className="lg:sticky lg:min-w-2xs lg:top-8 h-full lg:h-auto">
          <ProfileCard profile={portfolioData.profile} />
        </div>

        {/* Right Column: Content Cards (2-column on Desktop) */}
        <div className="lg:flex-2/2 space-y-6 overflow-y-auto lg:max-h-[calc(100vh-4rem)]">
          {/* About Card */}
          <AboutCard content={portfolioData.about} />

          {/* Experience Card */}
          <ExperienceCard experiences={portfolioData.experience} />

          {/* Technologies Card */}
          <TechnologiesCard technologies={portfolioData.technologies} />
        </div>
      </div>
    </main>
  );
}
