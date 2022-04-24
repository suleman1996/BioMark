export interface WtfIsMyIpData {
  status: boolean;
  data: {
    ip: string,
    location: string,
    code: string,
  };
}

export interface IpCountryCodeData {
  code: string;
  phoneCode: string;
}
