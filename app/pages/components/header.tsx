import React from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useLogout, useGetIdentity } from "@refinedev/core";

export const Header = () => {
  const { mutate, isLoading } = useLogout();
  const { data: identity } = useGetIdentity();
  console.log(identity);

  return (
    <View className="p-4 bg-gray-100 border-b border-gray-300">
      <Text className="text-2xl font-bold mb-2">
        Welcome, <Text className="text-blue-500">{identity?.name ?? "User"}</Text>
      </Text>
      
      <TouchableOpacity
        className="bg-red-500 p-3 rounded-md"
        onPress={mutate}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="#ffffff" />
        ) : (
          <Text className="text-white text-center font-semibold">Logout</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};
