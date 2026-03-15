import {
  View,
  Text,
  ScrollView,
  Pressable
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import DateTimePicker from "@react-native-community/datetimepicker";

import { useState } from "react";

const crops = [
  "Wheat",
  "Rice",
  "Maize",
  "Cotton",
  "Sugarcane",
  "Mustard",
  "Potato",
  "Tomato",
  "Barley",
  "Soybean"
];

const cropCalendar = {
  Wheat: { start: "11-01", end: "11-30" },
  Rice: { start: "06-01", end: "07-15" },
  Maize: { start: "06-01", end: "06-30" },
  Cotton: { start: "04-01", end: "05-15" },
  Sugarcane: { start: "02-01", end: "03-31" },
  Mustard: { start: "10-01", end: "10-31" },
  Potato: { start: "10-01", end: "10-20" },
  Tomato: { start: "07-01", end: "08-15" },
  Barley: { start: "11-01", end: "11-20" },
  Soybean: { start: "06-10", end: "07-10" }
};

export default function SowingPredictionScreen() {

  const [crop, setCrop] = useState(null);
  const [date, setDate] = useState(new Date());

  const [showPicker, setShowPicker] = useState(false);
  const [result, setResult] = useState(null);

  const calculatePrediction = () => {

    if (!crop) return;

    const calendar = cropCalendar[crop];

    const today = new Date();
    const year = today.getFullYear();

    const start = new Date(`${year}-${calendar.start}`);
    const end = new Date(`${year}-${calendar.end}`);

    let risk = "Low";
    let message = "";

    if (date < start) {
      risk = "Low";
      message = "Good time for sowing preparation.";
    }

    if (date >= start && date <= end) {
      risk = "Very Low";
      message = "Perfect sowing window for this crop.";
    }

    if (date > end) {
      risk = "High";
      message = "Late sowing may reduce yield.";
    }

    setResult({
      crop,
      start,
      end,
      risk,
      message
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-[#F1F8E9]">

      <ScrollView className="px-5">

        <Text className="text-2xl font-bold text-green-900 mt-4">
          Sowing Time Predictor
        </Text>

        <Text className="text-gray-500 mb-5">
          Predict the best time to sow your crop
        </Text>

        {/* CROP SELECTOR */}

        <Text className="font-semibold mb-2 text-green-900">
          Select Crop
        </Text>

        <View className="flex-row flex-wrap mb-4">

          {crops.map((item) => (

            <Pressable
              key={item}
              onPress={() => setCrop(item)}
              className={`px-3 py-2 mr-2 mb-2 rounded-full ${
                crop === item
                  ? "bg-green-700"
                  : "bg-white"
              }`}
            >

              <Text
                className={`${
                  crop === item
                    ? "text-white"
                    : "text-gray-700"
                }`}
              >
                {item}
              </Text>

            </Pressable>

          ))}

        </View>

        {/* DATE SELECTOR */}

        <Text className="font-semibold mb-2 text-green-900">
          Plot Preparation Date
        </Text>

        <Pressable
          onPress={() => setShowPicker(true)}
          className="bg-white p-4 rounded-xl shadow mb-4"
        >

          <Text>
            {date.toDateString()}
          </Text>

        </Pressable>

        {showPicker && (

          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={(event, selected) => {
              setShowPicker(false);
              if (selected) setDate(selected);
            }}
          />

        )}

        {/* PREDICT BUTTON */}

        <Pressable
          onPress={calculatePrediction}
          className="bg-green-700 py-4 rounded-xl items-center"
        >

          <Text className="text-white font-bold">
            Predict Sowing Time
          </Text>

        </Pressable>

        {/* RESULT */}

        {result && (

          <View className="bg-white p-5 rounded-xl mt-6 mb-8 shadow">

            <Text className="text-lg font-bold text-green-800">
              Recommended Window
            </Text>

            <Text className="mt-2">
              {result.start.toDateString()} - {result.end.toDateString()}
            </Text>

            <Text className="mt-4 font-semibold">
              Risk Level: {result.risk}
            </Text>

            <Text className="text-gray-600 mt-2">
              {result.message}
            </Text>

            {/* Farming Tips */}

            <View className="mt-4">

              <Text className="font-bold text-green-800">
                Farming Tips
              </Text>

              <Text className="text-gray-600 mt-1">
                • Ensure soil moisture before sowing
              </Text>

              <Text className="text-gray-600">
                • Use recommended seed variety
              </Text>

              <Text className="text-gray-600">
                • Apply base fertilizer during sowing
              </Text>

            </View>

          </View>

        )}

      </ScrollView>

    </SafeAreaView>
  );
}