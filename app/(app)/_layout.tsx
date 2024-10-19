import { Link, Stack } from 'expo-router';
import * as React from 'react';
import { Text, View } from 'react-native';

import { GuestMenu } from '~/components/navigation-menu/GuestMenu';
import { Button } from '~/components/ui/button';
import RootLayout from '~/layouts/RootLayout';

export default function AppLayout() {
  return (
    <RootLayout>
      <Stack
        screenOptions={{
          headerRight: () => (
            <View className="mx-3 flex flex-row items-center space-x-1.5">
              <Link href="/admin" asChild>
                <Button variant="ghost">
                  <Text className="text-foreground">Login</Text>
                </Button>
              </Link>
              <GuestMenu />
            </View>
          ),
        }}
      />
    </RootLayout>
  );
}
