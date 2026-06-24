"use client";

import { useMemo, useSyncExternalStore } from "react";

type DateTimeMode = "date" | "instant";

export type DateTimeProps = {
  locale: string;
  mode?: DateTimeMode;
  options?: Intl.DateTimeFormatOptions;
  value: string;
};

const DEFAULT_OPTIONS: Intl.DateTimeFormatOptions = {
  dateStyle: "medium",
};

function subscribeToHydration() {
  return () => {};
}

function getClientSnapshot() {
  return true;
}

function getServerSnapshot() {
  return false;
}

function getDate(value: string, mode: DateTimeMode) {
  const date = mode === "date" ? new Date(`${value}T00:00:00.000Z`) : new Date(value);

  return Number.isNaN(date.getTime()) ? null : date;
}

function getFormatOptions(
  options: Intl.DateTimeFormatOptions,
  mode: DateTimeMode,
  target: "client" | "fallback",
): Intl.DateTimeFormatOptions {
  if (mode === "date" || target === "fallback") {
    return {
      ...options,
      timeZone: "UTC",
    };
  }

  return options;
}

function formatDateTime({
  locale,
  mode,
  options,
  target,
  value,
}: Required<DateTimeProps> & { target: "client" | "fallback" }) {
  const date = getDate(value, mode);

  if (!date) {
    return value;
  }

  return new Intl.DateTimeFormat(
    locale,
    getFormatOptions(options, mode, target),
  ).format(date);
}

export default function DateTime({
  locale,
  mode = "instant",
  options = DEFAULT_OPTIONS,
  value,
}: DateTimeProps) {
  const hasHydrated = useSyncExternalStore(
    subscribeToHydration,
    getClientSnapshot,
    getServerSnapshot,
  );
  const target = hasHydrated ? "client" : "fallback";
  const label = useMemo(
    () => formatDateTime({ locale, mode, options, target, value }),
    [locale, mode, options, target, value],
  );

  return (
    <time dateTime={value} suppressHydrationWarning>
      {label}
    </time>
  );
}
