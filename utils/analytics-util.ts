import { MonthFilter } from "@/components/finance/month-filter-chip";
import { Activity } from "@/types/activity";
import { parseFormattedDate } from "./formatter";

export function matchesDateFilter(item: Activity, filter: MonthFilter): boolean {
  const d = parseFormattedDate(item.createdAt);
  if (!d) return false;
  if (d.getFullYear() !== filter.year) return false;
  if (filter.month !== null && d.getMonth() !== filter.month) return false;
  return true;
}