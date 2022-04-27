import AsyncStorage from '@react-native-async-storage/async-storage';

import { LoginResponse } from 'types/auth/LoginResponse';

async function getAuthAsyncStorage() {
  const userToken = await AsyncStorage.getItem('userToken');
  const refreshToken = await AsyncStorage.getItem('refreshToken');
  const user: any = await AsyncStorage.getItem('userData');
  return {
    userToken,
    refreshToken,
    user: JSON.parse(user),
  };
}

async function setAuthAsyncStorage(response: LoginResponse) {
  let parseHasProfile = response?.has_profile ? 'true' : 'false';
  await AsyncStorage.setItem('userToken', response.access_token);
  await AsyncStorage.setItem('refreshToken', response.refresh_token);
  await AsyncStorage.setItem('hasProfile', parseHasProfile);
}

async function setAuthUserAsyncStorage(response: any) {
  await AsyncStorage.setItem('userData', JSON.stringify(response.data));
}

async function resetAuthAsyncStorage() {
  await AsyncStorage.removeItem('userData');
  await AsyncStorage.removeItem('userToken');
  await AsyncStorage.removeItem('refreshToken');
}

async function Get_Token() {
  const token = await AsyncStorage.getItem('userToken');
  return token;
}

async function Get_Refresh_Token() {
  const refreshToken = await AsyncStorage.getItem('refreshToken');
  return refreshToken;
}

export {
  Get_Token,
  Get_Refresh_Token,
  resetAuthAsyncStorage,
  getAuthAsyncStorage,
  setAuthAsyncStorage,
  setAuthUserAsyncStorage,
};
