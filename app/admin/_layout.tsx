import { Drawer } from 'expo-router/drawer';
import { Pressable } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { ThemeToggle } from '~/components/ThemeToggle';
import RootLayout from '~/layouts/RootLayout';
import { Bars3 } from '~/lib/icons/Bars3';

export default function Layout() {
  return (
    <RootLayout>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Drawer
          screenOptions={(props) => {
            return {
              headerRight: () => <ThemeToggle />,
              headerLeft: () => (
                <Pressable className="mx-3" onPress={() => props.navigation.toggleDrawer()}>
                  <Bars3 className="text-foreground" />
                </Pressable>
              ),
            };
          }}
        />
      </GestureHandlerRootView>
    </RootLayout>
  );
}
