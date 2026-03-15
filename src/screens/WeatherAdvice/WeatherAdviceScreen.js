import {
  View,
  Text,
  ScrollView,
  RefreshControl,
  ActivityIndicator
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useEffect } from "react";

import * as Location from "expo-location";

export default function WeatherAdviceScreen() {

  const [weather, setWeather] = useState(null);
  const [advice, setAdvice] = useState([]);

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchWeather = async () => {

    try {

      setLoading(true);

      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      const res = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=relativehumidity_2m`
      );

      const data = await res.json();

      const current = data.current_weather;

      const weatherData = {
        temperature: current.temperature,
        wind: current.windspeed,
        code: current.weathercode
      };

      setWeather(weatherData);

      generateAdvice(weatherData);

      setLoading(false);

    } catch (err) {

      console.log("Weather error:", err);
      setLoading(false);

    }
  };

  useEffect(() => {
    requestLocation();
  }, []);

  const requestLocation = async () => {

    let { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      console.log("Permission denied");
      return;
    }

    fetchWeather();
  };

  const generateAdvice = (weather) => {

    let tips = [];

    const temp = weather.temperature;

    if (temp > 35) {
      tips.push("High temperature detected. Increase irrigation frequency.");
      tips.push("Avoid fertilizer spraying during afternoon.");
      tips.push("Use mulching to retain soil moisture.");
    }

    if (temp >= 25 && temp <= 35) {
      tips.push("Good weather for crop growth.");
      tips.push("Suitable for maize, cotton and rice cultivation.");
      tips.push("Maintain regular irrigation schedule.");
    }

    if (temp < 20) {
      tips.push("Low temperature detected.");
      tips.push("Suitable crops: wheat, barley and mustard.");
      tips.push("Reduce irrigation to avoid water logging.");
    }

    if (weather.wind > 15) {
      tips.push("Strong wind detected. Avoid pesticide spraying.");
    }

    setAdvice(tips);
  };

  const onRefresh = () => {

    setRefreshing(true);

    fetchWeather();

    setTimeout(() => {
      setRefreshing(false);
    }, 1200);

  };

  return (
    <SafeAreaView className="flex-1 bg-[#F1F8E9]">

      {loading ? (

        <View className="flex-1 justify-center items-center">

          <ActivityIndicator size="large" color="green" />

          <Text className="mt-3 text-gray-500">
            Fetching weather data...
          </Text>

        </View>

      ) : (

        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
        >

          {/* HEADER */}

          <View className="px-5 pt-4 pb-2">

            <Text className="text-2xl font-bold text-green-900">
              Weather Advisory
            </Text>

            <Text className="text-gray-500">
              Smart irrigation & crop advice
            </Text>

          </View>

          {/* WEATHER CARD */}

          <View className="mx-5 bg-white rounded-xl p-5 shadow mb-4">

            <Text className="text-lg font-bold text-green-800 mb-3">
              Current Weather
            </Text>

            <View className="flex-row justify-between">

              <View>
                <Text className="text-gray-400 text-xs">
                  Temperature
                </Text>

                <Text className="text-xl font-semibold">
                  {weather.temperature}°C
                </Text>
              </View>

              <View>
                <Text className="text-gray-400 text-xs">
                  Wind Speed
                </Text>

                <Text className="text-xl font-semibold">
                  {weather.wind} km/h
                </Text>
              </View>

            </View>

          </View>

          {/* ADVICE SECTION */}

          <View className="px-5">

            <Text className="text-lg font-bold text-green-900 mb-3">
              Farming Advice
            </Text>

            {advice.map((tip, index) => (

              <View
                key={index}
                className="bg-white p-4 rounded-xl mb-3 shadow"
              >

                <Text className="text-gray-700">
                  🌱 {tip}
                </Text>

              </View>

            ))}

          </View>

          {/* SUGGESTED CROPS */}

          <View className="px-5 mt-4 mb-8">

            <Text className="text-lg font-bold text-green-900 mb-3">
              Suggested Crops
            </Text>

            <View className="bg-white p-4 rounded-xl shadow">

              <Text className="text-gray-700">
                Wheat
              </Text>

              <Text className="text-gray-700">
                Rice
              </Text>

              <Text className="text-gray-700">
                Maize
              </Text>

              <Text className="text-gray-700">
                Cotton
              </Text>

            </View>

          </View>

        </ScrollView>

      )}

    </SafeAreaView>
  );
}