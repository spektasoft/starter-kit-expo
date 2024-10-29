import type { BaseRecord, CustomParams, CustomResponse, DataProvider } from '@refinedev/core';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

import {
  emailVerificationNotification,
  EmailVerificationNotificationParams,
} from './auth-provider/email/verification-notification';

import { EmailVerificationNotificationError } from '~/lib/errors';

const API_URL = process.env.EXPO_PUBLIC_API_URL!;
const TOKEN_KEY = 'access_token';

export const dataProvider: DataProvider = {
  getOne: async ({ resource, id }) => {
    const response = await fetch(`${API_URL}/${resource}/${id}`, {
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
    const response = await fetch(`${API_URL}/${resource}/${id}`, {
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
    const response = await fetch(`${API_URL}/${resource}`, {
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
    const response = await fetch(`${API_URL}/${resource}`, {
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
    const response = await fetch(`${API_URL}/${resource}/${id}`, {
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
  getApiUrl: () => API_URL,
  // Optional methods:
  // getMany: () => { /* ... */ },
  // createMany: () => { /* ... */ },
  // deleteMany: () => { /* ... */ },
  // updateMany: () => { /* ... */ },
  custom: async <
    TData = BaseRecord,
    TQuery = unknown,
    TPayload = EmailVerificationNotificationParams,
  >(
    params: CustomParams<TQuery, TPayload>
  ): Promise<CustomResponse<TData>> => {
    const data = params.payload as EmailVerificationNotificationParams | undefined;

    if (!data) {
      throw Error('Unset values');
    }

    const token =
      Platform.OS !== 'web'
        ? ((await SecureStore.getItemAsync(TOKEN_KEY)) ?? undefined)
        : undefined;

    data.token = token;

    const status = await emailVerificationNotification(data);

    if (!status) {
      throw new EmailVerificationNotificationError();
    }

    const baseRecord = { status } as TData;

    const response = { data: baseRecord };

    return response;
  },
};
