import { Authenticated } from '@refinedev/core';
import { Redirect } from 'expo-router';
import { Drawer } from 'expo-router/drawer';
import { Pressable, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { UserMenu } from '~/components/navigation-menu/UserMenu';
import RootLayout from '~/layouts/RootLayout';
import { Bars3 } from '~/lib/icons/Bars3';

export default function Layout() {
  return (
    <RootLayout>
      <Authenticated key="admin" fallback={<Redirect href="/login" />}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <Drawer
            screenOptions={(props) => {
              return {
                headerRight: () => (
                  <View className="mx-3 flex flex-row items-center space-x-1.5">
                    <UserMenu />
                  </View>
                ),
                headerLeft: () => (
                  <Pressable className="mx-3" onPress={() => props.navigation.toggleDrawer()}>
                    <Bars3 className="text-foreground" />
                  </Pressable>
                ),
              };
            }}
          />
        </GestureHandlerRootView>
      </Authenticated>
    </RootLayout>
  );
}
