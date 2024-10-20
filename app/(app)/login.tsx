import { Stack } from 'expo-router';
import { ScrollView } from 'react-native';

import { Container } from '~/components/Container';
import { AuthPage } from '~/components/pages/auth';

export default function Login() {
  return (
    <>
      <Stack.Screen options={{ title: 'Login' }} />
      <ScrollView>
        <Container>
          <AuthPage type="login" />
        </Container>
      </ScrollView>
    </>
  );
}
