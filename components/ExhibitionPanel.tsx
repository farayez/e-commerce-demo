import React from "react";
import { View, StyleSheet, useWindowDimensions, ViewStyle } from "react-native";
import { ThemedText } from "./ThemedText";

interface ExhibitionPanelProps<T> {
  data: T[];
  renderItem: (item: T) => React.ReactNode;
  title: string;
  minCardWidth: number;
  maxCardWidth: number;
  style?: ViewStyle;
}

export function ExhibitionPanel<T>({
  data,
  renderItem,
  title,
  minCardWidth,
  maxCardWidth,
  style,
}: ExhibitionPanelProps<T>) {
  const { width } = useWindowDimensions();

  // Calculate number of columns based on container width and card width constraints
  const calculateColumns = () => {
    const maxColumns = Math.floor(width / minCardWidth);
    const minColumns = Math.ceil(width / maxCardWidth);
    return Math.max(1, Math.min(maxColumns, Math.max(minColumns, 1)));
  };

  const columns = calculateColumns();
  const cardWidth = Math.min(maxCardWidth, width / columns);

  return (
    <View style={[styles.container, style]}>
      <ThemedText type="subtitle" style={styles.title}>
        {title}
      </ThemedText>
      <View style={styles.grid}>
        {data.map((item, index) => (
          <View key={index} style={[styles.cardContainer, { width: cardWidth }]}>
            {renderItem(item)}
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    width: "100%",
    padding: 0,
  },
  title: {
    marginBottom: 16,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
  },
  cardContainer: {
    padding: 1,
  },
});
