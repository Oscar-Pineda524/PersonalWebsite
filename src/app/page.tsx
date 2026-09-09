"use client";

import {
  AnimatePresence,
  LayoutGroup,
  motion,
  useReducedMotion,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";

import { BottomNavigation } from "@/components/menu/bottom-navigation";
import { ExpandedChannel } from "@/components/menu/expanded-channel";
import { MenuGrid } from "@/components/menu/menu-grid";
import { PortfolioHeader } from "@/components/menu/portfolio-header";
import {
  channelContent,
  menuChannels,
  siteContent,
} from "@/content/site";
import type { MenuChannel } from "@/types/menu";
import type { ChannelSlug } from "@/types/portfolio";

function findChannel(slug: MenuChannel["slug"]) {
  return menuChannels.find((channel) => channel.slug === slug);
}

export default function HomePage() {
  const [activeChannel, setActiveChannel] = useState<MenuChannel>();
  const shouldReduceMotion = useReducedMotion();
  const activeRegionRef = useRef<HTMLElement>(null);
  const menuScrollPositionRef = useRef(0);
  const pendingFocusSlugRef = useRef<ChannelSlug | undefined>(undefined);

  useEffect(() => {
    if (!activeChannel) {
      return;
    }

    const focusFrame = window.requestAnimationFrame(() => {
      activeRegionRef.current?.focus({ preventScroll: true });
    });

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        pendingFocusSlugRef.current = activeChannel.slug;
        setActiveChannel(undefined);
        window.requestAnimationFrame(() => {
          window.scrollTo({
            top: menuScrollPositionRef.current,
            behavior: "auto",
          });
        });
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.cancelAnimationFrame(focusFrame);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeChannel]);

  function openChannel(channel: MenuChannel) {
    if (channel.disabled) {
      return;
    }

    if (!activeChannel) {
      menuScrollPositionRef.current = window.scrollY;
      window.requestAnimationFrame(() => {
        window.scrollTo({ top: 0, behavior: "auto" });
      });
    }

    setActiveChannel(channel);
  }

  function openChannelBySlug(slug: MenuChannel["slug"]) {
    const channel = findChannel(slug);

    if (channel) {
      openChannel(channel);
    }
  }

  function returnToMenu() {
    if (!activeChannel) {
      document.querySelector("#main-menu")?.scrollIntoView();
      return;
    }

    pendingFocusSlugRef.current = activeChannel.slug;
    setActiveChannel(undefined);
    window.requestAnimationFrame(() => {
      window.scrollTo({
        top: menuScrollPositionRef.current,
        behavior: "auto",
      });
    });
  }

  function restoreMenuFocus() {
    const slug = pendingFocusSlugRef.current;

    if (!slug) {
      return;
    }

    document
      .querySelector<HTMLButtonElement>(`[data-channel-slug="${slug}"]`)
      ?.focus({ preventScroll: true });
    pendingFocusSlugRef.current = undefined;
  }

  return (
    <main id="main-content" className="portfolio-page">
      <div
        className="portfolio-shell"
        data-channel-open={activeChannel ? "true" : undefined}
      >
        <PortfolioHeader
          name={siteContent.name}
          title={siteContent.title}
        />

        <div
          className="portfolio-main"
          data-channel-open={activeChannel ? "true" : undefined}
          id="main-menu"
        >
          <p className="ds-visually-hidden" aria-live="polite">
            {activeChannel
              ? `${activeChannel.title} channel opened`
              : "Portfolio channel menu"}
          </p>

          <LayoutGroup id="portfolio-channel-view">
            <AnimatePresence
              initial={false}
              mode="popLayout"
              onExitComplete={restoreMenuFocus}
            >
              {activeChannel ? (
                <ExpandedChannel
                  channel={activeChannel}
                  content={channelContent[activeChannel.slug]}
                  key={activeChannel.slug}
                  onClose={returnToMenu}
                  regionRef={activeRegionRef}
                />
              ) : (
                <motion.div
                  className="menu-view"
                  key="menu"
                  initial={shouldReduceMotion ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: shouldReduceMotion ? 0 : 0.16 }}
                  transition={{
                    duration: shouldReduceMotion ? 0.01 : 0.2,
                  }}
                >
                  <MenuGrid
                    channels={menuChannels}
                    label={siteContent.menuLabel}
                    onSelect={openChannel}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </LayoutGroup>
        </div>

        <BottomNavigation
          name={siteContent.name}
          onMenuSelect={returnToMenu}
          onProfileSelect={() => openChannelBySlug("about")}
          onContactSelect={() => openChannelBySlug("contact")}
        />
      </div>
    </main>
  );
}
