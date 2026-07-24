"use client";

import {
  BriefcaseBusiness,
  CodeXml,
  FileText,
  Send,
  UserRound,
  type LucideIcon,
} from "lucide-react";

import { ChannelTile } from "@/components/menu/channel-tile";
import type { ChannelIconName, MenuChannel } from "@/types/menu";
import type { ChannelSlug } from "@/types/portfolio";

const channelIcons: Record<ChannelIconName, LucideIcon> = {
  about: UserRound,
  projects: CodeXml,
  experience: BriefcaseBusiness,
  resume: FileText,
  contact: Send,
};

interface MenuGridProps {
  channels: readonly MenuChannel[];
  label: string;
  selectedChannel?: ChannelSlug;
  onSelect: (channel: MenuChannel) => void;
}

export function MenuGrid({
  channels,
  label,
  selectedChannel,
  onSelect,
}: MenuGridProps) {
  const slots = Array.from({ length: 15 }, (_, index) => {
    const slot = index + 1;

    return {
      slot,
      channel: channels.find((item) => item.slot === slot),
    };
  });

  return (
    <ul className="menu-grid" aria-label={label}>
      {slots.map(({ slot, channel }) =>
        channel ? (
          <li
            className="menu-grid__item"
            data-featured={channel.featured || undefined}
            key={channel.slug}
          >
            <ChannelTile
              title={channel.title}
              subtitle={channel.subtitle}
              icon={channelIcons[channel.icon]}
              image={channel.image}
              disabled={channel.disabled}
              featured={channel.featured}
              selected={channel.slug === selectedChannel}
              onSelect={() => onSelect(channel)}
            />
          </li>
        ) : (
          <li
            className="menu-grid__item menu-grid__placeholder"
            aria-hidden="true"
            key={`slot-${slot}`}
          >
            <span />
          </li>
        ),
      )}
    </ul>
  );
}
