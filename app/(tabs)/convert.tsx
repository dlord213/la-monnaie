import {
  SafeAreaView,
  StyleSheet,
  useColorScheme,
  View,
  Text,
} from "react-native";
import { DarkColorScheme, LightColorScheme } from "@/constants/ColorSchemes";
import ThemedText from "@/components/ThemedText";
import { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import currencies from "@/constants/AvailableCurrencies";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import axios from "axios";
import ThemedTextInput from "@/components/ThemedTextInput";
import ThemedPressable from "@/components/ThemedPressable";
import ThemedPicker from "@/components/ThemedPicker";

export default function Page() {
  let colorScheme = useColorScheme();
  const styleState = styles(colorScheme);

  const [values, setValues] = useState({
    amount: 250,
    fromCurrency: "PHP",
    toCurrency: "USD",
  });

  const [data, setData] = useState(null);

  const handleChange = (name: string, value: any) => {
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const getConversion = async () => {
    try {
      const response = await axios.get(
        `https://api.fxratesapi.com/convert?from=${values.fromCurrency}&to=${values.toCurrency}&amount=${values.amount}&format=json`
      );
      const data = await response.data;

      setData(data);

      console.log(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <SafeAreaView style={styleState.safeAreaView}>
      <View style={styleState.headingView}>
        <Text style={styleState.headingText}>Convert</Text>
      </View>
      <View style={styleState.contentContainer}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <ThemedPicker
            selectedValue={values.fromCurrency}
            onValueChange={(itemValue) => {
              handleChange("fromCurrency", itemValue);
            }}
            mode="dropdown"
            children={currencies.map((item) => (
              <Picker.Item label={item} value={item} key={item} />
            ))}
          />
          <FontAwesome6
            name="arrows-rotate"
            size={24}
            color={
              colorScheme != "light"
                ? DarkColorScheme.text
                : LightColorScheme.text
            }
          />
          <ThemedPicker
            selectedValue={values.toCurrency}
            onValueChange={(itemValue) => {
              handleChange("toCurrency", itemValue);
            }}
            mode="dropdown"
            children={currencies.map((item) => (
              <Picker.Item label={item} value={item} key={item} />
            ))}
          />
        </View>
        <ThemedTextInput
          value={values.amount}
          onChangeText={(text) => handleChange("amount", parseFloat(text))}
        />
        <ThemedPressable
          onPress={() => {
            getConversion();
          }}
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
              Convert
            </Text>
          }
        />
        <View
          style={{
            backgroundColor:
              colorScheme != "light"
                ? DarkColorScheme.background
                : LightColorScheme.background,
            borderRadius: 8,
            display: !data ? "none" : "flex",
          }}
        >
          {!data ? (
            <></>
          ) : (
            <>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "flex-end",
                  padding: 16,
                }}
              >
                <View>
                  <ThemedText
                    text={"From"}
                    style={{ fontFamily: "WorkSans_400Regular" }}
                  />
                  <ThemedText
                    text={data.query.from}
                    style={{ fontFamily: "WorkSans_700Bold", fontSize: 24 }}
                  />
                </View>
                <ThemedText
                  text={data.query.amount}
                  style={{ fontFamily: "WorkSans_400Regular" }}
                />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "flex-end",
                  padding: 16,
                }}
              >
                <View>
                  <ThemedText
                    text={"To"}
                    style={{ fontFamily: "WorkSans_400Regular" }}
                  />
                  <ThemedText
                    text={data.query.to}
                    style={{ fontFamily: "WorkSans_700Bold", fontSize: 24 }}
                  />
                </View>
                <ThemedText
                  text={data.result.toFixed(3)}
                  style={{ fontFamily: "WorkSans_400Regular" }}
                />
              </View>
            </>
          )}
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
      gap: 8,
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
