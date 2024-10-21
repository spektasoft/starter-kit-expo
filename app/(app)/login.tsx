import { Authenticated } from '@refinedev/core';
import { Redirect, Stack } from 'expo-router';
import { ScrollView } from 'react-native';

import { Container } from '~/components/Container';
import { AuthPage } from '~/components/pages/auth/AuthPage';

export default function Login() {
  return (
    <>
      <Stack.Screen options={{ title: 'Login' }} />
      <ScrollView>
        <Container>
          <Authenticated key="login" fallback={<AuthPage type="login" />}>
            <Redirect href="/admin" />
          </Authenticated>
        </Container>
      </ScrollView>
    </>
  );
}
