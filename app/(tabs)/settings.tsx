import { DarkColorScheme, LightColorScheme } from "@/constants/ColorSchemes";
import { StyleSheet, View, Text, useColorScheme } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ThemedText from "@/components/ThemedText";
import { useState } from "react";
import { Picker } from "@react-native-picker/picker";

export default function Page() {
  let colorScheme = useColorScheme();

  const styleState = styles(colorScheme);

  const [selectedCurrency, setCurrency] = useState("PHP");

  return (
    <SafeAreaView style={styleState.safeAreaView}>
      <View style={styleState.headingView}>
        <Text style={styleState.headingText}>Settings</Text>
      </View>
      <View style={styleState.contentContainer}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <ThemedText
            text="Currency"
            style={{ fontFamily: "WorkSans_400Regular", fontSize: 16 }}
          />
          <Picker
            selectedValue={selectedCurrency}
            onValueChange={(val, index) => setCurrency(val)}
            style={{
              width: 120,
              backgroundColor:
                colorScheme != "light"
                  ? DarkColorScheme.primary
                  : LightColorScheme.primary,
              color:
                colorScheme != "light"
                  ? DarkColorScheme.text
                  : LightColorScheme.text,
            }}
            dropdownIconColor={
              colorScheme != "light"
                ? DarkColorScheme.text
                : LightColorScheme.text
            }
            mode="dropdown"
          >
            <Picker.Item label="GBP" value="GBP" />
            <Picker.Item label="USD" value="USD" />
          </Picker>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = (colorScheme) =>
  StyleSheet.create({
    safeAreaView: {
      flex: 1,
      backgroundColor:
        colorScheme != "light"
          ? DarkColorScheme.background
          : LightColorScheme.background,
    },
    headingText: {
      color:
        colorScheme != "light" ? DarkColorScheme.text : LightColorScheme.text,
      fontSize: 24,
      fontFamily: "WorkSans_300Light",
    },
    headingView: {
      paddingHorizontal: 36,
      paddingTop: 36,
      marginBottom: 8,
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    contentContainer: {
      borderTopLeftRadius: 24,
      borderTopRightRadius: 24,
      paddingHorizontal: 24,
      paddingVertical: 16,
      flex: 1,
      backgroundColor:
        colorScheme != "light"
          ? DarkColorScheme.primary
          : LightColorScheme.primary,
    },
  });
