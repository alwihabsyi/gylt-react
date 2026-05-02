import { Stack } from "expo-router";
import React from "react";

export default function GoalsLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="add-goal" />
      <Stack.Screen name="[id]" />
    </Stack>
  );
}
