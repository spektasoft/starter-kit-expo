import { Stack } from 'expo-router';
import * as React from 'react';
import { View } from 'react-native';

import { GuestMenu } from '~/components/navigation-menu/GuestMenu';
import RootLayout from '~/layouts/RootLayout';

export default function AppLayout() {
  return (
    <RootLayout>
      <Stack
        screenOptions={{
          headerRight: () => (
            <View className="flex flex-row items-center space-x-1.5 web:mx-3">
              <GuestMenu />
            </View>
          ),
        }}
      />
    </RootLayout>
  );
}
