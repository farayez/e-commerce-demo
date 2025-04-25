import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";

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
  const renderCategory = ({ item }: { item: Category }) => (
    <TouchableOpacity style={styles.categoryItem}>
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
        <FlatList
          data={categories}
          renderItem={renderCategory}
          keyExtractor={(item) => item.id}
          numColumns={3}
          scrollEnabled={false}
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
  },
  categoryItem: {
    flex: 1,
    alignItems: "center",
    padding: 10,
    width: "33.33%",
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
});

export default HomePage;
