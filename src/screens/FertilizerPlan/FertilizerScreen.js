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
  "Tomato"
];

const soils = [
  "Loamy",
  "Clay",
  "Sandy",
  "Black"
];

const farmSizes = [
  "1 Acre",
  "2 Acres",
  "5 Acres",
  "10+ Acres"
];

const fertilizerGuide = {
  Wheat: {
    N: 120,
    P: 60,
    K: 40
  },
  Rice: {
    N: 150,
    P: 70,
    K: 60
  },
  Maize: {
    N: 120,
    P: 60,
    K: 50
  },
  Cotton: {
    N: 150,
    P: 60,
    K: 60
  },
  Sugarcane: {
    N: 250,
    P: 100,
    K: 100
  },
  Mustard: {
    N: 80,
    P: 40,
    K: 30
  },
  Potato: {
    N: 180,
    P: 80,
    K: 100
  },
  Tomato: {
    N: 120,
    P: 60,
    K: 60
  }
};

export default function FertilizerScreen() {

  const [crop, setCrop] = useState(null);
  const [soil, setSoil] = useState(null);
  const [farm, setFarm] = useState(null);

  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const [plan, setPlan] = useState(null);

  const generatePlan = () => {

    if (!crop) return;

    const guide = fertilizerGuide[crop];

    const baseDose = {
      nitrogen: guide.N,
      phosphorus: guide.P,
      potassium: guide.K
    };

    const stages = [
      {
        stage: "Basal Application",
        day: 0,
        tip: "Apply full phosphorus and potassium during soil preparation."
      },
      {
        stage: "Early Growth",
        day: 20,
        tip: "Apply 50% nitrogen to promote early plant growth."
      },
      {
        stage: "Vegetative Stage",
        day: 40,
        tip: "Apply remaining nitrogen for leaf and stem development."
      }
    ];

    if (soil === "Sandy") {
      stages.push({
        stage: "Additional Feeding",
        day: 60,
        tip: "Sandy soil loses nutrients quickly. Apply light nitrogen dose."
      });
    }

    setPlan({
      baseDose,
      stages
    });
  };

  const Selector = ({ title, data, value, setValue }) => (

    <View className="mb-4">

      <Text className="font-semibold mb-2 text-green-900">
        {title}
      </Text>

      <View className="flex-row flex-wrap">

        {data.map((item) => (

          <Pressable
            key={item}
            onPress={() => setValue(item)}
            className={`px-3 py-2 mr-2 mb-2 rounded-full ${
              value === item
                ? "bg-green-700"
                : "bg-white"
            }`}
          >

            <Text
              className={`${
                value === item
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

        <Text className="text-2xl font-bold text-green-900 mt-4">
          Fertilizer Planner
        </Text>

        <Text className="text-gray-500 mb-5">
          Generate fertilizer schedule for your crop
        </Text>

        <Selector
          title="Select Crop"
          data={crops}
          value={crop}
          setValue={setCrop}
        />

        <Selector
          title="Soil Type"
          data={soils}
          value={soil}
          setValue={setSoil}
        />

        <Selector
          title="Farm Size"
          data={farmSizes}
          value={farm}
          setValue={setFarm}
        />

        <Text className="font-semibold mb-2 text-green-900">
          Sowing Date
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

        <Pressable
          onPress={generatePlan}
          className="bg-green-700 py-4 rounded-xl items-center mt-2"
        >

          <Text className="text-white font-bold">
            Generate Fertilizer Plan
          </Text>

        </Pressable>

        {plan && (

          <View className="bg-white p-5 rounded-xl mt-6 mb-8 shadow">

            <Text className="text-lg font-bold text-green-800">
              Recommended NPK
            </Text>

            <Text className="mt-2">
              Nitrogen (N): {plan.baseDose.nitrogen} kg/ha
            </Text>

            <Text>
              Phosphorus (P): {plan.baseDose.phosphorus} kg/ha
            </Text>

            <Text>
              Potassium (K): {plan.baseDose.potassium} kg/ha
            </Text>

            <Text className="font-bold text-green-800 mt-4">
              Application Schedule
            </Text>

            {plan.stages.map((stage, index) => (

              <View key={index} className="mt-3">

                <Text className="font-semibold">
                  {stage.stage}
                </Text>

                <Text className="text-gray-500">
                  Day {stage.day}
                </Text>

                <Text className="text-gray-600">
                  {stage.tip}
                </Text>

              </View>

            ))}

          </View>

        )}

      </ScrollView>

    </SafeAreaView>
  );
}