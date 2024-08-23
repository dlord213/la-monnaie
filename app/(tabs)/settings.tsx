import { DarkColorScheme, LightColorScheme } from "@/constants/ColorSchemes";
import {
  StyleSheet,
  View,
  Text,
  useColorScheme,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ThemedText from "@/components/ThemedText";
import { useContext } from "react";
import { Picker } from "@react-native-picker/picker";
import currencies from "@/constants/AvailableCurrencies";
import CurrencyContext from "@/contexts/CurrencyContext";
import ThemedPicker from "@/components/ThemedPicker";
import ThemedPressable from "@/components/ThemedPressable";

export default function Page() {
  let colorScheme = useColorScheme();
  const styleState = styles(colorScheme);

  const currency = useContext(CurrencyContext);

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
          {currency.currentCurrency != "" ? (
            <ThemedPicker
              selectedValue={currency.currentCurrency}
              onValueChange={(val, index) => {
                currency.setCurrency(val);
                currency.setCurrencyStored(val);
              }}
              mode="dropdown"
              children={currencies.map((item) => (
                <Picker.Item label={item} value={item} key={item} />
              ))}
            />
          ) : (
            <ActivityIndicator
              size={32}
              color={
                colorScheme != "light"
                  ? DarkColorScheme.text
                  : LightColorScheme.text
              }
            />
          )}
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <ThemedPressable
            onPress={() => {
              currency.setCurrencyStored("PHP");
              currency.setCurrency("PHP");
            }}
            style={{ flex: 1 }}
            children={
              <Text
                style={{
                  color:
                    colorScheme != "light"
                      ? DarkColorScheme.text
                      : LightColorScheme.text,
                  fontFamily: "WorkSans_400Regular",
                  textAlign: "center",
                }}
              >
                Reset to default currency
              </Text>
            }
          />
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
