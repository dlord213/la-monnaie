import { TextInput } from "react-native";
import { useColorScheme } from "react-native";
import { DarkColorScheme, LightColorScheme } from "@/constants/ColorSchemes";

export default function ThemedTextInput(props) {
  const { style, onChangeText, value } = props;

  let colorScheme = useColorScheme();

  return (
    <TextInput
      maxLength={9}
      value={value}
      onChangeText={onChangeText}
      cursorColor={
        colorScheme != "light" ? DarkColorScheme.text : LightColorScheme.text
      }
      style={[
        {
          borderColor:
            colorScheme != "light"
              ? DarkColorScheme.text
              : LightColorScheme.text,
          backgroundColor: colorScheme != "light" ? "#1E293B" : "#E2E8F0",
          borderWidth: 1,
          borderRadius: 8,
          paddingVertical: 8,
          paddingHorizontal: 16,
          color:
            colorScheme != "light"
              ? DarkColorScheme.text
              : LightColorScheme.text,
        },
        style,
      ]}
    />
  );
}
