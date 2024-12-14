import { useGetIdentity } from '@refinedev/core';
import { useMemo } from 'react';

import { User } from '~/models/User';

export type VerifiedProps = {
  key: React.Key;
  fallback?: React.ReactNode;
  loading?: React.ReactNode;
  children?: React.ReactNode;
};

export const Verified = (props: VerifiedProps) => {
  const { data: user, isFetching } = useGetIdentity<User>({
    queryOptions: { queryKey: ['verified'] },
  });
  const isVerified = useMemo(() => user?.email_verified_at, [user]);

  if (isFetching || !user) {
    return <>{props.loading ?? null}</>;
  }

  if (!isVerified) {
    return <>{props.fallback ?? null}</>;
  }

  return <>{props.children ?? null}</>;
};
