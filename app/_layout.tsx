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
          backgroundColor:
            colorScheme != "light"
              ? DarkColorScheme.background
              : LightColorScheme.background,
        },
        statusBarColor:
          colorScheme != "light"
            ? DarkColorScheme.background
            : LightColorScheme.background,
        headerTintColor:
          colorScheme != "light"
            ? DarkColorScheme.background
            : LightColorScheme.background,
        navigationBarColor:
          colorScheme != "light"
            ? DarkColorScheme.background
            : LightColorScheme.background,
      }}
    >
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}
