import { useEffect, useState } from "react";
import * as SecureStorage from "expo-secure-store";

const useCurrency = () => {
  const [currentCurrency, setCurrency] = useState<string>("");

  const getCurrencyStored = async () => {
    let storedCurrency = await SecureStorage.getItemAsync("currencyStored");
    if (storedCurrency) {
      setCurrency(storedCurrency);
      console.log("Stored currency:", storedCurrency);
    } else {
      console.log("No stored currency, defaults to PHP.");
      await SecureStorage.setItemAsync("currencyStored", "PHP");
      setCurrency("PHP");
    }
  };

  const setCurrencyStored = async (currency: string) => {
    await SecureStorage.setItemAsync("currencyStored", currency);
  };

  useEffect(() => {
    if (!currentCurrency) {
      getCurrencyStored();
    }
  }, [currentCurrency]);

  return [currentCurrency, setCurrency, setCurrencyStored];
};

export default useCurrency;
