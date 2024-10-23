import { Authenticated } from '@refinedev/core';
import Drawer from 'expo-router/drawer';
import * as React from 'react';
import { Pressable, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { Loading } from '~/components/Loading';
import { GuestMenu } from '~/components/navigation-menu/GuestMenu';
import { UserMenu } from '~/components/navigation-menu/UserMenu';
import RootLayout from '~/layouts/RootLayout';
import { Bars3 } from '~/lib/icons/Bars3';
import { Home } from '~/lib/icons/Home';

export default function AppLayout() {
  return (
    <RootLayout>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Drawer
          screenOptions={(props) => ({
            headerRight: () => (
              <View className="flex flex-row items-center space-x-1.5 web:mx-3">
                <Authenticated key="menu" fallback={<GuestMenu />} loading={<Loading />}>
                  <UserMenu type="app" />
                </Authenticated>
              </View>
            ),
            headerLeft: () => (
              <Pressable className="mx-3" onPress={() => props.navigation.toggleDrawer()}>
                <Bars3 className="text-foreground" />
              </Pressable>
            ),
            drawerType: 'back',
          })}>
          <Drawer.Screen
            name="index"
            options={{
              title: 'Home',
              drawerIcon: ({ color }) => <Home className="h-5 w-5" color={color} />,
            }}
          />
          <Drawer.Screen
            name="details"
            options={{ title: 'Details', drawerItemStyle: { display: 'none' } }}
          />
          <Drawer.Screen
            name="login"
            options={{ title: 'Login', drawerItemStyle: { display: 'none' } }}
          />
          <Drawer.Screen
            name="wip"
            options={{
              title: 'Work in Progress',
              drawerItemStyle: { display: 'none' },
            }}
          />
          <Drawer.Screen
            name="products/index"
            options={{
              title: 'Products',
              drawerItemStyle: { display: 'none' },
            }}
          />
        </Drawer>
      </GestureHandlerRootView>
    </RootLayout>
  );
}
