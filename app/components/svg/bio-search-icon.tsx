import React from 'react';
import { SvgXml } from 'react-native-svg';

import { widthToDp } from 'utils/functions/responsive-dimensions';

const xml = `
<svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M77.5 70H73.55L72.15 68.65C77.05 62.95 80 55.55 80 47.5C80 29.55 65.45 15 47.5 15C29.55 15 15 29.55 15 47.5C15 65.45 29.55 80 47.5 80C55.55 80 62.95 77.05 68.65 72.15L70 73.55V77.5L95 102.45L102.45 95L77.5 70ZM47.5 69.9999C35.05 69.9999 25 59.9499 25 47.4999C25 35.0499 35.05 24.9999 47.5 24.9999C59.95 24.9999 70 35.0499 70 47.4999C70 59.9499 59.95 69.9999 47.5 69.9999Z" fill="#1B96D8"/>
</svg>


`;

export default (props: { width: number; height: number }) => (
  <SvgXml
    xml={xml}
    width={widthToDp(props.width)}
    height={widthToDp(props.height)}
  />
);
