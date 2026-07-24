import type { MenuChannel } from "@/types/menu";

export const menuChannels = [
  {
    slug: "about",
    title: "About",
    subtitle: "The person behind the code",
    icon: "about",
  },
  {
    slug: "projects",
    title: "Projects",
    subtitle: "Selected builds, decisions, and impact",
    icon: "projects",
    featured: true,
  },
  {
    slug: "experience",
    title: "Experience",
    subtitle: "Professional and research work",
    icon: "experience",
  },
  {
    slug: "resume",
    title: "Resume",
    subtitle: "Education, skills, and achievements",
    icon: "resume",
  },
  {
    slug: "contact",
    title: "Contact",
    subtitle: "Start a conversation",
    icon: "contact",
  },
] as const satisfies readonly MenuChannel[];

export const siteContent = {
  name: "Oscar",
  title: "Computer Science Portfolio",
  introduction:
    "An undergraduate computer science student building thoughtful software and exploring complex technical problems.",
  menuLabel: "Portfolio channels",
} as const;
