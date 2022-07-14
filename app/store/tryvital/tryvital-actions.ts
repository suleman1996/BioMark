import { CONNECTED_DEVICES, DEVICE_CHANGED } from './constants';

export const setDeviceChanged = (data: any) => ({
  type: DEVICE_CHANGED,
  payload: data,
});

export const setConnectedDevices = (data: any) => ({
  type: CONNECTED_DEVICES,
  payload: data,
});
