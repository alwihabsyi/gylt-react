import { Href } from "expo-router";

export const AppRoutes = {
  SignIn: "/(auth)" as Href,
  SignUp: "/(auth)/sign-up" as Href,

  Home: "/(tabs)" as Href,
} as const;
