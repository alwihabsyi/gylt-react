import { CategoryType } from "./category";

export enum ActivityType {
  Income = "income",
  Expense = "expense",
}

export interface Activity {
  id: string;
  userId: string;
  name: string;
  type: ActivityType;
  category: CategoryType;
  amount: number;
  createdAt: string;
}

export const ALL_ACTIVITY_TYPES = Object.values(ActivityType);
