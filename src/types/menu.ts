import type { ChannelSlug } from "@/types/portfolio";

export type ChannelIconName =
  | "about"
  | "projects"
  | "experience"
  | "resume"
  | "contact";

export interface MenuChannel {
  slug: ChannelSlug;
  title: string;
  subtitle: string;
  icon: ChannelIconName;
  featured?: boolean;
  disabled?: boolean;
  image?: {
    src: string;
    alt: string;
  };
}
