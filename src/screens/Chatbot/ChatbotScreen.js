import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  FlatList,
  KeyboardAvoidingView,
  Platform
} from "react-native";

export default function ChatbotScreen() {

  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([
    {
      id: "1",
      text: "Hello 👋 I am AgroTech AI. Ask me anything about crops, fertilizers, irrigation or farming.",
      sender: "bot"
    }
  ]);

  const flatListRef = useRef(null);

  const sendMessage = () => {
    if (!message.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      text: message,
      sender: "user"
    };

    setChat(prev => [...prev, userMessage]);

    setMessage("");

    // Simulated AI response
    setTimeout(() => {
      const botMessage = {
        id: Date.now().toString() + "bot",
        text: "AgroTech AI is analyzing your farming question 🌱",
        sender: "bot"
      };

      setChat(prev => [...prev, botMessage]);
    }, 800);
  };

  const renderItem = ({ item }) => {

    const isUser = item.sender === "user";

    return (
      <View
        className={`mb-3 px-4 ${
          isUser ? "items-end" : "items-start"
        }`}
      >
        <View
          className={`px-4 py-3 rounded-xl max-w-[80%] ${
            isUser
              ? "bg-green-700"
              : "bg-gray-200"
          }`}
        >
          <Text
            className={`${
              isUser ? "text-white" : "text-gray-800"
            }`}
          >
            {item.text}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "#f5f5f5" }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >

      {/* HEADER */}

      <View className="bg-green-700 pt-14 pb-4 px-5">
        <Text className="text-white text-xl font-bold">
          AgroTech AI
        </Text>

        <Text className="text-green-100 text-xs mt-1">
          Smart Farming Assistant
        </Text>
      </View>

      {/* CHAT LIST */}

      <FlatList
        ref={flatListRef}
        data={chat}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={{ paddingTop: 10, paddingBottom: 20 }}
      />

      {/* INPUT AREA */}

      <View className="flex-row items-center p-3 mb- bg-white border-t border-gray-200">

        <TextInput
          value={message}
          onChangeText={setMessage}
          placeholder="Ask AgroTech AI..."
          className="flex-1 bg-gray-100 rounded-full px-4 py-2"
        />

        <Pressable
          onPress={sendMessage}
          className="ml-2 bg-green-700 px-4 py-2 rounded-full"
        >
          <Text className="text-white font-semibold">
            Send
          </Text>
        </Pressable>

      </View>

    </KeyboardAvoidingView>
  );
}