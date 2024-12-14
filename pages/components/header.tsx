import { useLogout, useGetIdentity } from '@refinedev/core';
import React from 'react';
import { View, TouchableOpacity, ActivityIndicator } from 'react-native';

import { Text } from '~/components/ui/text';

export const Header = () => {
  const { mutate, isLoading } = useLogout();
  const { data: identity } = useGetIdentity();
  console.log(identity);

  return (
    <View className="border-b border-gray-300 bg-gray-100 p-4">
      <Text className="mb-2 text-2xl font-bold">
        Welcome, <Text className="text-blue-500">{identity?.name ?? 'User'}</Text>
      </Text>

      <TouchableOpacity className="rounded-md bg-red-500 p-3" onPress={mutate} disabled={isLoading}>
        {isLoading ? (
          <ActivityIndicator color="#ffffff" />
        ) : (
          <Text className="font-sans-semibold text-center text-white">Logout</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};
