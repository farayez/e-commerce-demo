import React, { useRef, useState } from "react";
import { View, FlatList, TouchableOpacity, StyleSheet, useWindowDimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface CarouselListProps<T> {
  data: T[];
  renderItem: ({ item }: { item: T }) => JSX.Element;
  itemWidth?: number;
  keyExtractor?: (item: T) => string;
  widthCutoff?: number;
}

const CarouselList = <T extends any>({
  data,
  renderItem,
  itemWidth = 200,
  keyExtractor = (item: any) => item.id,
  widthCutoff = 768,
}: CarouselListProps<T>) => {
  const { width: screenWidth } = useWindowDimensions();
  const flatListRef = useRef<FlatList>(null);
  const [scrollOffset, setScrollOffset] = useState(0);
  const [contentWidth, setContentWidth] = useState(0);

  const isCarouselMode = screenWidth >= widthCutoff;

  // Calculate the number of items that can fit on screen
  const itemsPerScreen = Math.floor(screenWidth / itemWidth);
  // Calculate padding needed to center items
  const totalItemWidth = itemsPerScreen * itemWidth;
  const horizontalPadding = Math.max(0, (screenWidth - totalItemWidth) / 2);

  const scrollToOffset = (forward: boolean) => {
    if (flatListRef.current) {
      const newOffset = forward
        ? Math.min(scrollOffset + itemWidth, contentWidth - screenWidth + 20)
        : Math.max(0, scrollOffset - itemWidth);
      flatListRef.current.scrollToOffset({
        offset: newOffset,
        animated: true,
      });
      setScrollOffset(newOffset);
    }
  };

  const handleScroll = (event: { nativeEvent: { contentOffset: { x: number } } }) => {
    setScrollOffset(event.nativeEvent.contentOffset.x);
  };

  const handleContentSizeChange = (w: number) => {
    setContentWidth(w);
  };

  return (
    <View style={styles.container}>
      {isCarouselMode && (
        <View style={styles.carouselControls}>
          {scrollOffset > 0 && (
            <TouchableOpacity
              style={[styles.carouselButton, styles.backButton]}
              onPress={() => scrollToOffset(false)}
            >
              <Ionicons name="chevron-back" size={24} color="#333" />
            </TouchableOpacity>
          )}

          {scrollOffset < contentWidth - screenWidth + 20 && (
            <TouchableOpacity
              style={[styles.carouselButton, styles.forwardButton]}
              onPress={() => scrollToOffset(true)}
            >
              <Ionicons name="chevron-forward" size={24} color="#333" />
            </TouchableOpacity>
          )}
        </View>
      )}
      <FlatList
        ref={flatListRef}
        key={isCarouselMode ? "carousel" : "grid"}
        data={data}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        numColumns={isCarouselMode ? 1 : 3}
        horizontal={isCarouselMode}
        scrollEnabled={isCarouselMode}
        showsHorizontalScrollIndicator={false}
        onScroll={isCarouselMode ? handleScroll : undefined}
        scrollEventThrottle={16}
        onContentSizeChange={isCarouselMode ? handleContentSizeChange : undefined}
        contentContainerStyle={isCarouselMode && styles.listCarousel}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    width: "100%",
  },
  listCarousel: {
    flexGrow: 1,
    justifyContent: "center",
  },
  carouselControls: {
    position: "absolute",
    top: "50%",
    left: 0,
    right: 0,
    zIndex: 1,
    pointerEvents: "box-none",
  },
  carouselButton: {
    position: "absolute",
    top: -20,
    backgroundColor: "#fff",
    borderRadius: 50,
    padding: 8,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  backButton: {
    left: 5,
  },
  forwardButton: {
    right: 5,
  },
});

export default CarouselList;
