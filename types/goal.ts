export enum GoalInterval {
  Weekly = "weekly",
  Monthly = "monthly",
  Annually = "annually",
}

export enum GoalType {
  Financial = "Financial",
  WellBeing = "Well-Being",
}

export const ALL_GOAL_TYPES = [GoalType.Financial, GoalType.WellBeing];
export const ALL_GOAL_INTERVALS = Object.values(GoalInterval);
