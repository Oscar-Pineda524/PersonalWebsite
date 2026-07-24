"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, X } from "lucide-react";

interface ChannelPanelProps {
  title?: string;
  subtitle?: string;
  onClose: () => void;
}

export function ChannelPanel({
  title,
  subtitle,
  onClose,
}: ChannelPanelProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <AnimatePresence initial={false}>
      {title ? (
        <motion.section
          className="channel-panel"
          aria-live="polite"
          aria-label={`${title} channel preview`}
          initial={shouldReduceMotion ? false : { opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.22 }}
        >
          <div className="channel-panel__copy">
            <p className="channel-panel__eyebrow">Channel preview</p>
            <h2>{title}</h2>
            <p>
              {subtitle ??
                "This channel is ready for its content in a future phase."}
            </p>
          </div>

          <div className="channel-panel__actions">
            <span className="channel-panel__placeholder">
              Full view coming next
              <ArrowRight aria-hidden="true" />
            </span>
            <button
              type="button"
              className="channel-panel__close"
              aria-label={`Close ${title} preview`}
              onClick={onClose}
            >
              <X aria-hidden="true" />
            </button>
          </div>
        </motion.section>
      ) : null}
    </AnimatePresence>
  );
}
