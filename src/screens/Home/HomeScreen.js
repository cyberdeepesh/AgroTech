import { View, Text, ScrollView, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";

export default function HomeScreen({ navigation }) {
  const features = [
    {
      title: "Crop Disease",
      icon: "https://cdn-icons-png.flaticon.com/512/2909/2909768.png",
      screen: "DetectCrop",
    },
    {
      title: "Weather Advice",
      icon: "https://cdn-icons-png.flaticon.com/512/1163/1163624.png",
      screen: "WeatherAdvice",
    },
    {
      title: "Crop Suggestion",
      icon: "https://cdn-icons-png.flaticon.com/512/628/628324.png",
      screen: "CropSuggestion",
    },
    {
      title: "Sowing Time",
      icon: "https://cdn-icons-png.flaticon.com/512/3050/3050525.png",
      screen: "SowingPrediction",
    },
    {
      title: "Fertilizer Plan",
      icon: "https://cdn-icons-png.flaticon.com/512/2909/2909753.png",
      screen: "FertilizerPlan",
    },
    {
      title: "Market Prices",
      icon: "https://cdn-icons-png.flaticon.com/512/3081/3081559.png",
      screen: "Market",
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-[#F1F8E9]">
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* HEADER */}
        <View className="px-5 pt-2 pb-4 flex-row justify-between items-center">
          <View>
            <Text className="text-xl font-bold text-green-800">
              AgroTech
            </Text>
            <Text className="text-gray-500">
              Smart Farming Assistant
            </Text>
          </View>

          <Image
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
            }}
            style={{ width: 40, height: 40 }}
          />
        </View>

        {/* WEATHER CARD */}
        <View className="mx-5 bg-green-600 rounded-2xl p-5 flex-row justify-between items-center">

          <View>
            <Text className="text-white text-lg font-semibold">
              Weather Today
            </Text>

            <Text className="text-white text-3xl font-bold">
              29°C
            </Text>

            <Text className="text-green-100">
              Humidity: 60%
            </Text>
          </View>

          <Image
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/869/869869.png",
            }}
            style={{ width: 70, height: 70 }}
          />
        </View>

        {/* FEATURE GRID */}
        <View className="mt-6 px-5">

          <Text className="text-lg font-bold text-green-900 mb-3">
            Smart Farming Tools
          </Text>

          <View className="flex-row flex-wrap justify-between">

            {features.map((item, index) => (
              <Pressable
                key={index}
                onPress={() => navigation.navigate(item.screen)}
                className="bg-white w-[48%] p-4 rounded-xl mb-4 shadow"
              >

                <Image
                  source={{ uri: item.icon }}
                  style={{ width: 40, height: 40 }}
                />

                <Text className="mt-3 font-semibold text-gray-700">
                  {item.title}
                </Text>

              </Pressable>
            ))}

          </View>

        </View>

        {/* QUICK ACTIONS */}
        <View className="px-5 mt-4">

          <Text className="text-lg font-bold text-green-900 mb-3">
            Quick Actions
          </Text>

          <View className="flex-row justify-between">

            <Pressable
              onPress={() => navigation.navigate("Blogs")}
              className="bg-white p-4 rounded-xl w-[31%] items-center shadow"
            >
              <Image
                source={{
                  uri: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
                }}
                style={{ width: 35, height: 35 }}
              />
              <Text className="mt-2 text-xs">Blogs</Text>
            </Pressable>

            <Pressable
              onPress={() => navigation.navigate("Chatbot")}
              className="bg-white p-4 rounded-xl w-[31%] items-center shadow"
            >
              <Image
                source={{
                  uri: "https://cdn-icons-png.flaticon.com/512/4712/4712109.png",
                }}
                style={{ width: 35, height: 35 }}
              />
              <Text className="mt-2 text-xs">AI Chat</Text>
            </Pressable>

            <Pressable
              onPress={() => navigation.navigate("Profile")}
              className="bg-white p-4 rounded-xl w-[31%] items-center shadow"
            >
              <Image
                source={{
                  uri: "https://cdn-icons-png.flaticon.com/512/1946/1946429.png",
                }}
                style={{ width: 35, height: 35 }}
              />
              <Text className="mt-2 text-xs">Profile</Text>
            </Pressable>

          </View>

        </View>

        {/* BLOG PREVIEW */}
        <View className="px-5 mt-6">

          <View className="flex-row justify-between items-center">
            <Text className="text-lg font-bold text-green-900">
              Latest Agriculture Blogs
            </Text>

            <Pressable onPress={() => navigation.navigate("Blogs")}>
              <Text className="text-green-700">View All</Text>
            </Pressable>
          </View>

          <View className="mt-3 bg-white p-4 rounded-xl shadow">

            <Text className="font-semibold">
              Best Crops for Summer Season
            </Text>

            <Text className="text-gray-500 text-sm mt-1">
              Learn which crops provide maximum yield during summer.
            </Text>

          </View>

        </View>

        {/* MARKET PRICE PREVIEW */}
        <View className="px-5 mt-6 mb-8">

          <Text className="text-lg font-bold text-green-900 mb-3">
            Market Prices
          </Text>

          <View className="bg-white rounded-xl p-4 shadow">

            <View className="flex-row justify-between mb-2">
              <Text>Wheat</Text>
              <Text className="font-semibold">₹2200/q</Text>
            </View>

            <View className="flex-row justify-between mb-2">
              <Text>Rice</Text>
              <Text className="font-semibold">₹2100/q</Text>
            </View>

            <View className="flex-row justify-between">
              <Text>Maize</Text>
              <Text className="font-semibold">₹1900/q</Text>
            </View>

          </View>

        </View>

      </ScrollView>
    </SafeAreaView>
  );
}