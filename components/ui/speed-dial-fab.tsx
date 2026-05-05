import { Palette, type SemanticColorScheme } from "@/constants/theme";
import { useSemanticColors } from "@/hooks/use-semantic-colors";
import { Ionicons } from "@expo/vector-icons";
import React, { useRef, useState } from "react";
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface SpeedDialFabProps {
  onAddTransactionClick: () => void;
  onViewStatsClick: () => void;
}

export default function SpeedDialFab({
  onAddTransactionClick,
  onViewStatsClick,
}: SpeedDialFabProps) {
  const colors = useSemanticColors();
  const [expanded, setExpanded] = useState(false);
  const animation = useRef(new Animated.Value(0)).current;

  const toggleDial = () => {
    const toValue = expanded ? 0 : 1;
    Animated.spring(animation, {
      toValue,
      friction: 5,
      useNativeDriver: true,
    }).start();
    setExpanded(!expanded);
  };

  const rotation = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "45deg"],
  });
  const translateY = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [20, 0],
  });

  return (
    <View style={styles.container}>
      {/* Sub-options */}
      <Animated.View
        style={[
          styles.optionsContainer,
          { opacity: animation, transform: [{ translateY }] },
        ]}
        pointerEvents={expanded ? "auto" : "none"}
      >
        <Option
          colors={colors}
          text="Analytics"
          icon="stats-chart"
          onPress={() => {
            toggleDial();
            onViewStatsClick();
          }}
        />
        <Option
          colors={colors}
          text="Add Transaction"
          icon="receipt"
          onPress={() => {
            toggleDial();
            onAddTransactionClick();
          }}
        />
      </Animated.View>

      {/* Main FAB */}
      <TouchableOpacity activeOpacity={0.8} onPress={toggleDial}>
        <Animated.View
          style={[styles.fab, { transform: [{ rotate: rotation }], shadowColor: colors.shadow }]}
        >
          <Ionicons name="add" size={32} color={colors.inverseOnAccent} />
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
}

// Small helper component for the sub-options
const Option = ({
  colors,
  text,
  icon,
  onPress,
}: {
  colors: SemanticColorScheme;
  text: string;
  icon: React.ComponentProps<typeof Ionicons>["name"];
  onPress: () => void;
}) => (
  <View style={styles.optionRow}>
    <View
      style={[
        styles.optionLabel,
        {
          backgroundColor: colors.fabLabelBg,
          borderColor: colors.fabLabelBorder,
        },
      ]}
    >
      <Text style={[styles.optionText, { color: colors.fabLabelText }]}>
        {text}
      </Text>
    </View>
    <TouchableOpacity style={styles.smallFab} onPress={onPress}>
      <Ionicons name={icon} size={20} color={colors.inverseOnAccent} />
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 20,
    right: 20,
    alignItems: "flex-end",
  },
  optionsContainer: { alignItems: "flex-end", marginBottom: 16, gap: 12 },
  optionRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  optionLabel: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
  },
  optionText: { fontSize: 14, fontWeight: "500" },
  smallFab: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: Palette.EmeraldGreen,
    justifyContent: "center",
    alignItems: "center",
  },
  fab: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: Palette.EmeraldGreen,
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
});
