import { View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";

export default function BlogDetailsScreen({ route }) {

  const { blog } = route.params;

  return (
    <SafeAreaView className="flex-1 bg-white">

      <ScrollView>

        <Image
          source={{ uri: blog.image }}
          style={{ width: "100%", height: 260 }}
          contentFit="cover"
        />

        <View className="p-5">

          <Text className="text-green-700 font-semibold">
            {blog.category}
          </Text>

          <Text className="text-2xl font-bold mt-2">
            {blog.title}
          </Text>

          <Text className="text-gray-400 mt-1">
            {blog.date}
          </Text>

          <Text className="mt-4 text-gray-700 leading-6">
            {blog.description}

            {"\n\n"}

            This article explains modern agricultural techniques
            farmers can adopt to increase productivity and reduce
            crop losses.
          </Text>

        </View>

      </ScrollView>

    </SafeAreaView>
  );
}