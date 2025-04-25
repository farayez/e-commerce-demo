import React from "react";
import { View, Text, StyleSheet } from "react-native";

const CallScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to the Call Page!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default CallScreen;
