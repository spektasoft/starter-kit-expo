import { useCan } from '@refinedev/core';
import { Drawer } from 'expo-router/drawer';
import { Pressable, View } from 'react-native';

import { userDrawerScreens } from '../pages/resources/user/userDrawerScreens';

import { UserMenu } from '~/components/navigation-menu/UserMenu';
import { Bars3 } from '~/lib/icons/Bars3';
import { Home } from '~/lib/icons/Home';
import { User } from '~/lib/icons/User';

export const AdminDrawer = () => {
  const { data: viewAnyUser, isLoading } = useCan({
    resource: 'users',
    action: 'view_any_user',
  });

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
            <View className="mx-3 flex flex-row items-center justify-center">
              <UserMenu type="admin" />
            </View>
          ),
          headerLeft: () => (
            <Pressable className="mx-3" onPress={() => props.navigation.toggleDrawer()}>
              <Bars3 className="text-foreground" />
            </Pressable>
          ),
          drawerType: 'back',
        };
      }}>
      <Drawer.Screen
        name="index"
        options={{
          drawerLabel: 'Dashboard',
          title: 'Dashboard',
          drawerIcon: ({ color }) => <Home className="h-5 w-5" color={color} />,
        }}
      />
      <Drawer.Screen
        key="users/index"
        name="users/index"
        options={{
          drawerLabel: 'Users',
          title: 'Users',
          drawerIcon: ({ color }) => <User className="h-5 w-5" color={color} />,
          drawerItemStyle: { display: isShown ? 'flex' : 'none' },
        }}
      />
      {userDrawerScreens}
    </Drawer>
  );
};
