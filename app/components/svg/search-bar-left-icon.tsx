import React from 'react';
import { SvgXml } from 'react-native-svg';

import { widthToDp } from 'utils/functions/responsive-dimensions';

export default (props: { width: number; height: number; fill: string }) => (
  <SvgXml
    xml={`
<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12 0H18V5H16V2H12V0ZM6 0V2H2V5H0V0H6ZM12 18V16H16V13H18V18H12ZM6 18H0V13H2V16H6V18ZM0 8H18V10H0V8Z" fill="${props.fill}"/>
</svg>

`}
    width={widthToDp(props.width)}
    height={widthToDp(props.height)}
  />
);
