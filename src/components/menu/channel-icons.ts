import {
  BriefcaseBusiness,
  CodeXml,
  FileText,
  Send,
  UserRound,
  type LucideIcon,
} from "lucide-react";

import type { ChannelIconName } from "@/types/menu";

export const channelIcons: Record<ChannelIconName, LucideIcon> = {
  about: UserRound,
  projects: CodeXml,
  experience: BriefcaseBusiness,
  resume: FileText,
  contact: Send,
};
