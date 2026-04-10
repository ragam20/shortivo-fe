import type { DateRange } from "react-day-picker";
import type { DateRange as Range } from "@/types/types";

export function getLast7DaysRange(): Range {
  const now = new Date();

  const from = new Date();
  from.setDate(now.getDate() - 7);

  return {
    from: from.toISOString(),
    to: now.toISOString(),
  };
}

export function formatDateTimeCompact(date: Date): string {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const dayName = days[date.getDay()];
  const month = months[date.getMonth()];
  const day = String(date.getDate()).padStart(2, "0");
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${dayName} ${month} ${day} ${year} ${hours}:${minutes}`;
}

export function formatDateToString(date: Date, separator: string): string {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${year}${separator}${month}${separator}${day}`;
}

export function toDateRange(value: string): { from: Date; to: Date } {
  const to = new Date();
  const from = new Date();

  const amount = parseInt(value);
  const unit = value.replace(/[0-9]/g, "");

  switch (unit) {
    case "h":
      from.setHours(from.getHours() - amount);
      break;
    case "d":
      from.setDate(from.getDate() - amount);
      break;
  }

  return { from, to };
}

export function toDateTimeRangeISOString(range: DateRange) {
  if (!range.from) {
    return {};
  }

  const from = new Date(range.from);
  from.setHours(0, 0, 0, 0);

  let to: Date | undefined;

  if (range.to) {
    to = new Date(range.to);
    to.setHours(23, 59, 59, 999);
  }

  return {
    from: from.toISOString(),
    to: to?.toISOString(),
  };
}

export function formatDateMMYY(dateStr: string) {
  const date = new Date(dateStr);
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${month}/${day}`;
}

export function isValidDateRange(
  from: Date | undefined | null,
  to: Date | undefined | null,
): boolean {
  if (!from || !to) {
    return true;
  }

  const diffInMs = to.getTime() - from.getTime();
  const diffInDays = diffInMs / (1000 * 60 * 60 * 24);

  return diffInDays <= 90;
}
