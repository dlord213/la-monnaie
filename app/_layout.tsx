import { DarkColorScheme, LightColorScheme } from "@/constants/ColorSchemes";
import {
  WorkSans_100Thin,
  WorkSans_300Light,
  WorkSans_400Regular,
  WorkSans_600SemiBold,
  WorkSans_700Bold,
  WorkSans_900Black,
} from "@expo-google-fonts/work-sans";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import { useColorScheme } from "react-native";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    WorkSans_100Thin,
    WorkSans_300Light,
    WorkSans_400Regular,
    WorkSans_600SemiBold,
    WorkSans_700Bold,
    WorkSans_900Black,
  });

  let colorScheme = useColorScheme();

  // Header colors
  const isDarkScheme = colorScheme != "light";

  const headerBackgroundColor = isDarkScheme
    ? DarkColorScheme.background
    : LightColorScheme.background;

  const statusBarColor = isDarkScheme
    ? DarkColorScheme.background
    : LightColorScheme.background;

  const headerTintColor = isDarkScheme
    ? DarkColorScheme.background
    : LightColorScheme.background;

  const navigationBarColor = isDarkScheme
    ? DarkColorScheme.background
    : LightColorScheme.background;
  // Header colors

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        headerStyle: {
          backgroundColor: headerBackgroundColor,
        },
        statusBarColor: statusBarColor,
        headerTintColor: headerTintColor,
        navigationBarColor: navigationBarColor,
      }}
    >
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}
