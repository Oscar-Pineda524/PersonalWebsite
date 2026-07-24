"use client";

import { UserRound } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

interface ProfileButtonProps {
  name: string;
  onSelect: () => void;
}

export function ProfileButton({ name, onSelect }: ProfileButtonProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.button
      type="button"
      className="profile-button"
      aria-label={`Open ${name}'s profile`}
      onClick={onSelect}
      whileHover={shouldReduceMotion ? undefined : { scale: 1.04 }}
      whileTap={shouldReduceMotion ? undefined : { scale: 0.95 }}
    >
      <UserRound aria-hidden="true" strokeWidth={1.9} />
    </motion.button>
  );
}
