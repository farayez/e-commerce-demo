import React, { useMemo } from "react";
import { View, StyleSheet, useWindowDimensions, ViewStyle } from "react-native";
import { ThemedText } from "./ThemedText";
import { DisplayProperties } from "@/constants/DisplayProperties";

interface ExhibitionPanelProps<T> {
  data: T[];
  renderItem: (item: T) => React.ReactNode;
  title: string;
  style?: ViewStyle;
  minCardWidth?: number;
  maxCardWidth?: number;
}

export function ExhibitionPanel<T>({
  data,
  renderItem,
  title,
  style,
  minCardWidth = DisplayProperties.EXHIBITION_PANEL_PLACEHOLDER_DEFAULT_MIN_WIDTH,
  maxCardWidth = DisplayProperties.EXHIBITION_PANEL_PLACEHOLDER_DEFAULT_MAX_WIDTH,
}: ExhibitionPanelProps<T>) {
  const { width } = useWindowDimensions();

  // Calculate number of columns based on container width and card width constraints
  const numColumns = useMemo(() => {
    const containerWidth = width - 32; // Account for container padding
    const minColumns = Math.floor(containerWidth / maxCardWidth);
    const maxColumns = Math.floor(containerWidth / minCardWidth);
    return Math.max(1, Math.min(maxColumns, Math.max(minColumns, 1)));
  }, [width, minCardWidth, maxCardWidth]);

  // Calculate number of placeholder items needed to fill the last row
  const placeholderCount = useMemo(() => {
    if (data.length === 0) return 0;
    const remainder = data.length % numColumns;
    return remainder === 0 ? 0 : numColumns - remainder;
  }, [data.length, numColumns]);

  // Generate array of placeholder elements
  const placeholders = useMemo(
    () =>
      Array(placeholderCount)
        .fill(null)
        .map((_, index) => (
          <View
            key={`placeholder-${index}`}
            style={[styles.cardContainer, { minWidth: minCardWidth, maxWidth: maxCardWidth }]}
          />
        )),
    [placeholderCount, minCardWidth, maxCardWidth],
  );

  return (
    <View style={[styles.container, style]}>
      <ThemedText type="subtitle" style={styles.title}>
        {title}
      </ThemedText>
      <View style={styles.grid}>
        {data.map((item, index) => (
          <View
            key={index}
            style={[styles.cardContainer, { minWidth: minCardWidth, maxWidth: maxCardWidth }]}
          >
            {renderItem(item)}
          </View>
        ))}
        {placeholders}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 16,
  },
  title: {
    marginBottom: 16,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    gap: 2,
  },
  cardContainer: {
    flex: 1,
    padding: 1,
  },
});
