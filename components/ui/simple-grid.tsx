import React from "react";
import { StyleSheet, View } from "react-native";

type SimpleGridProps<T> = {
  items: T[];
  columns: number;
  horizontalSpacing?: number;
  verticalSpacing?: number;
  renderItem: (item: T) => React.ReactNode;
};

export function SimpleGrid<T>({
  items,
  columns,
  horizontalSpacing = 0,
  verticalSpacing = 0,
  renderItem,
}: SimpleGridProps<T>) {
  const rows: T[][] = [];
  for (let i = 0; i < items.length; i += columns) {
    rows.push(items.slice(i, i + columns));
  }

  return (
    <View style={{ gap: verticalSpacing }}>
      {rows.map((rowItems, rowIndex) => (
        <View key={rowIndex} style={[styles.row, { gap: horizontalSpacing }]}>
          {rowItems.map((item, colIndex) => (
            <View key={colIndex} style={styles.cell}>
              {renderItem(item)}
            </View>
          ))}
          {/* Fill empty slots to maintain grid alignment */}
          {Array.from({ length: columns - rowItems.length }).map((_, i) => (
            <View key={`empty-${i}`} style={styles.cell} />
          ))}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    width: "100%",
  },
  cell: {
    flex: 1,
  },
});
