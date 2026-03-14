import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeScreen from "../screens/Home/HomeScreen";
import BlogsScreen from "../screens/Blogs/BlogsScreen";
import MarketScreen from "../screens/SellingTime/MarketScreen";
import ChatbotScreen from "../screens/Chatbot/ChatbotScreen";
import ProfileScreen from "../screens/Profile/ProfileScreen";

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: "false" }}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Blogs" component={BlogsScreen} />
      <Tab.Screen name="Market" component={MarketScreen} />
      <Tab.Screen name="Chatbot" component={ChatbotScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}