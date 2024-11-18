import Drawer from 'expo-router/drawer';

export const userDrawerScreens = ({ __ }: { __: (key: string) => void }) => [
  <Drawer.Screen
    key="users/create"
    name="users/create"
    options={{
      title: `${__('Create')} ${__('user.resource.pluralModelLabel')}`,
      drawerItemStyle: { display: 'none' },
    }}
  />,
  <Drawer.Screen
    key="users/[id]/index"
    name="users/[id]/index"
    options={{
      title: `${__('View')} ${__('user.resource.modelLabel')}`,
      drawerItemStyle: { display: 'none' },
    }}
  />,
  <Drawer.Screen
    key="users/[id]/edit"
    name="users/[id]/edit"
    options={{
      title: `${__('Edit')} ${__('user.resource.modelLabel')}`,
      drawerItemStyle: { display: 'none' },
    }}
  />,
];
