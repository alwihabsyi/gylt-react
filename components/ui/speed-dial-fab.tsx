import { Palette } from "@/constants/theme";
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
          text="Analytics"
          icon="stats-chart"
          onPress={() => {
            toggleDial();
            onViewStatsClick();
          }}
        />
        <Option
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
          style={[styles.fab, { transform: [{ rotate: rotation }] }]}
        >
          <Ionicons name="add" size={32} color="#FFF" />
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
}

// Small helper component for the sub-options
const Option = ({
  text,
  icon,
  onPress,
}: {
  text: string;
  icon: any;
  onPress: () => void;
}) => (
  <View style={styles.optionRow}>
    <View style={styles.optionLabel}>
      <Text style={styles.optionText}>{text}</Text>
    </View>
    <TouchableOpacity style={styles.smallFab} onPress={onPress}>
      <Ionicons name={icon} size={20} color="#FFF" />
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
    backgroundColor: "#FFF",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
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
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
});
