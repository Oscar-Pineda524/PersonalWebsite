"use client";

import { FileText, Home, Mail } from "lucide-react";

interface BottomNavigationProps {
  onMenuSelect: () => void;
  onResumeSelect: () => void;
  onContactSelect: () => void;
}

export function BottomNavigation({
  onMenuSelect,
  onResumeSelect,
  onContactSelect,
}: BottomNavigationProps) {
  return (
    <nav className="bottom-navigation" aria-label="Quick navigation">
      <button
        type="button"
        className="bottom-navigation__control"
        onClick={onResumeSelect}
      >
        <FileText aria-hidden="true" />
        <span>Resume</span>
      </button>

      <button
        type="button"
        className="bottom-navigation__home"
        aria-label="Return to channel menu"
        onClick={onMenuSelect}
      >
        <Home aria-hidden="true" />
      </button>

      <button
        type="button"
        className="bottom-navigation__control"
        onClick={onContactSelect}
      >
        <Mail aria-hidden="true" />
        <span>Contact</span>
      </button>
    </nav>
  );
}
