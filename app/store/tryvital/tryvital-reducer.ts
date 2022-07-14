import { CONNECTED_DEVICES, DEVICE_CHANGED } from './constants';
import { TryvitalState } from './TryvitalState';

const INITIAL_STATE = new TryvitalState();

export default function (state = INITIAL_STATE, action: any) {
  switch (action.type) {
    case DEVICE_CHANGED: {
      return {
        ...state,
        deviceChanged: action.payload,
      };
    }

    case CONNECTED_DEVICES: {
      return {
        ...state,
        connectedDevices: action.payload,
      };
    }

    default:
      return state;
  }
}
