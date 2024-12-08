import { Authenticated, useTranslate } from '@refinedev/core';
import { Drawer } from 'expo-router/drawer';
import { Platform, Pressable, View } from 'react-native';

import { Loading } from './Loading';
import { GuestMenu } from './navigation-menu/GuestMenu';
import { LanguageSwitcher } from './navigation-menu/LanguageSwitcher';

import { UserMenu } from '~/components/navigation-menu/UserMenu';
import { Bars3 } from '~/lib/icons/Bars3';
import { Home } from '~/lib/icons/Home';
import { DRAWER_ITEM_STYLE } from '~/lib/constants';

export const HomeDrawer = () => {
  const __ = useTranslate();

  return (
    <Drawer
      screenOptions={(props) => ({
        headerRight: () => (
          <View className="mx-3 flex flex-row items-center justify-center gap-1">
            {Platform.OS === 'web' && <LanguageSwitcher />}
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
        drawerItemStyle: DRAWER_ITEM_STYLE,
      })}>
      <Drawer.Screen
        name="index"
        options={{
          title: __('Home'),
          drawerIcon: ({ color }) => <Home className="h-5 w-5" color={color} />,
          drawerItemStyle: DRAWER_ITEM_STYLE,
        }}
      />
      <Drawer.Screen
        name="details"
        options={{ title: __('Details'), drawerItemStyle: { display: 'none' } }}
      />
      <Drawer.Screen
        name="login"
        options={{ title: __('Login'), drawerItemStyle: { display: 'none' } }}
      />
      <Drawer.Screen
        name="wip"
        options={{
          title: __('Work in Progress'),
          drawerItemStyle: { display: 'none' },
        }}
      />
      <Drawer.Screen
        name="two-factor-challenge"
        options={{
          title: __('Two Factor Authentication'),
          drawerItemStyle: { display: 'none' },
        }}
      />
      <Drawer.Screen
        name="email/verify"
        options={{
          title: 'Email Verification',
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
  );
};
