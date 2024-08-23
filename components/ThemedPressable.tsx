import { Pressable } from "react-native";
import { useColorScheme } from "react-native";
import { DarkColorScheme, LightColorScheme } from "@/constants/ColorSchemes";

export default function ThemedPressable(props) {
  const { style, children, onPress } = props;

  let colorScheme = useColorScheme();

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        style,
        {
          backgroundColor:
            colorScheme != "light"
              ? pressed
                ? DarkColorScheme.secondary
                : DarkColorScheme.background
              : pressed
              ? LightColorScheme.secondary
              : LightColorScheme.background,
          padding: 8,
          borderRadius: 8,
          marginVertical: 8,
        },
      ]}
    >
      {children}
    </Pressable>
  );
}
