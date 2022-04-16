import AsyncStorage from '@react-native-async-storage/async-storage';
import {logNow} from '../../utils/functions/logBinder';

async function getAuthAsyncStorage() {
  const token = await AsyncStorage.getItem('userToken');
  const user: any = await AsyncStorage.getItem('userData');
  return {
    token,
    user: JSON.parse(user),
  };
}

async function setAuthAsyncStorage(response: any) {
  await AsyncStorage.setItem('userToken', response.data.access_token);
  await AsyncStorage.setItem('refreshToken', response.data.refresh_token);
  // await AsyncStorage.setItem('userData', JSON.stringify(response.data.user));
}

async function setAuthUserAsyncStorage(response: any) {
  await AsyncStorage.setItem('userData', JSON.stringify(response.data));
}

async function resetAuthAsyncStorage() {
  await AsyncStorage.removeItem('userData');
  await AsyncStorage.removeItem('userToken');
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
