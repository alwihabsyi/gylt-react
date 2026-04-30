import { Activity, ActivityType } from "@/types/activity";

export function sumByType(items: Activity[], type: ActivityType): number {
  return items
    .filter((item) => item.type === type)
    .reduce((sum, item) => sum + item.amount, 0);
}

export function getTotals(items: Activity[]): { income: number; expense: number } {
  return {
    income: sumByType(items, ActivityType.Income),
    expense: sumByType(items, ActivityType.Expense),
  };
}