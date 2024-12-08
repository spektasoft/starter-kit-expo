import { useCan } from '@refinedev/core';

import { Container } from '~/components/Container';
import Forbidden from '~/components/Forbidden';
import { Loading } from '~/components/Loading';
import { UserList } from '~/pages/resources/user/UserList';

export default function Users() {
  const { data: viewAnyUser, isLoading } = useCan({
    resource: 'users',
    action: 'viewAny',
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

  return <UserList />;
}
