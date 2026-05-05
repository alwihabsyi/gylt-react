import { authService } from "@/services/authService";
import { store } from "@/store";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { clearUser, getUserData } from "@/store/slices/authSlice";
import { setDarkMode } from "@/store/slices/themeSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import "react-native-reanimated";
import { Provider } from "react-redux";

const DARK_MODE_KEY = "gylt_dark_mode";

function RootLayoutNav() {
  const dispatch = useAppDispatch();
  const darkMode = useAppSelector((state) => state.theme.darkMode);
  const [authReady, setAuthReady] = useState(false);

  // Load persisted theme on mount
  useEffect(() => {
    AsyncStorage.getItem(DARK_MODE_KEY).then((val) => {
      if (val !== null) dispatch(setDarkMode(val === "true"));
    });
  }, [dispatch]);

  // Persist theme whenever it changes
  useEffect(() => {
    AsyncStorage.setItem(DARK_MODE_KEY, String(darkMode));
  }, [darkMode]);

  useEffect(() => {
    const unsubscribe = authService.onAuthStateChanged((user) => {
      if (user) {
        dispatch(getUserData(user.uid));
      } else {
        dispatch(clearUser());
      }

      setAuthReady(true);
    });

    return () => unsubscribe();
  }, [dispatch]);

  if (!authReady) return null;

  return (
    <ThemeProvider value={darkMode ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="finance" options={{ headerShown: false }} />
        <Stack.Screen name="goals" options={{ headerShown: false }} />
        <Stack.Screen name="settings" options={{ headerShown: false }} />
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