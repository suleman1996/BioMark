import React from 'react';
import { SvgXml } from 'react-native-svg';

import { widthToDp } from 'utils/functions/responsive-dimensions';

const xml = `
<svg width="25" height="30" viewBox="0 0 25 30" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M22.1786 3.21429H18.9643V2.14286C18.9643 1.57454 18.7385 1.02949 18.3367 0.627628C17.9348 0.225765 17.3898 0 16.8214 0H8.25C7.68168 0 7.13664 0.225765 6.73477 0.627628C6.33291 1.02949 6.10714 1.57454 6.10714 2.14286V3.21429H2.89286C2.32454 3.21429 1.77949 3.44005 1.37763 3.84191C0.975765 4.24378 0.75 4.78882 0.75 5.35714V27.8571C0.75 28.4255 0.975765 28.9705 1.37763 29.3724C1.77949 29.7742 2.32454 30 2.89286 30H22.1786C22.7469 30 23.2919 29.7742 23.6938 29.3724C24.0957 28.9705 24.3214 28.4255 24.3214 27.8571V5.35714C24.3214 4.78882 24.0957 4.24378 23.6938 3.84191C23.2919 3.44005 22.7469 3.21429 22.1786 3.21429ZM8.25 2.14286H16.8214V6.42857H8.25V2.14286ZM22.1786 27.8571H2.89286V5.35714H6.10714V8.57143H18.9643V5.35714H22.1786V27.8571Z" fill="#1B96D8"/>
</svg>

`;

export default (props: { width: number; height: number }) => (
  <SvgXml
    xml={xml}
    width={widthToDp(props.width)}
    height={widthToDp(props.height)}
  />
);
