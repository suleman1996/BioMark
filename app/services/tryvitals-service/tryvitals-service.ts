import axios from 'axios';
import * as tryvitalResponses from 'types/auth/TryvitalsResponse';
import { logNow } from 'utils/functions/log-binder';
import client from '../client';
import { API_URLS } from '../url-constants';

const connectedDevices = () => {
  return new Promise<tryvitalResponses.ConnectedDevicesResponse>(
    (resolve, reject) => {
      client
        .get(API_URLS.TRYVITAL_CONNECTED_DEVICES)
        .then(async (response) => resolve(response.data))
        .catch(async (err: tryvitalResponses.ConnectedDevicesErrorResponse) => {
          logNow('Device not connected', err);
          reject(err);
        });
    }
  );
};

const disconnectDevice = (obj: DeviceDisconnectRequest) => {
  return new Promise<tryvitalResponses.DisconnectDeviceResponse>(
    (resolve, reject) => {
      client
        .post(API_URLS.TRYVITAL_DISCONNECT_DEVICE, obj)
        .then(async (response) => resolve(response.data))
        .catch(async (err: tryvitalResponses.DisconnectDeviceErrorResponse) => {
          logNow('Device not disconnected', err);
          reject(err);
        });
    }
  );
};

const linkToken = () => {
  return new Promise<tryvitalResponses.LinkTokenResponse>((resolve, reject) => {
    client
      .get(API_URLS.TRYVITAL_LINK_TOKEN)
      .then(async (response) => resolve(response.data))
      .catch(async (err: tryvitalResponses.LinkTokenErrorResponse) => {
        logNow('Tryvitals link token generation not working', err);
        reject(err);
      });
  });
};

const getDevicesData = () => {
  return new Promise<tryvitalResponses.DeviceDataResponse>(
    (resolve, reject) => {
      axios
        .get(API_URLS.TRYVITAL_DEVICE_DATA)
        .then(async (response) => resolve(response.data))
        .catch(async (err: tryvitalResponses.DeviceDataErrorResponse) => {
          logNow('No device data found', err);
          reject(err);
        });
    }
  );
};

export const TryvitalsService = {
  connectedDevices,
  linkToken,
  getDevicesData,
  disconnectDevice,
};
