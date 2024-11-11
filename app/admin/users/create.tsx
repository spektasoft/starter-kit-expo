import { useCan } from '@refinedev/core';

import { Container } from '~/components/Container';
import Forbidden from '~/components/Forbidden';
import { Loading } from '~/components/Loading';
import { UserCreate } from '~/pages/resources/user/UserCreate';

export default function Create() {
  const { data: viewAnyUser, isLoading } = useCan({
    resource: 'users',
    action: 'create_user',
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

  return <UserCreate />;
}
