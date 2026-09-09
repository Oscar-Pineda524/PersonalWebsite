"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

import type { ChannelSlug } from "@/types/portfolio";

interface ChannelTileImage {
  src: string;
  alt: string;
}

interface ChannelTileProps {
  slug: ChannelSlug;
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
  slug,
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
      data-channel-slug={slug}
      data-featured={featured || undefined}
      data-selected={selected || undefined}
      disabled={disabled}
      layoutId={
        shouldReduceMotion ? undefined : `portfolio-channel-${slug}`
      }
      aria-label={`${title}. ${subtitle}`}
      aria-controls={disabled ? undefined : "expanded-channel"}
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
      transition={{
        layout: {
          duration: shouldReduceMotion ? 0 : 0.38,
          ease: [0.2, 0.8, 0.2, 1],
        },
      }}
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
            <Image
              src={avatar.src}
              alt={avatar.alt}
              width={64}
              height={64}
              unoptimized
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
