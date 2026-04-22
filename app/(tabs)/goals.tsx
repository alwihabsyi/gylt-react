import { StyleSheet, Text, View } from "react-native";

export default function GoalsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Goals Screen Coming Soon!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2FAF4", // Your Canvas color
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#0D2118", // Your InkDark color
  },
});
