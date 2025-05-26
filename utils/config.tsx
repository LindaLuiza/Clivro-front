import Constants from 'expo-constants';

const extra = Constants.expoConfig?.extra ?? Constants.manifest?.extra;

if (!extra?.API_URL) {
  throw new Error('Missing API_URL in expo extra config');
}

export const API_URL = extra.API_URL;