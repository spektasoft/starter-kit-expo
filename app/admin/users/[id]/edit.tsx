import { useCan } from '@refinedev/core';
import { useLocalSearchParams } from 'expo-router';

import { Container } from '~/components/Container';
import Forbidden from '~/components/Forbidden';
import { Loading } from '~/components/Loading';
import { UserEdit } from '~/pages/resources/user/UserEdit';

export default function Edit() {
  const local = useLocalSearchParams();
  const { data: viewAnyUser, isLoading } = useCan({
    resource: 'users',
    action: 'update_user',
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

  return <UserEdit />;
}
