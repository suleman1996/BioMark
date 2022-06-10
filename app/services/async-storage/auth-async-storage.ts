import AsyncStorage from '@react-native-async-storage/async-storage';

import { LoginResponse } from 'types/auth/LoginResponse';

async function getAuthAsyncStorage() {
  const userToken = await AsyncStorage.getItem('userToken');
  const refreshToken = await AsyncStorage.getItem('refreshToken');
  const user: any = await AsyncStorage.getItem('userData');
  const hasProfile: any = await AsyncStorage.getItem('hasProfile');
  return {
    userToken,
    refreshToken,
    user: JSON.parse(user),
    hasProfile: JSON.parse(hasProfile),
  };
}

async function setAuthAsyncStorage(response: LoginResponse) {
  await AsyncStorage.setItem('userToken', response.access_token);
  await AsyncStorage.setItem('refreshToken', response.refresh_token);
  await AsyncStorage.setItem(
    'hasProfile',
    JSON.stringify(response.has_profile)
  );
}

async function setAuthUserAsyncStorage(response: any) {
  await AsyncStorage.setItem('userData', JSON.stringify(response.data));
}

async function resetAuthAsyncStorage() {
  await AsyncStorage.removeItem('userData');
  await AsyncStorage.removeItem('userToken');
  await AsyncStorage.removeItem('refreshToken');
  await AsyncStorage.removeItem('hasProfile');
}

async function Get_Token() {
  const token = await AsyncStorage.getItem('userToken');
  return token;
}

async function Get_Refresh_Token() {
  const refreshToken = await AsyncStorage.getItem('refreshToken');
  return refreshToken;
}

const setIsOnboarding = async (value) => {
  try {
    const jsonObj = JSON.stringify(value);
    await AsyncStorage.setItem('onBoarding', jsonObj);
  } catch (e) {}
};

const getOnboarding = async () => {
  try {
    const value = await AsyncStorage.getItem('onBoarding');
    if (value !== null) {
      const jsonVal = JSON.parse(value);
      return jsonVal;
    } else {
      return null;
    }
  } catch (e) {}
};

async function removeOnboarding() {
  await AsyncStorage.removeItem('onBoarding');
}

export {
  Get_Token,
  Get_Refresh_Token,
  resetAuthAsyncStorage,
  getAuthAsyncStorage,
  setAuthAsyncStorage,
  setAuthUserAsyncStorage,
  setIsOnboarding,
  getOnboarding,
  removeOnboarding,
};
