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

      <ScrollView showsVerticalScrollIndicator={false} className="pb-10">

        {/* HEADER */}



          <View className="items-center">

            <Image
              source={{
                uri: "https://cdn-icons-png.flaticon.com/512/149/149071.png"
              }}
              style={{ width: 100, height: 100 }}
              contentFit="cover"
              className="rounded-full border-4 border-white/20"
            />

            <Text className="text-green-800 text-2xl font-extrabold mt-4 tracking-tight">
              {user.name}
            </Text>

            <Text className="text-emerald-900 font-medium text-sm mt-1 uppercase tracking-widest">
              Farmer
            </Text>

          </View>


        {/* PERSONAL DETAILS */}

        <View className="px-6 mt-8">

          <Text className="text-xl font-bold text-slate-800 mb-5">
            Personal Details
          </Text>

          <View className="bg-white rounded-3xl p-6 shadow-sm shadow-slate-200 border border-slate-100">

            <View className="flex-row justify-between items-center border-b border-slate-100 pb-4 mb-4">
              <Text className="text-slate-500 font-medium">Phone</Text>
              <Text className="text-slate-800 font-bold text-base">{user.phone}</Text>
            </View>

            <View className="flex-row justify-between items-center border-b border-slate-100 pb-4 mb-4">
              <Text className="text-slate-500 font-medium">Location</Text>
              <Text className="text-slate-800 font-bold text-base">{user.location}</Text>
            </View>

            <View className="flex-row justify-between items-center border-b border-slate-100 pb-4 mb-4">
              <Text className="text-slate-500 font-medium">Farm Size</Text>
              <Text className="text-slate-800 font-bold text-base">{user.farmSize}</Text>
            </View>

            <View className="flex-row justify-between items-center">
              <Text className="text-slate-500 font-medium">Main Crop</Text>
              <Text className="text-slate-800 font-bold text-base">{user.mainCrop}</Text>
            </View>

          </View>

        </View>

        {/* ACCOUNT OPTIONS */}

        <View className="px-6 mt-8">

          <Text className="text-xl font-bold text-slate-800 mb-5">
            Account
          </Text>

          <View className="bg-white rounded-3xl shadow-sm shadow-slate-200 border border-slate-100 overflow-hidden">

            <Pressable
              className="flex-row justify-between items-center p-5 border-b border-slate-100"
            >
              <Text className="text-slate-700 font-semibold text-base">
                Edit Profile
              </Text>
              <Text className="text-emerald-500 font-bold text-lg">
                {">"}
              </Text>
            </Pressable>

            <Pressable
              className="flex-row justify-between items-center p-5 border-b border-slate-100"
            >
              <Text className="text-slate-700 font-semibold text-base">
                Change Password
              </Text>
              <Text className="text-emerald-500 font-bold text-lg">
                {">"}
              </Text>
            </Pressable>

            <Pressable
              className="flex-row justify-between items-center p-5"
            >
              <Text className="text-slate-700 font-semibold text-base">
                Help & Support
              </Text>
              <Text className="text-emerald-500 font-bold text-lg">
                {">"}
              </Text>
            </Pressable>

          </View>

        </View>

        {/* APP SETTINGS */}

        <View className="px-6 mt-8">

          <Text className="text-xl font-bold text-slate-800 mb-5">
            App Settings
          </Text>

          <View className="bg-white rounded-3xl shadow-sm shadow-slate-200 border border-slate-100 overflow-hidden">

            <Pressable className="flex-row justify-between items-center p-5 border-b border-slate-100">
              <Text className="text-slate-700 font-semibold text-base">
                Notifications
              </Text>
              <Text className="text-emerald-500 font-bold text-lg">
                {">"}
              </Text>
            </Pressable>

            <Pressable className="flex-row justify-between items-center p-5">
              <Text className="text-slate-700 font-semibold text-base">
                Privacy Policy
              </Text>
              <Text className="text-emerald-500 font-bold text-lg">
                {">"}
              </Text>
            </Pressable>

          </View>

        </View>

        {/* LOGOUT BUTTON */}

        <View className="px-6 mt-10 mb-12">

          <Pressable
            className="bg-red-50 py-4 rounded-3xl items-center border border-red-100 shadow-sm shadow-red-50"
            onPress={() => {
              console.log("Logout");
              navigation.replace("Auth");
            }}
          >
            <Text className="text-red-600 font-bold text-base tracking-wide">
              Logout
            </Text>
          </Pressable>

        </View>

      </ScrollView>

    </SafeAreaView>
  );
}