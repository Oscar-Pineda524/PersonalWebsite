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
          onProfileSelect={() =>
            setActivePanel({
              title: `${siteContent.name}'s Profile`,
              subtitle: siteContent.introduction,
            })
          }
        />

        <div className="portfolio-main" id="main-menu">
          <div className="portfolio-main__intro">
            <div>
              <p className="ds-eyebrow">Select a channel</p>
              <h2>What would you like to explore?</h2>
            </div>
            <p>{siteContent.introduction}</p>
          </div>

          <ChannelPanel
            title={activePanel?.title}
            subtitle={activePanel?.subtitle}
            onClose={() => setActivePanel(undefined)}
          />

          <MenuGrid
            channels={menuChannels}
            selectedChannel={activePanel?.slug}
            onSelect={openChannel}
          />
        </div>

        <BottomNavigation
          onMenuSelect={returnToMenu}
          onResumeSelect={() => openChannelBySlug("resume")}
          onContactSelect={() => openChannelBySlug("contact")}
        />
      </div>
    </main>
  );
}
