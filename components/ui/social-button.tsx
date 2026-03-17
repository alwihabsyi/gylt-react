import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

interface SocialButtonProps {
  onPress: () => void;
}

export default function SocialButton({ onPress }: SocialButtonProps) {
  return (
    <TouchableOpacity
      style={styles.googleButton}
      activeOpacity={0.7}
      onPress={onPress}
    >
      <Text style={styles.googleIcon}>G</Text>
      <Text style={styles.googleText}>Continue with Google</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  googleButton: {
    flexDirection: "row",
    width: "100%",
    height: 54,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#D6EDE0",
    justifyContent: "center",
    alignItems: "center",
  },
  googleIcon: {
    color: "#10AC84",
    fontWeight: "900",
    fontSize: 17,
    marginRight: 12,
  },
  googleText: {
    color: "#0D2118",
    fontSize: 14,
    fontWeight: "500",
  },
});
