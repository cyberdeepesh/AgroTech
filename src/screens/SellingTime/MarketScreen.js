import {
  View,
  Text,
  ScrollView,
  TextInput,
  RefreshControl,
  ActivityIndicator,
  Pressable
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";

export default function MarketScreen() {

  const [data, setData] = useState([]);
  const [filtered, setFiltered] = useState([]);

  // Loading is false initially since we wait for the user to search
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  
  // Track if a search has been executed yet
  const [hasSearched, setHasSearched] = useState(false);

  const [search, setSearch] = useState("");

  const API =
    "https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070?api-key=579b464db66ec23bdd00000107085e0c269e4aa069e697fb45c1b1b4&format=json&filters[state]=Punjab&filters[district]=Amritsar&limit=50";

  const fetchMarketPrices = async (searchTerm) => {
    if (!searchTerm.trim()) return;

    try {
      setLoading(true);
      setHasSearched(true);

      const res = await fetch(API);
      const json = await res.json();

      const records = json.records || [];

      setData(records);

      // Filter the fetched records by the search term
      const result = records.filter((item) =>
        item.commodity
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase())
      );

      setFiltered(result);
      setLoading(false);

    } catch (error) {
      console.log("Market API error:", error);
      setLoading(false);
    }
  };

  const onRefresh = () => {
    if (!hasSearched) return; // Don't refresh if no search was made yet
    
    setRefreshing(true);
    fetchMarketPrices(search);

    setTimeout(() => {
      setRefreshing(false);
    }, 1200);
  };

  return (
    <SafeAreaView className="flex-1 bg-slate-50">

      {/* HEADER */}
      <View className="px-6 pt-5 pb-4">
        <Text className="text-3xl font-extrabold text-emerald-900 tracking-tight">
          Amritsar Mandi
        </Text>
        <Text className="text-emerald-600/80 font-medium mt-1">
          Government Market Prices
        </Text>
      </View>

      {/* SEARCH BAR & BUTTON */}
      <View className="px-6 mb-4 flex-row items-center">
        <TextInput
          placeholder="e.g., Wheat, Rice..."
          placeholderTextColor="#94a3b8"
          value={search}
          onChangeText={setSearch}
          onSubmitEditing={() => fetchMarketPrices(search)}
          className="flex-1 bg-white px-5 py-4 rounded-2xl shadow-sm shadow-slate-200 border border-slate-100 text-slate-800 font-medium text-base mr-3"
        />
        
        <Pressable 
          onPress={() => fetchMarketPrices(search)}
          className="bg-emerald-600 px-6 py-4 rounded-2xl shadow-sm shadow-emerald-200/50 active:bg-emerald-700"
        >
          <Text className="text-white font-bold text-base tracking-wide">
            Search
          </Text>
        </Pressable>
      </View>

      {/* CONTENT */}
      {loading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#059669" />
          <Text className="mt-4 text-slate-500 font-medium tracking-wide">
            Fetching market prices...
          </Text>
        </View>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          className="pb-6"
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor="#059669"
            />
          }
        >

          {/* INITIAL STATE (Before user has searched) */}
          {!hasSearched && (
            <View className="items-center justify-center mt-24 px-8">
              <View className="w-24 h-24 bg-emerald-50 rounded-full items-center justify-center mb-5 border border-emerald-100">
                <Text className="text-4xl">🔍</Text>
              </View>
              <Text className="text-xl font-bold text-slate-800 mb-2 text-center">
                Search to Start
              </Text>
              <Text className="text-slate-500 text-center leading-6 font-medium">
                Enter a crop name above and tap Search to see today's live Mandi prices.
              </Text>
            </View>
          )}

          {/* EMPTY STATE (User searched, but no results found) */}
          {hasSearched && filtered.length === 0 && (
            <View className="items-center justify-center mt-24 px-8">
              <View className="w-24 h-24 bg-amber-50 rounded-full items-center justify-center mb-5 border border-amber-100">
                <Text className="text-4xl">🌾</Text>
              </View>
              <Text className="text-xl font-bold text-slate-800 mb-2 text-center">
                No Results Found
              </Text>
              <Text className="text-slate-500 text-center leading-6 font-medium">
                We couldn't find any current data for "{search}". Try searching for another crop.
              </Text>
            </View>
          )}

          {/* MARKET CARDS */}
          {hasSearched && filtered.map((item, index) => (
            <View
              key={index}
              className="bg-white mx-6 mb-4 rounded-3xl p-5 shadow-sm shadow-slate-200 border border-slate-100"
            >
              <View className="flex-row justify-between items-start mb-4">
                <View>
                  <Text className="text-xl font-bold text-slate-800">
                    {item.commodity}
                  </Text>
                  <Text className="text-emerald-600 font-semibold text-xs mt-1 uppercase tracking-wider">
                    Market: {item.market}
                  </Text>
                </View>
                
                <View className="bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-100">
                  <Text className="text-emerald-800 font-bold text-xs uppercase tracking-wider">
                    {item.grade || "FAQ"}
                  </Text>
                </View>
              </View>

              <View className="flex-row justify-between pt-4 border-t border-slate-100">
                
                <View className="items-start">
                  <Text className="text-slate-400 font-bold text-[10px] uppercase tracking-widest mb-1">
                    Min Price
                  </Text>
                  <Text className="text-slate-700 font-semibold text-base">
                    ₹{item.min_price}
                    <Text className="text-slate-400 text-xs">/q</Text>
                  </Text>
                </View>

                <View className="items-center">
                  <Text className="text-slate-400 font-bold text-[10px] uppercase tracking-widest mb-1">
                    Max Price
                  </Text>
                  <Text className="text-slate-700 font-semibold text-base">
                    ₹{item.max_price}
                    <Text className="text-slate-400 text-xs">/q</Text>
                  </Text>
                </View>

                <View className="items-end">
                  <Text className="text-emerald-600 font-bold text-[10px] uppercase tracking-widest mb-1">
                    Modal Price
                  </Text>
                  <Text className="text-emerald-700 font-extrabold text-lg">
                    ₹{item.modal_price}
                    <Text className="text-emerald-600/60 text-xs font-semibold">/q</Text>
                  </Text>
                </View>

              </View>

            </View>

          ))}

        </ScrollView>
      )}

    </SafeAreaView>
  );
}
