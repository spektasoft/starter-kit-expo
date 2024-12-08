import { useCan, useTranslate } from '@refinedev/core';
import { Drawer } from 'expo-router/drawer';
import { Platform, Pressable, View } from 'react-native';

import { LanguageSwitcher } from './navigation-menu/LanguageSwitcher';
import { userDrawerScreens } from '../pages/resources/user/userDrawerScreens';

import { UserMenu } from '~/components/navigation-menu/UserMenu';
import { Bars3 } from '~/lib/icons/Bars3';
import { Home } from '~/lib/icons/Home';
import { User } from '~/lib/icons/User';
import { DRAWER_ITEM_STYLE } from '~/lib/constants';

export const AdminDrawer = () => {
  const { data: viewAnyUser, isLoading } = useCan({
    resource: 'users',
    action: 'viewAny',
  });
  const __ = useTranslate();

  let isShown = true;

  if (isLoading) {
    isShown = false;
  }

  if (!viewAnyUser?.can) {
    isShown = false;
  }

  return (
    <Drawer
      screenOptions={(props) => {
        return {
          headerRight: () => (
            <View className="mx-3 flex flex-row items-center justify-center gap-1">
              {Platform.OS === 'web' && <LanguageSwitcher />}
              <UserMenu type="admin" />
            </View>
          ),
          headerLeft: () => (
            <Pressable className="mx-3" onPress={() => props.navigation.toggleDrawer()}>
              <Bars3 className="text-foreground" />
            </Pressable>
          ),
          drawerItemStyle: DRAWER_ITEM_STYLE,
        };
      }}>
      <Drawer.Screen
        name="index"
        options={{
          drawerLabel: __('Dashboard'),
          title: __('Dashboard'),
          drawerIcon: ({ color }) => <Home className="h-5 w-5" color={color} />,
          drawerItemStyle: DRAWER_ITEM_STYLE,
        }}
      />
      <Drawer.Screen
        key="users/index"
        name="users/index"
        options={{
          drawerLabel: __('user.resource.pluralModelLabel'),
          title: __('user.resource.pluralModelLabel'),
          drawerIcon: ({ color }) => <User className="h-5 w-5" color={color} />,
          drawerItemStyle: Object.assign({ display: isShown ? 'flex' : 'none' }, DRAWER_ITEM_STYLE),
        }}
      />
      {userDrawerScreens({
        __: (key) => __(key),
      })}
    </Drawer>
  );
};
