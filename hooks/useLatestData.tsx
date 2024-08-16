import { useEffect, useState } from "react";
import axios from "axios";
import currencySymbols from "@/constants/CurrencySymbols";

export default function useLatestData(currency: string) {

  const [currentCurrency, setCurrentCurrency] = useState(currency);
  const [latestData, setLatestData] = useState(null);
  const [isDataFetched, setIsDataFetched] = useState(false);

  const getData = async () => {
    try {
      const response = await axios.get(`https://api.fxratesapi.com/latest?api_key=fxr_live_643845f9dce1727138da37d4c45bd8b704c8&base=${currentCurrency}&currencies=EUR,GBP,JPY,USD,HKD,RSD,SGD,INR  &amount=1&places=6&format=json`)
      const data = await response.data;
      const currencyData = Object.entries(data.rates).map(([currency, value]) => ({
        currency,
        value,
        symbol: currencySymbols[currency]
      }));

      setLatestData(currencyData);
    } catch (error) {
      console.error("Error: ", error)
    }
  }

  useEffect(() => {
    if (isDataFetched == false) {
      getData();
    }
  }, [isDataFetched])

  return [latestData, getData];

}