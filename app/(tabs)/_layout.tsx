import { Tabs } from "expo-router";
import { DarkColorScheme, LightColorScheme } from "@/constants/ColorSchemes";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useColorScheme } from "react-native";
import CurrencyContext from "@/contexts/CurrencyContext";
import useCurrency from "@/hooks/useCurrency";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export default function Index() {
  let colorScheme = useColorScheme();

  const [currentCurrency, setCurrency, setCurrencyStored] = useCurrency();

  return (
    <CurrencyContext.Provider
      value={{ currentCurrency, setCurrency, setCurrencyStored }}
    >
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
          name="index"
          options={{
            tabBarIcon: ({ color }) => (
              <AntDesign name="home" size={24} color={color} />
            ),
            title: "Home",
          }}
        />
        <Tabs.Screen
          name="convert"
          options={{
            tabBarIcon: ({ color }) => (
              <FontAwesome name="balance-scale" size={24} color={color} />
            ),
            title: "Convert",
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
    </CurrencyContext.Provider>
  );
}
