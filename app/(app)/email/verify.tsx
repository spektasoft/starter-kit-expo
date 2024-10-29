import { Authenticated } from '@refinedev/core';
import { Redirect } from 'expo-router';
import { ScrollView } from 'react-native';

import { Container } from '~/components/Container';
import { Loading } from '~/components/Loading';
import { Navigate } from '~/components/Navigate';
import { Verified } from '~/components/Verified';
import { EmailVerificationPage } from '~/components/pages/auth/EmailVerificationPage';

export default function EmailVerify() {
  const loading = (
    <Container>
      <Loading withText />
    </Container>
  );

  const verification = (
    <ScrollView>
      <Container>
        <EmailVerificationPage />
      </Container>
    </ScrollView>
  );

  return (
    <Authenticated key="email-verification" fallback={<Navigate href="/login" />} loading={loading}>
      <Verified key="email-verification" fallback={verification} loading={loading}>
        <Redirect href="/admin" />
      </Verified>
    </Authenticated>
  );
}
