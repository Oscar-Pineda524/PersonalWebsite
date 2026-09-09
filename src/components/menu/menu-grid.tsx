"use client";

import { channelIcons } from "@/components/menu/channel-icons";
import { ChannelTile } from "@/components/menu/channel-tile";
import type { MenuChannel } from "@/types/menu";
import type { ChannelSlug } from "@/types/portfolio";

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
  const slots = Array.from({ length: 9 }, (_, index) => {
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
              slug={channel.slug}
              title={channel.title}
              subtitle={channel.subtitle}
              icon={channelIcons[channel.icon]}
              image={channel.image}
              avatar={channel.avatar}
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
