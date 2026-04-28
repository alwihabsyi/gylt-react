import { useColorScheme } from "@/hooks/use-color-scheme";
import { authService } from "@/services/authService";
import { store } from "@/store";
import { useAppDispatch } from "@/store/hooks";
import { clearUser, setUser } from "@/store/slices/authSlice";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import "react-native-reanimated";
import { Provider } from "react-redux";

function RootLayoutNav() {
  const dispatch = useAppDispatch();
  const colorScheme = useColorScheme();
  const [authReady, setAuthReady] = useState(false);

  useEffect(() => {
    const unsubscribe = authService.onAuthStateChanged((user) => {
      if (user) {
        dispatch(
          setUser({ userId: user.uid, email: user.email, fullName: null }),
        );
      } else {
        dispatch(clearUser());
      }
      setAuthReady(true);
    });
    return () => unsubscribe();
  }, [dispatch]);

  if (!authReady) return null;

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="finance" options={{ headerShown: false }} />
        <Stack.Screen name="goals" options={{ headerShown: false }} />
      </Stack>
    </ThemeProvider>
  );
}

export default function RootLayout() {
  return (
    <Provider store={store}>
      <RootLayoutNav />
    </Provider>
  );
}
