import { DarkColorScheme, LightColorScheme } from "@/constants/ColorSchemes";
import { Text, TextStyle, useColorScheme } from "react-native";

interface ThemedTextProps {
  text: string;
  style?: TextStyle;
}

export default function ThemedText({ text, style }: ThemedTextProps) {
  let colorScheme = useColorScheme();

  return (
    <Text
      style={[
        style,
        {
          color:
            colorScheme != "light"
              ? DarkColorScheme.text
              : LightColorScheme.text,
        },
      ]}
    >
      {text}
    </Text>
  );
}
