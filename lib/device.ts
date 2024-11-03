import * as Device from 'expo-device';
import { Platform } from 'react-native';

export const getDeviceName = () => {
  if (Device.modelName) {
    return Device.modelName;
  } else if (Device.deviceName) {
    return Device.deviceName;
  } else {
    if (Platform.OS === 'web') {
      return 'Web';
    } else if (Platform.OS === 'android') {
      return 'Android';
    } else if (Platform.OS === 'ios') {
      return 'iOS';
    } else {
      return 'Unknown Device';
    }
  }
};
