import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTabs from "./BottomTabs";

import DetectScreen from "../screens/CropDetection/DetectScreen";
import WeatherAdviceScreen from "../screens/WeatherAdvice/WeatherAdviceScreen";
import FertilizerScreen from "../screens/FertilizerPlan/FertilizerScreen";
import CropSuggestionScreen from "../screens/BestCrop/CropSuggestionScreen";
import SowingPredictionScreen from "../screens/SowingPrediction/SowingPredictionScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: "false" }}>
      <Stack.Screen name="MainTabs" component={BottomTabs} />

      <Stack.Screen name="DetectCrop" component={DetectScreen} />
      <Stack.Screen name="WeatherAdvice" component={WeatherAdviceScreen} />
      <Stack.Screen name="FertilizerPlan" component={FertilizerScreen} />
      <Stack.Screen name="CropSuggestion" component={CropSuggestionScreen} />
      <Stack.Screen name="SowingPrediction" component={SowingPredictionScreen} />
    </Stack.Navigator>
  );
}