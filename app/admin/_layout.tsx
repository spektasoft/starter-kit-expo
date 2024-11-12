import { Authenticated } from '@refinedev/core';
import { Redirect } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { AdminDrawer } from '~/components/AdminDrawer';
import { Container } from '~/components/Container';
import { Loading } from '~/components/Loading';
import { Verified } from '~/components/Verified';
import RootLayout from '~/layouts/RootLayout';

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
            <AdminDrawer />
          </GestureHandlerRootView>
        </Verified>
      </Authenticated>
    </RootLayout>
  );
}
