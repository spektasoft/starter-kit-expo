import { Authenticated } from '@refinedev/core';
import { Redirect } from 'expo-router';
import Drawer from 'expo-router/drawer';
import { ScrollView } from 'react-native';

import { Container } from '~/components/Container';
import { Loading } from '~/components/Loading';
import { AuthPage } from '~/components/pages/auth/AuthPage';

export default function Login() {
  return (
    <>
      <Drawer.Screen options={{ title: 'Login' }} />
      <ScrollView>
        <Container>
          <Authenticated
            key="login"
            fallback={<AuthPage type="login" />}
            loading={<Loading withText />}>
            <Redirect href="/admin" />
          </Authenticated>
        </Container>
      </ScrollView>
    </>
  );
}
