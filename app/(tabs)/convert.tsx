import {
  SafeAreaView,
  StyleSheet,
  useColorScheme,
  View,
  Text,
  TextInput,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { DarkColorScheme, LightColorScheme } from "@/constants/ColorSchemes";
import ThemedText from "@/components/ThemedText";
import { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import currencies from "@/constants/AvailableCurrencies";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import axios from "axios";

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
          <Picker
            selectedValue={values.fromCurrency}
            onValueChange={(itemValue) => {
              handleChange("fromCurrency", itemValue);
            }}
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
            {currencies.map((item) => (
              <Picker.Item label={item} value={item} key={item} />
            ))}
          </Picker>
          <FontAwesome6
            name="arrows-rotate"
            size={24}
            color={
              colorScheme != "light"
                ? DarkColorScheme.text
                : LightColorScheme.text
            }
          />
          <Picker
            selectedValue={values.toCurrency}
            onValueChange={(itemValue) => {
              handleChange("toCurrency", itemValue);
            }}
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
            {currencies.map((item) => (
              <Picker.Item label={item} value={item} key={item} />
            ))}
          </Picker>
        </View>
        <TextInput
          maxLength={9}
          value={values.amount}
          onChangeText={(text) => handleChange("amount", parseFloat(text))}
          cursorColor={
            colorScheme != "light"
              ? DarkColorScheme.text
              : LightColorScheme.text
          }
          style={{
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
          }}
        />
        <Pressable
          onPress={() => {
            getConversion();
          }}
          style={({ pressed }) => [
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
        </Pressable>
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
