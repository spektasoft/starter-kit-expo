import { Authenticated } from '@refinedev/core';
import { Redirect } from 'expo-router';
import { Drawer } from 'expo-router/drawer';
import { Pressable, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { Container } from '~/components/Container';
import { Loading } from '~/components/Loading';
import { Verified } from '~/components/Verified';
import { UserMenu } from '~/components/navigation-menu/UserMenu';
import RootLayout from '~/layouts/RootLayout';
import { Bars3 } from '~/lib/icons/Bars3';
import { Home } from '~/lib/icons/Home';

export default function Layout() {
  const loading = (
    <Container>
      <Loading withText />
    </Container>
  );
  return (
    <RootLayout>
      <Authenticated key="admin" fallback={<Redirect href="/login" />} loading={loading}>
        <Verified key="admin" fallback={<Redirect href="/email/verify" />} loading={loading}>
          <GestureHandlerRootView style={{ flex: 1 }}>
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
            </Drawer>
          </GestureHandlerRootView>
        </Verified>
      </Authenticated>
    </RootLayout>
  );
}
