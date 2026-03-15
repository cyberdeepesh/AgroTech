import {
  View,
  Text,
  ScrollView,
  TextInput,
  RefreshControl,
  ActivityIndicator
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useEffect } from "react";

export default function MarketScreen() {

  const [data, setData] = useState([]);
  const [filtered, setFiltered] = useState([]);

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [search, setSearch] = useState("");

  const API =
    "https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070?api-key=579b464db66ec23bdd000001&format=json&filters[state]=Punjab&filters[district]=Amritsar&limit=50";

  const fetchMarketPrices = async () => {
    try {
      setLoading(true);

      const res = await fetch(API);
      const json = await res.json();

      const records = json.records || [];

      setData(records);
      setFiltered(records);

      setLoading(false);

    } catch (error) {
      console.log("Market API error:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMarketPrices();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);

    fetchMarketPrices();

    setTimeout(() => {
      setRefreshing(false);
    }, 1200);
  };

  const handleSearch = (text) => {
    setSearch(text);

    const result = data.filter((item) =>
      item.commodity
        ?.toLowerCase()
        .includes(text.toLowerCase())
    );

    setFiltered(result);
  };

  return (
    <SafeAreaView className="flex-1 bg-[#F1F8E9]">

      {/* HEADER */}

      <View className="px-5 pt-4 pb-2">

        <Text className="text-2xl font-bold text-green-900">
          Amritsar Mandi
        </Text>

        <Text className="text-gray-500">
          Government Market Prices
        </Text>

      </View>

      {/* SEARCH */}

      <View className="px-5 mb-3">

        <TextInput
          placeholder="Search crop..."
          value={search}
          onChangeText={handleSearch}
          className="bg-white p-3 rounded-xl shadow"
        />

      </View>

      {/* CONTENT */}

      {loading ? (

        <View className="flex-1 justify-center items-center">

          <ActivityIndicator size="large" color="green" />

          <Text className="mt-3 text-gray-500">
            Loading market prices...
          </Text>

        </View>

      ) : (

        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
        >

          {/* EMPTY STATE */}

          {filtered.length === 0 && (

            <View className="items-center mt-20">

              <Text className="text-gray-500">
                No crop data found
              </Text>

            </View>

          )}

          {/* MARKET CARDS */}

          {filtered.map((item, index) => (

            <View
              key={index}
              className="bg-white mx-5 mb-3 rounded-xl p-4 shadow"
            >

              <Text className="text-lg font-bold text-green-800">
                {item.commodity}
              </Text>

              <Text className="text-gray-400 text-xs mb-2">
                Market: {item.market}
              </Text>

              <View className="flex-row justify-between mt-2">

                <View>
                  <Text className="text-gray-400 text-xs">
                    Min Price
                  </Text>

                  <Text>
                    ₹{item.min_price}/q
                  </Text>
                </View>

                <View>
                  <Text className="text-gray-400 text-xs">
                    Max Price
                  </Text>

                  <Text>
                    ₹{item.max_price}/q
                  </Text>
                </View>

                <View>
                  <Text className="text-gray-400 text-xs">
                    Modal Price
                  </Text>

                  <Text className="text-green-700 font-semibold">
                    ₹{item.modal_price}/q
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