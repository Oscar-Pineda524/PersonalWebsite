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

export interface ChannelContentAction {
  label: string;
  description: string;
  href?: string;
  external?: boolean;
}

export interface ChannelContentImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface ChannelContentItem {
  title: string;
  description: string;
  image?: ChannelContentImage;
  meta?: string;
  points?: readonly string[];
  tags?: readonly string[];
  placeholder?: boolean;
}

export interface ChannelContentSection {
  title: string;
  introduction?: string;
  items: readonly ChannelContentItem[];
}

export interface ExpandedChannelContent {
  eyebrow: string;
  introduction: string;
  sections: readonly ChannelContentSection[];
  actions: readonly ChannelContentAction[];
}
