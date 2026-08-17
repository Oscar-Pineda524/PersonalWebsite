"use client";

import Image from "next/image";
import { motion, useMotionValue, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type CursorFrame = 1 | 2 | 3 | 4 | 5;

type CursorAsset = Readonly<{
  frame: CursorFrame;
  height: number;
  src: string;
}>;

/** Adjust this value to change the interval between animation frames. */
export const CURSOR_FRAME_DURATION_MS = 40;

/**
 * Cursor display size and hotspot, measured in rendered CSS pixels.
 * All differently sized frames are centered inside this fixed canvas.
 */
export const CURSOR_DISPLAY_WIDTH_PX = 34;
const SOURCE_WIDTH_PX = 67;
const MAX_SOURCE_HEIGHT_PX = 107;
export const CURSOR_DISPLAY_HEIGHT_PX =
  (MAX_SOURCE_HEIGHT_PX / SOURCE_WIDTH_PX) * CURSOR_DISPLAY_WIDTH_PX;
export const CURSOR_HOTSPOT = {
  x: CURSOR_DISPLAY_WIDTH_PX / 2,
  y: CURSOR_DISPLAY_HEIGHT_PX / 2,
} as const;

const CURSOR_ASSETS: readonly CursorAsset[] = [
  { frame: 1, height: 107, src: "/assets/cursors/cursor-01.png" },
  { frame: 2, height: 107, src: "/assets/cursors/cursor-02.png" },
  { frame: 3, height: 107, src: "/assets/cursors/cursor-03.png" },
  { frame: 4, height: 107, src: "/assets/cursors/cursor-04.png" },
  { frame: 5, height: 107, src: "/assets/cursors/cursor-05.png" },
] as const;

const renderHeight = (sourceHeight: number) =>
  (sourceHeight / SOURCE_WIDTH_PX) * CURSOR_DISPLAY_WIDTH_PX;

export function CustomCursor() {
  const [activeFrame, setActiveFrame] = useState<CursorFrame>(1);
  const [isVisible, setIsVisible] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const x = useMotionValue(-CURSOR_DISPLAY_WIDTH_PX);
  const y = useMotionValue(-CURSOR_DISPLAY_WIDTH_PX);
  const timersRef = useRef<number[]>([]);
  const sequenceRef = useRef(0);
  const isHeldRef = useRef(false);
  const pressCompleteRef = useRef(false);

  useEffect(() => {
    const finePointerQuery = window.matchMedia(
      "(hover: hover) and (pointer: fine)",
    );

    const clearTimers = () => {
      timersRef.current.forEach((timer) => window.clearTimeout(timer));
      timersRef.current = [];
    };

    const schedule = (callback: () => void, delay: number) => {
      const timer = window.setTimeout(callback, delay);
      timersRef.current.push(timer);
    };

    const resetCursor = () => {
      sequenceRef.current += 1;
      clearTimers();
      isHeldRef.current = false;
      pressCompleteRef.current = false;
      setActiveFrame(1);
    };

    const playRelease = (sequence: number) => {
      if (sequence !== sequenceRef.current) {
        return;
      }

      setActiveFrame(5);
      schedule(() => {
        if (sequence === sequenceRef.current) {
          setActiveFrame(1);
        }
      }, CURSOR_FRAME_DURATION_MS);
    };

    const handleMouseMove = (event: MouseEvent) => {
      if (!finePointerQuery.matches) {
        return;
      }

      x.set(event.clientX - CURSOR_HOTSPOT.x);
      y.set(event.clientY - CURSOR_HOTSPOT.y);
      setIsVisible(true);

      // Recover if the mouse button was released outside the browser window.
      if (isHeldRef.current && (event.buttons & 1) === 0) {
        isHeldRef.current = false;
        if (prefersReducedMotion) {
          resetCursor();
        } else if (pressCompleteRef.current) {
          playRelease(sequenceRef.current);
        }
      }
    };

    const handleMouseDown = (event: MouseEvent) => {
      if (event.button !== 0 || !finePointerQuery.matches) {
        return;
      }

      sequenceRef.current += 1;
      const sequence = sequenceRef.current;
      clearTimers();
      isHeldRef.current = true;
      pressCompleteRef.current = false;

      if (prefersReducedMotion) {
        pressCompleteRef.current = true;
        setActiveFrame(4);
        return;
      }

      setActiveFrame(2);
      schedule(() => {
        if (sequence === sequenceRef.current) {
          setActiveFrame(3);
        }
      }, CURSOR_FRAME_DURATION_MS);
      schedule(() => {
        if (sequence !== sequenceRef.current) {
          return;
        }

        pressCompleteRef.current = true;
        setActiveFrame(4);
        if (!isHeldRef.current) {
          playRelease(sequence);
        }
      }, CURSOR_FRAME_DURATION_MS * 2);
    };

    const handleMouseUp = (event: MouseEvent) => {
      if (event.button !== 0 || !isHeldRef.current) {
        return;
      }

      isHeldRef.current = false;
      if (prefersReducedMotion) {
        resetCursor();
      } else if (pressCompleteRef.current) {
        playRelease(sequenceRef.current);
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);
    const handleWindowBlur = () => {
      setIsVisible(false);
      resetCursor();
    };
    const handleVisibilityChange = () => {
      if (document.hidden) {
        handleWindowBlur();
      }
    };
    const handlePointerCapabilityChange = () => {
      document.documentElement.classList.toggle(
        "custom-cursor-active",
        finePointerQuery.matches,
      );

      if (!finePointerQuery.matches) {
        setIsVisible(false);
        resetCursor();
      }
    };

    handlePointerCapabilityChange();
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("blur", handleWindowBlur);
    finePointerQuery.addEventListener("change", handlePointerCapabilityChange);

    return () => {
      sequenceRef.current += 1;
      clearTimers();
      document.documentElement.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("blur", handleWindowBlur);
      finePointerQuery.removeEventListener(
        "change",
        handlePointerCapabilityChange,
      );
    };
  }, [prefersReducedMotion, x, y]);

  return (
    <motion.div
      aria-hidden="true"
      className="custom-cursor"
      data-visible={isVisible}
      style={{ x, y }}
    >
      {CURSOR_ASSETS.map((asset) => (
        <Image
          alt=""
          aria-hidden="true"
          className="custom-cursor__frame"
          data-active={activeFrame === asset.frame}
          draggable={false}
          height={renderHeight(asset.height)}
          key={asset.frame}
          priority
          src={asset.src}
          width={CURSOR_DISPLAY_WIDTH_PX}
        />
      ))}
    </motion.div>
  );
}
