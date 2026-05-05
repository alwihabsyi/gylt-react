import { Palette } from "@/constants/theme";
import { useSemanticColors } from "@/hooks/use-semantic-colors";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type AppTabLayoutProps = {
  tabNames: string[];
  renderContent: (selectedIndex: number) => React.ReactNode;
};

export function AppTabLayout({ tabNames, renderContent }: AppTabLayoutProps) {
  const colors = useSemanticColors();
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <View style={styles.wrapper}>
      <View style={styles.tabRow}>
        {tabNames.map((name, index) => {
          const isSelected = selectedIndex === index;
          return (
            <TouchableOpacity
              key={name}
              style={styles.tab}
              onPress={() => setSelectedIndex(index)}
              activeOpacity={0.8}
            >
              <Text
                style={[
                  styles.tabText,
                  {
                    color: isSelected ? Palette.EmeraldGreen : colors.tabInactive,
                  },
                ]}
              >
                {name}
              </Text>
              {isSelected && <View style={styles.indicator} />}
            </TouchableOpacity>
          );
        })}
      </View>

      <View style={[styles.divider, { backgroundColor: colors.border }]} />

      {renderContent(selectedIndex)}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  tabRow: {
    flexDirection: "row",
  },
  tab: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 14,
    gap: 0,
  },
  tabText: {
    fontSize: 16,
    fontWeight: "600",
  },
  indicator: {
    position: "absolute",
    bottom: 0,
    width: 100,
    height: 3,
    borderRadius: 2,
    backgroundColor: Palette.EmeraldGreen,
  },
  divider: {
    height: 1,
  },
});
