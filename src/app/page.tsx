"use client";

import { useState } from "react";

import { BottomNavigation } from "@/components/menu/bottom-navigation";
import { ChannelPanel } from "@/components/menu/channel-panel";
import { MenuGrid } from "@/components/menu/menu-grid";
import { PortfolioHeader } from "@/components/menu/portfolio-header";
import { menuChannels, siteContent } from "@/content/site";
import type { MenuChannel } from "@/types/menu";

interface ActivePanel {
  title: string;
  subtitle: string;
  slug?: MenuChannel["slug"];
}

function findChannel(slug: MenuChannel["slug"]) {
  return menuChannels.find((channel) => channel.slug === slug);
}

export default function HomePage() {
  const [activePanel, setActivePanel] = useState<ActivePanel>();

  function openChannel(channel: MenuChannel) {
    setActivePanel({
      title: channel.title,
      subtitle: channel.subtitle,
      slug: channel.slug,
    });
  }

  function openChannelBySlug(slug: MenuChannel["slug"]) {
    const channel = findChannel(slug);

    if (channel) {
      openChannel(channel);
    }
  }

  function returnToMenu() {
    setActivePanel(undefined);
    document.querySelector("#main-menu")?.scrollIntoView();
  }

  return (
    <main id="main-content" className="portfolio-page">
      <div className="portfolio-shell">
        <PortfolioHeader
          name={siteContent.name}
          title={siteContent.title}
        />

        <div className="portfolio-main" id="main-menu">
          <ChannelPanel
            title={activePanel?.title}
            subtitle={activePanel?.subtitle}
            onClose={() => setActivePanel(undefined)}
          />

          <MenuGrid
            channels={menuChannels}
            label={siteContent.menuLabel}
            selectedChannel={activePanel?.slug}
            onSelect={openChannel}
          />
        </div>

        <BottomNavigation
          name={siteContent.name}
          onMenuSelect={returnToMenu}
          onProfileSelect={() =>
            setActivePanel({
              title: `${siteContent.name}'s Profile`,
              subtitle: siteContent.introduction,
            })
          }
          onContactSelect={() => openChannelBySlug("contact")}
        />
      </div>
    </main>
  );
}
