import { CategoryType } from "./category";

export enum ActivityType {
  Income = "income",
  Expense = "expense",
}

export interface Activity {
  name: string;
  type: ActivityType;
  category: CategoryType;
  amount: number;
  createdAt: Date;
}

export const ALL_ACTIVITY_TYPES = Object.values(ActivityType);
