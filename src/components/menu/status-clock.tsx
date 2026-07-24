"use client";

import { useSyncExternalStore } from "react";

const listeners = new Set<() => void>();
let currentTime: Date | null = null;
let timer: ReturnType<typeof setInterval> | undefined;

function emitTime() {
  currentTime = new Date();
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);

  if (listeners.size === 1) {
    emitTime();
    timer = setInterval(emitTime, 1_000);
  }

  return () => {
    listeners.delete(listener);

    if (listeners.size === 0 && timer) {
      clearInterval(timer);
      timer = undefined;
    }
  };
}

function getSnapshot() {
  return currentTime;
}

function getServerSnapshot() {
  return null;
}

const timeFormatter = new Intl.DateTimeFormat(undefined, {
  hour: "numeric",
  minute: "2-digit",
});

const dateFormatter = new Intl.DateTimeFormat(undefined, {
  weekday: "short",
  month: "short",
  day: "numeric",
});

export function StatusClock() {
  const time = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  return (
    <div className="status-clock" aria-label="Current local date and time">
      {time ? (
        <>
          <time className="status-clock__time" dateTime={time.toISOString()}>
            {timeFormatter.format(time)}
          </time>
          <span className="status-clock__date">
            {dateFormatter.format(time)}
          </span>
        </>
      ) : (
        <>
          <span className="status-clock__time" aria-hidden="true">
            --:--
          </span>
          <span className="status-clock__date">Local time</span>
        </>
      )}
    </div>
  );
}
