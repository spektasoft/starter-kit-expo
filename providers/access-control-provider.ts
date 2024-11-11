import { AccessControlProvider, CanParams, CanReturnType } from '@refinedev/core';

import { can } from './access-control-provider/can';

import { convertToHttpError } from '~/lib/http';

export const accessControlProvider: AccessControlProvider = {
  can: async (params: CanParams): Promise<CanReturnType> => {
    const resource = params.resource;

    if (!resource) {
      return { can: false };
    }

    try {
      const isGranted = await can({
        permission: params.action,
        resource,
        id: params.params?.id?.toString(),
      });

      return { can: isGranted };
    } catch (e) {
      const error = convertToHttpError(e);
      return { can: false, reason: error.message };
    }
  },
};
