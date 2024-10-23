import { Authenticated } from '@refinedev/core';
import { Redirect } from 'expo-router';
import { Drawer } from 'expo-router/drawer';
import { Pressable, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { Container } from '~/components/Container';
import { Loading } from '~/components/Loading';
import { UserMenu } from '~/components/navigation-menu/UserMenu';
import RootLayout from '~/layouts/RootLayout';
import { Bars3 } from '~/lib/icons/Bars3';
import { Home } from '~/lib/icons/Home';

export default function Layout() {
  return (
    <RootLayout>
      <Authenticated
        key="admin"
        fallback={<Redirect href="/login" />}
        loading={
          <Container>
            <Loading withText />
          </Container>
        }>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <Drawer
            screenOptions={(props) => {
              return {
                headerRight: () => (
                  <View className="mx-3 flex flex-row items-center space-x-1.5">
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
          </Drawer>
        </GestureHandlerRootView>
      </Authenticated>
    </RootLayout>
  );
}
