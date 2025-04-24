import React from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const products = [
  { id: '1', name: 'Product 1', price: '$10', image: require('../../assets/images/sample-product-1.png') },
  { id: '2', name: 'Product 2', price: '$20', image: require('../../assets/images/sample-product-2.png') },
  { id: '3', name: 'Product 3', price: '$30', image: require('../../assets/images/sample-product-3.png') },
];

interface Product {
  id: string;
  name: string;
  price: string;
  image: any;
}

const Header = () => (
  <View style={styles.header}>
    <Image source={require('../../assets/images/dummy-logo.png')} style={styles.headerLogo} />
    <TextInput
      style={styles.searchBar}
      placeholder="Search by keyword"
      placeholderTextColor="#888"
    />
    <View style={styles.headerIcons}>
      <Ionicons name="cart-outline" size={24} color="black" style={styles.icon} />
      <Ionicons name="heart-outline" size={24} color="black" style={styles.icon} />
      <Ionicons name="person-outline" size={24} color="black" style={styles.icon} />
    </View>
  </View>
);

const HomePage = () => {
  const renderProduct = ({ item }: { item: Product }) => (
    <TouchableOpacity style={styles.productCard}>
      <Image source={item.image} style={styles.productImage} />
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productPrice}>{item.price}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.productList}
        numColumns={2}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f8f8f8',
  },
  headerLogo: {
    width: 100,
    height: 40,
    resizeMode: 'contain',
  },
  searchBar: {
    flex: 1,
    marginHorizontal: 10,
    padding: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  headerIcons: {
    flexDirection: 'row',
  },
  icon: {
    marginHorizontal: 5,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    backgroundColor: '#f8f8f8',
  },
  footerTab: {
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    marginTop: 4,
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  productList: {
    paddingBottom: 16,
  },
  productCard: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 16,
    margin: 8,
    alignItems: 'center',
  },
  productImage: {
    width: 100,
    height: 100,
    marginBottom: 8,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 14,
    color: '#888',
  },
});

export default HomePage;
