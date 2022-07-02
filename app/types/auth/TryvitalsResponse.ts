export type LinkTokenResponse = {
  link_token: string;
};

export type LinkTokenErrorResponse = {
  message: string;
};

export type ConnectedDevicesResponse = {
  id: number;
  name: string;
  slug: string;
  logo: string;
};

export type ConnectedDevicesErrorResponse = {
  message: string;
};

export type DeviceDisconnectRequest = {
  provider: string;
};

export type DisconnectDeviceResponse = {
  status: boolean;
};

export type DisconnectDeviceErrorResponse = {
  message: string;
};

export type Pedometer = {
  one_day: number;
  seven_days: Array<{ label: string; steps: number }>;
};

export type DeviceDataResponse = {
  data: { pedometer: Pedometer };
};

export type DeviceDataErrorResponse = {
  message: string;
};
