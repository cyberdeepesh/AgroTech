import { View, ScrollView } from "react-native";
import FeatureCard from "../../components/cards/FeatureCard";

export default function HomeScreen({ navigation }) {
  return (
    <ScrollView className="flex-1 bg-green-50">
      <View className="flex-row flex-wrap justify-center mt-5">

        <FeatureCard
          title="Crop Disease"
          onPress={() => navigation.navigate("DetectCrop")}
        />

        <FeatureCard
          title="Weather Advice"
          onPress={() => navigation.navigate("WeatherAdvice")}
        />

        <FeatureCard
          title="Fertilizer Plan"
          onPress={() => navigation.navigate("FertilizerPlan")}
        />

        <FeatureCard
          title="Crop Suggestion"
          onPress={() => navigation.navigate("CropSuggestion")}
        />

        <FeatureCard
          title="Sowing Prediction"
          onPress={() => navigation.navigate("SowingPrediction")}
        />

      </View>
    </ScrollView>
  );
}