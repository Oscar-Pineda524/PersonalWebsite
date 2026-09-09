"use client";

import { useEffect, useRef } from "react";

const POINTER_MEDIA_QUERY =
  "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)";
const EASING_FACTOR = 0.075;
const SETTLE_THRESHOLD = 0.001;

export function AmbientBackground() {
  const backgroundRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const background = backgroundRef.current;

    if (!background) {
      return;
    }

    const pointerMediaQuery = window.matchMedia(POINTER_MEDIA_QUERY);
    let animationFrame: number | undefined;
    let currentX = 0;
    let currentY = 0;
    let targetX = 0;
    let targetY = 0;

    const writePosition = () => {
      background.style.setProperty(
        "--ambient-primary-x",
        `${currentX * 30}px`,
      );
      background.style.setProperty(
        "--ambient-primary-y",
        `${currentY * 22}px`,
      );
      background.style.setProperty(
        "--ambient-secondary-x",
        `${currentX * -20}px`,
      );
      background.style.setProperty(
        "--ambient-secondary-y",
        `${currentY * -16}px`,
      );
      background.style.setProperty(
        "--ambient-accent-x",
        `${currentX * 14}px`,
      );
      background.style.setProperty(
        "--ambient-accent-y",
        `${currentY * -11}px`,
      );
    };

    const animateTowardPointer = () => {
      currentX += (targetX - currentX) * EASING_FACTOR;
      currentY += (targetY - currentY) * EASING_FACTOR;
      writePosition();

      const distance =
        Math.abs(targetX - currentX) + Math.abs(targetY - currentY);

      if (distance > SETTLE_THRESHOLD && !document.hidden) {
        animationFrame = window.requestAnimationFrame(animateTowardPointer);
      } else {
        animationFrame = undefined;
      }
    };

    const requestPositionUpdate = () => {
      if (animationFrame === undefined && !document.hidden) {
        animationFrame = window.requestAnimationFrame(animateTowardPointer);
      }
    };

    const resetPosition = () => {
      targetX = 0;
      targetY = 0;
      requestPositionUpdate();
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (!pointerMediaQuery.matches || event.pointerType !== "mouse") {
        return;
      }

      targetX = (event.clientX / window.innerWidth - 0.5) * 2;
      targetY = (event.clientY / window.innerHeight - 0.5) * 2;
      requestPositionUpdate();
    };

    const handleMediaChange = () => {
      if (!pointerMediaQuery.matches) {
        targetX = 0;
        targetY = 0;
        currentX = 0;
        currentY = 0;
        writePosition();
      }
    };

    const handleVisibilityChange = () => {
      if (document.hidden && animationFrame !== undefined) {
        window.cancelAnimationFrame(animationFrame);
        animationFrame = undefined;
      } else if (!document.hidden) {
        requestPositionUpdate();
      }
    };

    window.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });
    window.addEventListener("blur", resetPosition);
    document.addEventListener("mouseleave", resetPosition);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    pointerMediaQuery.addEventListener("change", handleMediaChange);

    return () => {
      if (animationFrame !== undefined) {
        window.cancelAnimationFrame(animationFrame);
      }

      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("blur", resetPosition);
      document.removeEventListener("mouseleave", resetPosition);
      document.removeEventListener(
        "visibilitychange",
        handleVisibilityChange,
      );
      pointerMediaQuery.removeEventListener("change", handleMediaChange);
    };
  }, []);

  return (
    <div
      ref={backgroundRef}
      className="ambient-background"
      aria-hidden="true"
    >
      <span className="ambient-background__orb-field ambient-background__orb-field--primary">
        <span className="ambient-background__orb ambient-background__orb--primary" />
      </span>
      <span className="ambient-background__orb-field ambient-background__orb-field--secondary">
        <span className="ambient-background__orb ambient-background__orb--secondary" />
      </span>
      <span className="ambient-background__orb-field ambient-background__orb-field--accent">
        <span className="ambient-background__orb ambient-background__orb--accent" />
      </span>
      <span className="ambient-background__ribbon" />
    </div>
  );
}
