import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
  useWindowDimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { DisplayProperties } from "@/constants/DisplayProperties";

const categories = [
  { id: "1", name: "Bags", icon: require("../../assets/icons/categories/bag.png") },
  { id: "2", name: "Jewelry", icon: require("../../assets/icons/categories/jewelry.png") },
  { id: "3", name: "Shoes", icon: require("../../assets/icons/categories/shoes.png") },
  { id: "4", name: "Beauty Products", icon: require("../../assets/icons/categories/beauty.png") },
  {
    id: "5",
    name: "Mens Clothing",
    icon: require("../../assets/icons/categories/mens-clothing.png"),
  },
  {
    id: "6",
    name: "Womens Clothing",
    icon: require("../../assets/icons/categories/womens-clothing.png"),
  },
  { id: "7", name: "Baby Items", icon: require("../../assets/icons/categories/baby.png") },
  { id: "8", name: "Eyewear", icon: require("../../assets/icons/categories/eyewear.png") },
  {
    id: "9",
    name: "Phone Accessories",
    icon: require("../../assets/icons/categories/phone-accessories.png"),
  },
  { id: "10", name: "Watches", icon: require("../../assets/icons/categories/watches.png") },
  { id: "11", name: "Groceries", icon: require("../../assets/icons/categories/groceries.png") },
  { id: "12", name: "Electronics", icon: require("../../assets/icons/categories/electronics.png") },
];

const products = [
  {
    id: "1",
    name: "Product 1",
    price: "$10",
    image: require("../../assets/images/sample-product-1.png"),
  },
  {
    id: "2",
    name: "Product 2",
    price: "$20",
    image: require("../../assets/images/sample-product-2.png"),
  },
  {
    id: "3",
    name: "Product 3",
    price: "$30",
    image: require("../../assets/images/sample-product-3.png"),
  },
];

interface Category {
  id: string;
  name: string;
  icon: any;
}

interface Product {
  id: string;
  name: string;
  price: string;
  image: any;
}

const HomePage = () => {
  const { width } = useWindowDimensions();
  const [isLargeScreen, setIsLargeScreen] = useState(
    width > DisplayProperties.SMALL_SCREEN_THRESHOLD,
  );
  const flatListRef = useRef<FlatList>(null);
  const [scrollOffset, setScrollOffset] = useState(0);
  const [contentWidth, setContentWidth] = useState(0);
  const ITEM_WIDTH = 200;

  useEffect(() => {
    const updateScreenSize = () => {
      setIsLargeScreen(width > DisplayProperties.SMALL_SCREEN_THRESHOLD);
    };
    updateScreenSize();
  }, [width]);

  const scrollToOffset = (forward: boolean) => {
    if (flatListRef.current) {
      const newOffset = forward
        ? Math.min(scrollOffset + ITEM_WIDTH, contentWidth - width + 20)
        : Math.max(0, scrollOffset - ITEM_WIDTH);
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

  const renderCategory = ({ item }: { item: Category }) => (
    <TouchableOpacity style={[styles.categoryItem, isLargeScreen && styles.categoryItemLarge]}>
      <View style={styles.categoryIconContainer}>
        <Image source={item.icon} style={styles.categoryIcon} />
      </View>
      <Text style={styles.categoryName}>{item.name}</Text>
    </TouchableOpacity>
  );

  const renderProduct = ({ item }: { item: Product }) => (
    <TouchableOpacity style={styles.productCard}>
      <Image source={item.image} style={styles.productImage} />
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productPrice}>{item.price}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.categoriesContainer}>
        {isLargeScreen && (
          <View style={styles.carouselControls}>
            {scrollOffset > 0 && (
              <TouchableOpacity
                style={[styles.carouselButton, styles.backButton]}
                onPress={() => scrollToOffset(false)}
              >
                <Ionicons name="chevron-back" size={24} color="#333" />
              </TouchableOpacity>
            )}

            {scrollOffset < contentWidth - width + 20 && (
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
          key={isLargeScreen ? "carousel" : "grid"}
          data={categories}
          renderItem={renderCategory}
          keyExtractor={(item) => item.id}
          numColumns={isLargeScreen ? 1 : 3}
          horizontal={isLargeScreen}
          scrollEnabled={isLargeScreen}
          showsHorizontalScrollIndicator={false}
          onScroll={isLargeScreen ? handleScroll : undefined}
          scrollEventThrottle={16}
          onContentSizeChange={isLargeScreen ? handleContentSizeChange : undefined}
          contentContainerStyle={isLargeScreen && styles.categoriesCarousel}
        />
      </View>

      <View style={styles.productsSection}>
        <Text style={styles.sectionTitle}>Popular Products</Text>
        <FlatList
          data={products}
          renderItem={renderProduct}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.productList}
          numColumns={2}
          scrollEnabled={false}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#f8f8f8",
  },
  headerLogo: {
    width: 100,
    height: 40,
    resizeMode: "contain",
  },
  searchBar: {
    flex: 1,
    marginHorizontal: 10,
    padding: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  headerIcons: {
    flexDirection: "row",
  },
  icon: {
    marginHorizontal: 5,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
    backgroundColor: "#f8f8f8",
  },
  footerTab: {
    alignItems: "center",
  },
  footerText: {
    fontSize: 12,
    marginTop: 4,
  },
  categoriesContainer: {
    padding: 10,
    marginBottom: 20,
    position: "relative",
  },
  categoryItem: {
    flex: 1,
    alignItems: "center",
    padding: 10,
    width: "33.33%",
  },
  categoryItemLarge: {
    width: 180,
    marginHorizontal: 10,
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
    padding: 15,
  },
  categoriesCarousel: {
    paddingHorizontal: 10,
  },
  categoryIconContainer: {
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  categoryIcon: {
    width: 40,
    height: 40,
    resizeMode: "contain",
  },
  categoryName: {
    fontSize: 12,
    textAlign: "center",
    color: "#333",
  },
  productsSection: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    marginLeft: 16,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  productList: {
    paddingHorizontal: 8,
    paddingBottom: 16,
  },
  productCard: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    padding: 16,
    margin: 8,
    alignItems: "center",
  },
  productImage: {
    width: 100,
    height: 100,
    marginBottom: 8,
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 14,
    color: "#888",
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

export default HomePage;
