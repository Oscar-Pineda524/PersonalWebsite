"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

interface ChannelTileImage {
  src: string;
  alt: string;
}

interface ChannelTileProps {
  title: string;
  subtitle: string;
  icon: LucideIcon;
  onSelect: () => void;
  image?: ChannelTileImage;
  avatar?: ChannelTileImage;
  disabled?: boolean;
  featured?: boolean;
  selected?: boolean;
}

export function ChannelTile({
  title,
  subtitle,
  icon: Icon,
  onSelect,
  image,
  avatar,
  disabled = false,
  featured = false,
  selected = false,
}: ChannelTileProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.button
      type="button"
      className="channel-tile"
      data-featured={featured || undefined}
      data-selected={selected || undefined}
      disabled={disabled}
      aria-label={`${title}. ${subtitle}`}
      aria-pressed={selected}
      onClick={onSelect}
      whileHover={
        shouldReduceMotion || disabled
          ? undefined
          : { y: -6, transition: { duration: 0.18 } }
      }
      whileTap={
        shouldReduceMotion || disabled
          ? undefined
          : { scale: 0.975, transition: { duration: 0.08 } }
      }
    >
      {image ? (
        <span className="channel-tile__image" aria-hidden={image.alt === ""}>
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(min-width: 64rem) 28vw, (min-width: 48rem) 42vw, 92vw"
          />
          <span className="channel-tile__image-scrim" />
        </span>
      ) : (
        <span className="channel-tile__art" aria-hidden="true">
          <span className="channel-tile__orbit channel-tile__orbit--one" />
          <span className="channel-tile__orbit channel-tile__orbit--two" />
        </span>
      )}

      <span className="channel-tile__topline">
        <span className="channel-tile__icon" aria-hidden="true">
          {avatar ? (
            <img
              src={avatar.src}
              alt={avatar.alt}
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
            />
          ) : (
            <Icon strokeWidth={1.8} />
          )}
        </span>
        {featured ? (
          <span className="channel-tile__badge">Featured</span>
        ) : null}
      </span>

      <span className="channel-tile__copy">
        <span className="channel-tile__title">{title}</span>
        <span className="channel-tile__subtitle">{subtitle}</span>
      </span>

      {disabled ? (
        <span className="channel-tile__disabled-label">Coming soon</span>
      ) : null}
    </motion.button>
  );
}
