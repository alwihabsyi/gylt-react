import { GoalInterval } from "@/types/goal";

export const toRupiah = (amount: number): string => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 2,
  })
    .format(amount)
    .replace("Rp", "Rp")
    .trim();
};

// ── Dates ────────────────────────────────────────────────────────────────
export const formatDateTime = (date: Date): string => {
  return new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(date);
};

export const getWeekRangeString = (): string => {
  const today = new Date();
  const day = today.getDay() || 7; // Get current day number, converting Sun(0) to 7

  const start = new Date(today);
  start.setDate(today.getDate() - day + 1); // Monday

  const end = new Date(today);
  end.setDate(today.getDate() - day + 7); // Sunday

  const options: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
  };
  const format = (d: Date) => d.toLocaleDateString("en-US", options);

  return `${format(start)} - ${format(end)}`;
};

export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
};

export const getCurrentMonthYear = (): string => {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    year: "numeric",
  }).format(new Date());
};

export const getGoalDuration = (
  start: Date,
  end: Date,
  interval: GoalInterval,
): string => {
  const diffTime = Math.abs(end.getTime() - start.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  switch (interval) {
    case GoalInterval.Weekly:
      const weeks = Math.floor(diffDays / 7);
      return `${weeks} ${weeks === 1 ? "week" : "weeks"}`;
    case GoalInterval.Monthly:
      const months =
        (end.getFullYear() - start.getFullYear()) * 12 +
        (end.getMonth() - start.getMonth());
      return `${months} ${months === 1 ? "month" : "months"}`;
    case GoalInterval.Annually:
      const years = end.getFullYear() - start.getFullYear();
      return `${years} ${years === 1 ? "year" : "years"}`;
  }
};
