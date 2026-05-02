import { formatCurrency, parseFormattedDate } from "@/utils/formatter";
import { GoalInterval, GoalType } from "../types/goal";

export type Goals = {
  id: string;
  userId: string;
  name: string;
  currentAmount: number;
  targetAmount: number;
  intervalType: GoalInterval;
  goalType: GoalType;
  targetDate: string;
  createdAt: string;
};

export function goalProgress(goal: Goals): number {
  if (goal.targetAmount <= 0) return 0;
  return Math.min((goal.currentAmount / goal.targetAmount) * 100, 100);
}

export function intervalTargetAmount(goal: Goals): number {
  const start = parseFormattedDate(goal.createdAt);
  const end = parseFormattedDate(goal.targetDate);

  if (!start || !end || end <= start) return goal.targetAmount;

  let totalIntervals = 1;

  switch (goal.intervalType) {
    case GoalInterval.Weekly:
      const days = Math.floor(
        (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24),
      );
      totalIntervals = Math.max(Math.floor(days / 7), 1);
      break;
    case GoalInterval.Monthly:
      const months =
        (end.getFullYear() - start.getFullYear()) * 12 +
        (end.getMonth() - start.getMonth());
      totalIntervals = Math.max(months, 1);
      break;
    case GoalInterval.Annually:
      totalIntervals = Math.max(end.getFullYear() - start.getFullYear(), 1);
      break;
  }

  return goal.targetAmount / totalIntervals;
}

export function formattedIntervalTarget(goal: Goals): string {
  const value = intervalTargetAmount(goal);
  const intValue = Math.floor(value);

  if (goal.goalType === GoalType.Financial) {
    return formatCurrency(value);
  }

  const unit =
    goal.intervalType === GoalInterval.Weekly
      ? "session"
      : goal.intervalType === GoalInterval.Monthly
        ? "activity"
        : "goal";

  const pluralUnit =
    unit === "activity"
      ? intValue === 1
        ? "activity"
        : "activities"
      : intValue === 1
        ? unit
        : `${unit}s`;

  return `${intValue} ${pluralUnit}`;
}
