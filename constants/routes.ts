import { Href } from "expo-router";

export const AppRoutes = {
  SignIn: "/(auth)" as Href,
  SignUp: "/(auth)/sign-up" as Href,

  Home: "/(tabs)" as Href,

  AddTransaction: "/finance/add-transaction" as Href,
  AddGoal: "/goals/add-goal" as Href,
  GoalDetail: "/goals/[id]" as Href
} as const;
