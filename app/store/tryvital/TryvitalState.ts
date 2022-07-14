import { ConnectedDevicesResponse } from 'types/auth/TryvitalsResponse';

export class TryvitalState {
  deviceChanged: boolean = false;
  connectedDevices: Array<ConnectedDevicesResponse> = [];
}
