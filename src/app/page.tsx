import { AboutCard } from "@/components/about-card";
import { ExperienceCard } from "@/components/experience-card";
import { ProfileCard } from "@/components/profile-card";
import { ProjectsCard } from "@/components/projects-card";
import { TechnologiesCard } from "@/components/technologies-card";
import { getPortfolioData } from "@/lib/portfolio";

export default async function Home() {
  const portfolioData = await getPortfolioData();
  return (
    <main className="min-h-screen bg-background">
      <div className="grid grid-cols-1 lg:flex gap-6 lg:gap-5 p-4 sm:p-6 lg:p-8 h-auto">
        {/* Left Column: Profile Card (Full Height on Desktop, Stack on Mobile) */}
        <div className="h-full lg:h-auto lg:min-w-sm lg:max-w-sm">
          <ProfileCard profile={portfolioData.profile} />
        </div>

        {/* Right Column: Content Cards (2-column on Desktop) */}
        <div className="lg:flex-3/3 space-y-6 overflow-y-auto lg:max-h-[calc(100vh-4rem)]">
          {/* About Card */}
          <AboutCard content={portfolioData.about} />

          <ProjectsCard projects={portfolioData.projects} />

          {/* Experience Card */}
          <ExperienceCard experiences={portfolioData.experience} />

          {/* Technologies Card */}
          <TechnologiesCard technologies={portfolioData.technologies} />
        </div>
      </div>
    </main>
  );
}
