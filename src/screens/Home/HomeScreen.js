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
      <ScrollView showsVerticalScrollIndicator={false} className="pb-10">

        {/* HEADER */}
        <View className="px-6 pt-5 pb-6 flex-row justify-between items-center">
          <View>
            <Text className="text-3xl font-extrabold text-emerald-900 tracking-tight">
              AgroTech
            </Text>
            <Text className="text-emerald-600/80 font-medium mt-1">
              Smart Farming Assistant
            </Text>
          </View>

          <Image
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
            }}
            style={{ width: 44, height: 44 }}
            className="rounded-full border-2 border-emerald-200"
          />
        </View>

        {/* WEATHER CARD */}
        <View className="mx-6 bg-emerald-600 rounded-[28px] p-6 flex-row justify-between items-center shadow-lg shadow-emerald-200/40">

          <View>
            <Text className="text-emerald-100 text-xs font-bold tracking-widest uppercase mb-2">
              Weather Today
            </Text>

            <Text className="text-white text-5xl font-extrabold tracking-tighter mb-1">
              29°C
            </Text>

            <Text className="text-emerald-50 font-medium text-sm">
              Humidity: 60%
            </Text>
          </View>

          <Image
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/869/869869.png",
            }}
            style={{ width: 80, height: 80 }}
            className="opacity-95"
          />
        </View>

        {/* FEATURE GRID */}
        <View className="mt-8 px-6">

          <Text className="text-xl font-bold text-slate-800 mb-5">
            Smart Farming Tools
          </Text>

          <View className="flex-row flex-wrap justify-between">

            {features.map((item, index) => (
              <Pressable
                key={index}
                onPress={() => navigation.navigate(item.screen)}
                className="bg-white w-[48%] py-6 px-3 rounded-3xl mb-4 shadow-sm shadow-slate-200 border border-slate-100 items-center"
              >

                <Image
                  source={{ uri: item.icon }}
                  style={{ width: 42, height: 42 }}
                />

                <Text className="mt-4 font-bold text-slate-700 text-center text-sm">
                  {item.title}
                </Text>

              </Pressable>
            ))}

          </View>

        </View>

        {/* QUICK ACTIONS */}
        <View className="px-6 mt-4">

          <Text className="text-xl font-bold text-slate-800 mb-5">
            Quick Actions
          </Text>

          <View className="flex-row justify-between">

            <Pressable
              onPress={() => navigation.navigate("Blogs")}
              className="bg-white py-5 px-2 rounded-3xl w-[31%] items-center shadow-sm shadow-slate-200 border border-slate-100"
            >
              <Image
                source={{
                  uri: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
                }}
                style={{ width: 32, height: 32 }}
                className="opacity-80"
              />
              <Text className="mt-3 text-xs font-bold text-slate-600">Blogs</Text>
            </Pressable>

            <Pressable
              onPress={() => navigation.navigate("Chatbot")}
              className="bg-white py-5 px-2 rounded-3xl w-[31%] items-center shadow-sm shadow-slate-200 border border-slate-100"
            >
              <Image
                source={{
                  uri: "https://cdn-icons-png.flaticon.com/512/4712/4712109.png",
                }}
                style={{ width: 32, height: 32 }}
                className="opacity-80"
              />
              <Text className="mt-3 text-xs font-bold text-slate-600">AI Chat</Text>
            </Pressable>

            <Pressable
              onPress={() => navigation.navigate("Profile")}
              className="bg-white py-5 px-2 rounded-3xl w-[31%] items-center shadow-sm shadow-slate-200 border border-slate-100"
            >
              <Image
                source={{
                  uri: "https://cdn-icons-png.flaticon.com/512/1946/1946429.png",
                }}
                style={{ width: 32, height: 32 }}
                className="opacity-80"
              />
              <Text className="mt-3 text-xs font-bold text-slate-600">Profile</Text>
            </Pressable>

          </View>

        </View>

        {/* BLOG PREVIEW */}
        <View className="px-6 mt-8">

          <View className="flex-row justify-between items-end mb-4">
            <Text className="text-xl font-bold text-slate-800">
              Latest Blogs
            </Text>

            <Pressable onPress={() => navigation.navigate("Blogs")}>
              <Text className="text-emerald-600 font-bold text-sm mb-1">View All</Text>
            </Pressable>
          </View>

          <View className="mt-1 bg-white p-5 rounded-3xl shadow-sm shadow-slate-200 border border-slate-100">

            <Text className="font-bold text-slate-800 text-base mb-1">
              Best Crops for Summer Season
            </Text>

            <Text className="text-slate-500 text-sm leading-5">
              Learn which crops provide maximum yield during summer heat.
            </Text>

          </View>

        </View>

        {/* MARKET PRICE PREVIEW */}
        <View className="px-6 mt-8 mb-12">

          <Text className="text-xl font-bold text-slate-800 mb-5">
            Market Prices
          </Text>

          <View className="bg-white rounded-3xl p-5 shadow-sm shadow-slate-200 border border-slate-100">

            <View className="flex-row justify-between items-center border-b border-slate-100 pb-3 mb-3">
              <Text className="text-slate-700 font-semibold text-base">Wheat</Text>
              <Text className="font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl overflow-hidden text-sm">₹2200/q</Text>
            </View>

            <View className="flex-row justify-between items-center border-b border-slate-100 pb-3 mb-3">
              <Text className="text-slate-700 font-semibold text-base">Rice</Text>
              <Text className="font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl overflow-hidden text-sm">₹2100/q</Text>
            </View>

            <View className="flex-row justify-between items-center pt-1">
              <Text className="text-slate-700 font-semibold text-base">Maize</Text>
              <Text className="font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl overflow-hidden text-sm">₹1900/q</Text>
            </View>

          </View>

        </View>

      </ScrollView>
    </SafeAreaView>
  );
}