import { Tabs } from "expo-router";
import { DarkColorScheme, LightColorScheme } from "@/constants/ColorSchemes";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useColorScheme } from "react-native";

export default function Index() {
  let colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        headerTintColor:
          colorScheme != "light"
            ? DarkColorScheme.background
            : LightColorScheme.background,
        tabBarActiveBackgroundColor:
          colorScheme != "light"
            ? DarkColorScheme.primary
            : LightColorScheme.primary,
        tabBarStyle: {
          borderTopWidth: 0,
        },
        tabBarActiveTintColor:
          colorScheme != "light"
            ? DarkColorScheme.accent
            : LightColorScheme.accent,
        tabBarInactiveBackgroundColor:
          colorScheme != "light"
            ? DarkColorScheme.primary
            : LightColorScheme.primary,
      }}
    >
      <Tabs.Screen
        name="(home)/index"
        options={{
          tabBarIcon: ({ color }) => (
            <AntDesign name="home" size={24} color={color} />
          ),
          title: "Home",
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="settings-outline" size={24} color={color} />
          ),
          title: "Settings",
        }}
      />
    </Tabs>
  );
}
