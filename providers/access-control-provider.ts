import { AccessControlProvider, CanParams, CanReturnType } from '@refinedev/core';

import { can } from './access-control-provider/can';

export const accessControlProvider: AccessControlProvider = {
  can: async (params: CanParams): Promise<CanReturnType> => {
    const resource = params.resource;

    if (!resource) {
      return { can: false };
    }

    const isGranted = await can({
      permission: params.action,
      resource,
      id: params.params?.id?.toString(),
    });

    return { can: isGranted };
  },
};
