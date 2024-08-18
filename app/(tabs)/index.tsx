import ThemedText from "@/components/ThemedText";
import { DarkColorScheme, LightColorScheme } from "@/constants/ColorSchemes";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import useLatestData from "@/hooks/useLatestData";
import { StatusBar } from "expo-status-bar";
import { useContext } from "react";
import CurrencyContext from "@/contexts/CurrencyContext";

export default function Page() {
  let colorScheme = useColorScheme();
  const styleState = styles(colorScheme);

  const currency = useContext(CurrencyContext);

  const [latestData, getData] = useLatestData(currency.currentCurrency);

  return (
    <SafeAreaView style={styleState.safeAreaView}>
      <View style={styleState.headingView}>
        <Text style={styleState.headingText}>LaMonnaie</Text>
        <ThemedText
          text={currency.currentCurrency}
          style={{ fontFamily: "WorkSans_400Regular" }}
        />
      </View>
      <View style={styleState.contentContainer}>
        <ThemedText
          text="Latest"
          style={{ fontFamily: "WorkSans_700Bold", fontSize: 36 }}
        />
        {latestData != null ? (
          <>
            <FlatList
              data={latestData}
              keyExtractor={(item) => item.currency}
              renderItem={({ item }) => (
                <View style={styleState.currencyContainer}>
                  <ThemedText
                    text={item.currency}
                    style={{ fontFamily: "WorkSans_400Regular", fontSize: 16 }}
                  />
                  <View style={{ flexDirection: "row", gap: 8 }}>
                    <ThemedText
                      text={item.symbol}
                      style={{ fontFamily: "WorkSans_700Bold" }}
                    />
                    <ThemedText
                      text={item.value.toFixed(6)}
                      style={{
                        fontFamily: "WorkSans_400Regular",
                        fontSize: 16,
                      }}
                    />
                  </View>
                </View>
              )}
            />
          </>
        ) : (
          <ActivityIndicator
            color={
              colorScheme != "light"
                ? DarkColorScheme.text
                : LightColorScheme.text
            }
            size={48}
          />
        )}
      </View>
      <StatusBar />
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
    image: {
      width: 28,
      height: 28,
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
    flagHeadingView: {
      display: "flex",
      flexDirection: "row",
      gap: 8,
      alignItems: "center",
      backgroundColor:
        colorScheme != "light"
          ? DarkColorScheme.background
          : LightColorScheme.background,
      paddingHorizontal: 8,
      borderRadius: 16,
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
    currencyContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      backgroundColor:
        colorScheme != "light"
          ? DarkColorScheme.background
          : LightColorScheme.background,
      marginVertical: 4,
      padding: 16,
      borderRadius: 8,
    },
  });
