import { Authenticated } from '@refinedev/core';
import { Redirect } from 'expo-router';
import { ScrollView } from 'react-native-gesture-handler';

import { Container } from '~/components/Container';
import { Loading } from '~/components/Loading';
import { TwoFactorChallengePage } from '~/components/pages/auth/TwoFactorChallengePage';

export default function TwoFactorChallenge() {
  return (
    <ScrollView>
      <Container>
        <Authenticated
          key="two-factor-challenge"
          fallback={<TwoFactorChallengePage />}
          loading={<Loading withText />}>
          <Redirect href="/admin" />
        </Authenticated>
      </Container>
    </ScrollView>
  );
}
