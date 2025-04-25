import { useEffect, useState } from "react";
import { Dimensions } from "react-native";
import { Tabs } from "expo-router";
import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";

import { IconSymbol } from "@/components/ui/IconSymbol";
import { useColorScheme } from "@/hooks/useColorScheme";
import { DisplayProperties } from "@/constants/DisplayProperties";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const [isLargeScreen, setIsLargeScreen] = useState(
    Dimensions.get("window").width > DisplayProperties.SMALL_SCREEN_THRESHOLD
  );

  useEffect(() => {
    const updateScreenSize = () => {
      setIsLargeScreen(Dimensions.get("window").width > DisplayProperties.SMALL_SCREEN_THRESHOLD);
    };

    const subscription = Dimensions.addEventListener("change", updateScreenSize);
    return () => subscription?.remove();
  }, []);

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: isLargeScreen
          ? { display: "none" }
          : {
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
              paddingVertical: 10,
              backgroundColor: "#f8f8f8",
              height: 70,
            },
        tabBarLabelPosition: "below-icon",
        tabBarShowLabel: true,
        tabBarLabelStyle: {
          fontSize: 12,
          marginTop: 4,
        },
        tabBarIconStyle: {
          alignItems: "center",
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="category"
        options={{
          title: "Category",
          tabBarIcon: ({ color }) => <Ionicons name="grid-outline" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: "Account",
          tabBarIcon: ({ color }) => <Ionicons name="person-outline" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="call"
        options={{
          title: "Call",
          tabBarIcon: ({ color }) => <Ionicons name="call-outline" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Chat",
          tabBarIcon: ({ color }) => <Ionicons name="chatbubble-outline" size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}
