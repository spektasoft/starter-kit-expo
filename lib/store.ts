import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

export const deleteItemAsync = async (key: string) => {
  if (Platform.OS === 'web') return null;
  await SecureStore.deleteItemAsync(key);
};

export const getItemAsync = async (key: string): Promise<string | null> => {
  if (Platform.OS === 'web') return null;
  return await SecureStore.getItemAsync(key);
};

export const setItemAsync = async (key: string, value: string) => {
  if (Platform.OS === 'web') return;
  await SecureStore.setItemAsync(key, value);
};
