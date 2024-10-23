import { Authenticated } from '@refinedev/core';
import { Stack } from 'expo-router';
import * as React from 'react';
import { View } from 'react-native';

import { Loading } from '~/components/Loading';
import { GuestMenu } from '~/components/navigation-menu/GuestMenu';
import { UserMenu } from '~/components/navigation-menu/UserMenu';
import RootLayout from '~/layouts/RootLayout';

export default function AppLayout() {
  return (
    <RootLayout>
      <Stack
        screenOptions={{
          headerRight: () => (
            <View className="flex flex-row items-center space-x-1.5 web:mx-3">
              <Authenticated key="menu" fallback={<GuestMenu />} loading={<Loading />}>
                <UserMenu type="app" />
              </Authenticated>
            </View>
          ),
        }}
      />
    </RootLayout>
  );
}
