import React from 'react';
import { SvgXml } from 'react-native-svg';

import { widthToDp } from 'utils/functions/responsive-dimensions';

const xml = `
<svg width="19" height="30" viewBox="0 0 19 30" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9 3C9 1.335 10.335 0 12 0C13.665 0 15 1.335 15 3C15 4.665 13.665 6 12 6C10.335 6 9 4.665 9 3ZM15 30V21H18.75L14.94 9.555C14.7393 8.95757 14.3565 8.43804 13.8453 8.06943C13.3341 7.70083 12.7202 7.50169 12.09 7.5H11.91C11.2792 7.49943 10.6643 7.69769 10.1527 8.06661C9.64103 8.43553 9.25869 8.95634 9.06 9.555L7.77 13.425C9.39 14.325 10.5 16.02 10.5 18V30H15ZM3.75 14.25C4.995 14.25 6 13.245 6 12C6 10.755 4.995 9.75 3.75 9.75C2.505 9.75 1.5 10.755 1.5 12C1.5 13.245 2.505 14.25 3.75 14.25ZM6 30V24H7.5V18C7.5 16.77 6.48 15.75 5.25 15.75H2.25C1.02 15.75 0 16.77 0 18V24H1.5V30H6Z" fill="#1B96D8"/>
</svg>
`;
export default (props: { width: number; height: number }) => (
  <SvgXml
    xml={xml}
    width={widthToDp(props.width)}
    height={widthToDp(props.height)}
  />
);
