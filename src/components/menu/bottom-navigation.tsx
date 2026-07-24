"use client";

import { Grid2X2, Mail } from "lucide-react";

import { ProfileButton } from "@/components/menu/profile-button";
import { StatusClock } from "@/components/menu/status-clock";

interface BottomNavigationProps {
  name: string;
  onMenuSelect: () => void;
  onProfileSelect: () => void;
  onContactSelect: () => void;
}

export function BottomNavigation({
  name,
  onMenuSelect,
  onProfileSelect,
  onContactSelect,
}: BottomNavigationProps) {
  return (
    <nav className="bottom-navigation" aria-label="Quick navigation">
      <div className="bottom-navigation__side bottom-navigation__side--left">
        <ProfileButton name={name} onSelect={onProfileSelect} />
        <span>Profile</span>
      </div>

      <div className="bottom-navigation__center">
        <button
          type="button"
          className="bottom-navigation__home"
          aria-label="Return to channel menu"
          onClick={onMenuSelect}
        >
          <Grid2X2 aria-hidden="true" />
        </button>
        <StatusClock />
      </div>

      <div className="bottom-navigation__side bottom-navigation__side--right">
        <button
          type="button"
          className="bottom-navigation__contact"
          aria-label="Open Contact channel"
          onClick={onContactSelect}
        >
          <Mail aria-hidden="true" />
        </button>
        <span>Contact</span>
      </div>
    </nav>
  );
}
