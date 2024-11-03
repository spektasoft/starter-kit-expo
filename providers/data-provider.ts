import type { BaseRecord, CustomParams, CustomResponse, DataProvider } from '@refinedev/core';

import { emailVerificationNotification } from './auth-provider/email/verification-notification';

import { getApiUrl } from '~/config';
import { UnimplementedError } from '~/errors/UnimplementedError';

export const dataProvider: DataProvider = {
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
  getList: async ({ resource }) => {
    const response = await fetch(`${getApiUrl()}/${resource}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
    });
    if (!response.ok) {
      throw new Error('Error fetching data');
    }
    const data = await response.json();
    const total = Number(response.headers.get('x-total-count'));
    return { data, total };
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
