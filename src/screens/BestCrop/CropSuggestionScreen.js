import {
  View,
  Text,
  ScrollView,
  Pressable
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";

const options = {
  soil: ["Loamy", "Clay", "Sandy", "Black"],
  season: ["Winter", "Summer", "Monsoon"],
  rainfall: ["Low", "Medium", "High"],
  temp: ["Cold", "Moderate", "Hot"],
  water: ["Low", "Medium", "High"],
  farm: ["Small", "Medium", "Large"],
  ph: ["Acidic", "Neutral", "Alkaline"],
  irrigation: ["Drip", "Sprinkler", "Canal", "Rainfed"],
  demand: ["Low", "Medium", "High"],
  fertilizer: ["Organic", "Chemical", "Both"],
  experience: ["Beginner", "Intermediate", "Expert"],
  duration: ["Short", "Medium", "Long"]
};

export default function CropSuggestionScreen() {

  const [form, setForm] = useState({});
  const [result, setResult] = useState(null);

  const updateField = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  const calculateBestCrop = () => {

    let scores = {
      Wheat: 0,
      Rice: 0,
      Maize: 0,
      Cotton: 0,
      Sugarcane: 0,
      Mustard: 0,
      Potato: 0,
      Tomato: 0,
      Barley: 0,
      Soybean: 0
    };

    if (form.soil === "Loamy") {
      scores.Wheat += 2;
      scores.Maize += 2;
      scores.Potato += 2;
    }

    if (form.soil === "Black") {
      scores.Cotton += 3;
      scores.Soybean += 2;
    }

    if (form.season === "Winter") {
      scores.Wheat += 3;
      scores.Mustard += 2;
      scores.Barley += 2;
    }

    if (form.season === "Monsoon") {
      scores.Rice += 3;
      scores.Soybean += 2;
    }

    if (form.water === "High") {
      scores.Rice += 3;
      scores.Sugarcane += 2;
    }

    if (form.rainfall === "Low") {
      scores.Mustard += 2;
      scores.Barley += 2;
    }

    if (form.temp === "Hot") {
      scores.Cotton += 2;
      scores.Maize += 2;
    }

    if (form.market === "High") {
      scores.Tomato += 2;
      scores.Potato += 2;
    }

    const best = Object.keys(scores).reduce((a, b) =>
      scores[a] > scores[b] ? a : b
    );

    setResult({
      crop: best,
      score: scores[best]
    });
  };

  const Selector = ({ title, field }) => (
    <View className="mb-4">

      <Text className="font-semibold mb-2 text-green-900">
        {title}
      </Text>

      <View className="flex-row flex-wrap">

        {options[field].map((item) => (

          <Pressable
            key={item}
            onPress={() => updateField(field, item)}
            className={`px-3 py-2 mr-2 mb-2 rounded-full
            ${
              form[field] === item
                ? "bg-green-700"
                : "bg-white"
            }`}
          >

            <Text
              className={`${
                form[field] === item
                  ? "text-white"
                  : "text-gray-700"
              }`}
            >
              {item}
            </Text>

          </Pressable>

        ))}

      </View>

    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-[#F1F8E9]">

      <ScrollView className="px-5">

        <Text className="text-2xl font-bold text-green-900 mt-4 mb-2">
          Smart Crop Suggestion
        </Text>

        <Text className="text-gray-500 mb-5">
          Select farm conditions to find the best crop
        </Text>

        <Selector title="Soil Type" field="soil" />
        <Selector title="Season" field="season" />
        <Selector title="Temperature" field="temp" />
        <Selector title="Rainfall Level" field="rainfall" />
        <Selector title="Water Availability" field="water" />
        <Selector title="Farm Size" field="farm" />
        <Selector title="Soil pH" field="ph" />
        <Selector title="Irrigation Type" field="irrigation" />
        <Selector title="Market Demand" field="demand" />
        <Selector title="Fertilizer Type" field="fertilizer" />
        <Selector title="Experience Level" field="experience" />
        <Selector title="Crop Duration" field="duration" />

        <Pressable
          onPress={calculateBestCrop}
          className="bg-green-700 py-4 rounded-xl mt-4 items-center"
        >

          <Text className="text-white font-bold">
            Suggest Best Crop
          </Text>

        </Pressable>

        {result && (

          <View className="bg-white p-5 rounded-xl mt-6 mb-8 shadow">

            <Text className="text-lg font-bold text-green-800">
              Recommended Crop
            </Text>

            <Text className="text-3xl font-bold mt-2">
              {result.crop}
            </Text>

            <Text className="text-gray-500 mt-2">
              Based on your farm conditions, {result.crop} is the
              most suitable crop with high yield potential.
            </Text>

          </View>

        )}

      </ScrollView>

    </SafeAreaView>
  );
}