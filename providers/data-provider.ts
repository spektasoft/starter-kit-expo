import type {
  BaseRecord,
  CustomParams,
  CustomResponse,
  DataProvider,
  GetListParams,
} from '@refinedev/core';

import { emailVerificationNotification } from './auth-provider/email/verification-notification';

import { getApiUrl } from '~/config';
import { UnimplementedError } from '~/errors/UnimplementedError';
import { getHttp } from '~/lib/http';
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
    const total = response.data.meta.total;
    return { data, total };
  },
  getOne: async ({ resource, id }) => {
    const response = await fetch(`${getApiUrl()}/${resource}/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
    });
    if (!response.ok) {
      throw new Error('Error fetching data');
    }
    return response.json();
  },
  update: async ({ resource, id, variables }) => {
    const response = await fetch(`${getApiUrl()}/${resource}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
      body: JSON.stringify(variables),
    });
    if (!response.ok) {
      throw new Error('Error updating data');
    }
    return response.json();
  },
  create: async ({ resource, variables }) => {
    const response = await fetch(`${getApiUrl()}/${resource}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
      body: JSON.stringify(variables),
    });
    if (!response.ok) {
      throw new Error('Error creating data');
    }
    return response.json();
  },
  deleteOne: async ({ resource, id }) => {
    const response = await fetch(`${getApiUrl()}/${resource}/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
    });
    if (!response.ok) {
      throw new Error('Error deleting data');
    }
    return response.json();
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
