import * as React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { HomeDrawer } from '~/components/HomeDrawer';
import RootLayout from '~/layouts/RootLayout';

export default function AppLayout() {
  return (
    <RootLayout>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <HomeDrawer />
      </GestureHandlerRootView>
    </RootLayout>
  );
}
