import { Platform } from 'react-native';

const API_IP = process.env.EXPO_PUBLIC_API_IP || '127.0.0.1';

export const getApiUrl = (endpoint: string): string => {
  let host = `http://${API_IP}:8000`;

  if (Platform.OS === 'web') {
    host = 'http://127.0.0.1:8000';
  } else if (__DEV__ && Platform.OS === 'android') {
    host = 'http://10.0.2.2:8000';
  }

  return `${host}${endpoint}`;
};