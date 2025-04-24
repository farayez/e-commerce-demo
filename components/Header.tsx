import React from 'react';
import { View, Text, StyleSheet, TextInput, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Header = () => (
  <View style={styles.header}>
    <Image source={require('../assets/images/dummy-logo.png')} style={styles.logo} />
    <TextInput
      style={styles.searchBar}
      placeholder="Search by keyword"
      placeholderTextColor="#888"
    />
    <View style={styles.icons}>
      <Ionicons name="cart-outline" size={24} color="black" style={styles.icon} />
      <Ionicons name="heart-outline" size={24} color="black" style={styles.icon} />
      <Ionicons name="person-outline" size={24} color="black" style={styles.icon} />
    </View>
  </View>
);

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 8, // Reduced horizontal padding
    paddingVertical: 10, // Adjusted vertical padding
    backgroundColor: '#f8f8f8',
    width: '100%',
  },
  logo: {
    width: 80, // Reduced logo width
    height: 30, // Reduced logo height
    resizeMode: 'contain',
  },
  searchBar: {
    flex: 1,
    marginHorizontal: 8, // Reduced margin
    padding: 6, // Adjusted padding
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  icons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  icon: {
    marginHorizontal: 4, // Reduced icon margin
  },
});

export default Header;