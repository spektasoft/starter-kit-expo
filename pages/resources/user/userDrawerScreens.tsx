import Drawer from 'expo-router/drawer';

export const userDrawerScreens = [
  <Drawer.Screen
    key="users/create"
    name="users/create"
    options={{
      title: 'Create Users',
      drawerItemStyle: { display: 'none' },
    }}
  />,
  <Drawer.Screen
    key="users/[id]/index"
    name="users/[id]/index"
    options={{
      title: 'View User',
      drawerItemStyle: { display: 'none' },
    }}
  />,
  <Drawer.Screen
    key="users/[id]/edit"
    name="users/[id]/edit"
    options={{
      title: 'Edit User',
      drawerItemStyle: { display: 'none' },
    }}
  />,
];
