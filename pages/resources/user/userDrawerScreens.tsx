import Drawer from 'expo-router/drawer';

import { User } from '~/lib/icons/User';

export const userDrawerScreens = [
  <Drawer.Screen
    key="users/index"
    name="users/index"
    options={{
      drawerLabel: 'Users',
      title: 'Users',
      drawerIcon: ({ color }) => <User className="h-5 w-5" color={color} />,
    }}
  />,
];
