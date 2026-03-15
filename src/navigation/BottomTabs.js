import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, TouchableOpacity } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

import HomeScreen from "../screens/Home/HomeScreen";
import BlogsScreen from "../screens/Blogs/BlogsScreen";
import MarketScreen from "../screens/SellingTime/MarketScreen";
import ChatbotScreen from "../screens/Chatbot/ChatbotScreen";
import ProfileScreen from "../screens/Profile/ProfileScreen";

const Tab = createBottomTabNavigator();

function ChatbotButton({ children, onPress }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        top: -25,
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <View
        style={{
          width: 65,
          height: 65,
          borderRadius: 35,
          backgroundColor: "#15803d",
          justifyContent: "center",
          alignItems: "center",
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 5 },
          shadowOpacity: 0.3,
          shadowRadius: 5,
          elevation: 6
        }}
      >
        {children}
      </View>
    </TouchableOpacity>
  );
}

export default function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 70,
          borderTopWidth: 0,
          elevation: 10,
          backgroundColor: "#ffffff"
        }
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="home"
              size={24}
              color={focused ? "#15803d" : "gray"}
            />
          )
        }}
      />

      <Tab.Screen
        name="Blogs"
        component={BlogsScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name="newspaper-variant-outline"
              size={24}
              color={focused ? "#15803d" : "gray"}
            />
          )
        }}
      />

      <Tab.Screen
        name="Chatbot"
        component={ChatbotScreen}
        options={{
          tabBarIcon: () => (
            <Ionicons name="chatbubble-ellipses" size={28} color="#fff" />
          ),
          tabBarButton: props => (
            <ChatbotButton {...props} />
          )
        }}
      />

      <Tab.Screen
        name="Market"
        component={MarketScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name="storefront-outline"
              size={24}
              color={focused ? "#15803d" : "gray"}
            />
          )
        }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="person-outline"
              size={24}
              color={focused ? "#15803d" : "gray"}
            />
          )
        }}
      />
    </Tab.Navigator>
  );
}