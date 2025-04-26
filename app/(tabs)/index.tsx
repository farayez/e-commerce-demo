import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import CarouselList from "@/components/CarouselList";
import { ExhibitionPanel } from "@/components/ExhibitionPanel";
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

interface Category {
  id: string;
  name: string;
  icon: any;
}

interface Product {
  id: string;
  name: string;
  price: string;
  originalPrice?: string;
  image: any;
  soldCount?: number;
}

const products = [
  {
    id: "1",
    name: "Premium Headphones",
    price: "$199",
    originalPrice: "$219",
    image: require("../../assets/images/sample-product-1.png"),
    soldCount: 162,
  },
  {
    id: "2",
    name: "Smart Watch",
    price: "$299",
    originalPrice: "$329",
    image: require("../../assets/images/sample-product-2.png"),
    soldCount: 89,
  },
  {
    id: "3",
    name: "Wireless Earbuds",
    price: "$159",
    image: require("../../assets/images/sample-product-3.png"),
  },
  {
    id: "4",
    name: "Gaming Headset",
    price: "$179",
    image: require("../../assets/images/sample-product-1.png"),
  },
  {
    id: "5",
    name: "Fitness Tracker",
    price: "$129",
    image: require("../../assets/images/sample-product-2.png"),
  },
  {
    id: "6",
    name: "Sport Earbuds",
    price: "$149",
    image: require("../../assets/images/sample-product-3.png"),
  },
  {
    id: "7",
    name: "Pro Headphones",
    price: "$249",
    image: require("../../assets/images/sample-product-1.png"),
  },
  {
    id: "8",
    name: "Digital Watch",
    price: "$199",
    image: require("../../assets/images/sample-product-2.png"),
  },
  {
    id: "9",
    name: "Noise Cancelling Buds",
    price: "$189",
    image: require("../../assets/images/sample-product-3.png"),
  },
  {
    id: "10",
    name: "Studio Headphones",
    price: "$279",
    image: require("../../assets/images/sample-product-1.png"),
  },
];

const HomePage = () => {
  const renderCategory = ({ item }: { item: Category }) => (
    <TouchableOpacity style={styles.categoryItem}>
      <View style={styles.categoryIconContainer}>
        <Image source={item.icon} style={styles.categoryIcon} />
      </View>
      <Text style={styles.categoryName}>{item.name}</Text>
    </TouchableOpacity>
  );

  const renderProduct = (item: Product) => (
    <TouchableOpacity style={styles.productCard}>
      <View style={styles.imageContainer}>
        <Image source={item.image} style={styles.productImage} resizeMode="contain" />
      </View>
      <View style={styles.productDetails}>
        <Text style={styles.productName} numberOfLines={2}>
          {item.name}
        </Text>
        <View style={styles.priceContainer}>
          <Text style={styles.productPrice}>{item.price}</Text>
          {item.originalPrice && <Text style={styles.originalPrice}>{item.originalPrice}</Text>}
        </View>
        {item.soldCount && <Text style={styles.soldCount}>SOLD: {item.soldCount}</Text>}
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.categoriesContainer}>
        <CarouselList
          data={categories}
          renderItem={renderCategory}
          itemWidth={180}
          widthCutoff={DisplayProperties.SMALL_SCREEN_THRESHOLD}
        />
      </View>

      <ExhibitionPanel
        data={products}
        renderItem={renderProduct}
        title="Popular Products"
        minCardWidth={200}
        maxCardWidth={230}
      />
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
    alignItems: "center",
    justifyContent: "center",
  },
  categoryItem: {
    flex: 1,
    alignItems: "center",
    padding: 10,
    width: "33.33%",
  },
  categoryIconContainer: {
    width: 140,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  categoryIcon: {
    width: 100,
    height: 100,
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
    height: 320,
    backgroundColor: "#ffffff",
    borderRadius: 8,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#eee",
  },
  imageContainer: {
    height: 200,
    width: "100%",
    backgroundColor: "#f6f6f6",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
  },
  productImage: {
    width: "80%",
    height: "80%",
  },
  productDetails: {
    padding: 12,
    flex: 1,
    justifyContent: "space-between",
  },
  productName: {
    fontSize: 14,
    color: "#333",
    marginBottom: 8,
    lineHeight: 20,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 16,
    color: "#e41749",
    fontWeight: "600",
  },
  originalPrice: {
    fontSize: 14,
    textDecorationLine: "line-through",
    color: "#999",
  },
  soldCount: {
    fontSize: 12,
    color: "#999",
  },
});

export default HomePage;
