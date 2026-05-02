import { GoalInterval } from "@/types/goal";

export const formatCurrency = (amount: number): string => {
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
  const day = date.getDate().toString().padStart(2, "0");
  const month = date.toLocaleString("en-US", { month: "short" });
  const year = date.getFullYear();
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  return `${day} ${month} ${year}, ${hours}.${minutes}`;
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

export function parseFormattedDate(value: string): Date | null {
  // Format: "30 Apr 2026, 10.00"
  const match = value.match(
    /^(\d{1,2})\s([A-Za-z]{3})\s(\d{4}),\s(\d{1,2})\.(\d{2})$/
  );
  if (!match) return null;

  const [, day, monthStr, year, hours, minutes] = match;

  const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];
  const month = monthNames.indexOf(monthStr);
  if (month === -1) return null;

  const date = new Date(
    Number(year),
    month,
    Number(day),
    Number(hours),
    Number(minutes)
  );

  return isNaN(date.getTime()) ? null : date;
}

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
