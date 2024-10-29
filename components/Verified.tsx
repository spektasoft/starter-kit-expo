import { useGetIdentity } from '@refinedev/core';

import { User } from '~/providers/auth-provider/user';

export type VerifiedProps = {
  key: React.Key;
  fallback?: React.ReactNode;
  loading?: React.ReactNode;
  children?: React.ReactNode;
};

export const Verified = (props: VerifiedProps) => {
  const { data: user, isFetching } = useGetIdentity<User>();

  if (isFetching || !user) {
    return <>{props.loading ?? null}</>;
  }

  if (!user.email_verified_at) {
    return <>{props.fallback ?? null}</>;
  }

  return <>{props.children ?? null}</>;
};
