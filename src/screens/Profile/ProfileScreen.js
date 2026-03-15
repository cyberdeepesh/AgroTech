import { View, Text, ScrollView, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";

export default function ProfileScreen({ navigation }) {

  const user = {
    name: "Surinder Singh",
    phone: "+91 9876543210",
    location: "Punjab, India",
    farmSize: "5 Acres",
    mainCrop: "Wheat"
  };

  return (
    <SafeAreaView className="flex-1 bg-[#F1F8E9]">

      <ScrollView showsVerticalScrollIndicator={false}>

        {/* HEADER */}

        <LinearGradient
          colors={["#2E7D32", "#66BB6A"]}
          className="pb-10 pt-6 px-5 rounded-b-3xl"
        >

          <View className="items-center">

            <Image
              source={{
                uri: "https://cdn-icons-png.flaticon.com/512/149/149071.png"
              }}
              style={{ width: 90, height: 90 }}
              contentFit="cover"
            />

            <Text className="text-white text-xl font-bold mt-3">
              {user.name}
            </Text>

            <Text className="text-green-100">
              Farmer
            </Text>

          </View>

        </LinearGradient>

        {/* PERSONAL DETAILS */}

        <View className="px-5 mt-6">

          <Text className="text-lg font-bold text-green-900 mb-3">
            Personal Details
          </Text>

          <View className="bg-white rounded-xl shadow p-4">

            <View className="flex-row justify-between mb-3">
              <Text className="text-gray-500">Phone</Text>
              <Text className="font-semibold">{user.phone}</Text>
            </View>

            <View className="flex-row justify-between mb-3">
              <Text className="text-gray-500">Location</Text>
              <Text className="font-semibold">{user.location}</Text>
            </View>

            <View className="flex-row justify-between mb-3">
              <Text className="text-gray-500">Farm Size</Text>
              <Text className="font-semibold">{user.farmSize}</Text>
            </View>

            <View className="flex-row justify-between">
              <Text className="text-gray-500">Main Crop</Text>
              <Text className="font-semibold">{user.mainCrop}</Text>
            </View>

          </View>

        </View>

        {/* ACCOUNT OPTIONS */}

        <View className="px-5 mt-6">

          <Text className="text-lg font-bold text-green-900 mb-3">
            Account
          </Text>

          <View className="bg-white rounded-xl shadow">

            <Pressable
              className="flex-row justify-between p-4 border-b border-gray-100"
            >
              <Text className="text-gray-700">
                Edit Profile
              </Text>
              <Text className="text-green-700">
                {">"}
              </Text>
            </Pressable>

            <Pressable
              className="flex-row justify-between p-4 border-b border-gray-100"
            >
              <Text className="text-gray-700">
                Change Password
              </Text>
              <Text className="text-green-700">
                {">"}
              </Text>
            </Pressable>

            <Pressable
              className="flex-row justify-between p-4"
            >
              <Text className="text-gray-700">
                Help & Support
              </Text>
              <Text className="text-green-700">
                {">"}
              </Text>
            </Pressable>

          </View>

        </View>

        {/* APP SETTINGS */}

        <View className="px-5 mt-6">

          <Text className="text-lg font-bold text-green-900 mb-3">
            App Settings
          </Text>

          <View className="bg-white rounded-xl shadow">

            <Pressable className="flex-row justify-between p-4 border-b border-gray-100">
              <Text className="text-gray-700">
                Notifications
              </Text>
              <Text className="text-green-700">
                {">"}
              </Text>
            </Pressable>

            <Pressable className="flex-row justify-between p-4">
              <Text className="text-gray-700">
                Privacy Policy
              </Text>
              <Text className="text-green-700">
                {">"}
              </Text>
            </Pressable>

          </View>

        </View>

        {/* LOGOUT BUTTON */}

        <View className="px-5 mt-8 mb-10">

          <Pressable
            className="bg-red-500 py-4 rounded-xl items-center"
            onPress={() => {
              console.log("Logout");
              navigation.replace("Auth");
            }}
          >
            <Text className="text-white font-semibold">
              Logout
            </Text>
          </Pressable>

        </View>

      </ScrollView>

    </SafeAreaView>
  );
}