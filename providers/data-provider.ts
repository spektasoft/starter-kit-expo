import type {
  BaseRecord,
  CreateParams,
  CustomParams,
  CustomResponse,
  DataProvider,
  DeleteOneParams,
  GetListParams,
  GetOneParams,
  UpdateParams,
} from '@refinedev/core';

import { emailVerificationNotification } from './auth-provider/email/verification-notification';
import { createUser, CreateUserParams } from './data-provider/user/create-user';
import { deleteUser } from './data-provider/user/delete-user';
import { showUser } from './data-provider/user/show-user';
import { updateUser, UpdateUserParams } from './data-provider/user/update-user';

import { getApiUrl } from '~/config';
import { UnimplementedError } from '~/errors/UnimplementedError';
import { convertToHttpError, getHttp } from '~/lib/http';
import { User } from '~/models/User';
import { ListResponse } from '~/types/list-response';

export const dataProvider: DataProvider = {
  getList: async <TData = BaseRecord>(params: GetListParams) => {
    const httpParams = new Map<string, string>();

    if (params.sorters && params.sorters.length > 0) {
      httpParams.set('tableSortColumn', params.sorters[0].field);
      httpParams.set('tableSortDirection', params.sorters[0].order);
    }

    const http = await getHttp();
    const response = await http.get<ListResponse<TData>>(`${params.resource}`, {
      params: Object.fromEntries(httpParams),
    });
    const data = response.data.data;
    const total = response.data.total;
    return { data, total };
  },
  getOne: async <TData = User>(params: GetOneParams) => {
    try {
      if (params.resource === 'users') {
        const user = await showUser({ id: params.id.toString() });

        return { data: user as TData };
      } else {
        throw new UnimplementedError();
      }
    } catch (e) {
      return Promise.reject(convertToHttpError(e));
    }
  },
  update: async <TData = BaseRecord, TVariables = object>(params: UpdateParams<TVariables>) => {
    try {
      if (params.resource === 'users') {
        const updateUserParams = params.variables as UpdateUserParams;
        await updateUser({ ...updateUserParams, id: params.id.toString() });

        return { data: {} as TData };
      } else {
        throw new UnimplementedError();
      }
    } catch (e) {
      return Promise.reject(convertToHttpError(e));
    }
  },
  create: async <TData = BaseRecord, TVariables = object>(params: CreateParams<TVariables>) => {
    try {
      if (params.resource === 'users') {
        const createUserParams = params.variables as CreateUserParams;
        await createUser(createUserParams);

        return { data: {} as TData };
      } else {
        throw new UnimplementedError();
      }
    } catch (e) {
      return Promise.reject(convertToHttpError(e));
    }
  },
  deleteOne: async <TData = BaseRecord, TVariables = object>(
    params: DeleteOneParams<TVariables>
  ) => {
    try {
      if (params.resource === 'users') {
        await deleteUser({ id: params.id.toString() });

        return { data: {} as TData };
      } else {
        throw new UnimplementedError();
      }
    } catch (e) {
      return Promise.reject(convertToHttpError(e));
    }
  },
  getApiUrl: () => getApiUrl(),
  // Optional methods:
  // getMany: () => { /* ... */ },
  // createMany: () => { /* ... */ },
  // deleteMany: () => { /* ... */ },
  // updateMany: () => { /* ... */ },
  custom: async <TData = BaseRecord, TQuery = unknown, TPayload = unknown>(
    params: CustomParams<TQuery, TPayload>
  ): Promise<CustomResponse<TData>> => {
    if (params.payload === 'email-verification-notification') {
      await emailVerificationNotification();
      return { data: {} as TData };
    }

    throw new UnimplementedError();
  },
};
