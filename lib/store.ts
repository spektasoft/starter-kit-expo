import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

import { NotTestEnvirontmentError } from '~/errors/NotTestEnvirontmentError';

const memory = new Map<string, string>();

export const deleteItemAsync = async (key: string) => {
  if (Platform.isTesting) {
    memory.delete(key);
    return;
  }
  if (Platform.OS === 'web') {
    return null;
  }
  await SecureStore.deleteItemAsync(key);
};

export const getItemAsync = async (key: string): Promise<string | null> => {
  if (Platform.isTesting) {
    return memory.get(key) ?? null;
  }
  if (Platform.OS === 'web') {
    return null;
  }
  return await SecureStore.getItemAsync(key);
};

export const setItemAsync = async (key: string, value: string) => {
  if (Platform.isTesting) {
    memory.set(key, value);
    return;
  }
  if (Platform.OS === 'web') {
    return;
  }
  await SecureStore.setItemAsync(key, value);
};

export const refreshMemory = () => {
  if (!Platform.isTesting) throw new NotTestEnvirontmentError();
  memory.clear();
};
