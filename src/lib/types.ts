/* Portfolio Types and Interfaces */

export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  startDate: string;
  endDate?: string;
  description: string;
  technologies?: string[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image?: string;
  technologies: string[];
  link?: string;
  githubLink?: string;
}

export interface SocialLink {
  id: string;
  platform: "github" | "linkedin" | "email" | "twitter" | "website";
  url: string;
  label: string;
  icon?: string;
}

export interface ProfileData {
  name: string;
  title: string;
  bio: string;
  email?: string;
  avatar?: string;
  links: SocialLink[];
}

export interface PortfolioData {
  profile: ProfileData;
  about: string;
  experience: Experience[];
  technologies: string[];
  projects: Project[];
}

/* GitHub Contribution Types */

export interface ContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

export interface ContributionWeek {
  week: number;
  days: ContributionDay[];
}

export interface GitHubContributions {
  username: string;
  totalContributions: number;
  year: number;
  weeks: ContributionWeek[];
  lastUpdated: string;
}

export interface GitHubGraphProps {
  data: GitHubContributions;
  year?: number;
  showLegend?: boolean;
  showHeader?: boolean;
  maxWidth?: string;
}

/* Component Props */

export interface ThemeToggleProps {
  className?: string;
}

export interface ProfileCardProps {
  profile: ProfileData;
  onThemeToggle?: () => void;
}

export interface AboutCardProps {
  content: string;
}

export interface ExperienceCardProps {
  experiences: Experience[];
}

export interface TechnologiesCardProps {
  technologies: string[];
}

export interface ProjectsCardProps {
  projects: Project[];
}
