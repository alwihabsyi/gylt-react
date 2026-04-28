import { AppRoutes } from "@/constants/routes";
import { useAppSelector } from "@/store/hooks";
import { Redirect } from "expo-router";

export default function RootIndex() {
  const userId = useAppSelector((state) => state.auth.userId);
  return <Redirect href={userId ? AppRoutes.Home : AppRoutes.SignIn} />;
}
