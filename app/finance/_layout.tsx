// app/(tabs)/_layout.tsx
import { Stack } from "expo-router";
import React from "react";

export default function FinanceLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="add-transaction" />
    </Stack>
  );
}
