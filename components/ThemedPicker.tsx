import { Picker } from "@react-native-picker/picker";
import { useColorScheme } from "react-native";
import { DarkColorScheme, LightColorScheme } from "@/constants/ColorSchemes";

export default function ThemedPicker(props) {
  const { selectedValue, onValueChange, style, mode, children } = props;

  let colorScheme = useColorScheme();

  return (
    <Picker
      selectedValue={selectedValue}
      onValueChange={onValueChange}
      style={[
        {
          width: 120,
          backgroundColor:
            colorScheme != "light"
              ? DarkColorScheme.primary
              : LightColorScheme.primary,
          color:
            colorScheme != "light"
              ? DarkColorScheme.text
              : LightColorScheme.text,
        },
        style,
      ]}
    >
      {children}
    </Picker>
  );
}
