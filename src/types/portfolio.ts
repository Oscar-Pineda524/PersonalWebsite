export const channelSlugs = [
  "about",
  "projects",
  "experience",
  "resume",
  "contact",
] as const;

export type ChannelSlug = (typeof channelSlugs)[number];

export interface ChannelSummary {
  label: string;
  slug: ChannelSlug;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  summary: string;
  problem: string;
  solution: string;
  impact: string;
  technologies: readonly string[];
  repositoryUrl?: string;
  demoUrl?: string;
}

export interface Experience {
  id: string;
  organization: string;
  role: string;
  startDate: string;
  endDate?: string;
  summary: string;
  impact: readonly string[];
}
