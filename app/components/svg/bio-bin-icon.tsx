import React from 'react';
import { SvgXml } from 'react-native-svg';

import { widthToDp } from 'utils/functions/responsive-dimensions';

const xml = `
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0)">
<path d="M3 7.5V22.5C3 23.325 3.675 24 4.5 24H18C18.825 24 19.5 23.325 19.5 22.5V7.5H3ZM7.5 21H6V10.5H7.5V21ZM10.5 21H9V10.5H10.5V21ZM13.5 21H12V10.5H13.5V21ZM16.5 21H15V10.5H16.5V21Z" fill="#8493AE"/>
<path d="M19.875 3H15V1.125C14.9988 0.826996 14.8799 0.541536 14.6692 0.330814C14.4585 0.120092 14.173 0.00118492 13.875 0L8.625 0C8.327 0.00118492 8.04154 0.120092 7.83081 0.330814C7.62009 0.541536 7.50118 0.826996 7.5 1.125V3H2.625C2.32687 3.00079 2.04119 3.11957 1.83038 3.33038C1.61957 3.54119 1.50079 3.82687 1.5 4.125V6H21V4.125C20.9992 3.82687 20.8804 3.54119 20.6696 3.33038C20.4588 3.11957 20.1731 3.00079 19.875 3ZM13.5 3H9V1.5195H13.5V3Z" fill="#8493AE"/>
</g>
<defs>
<clipPath id="clip0">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>
</svg>


`;

export default (props: { width: number; height: number }) => (
  <SvgXml
    xml={xml}
    width={widthToDp(props.width)}
    height={widthToDp(props.height)}
  />
);
