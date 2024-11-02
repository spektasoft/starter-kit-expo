import { Authenticated } from '@refinedev/core';
import { Redirect } from 'expo-router';
import { ScrollView } from 'react-native';

import { Container } from '~/components/Container';
import { Loading } from '~/components/Loading';
import { AuthPage } from '~/pages/auth/AuthPage';

export default function Login() {
  return (
    <>
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
