import {
  View,
  Text,
  ScrollView,
  TextInput,
  Pressable,
  RefreshControl
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";

import { useState } from "react";

import BlogCard from "../../components/cards/BlogCard";

export default function BlogsScreen({ navigation }) {

  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState("");

  const categories = [
    "All",
    "Crop Tips",
    "Fertilizer",
    "Irrigation",
    "Market"
  ];

  const [selectedCategory, setSelectedCategory] = useState("All");

  const [blogs, setBlogs] = useState([
    {
      id: 1,
      title: "Best Crops for Summer Season",
      category: "Crop Tips",
      description: "Learn which crops produce high yield during summer.",
      date: "12 Mar 2026",
      image:
        "https://images.unsplash.com/photo-1501004318641-b39e6451bec6"
    },
    {
      id: 2,
      title: "How to Use Organic Fertilizers",
      category: "Fertilizer",
      description: "Improve soil health with organic fertilizer methods.",
      date: "10 Mar 2026",
      image:
        "https://images.unsplash.com/photo-1464226184884-fa280b87c399"
    },
    {
      id: 3,
      title: "Smart Irrigation Techniques",
      category: "Irrigation",
      description: "Save water and increase crop productivity.",
      date: "8 Mar 2026",
      image:
        "https://images.unsplash.com/photo-1469474968028-56623f02e42e"
    }
  ]);

  const onRefresh = () => {
    setRefreshing(true);

    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const filteredBlogs = blogs.filter(blog => {
    const matchCategory =
      selectedCategory === "All" ||
      blog.category === selectedCategory;

    const matchSearch =
      blog.title.toLowerCase().includes(search.toLowerCase());

    return matchCategory && matchSearch;
  });

  return (
    <SafeAreaView className="flex-1 bg-[#F1F8E9]">

      {/* HEADER */}

      <View className="px-5 pt-3 pb-2">
        <Text className="text-2xl font-bold text-green-900">
          Agriculture Blogs
        </Text>
        <Text className="text-gray-500">
          Farming tips & guides
        </Text>
      </View>

      {/* SEARCH BAR */}

      <View className="px-5 mt-2">

        <TextInput
          placeholder="Search farming tips..."
          value={search}
          onChangeText={setSearch}
          className="bg-white p-3 rounded-xl shadow"
        />

      </View>

      {/* CATEGORY FILTER */}
      <View className="mt-3">
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20, alignItems: "center" }}
      >
        {categories.map((item, index) => (
          <Pressable
            key={index}
            onPress={() => setSelectedCategory(item)}
            className={`px-4 py-2 mr-3 rounded-full items-center justify-center ${
              selectedCategory === item ? "bg-green-700" : "bg-white border border-gray-300"
            }`}
          >
            <Text
              className={`text-base leading-5 font-medium ${
                selectedCategory === item ? "text-white" : "text-gray-700"
              }`}
            >
              {item}
            </Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>

      {/* BLOG LIST */}
<ScrollView
  className="px-5 mt-4"
  showsVerticalScrollIndicator={false}
  refreshControl={
    <RefreshControl
      refreshing={refreshing}
      onRefresh={onRefresh}
    />
  }
>

  {/* FEATURED BLOG */}

  {blogs.length > 0 && (
    <Pressable
      onPress={() =>
        navigation.navigate("BlogDetails", {
          blog: blogs[0]
        })
      }
      className="bg-white rounded-xl mb-4 overflow-hidden shadow"
    >
      <Image
        source={{ uri: blogs[0].image }}
        style={{ width: "100%", height: 200 }}
      />

      <View className="p-4">
        <Text className="text-green-700 text-xs font-semibold">
          Featured
        </Text>

        <Text className="font-bold text-lg mt-1">
          {blogs[0].title}
        </Text>

        <Text className="text-gray-500 text-sm mt-1">
          {blogs[0].description}
        </Text>
      </View>
    </Pressable>
  )}

  {/* BLOG CARDS */}

  {filteredBlogs.slice(1).map(blog => (
    <BlogCard
      key={blog.id}
      blog={blog}
      onPress={() =>
        navigation.navigate("BlogDetails", {
          blog: blog
        })
      }
    />
  ))}

</ScrollView>

    </SafeAreaView>
  );
}