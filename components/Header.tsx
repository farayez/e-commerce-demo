import React from "react";
import {
  View,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { DisplayProperties } from "@/constants/DisplayProperties";

const Header = () => {
  const { width } = useWindowDimensions();

  return (
    <View style={styles.header}>
      {width < DisplayProperties.SMALL_SCREEN_THRESHOLD ? (
        <View style={styles.smallScreenHeader}>
          <View style={styles.topRow}>
            <Image source={require("../assets/images/dummy-logo.png")} style={styles.logo} />
            <View style={styles.icons}>
              <Ionicons name="cart-outline" size={30} color="white" style={styles.icon} />
              <Ionicons name="heart-outline" size={30} color="white" style={styles.icon} />
              <Ionicons name="person-outline" size={30} color="white" style={styles.icon} />
            </View>
          </View>
          <View style={styles.bottomRow}>
            <View style={styles.searchContainerSmall}>
              <TextInput
                style={styles.searchBar}
                placeholder="Search by keyword"
                placeholderTextColor="#888"
              />
              <TouchableOpacity style={styles.searchButton}>
                <Ionicons name="search" size={20} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ) : (
        <View style={styles.largeScreenHeader}>
          <Image source={require("../assets/images/dummy-logo.png")} style={styles.logo} />
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchBar}
              placeholder="Search by keyword"
              placeholderTextColor="#888"
            />
            <TouchableOpacity style={styles.searchButton}>
              <Ionicons name="search" size={20} color="white" />
            </TouchableOpacity>
          </View>
          <View style={styles.icons}>
            <Ionicons name="cart-outline" size={30} color="white" style={styles.icon} />
            <Ionicons name="heart-outline" size={30} color="white" style={styles.icon} />
            <Ionicons name="person-outline" size={30} color="white" style={styles.icon} />
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: "100%",
    backgroundColor: "#007b8f",
    paddingVertical: 12,
  },
  smallScreenHeader: {
    flexDirection: "column",
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  bottomRow: {
    marginTop: 8,
    paddingHorizontal: 10,
  },
  largeScreenHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  logo: {
    width: 120,
    height: 50,
    resizeMode: "contain",
  },
  searchContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 25,
    marginHorizontal: 80,
    paddingHorizontal: 0,
    overflow: "hidden",
    maxWidth: 550,
  },
  searchContainerSmall: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 25,
    marginHorizontal: 10,
    overflow: "hidden",
  },
  cameraIcon: {
    marginRight: 8,
  },
  searchBar: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 10,
    paddingLeft: 20,
    fontSize: 16,
  },
  searchButton: {
    backgroundColor: "black",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },
  searchButtonSmall: {
    backgroundColor: "black",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 25,
  },
  icons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  icon: {
    marginHorizontal: 6,
  },
});

export default Header;
