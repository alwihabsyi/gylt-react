import { Href } from "expo-router";

export const AppRoutes = {
  SignIn: "/(auth)" as Href,
  SignUp: "/(auth)/sign-up" as Href,

  Home: "/(tabs)" as Href,

  AddTransaction: "/finance/add-transaction" as Href,
  CategoryTransactions: "/finance/category/[category]",
  Analytics: "/finance/analytics" as Href,
  AddGoal: "/goals/add-goal" as Href,
  GoalDetail: "/goals/[id]" as Href,

  EditProfile: "/settings/edit-profile" as Href,
  PrivacyPolicy: "/settings/privacy-policy" as Href,
  ContactUs: "/settings/contact-us" as Href,
  Support: "/settings/support" as Href,
  DeleteAccount: "/settings/delete-account" as Href
} as const;
