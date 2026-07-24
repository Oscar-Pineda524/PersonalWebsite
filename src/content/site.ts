import type { MenuChannel } from "@/types/menu";

export const menuChannels = [
  {
    slug: "about",
    title: "About",
    subtitle: "The person behind the code",
    icon: "about",
    slot: 1,
  },
  {
    slug: "projects",
    title: "Projects",
    subtitle: "Selected builds, decisions, and impact",
    icon: "projects",
    slot: 3,
    featured: true,
  },
  {
    slug: "experience",
    title: "Experience",
    subtitle: "Professional and research work",
    icon: "experience",
    slot: 4,
  },
  {
    slug: "resume",
    title: "Resume",
    subtitle: "Education, skills, and achievements",
    icon: "resume",
    slot: 7,
  },
  {
    slug: "contact",
    title: "Contact",
    subtitle: "Start a conversation",
    icon: "contact",
    slot: 9,
  },
] as const satisfies readonly MenuChannel[];

export const siteContent = {
  name: "Oscar",
  title: "Computer Science Portfolio",
  introduction:
    "An undergraduate computer science student building thoughtful software and exploring complex technical problems.",
  menuLabel: "Portfolio channels",
} as const;
