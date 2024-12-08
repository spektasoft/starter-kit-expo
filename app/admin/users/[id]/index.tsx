import { useCan } from '@refinedev/core';
import { useLocalSearchParams } from 'expo-router';

import { Container } from '~/components/Container';
import Forbidden from '~/components/Forbidden';
import { Loading } from '~/components/Loading';
import { UserView } from '~/pages/resources/user/UserView';

export default function Index() {
  const local = useLocalSearchParams();
  const { data: viewAnyUser, isLoading } = useCan({
    resource: 'users',
    action: 'view',
    params: {
      id: local.id?.toString(),
    },
  });

  if (isLoading) {
    return (
      <Container>
        <Loading withText />
      </Container>
    );
  }

  if (!viewAnyUser?.can) {
    return (
      <Container>
        <Forbidden />
      </Container>
    );
  }

  return <UserView />;
}
