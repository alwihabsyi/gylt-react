// app/(tabs)/_layout.tsx
import { HapticTab } from "@/components/haptic-tab";
import { Colors } from "@/constants/theme";
import { useTranslation } from "@/hooks/useTranslation";
import { FontAwesome6, Ionicons, Octicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";

export default function TabLayout() {
  const { t } = useTranslation();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors["light"].tint,
        headerShown: false,
        tabBarButton: HapticTab,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: t("tabs.home"),
          tabBarLabel: t("tabs.home"),
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-sharp" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="finance"
        options={{
          title: t("tabs.finance"),
          tabBarLabel: t("tabs.finance"),
          tabBarIcon: ({ color, size }) => (
            <FontAwesome6
              name="money-bill-transfer"
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="goals"
        options={{
          title: t("tabs.goals"),
          tabBarLabel: t("tabs.goals"),
          tabBarIcon: ({ color, size }) => (
            <Octicons name="goal" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: t("tabs.settings"),
          tabBarLabel: t("tabs.settings"),
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
