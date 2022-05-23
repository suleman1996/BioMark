import React from 'react';
import { SvgXml } from 'react-native-svg';

import { widthToDp } from 'utils/functions/responsive-dimensions';

const xml = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 306.25 243.66"><title>barcode-ico</title><path d="M118.44,192.14h-20V144.21a10,10,0,0,1,10-10h44.83v20.06H118.44Z" transform="translate(-96.87 -134.17)"/><path d="M154.8,377.83H106.9a10,10,0,0,1-10-10V323h20.06v34.8H154.8Z" transform="translate(-96.87 -134.17)"/><path d="M391.57,377.8H346.76V357.75h34.78v-37.9H401.6v47.93A10,10,0,0,1,391.57,377.8Z" transform="translate(-96.87 -134.17)"/><path d="M403.13,189H383.07v-34.8h-37.9V134.17H393.1a10,10,0,0,1,10,10Z" transform="translate(-96.87 -134.17)"/><rect x="244.17" y="43.74" width="20.06" height="156.54"/><rect x="203.43" y="43.74" width="20.06" height="115.8"/><rect x="162.7" y="43.74" width="20.06" height="156.54"/><rect x="121.92" y="43.74" width="20.06" height="115.8"/><rect x="81.22" y="43.74" width="20.06" height="156.54"/><rect x="40.47" y="43.74" width="20.06" height="156.54"/><rect x="121.92" y="174.11" width="20.06" height="26.17"/><rect x="203.43" y="174.11" width="20.06" height="26.17"/></svg>
`;

export default (props: { width: number; height: number }) => (
  <SvgXml
    xml={xml}
    width={widthToDp(props.width)}
    height={widthToDp(props.height)}
  />
);
