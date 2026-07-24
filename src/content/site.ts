import type { ChannelSummary } from "@/types/portfolio";

const channels = [
  { label: "About", slug: "about" },
  { label: "Projects", slug: "projects" },
  { label: "Experience", slug: "experience" },
  { label: "Resume", slug: "resume" },
  { label: "Contact", slug: "contact" },
] as const satisfies readonly ChannelSummary[];

export const siteContent = {
  name: "Your Name",
  introduction:
    "An undergraduate computer science student building thoughtful software and exploring complex technical problems.",
  channels,
} as const;
