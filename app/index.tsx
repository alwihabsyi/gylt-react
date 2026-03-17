import { AppRoutes } from "@/constants/routes";
import { Redirect } from "expo-router";

export default function RootIndex() {
  // Eventually, you will check your Zustand store here:
  // const { user } = useAuthStore();
  // if (user) return <Redirect href="/(tabs)" />;

  // For now, redirect straight to our shiny new login screen
  return <Redirect href={AppRoutes.SignIn} />;
}
