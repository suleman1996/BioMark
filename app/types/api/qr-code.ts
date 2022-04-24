import { ApiResponse } from './api-response';

export interface QrCodeRequest {
  scanner: {
    code: string;
  };
}

export interface QrCodePayload {
  status: boolean;
  title: string;
  type: string;
  action: string;
  message: string;
  provider_id: string;
  program_id: number;
  terms: string;
  data: {
    lab_id: string;
  };
  profile?: QrCodeProfile;
}

export interface QrCodeProfile {
  name: string;
  avatar: string;
}

export const QrCodeStatus = {
  alreadyAMember: 'Already a member',
  codeAlreadyUsed: 'Code already used',
  codeAlreadyExists: 'Already exists',
  alreadyConnected: 'You are already connected to this barcode.',
  alreadyConnectedEvent: 'You are already connected to the event',
  invalidCode: 'Invalid code',
  invalidBarcodeContactUs:
    'Please contact us if you are having trouble accessing your results.',
  resultsAvailable: 'Your results are available',
  inDoctorReview: 'Your results are being reviewed by your doctor',
  scanSuccessConnectC: 'You have successfully entered the barcode',
  saveSuccessful: 'Save successful',
  dailyLimit: 'Reached daily verification retry',
};

export type QrCodeResponse = ApiResponse<QrCodePayload>;
