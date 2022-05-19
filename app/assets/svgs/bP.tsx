import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function SvgComponent(props) {
  return (
    <Svg
      width={16}
      height={14}
      viewBox="0 0 16 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M10.756 7.197L9.248 4.419l-2.452 5.736L4.88 7.27H1.48c1.085 1.696 3.008 3.426 5.47 5.604L8 13.925l1.049-1.05c2.498-2.208 4.44-3.958 5.516-5.68l-3.809.002z"
        fill={props.fill ? props.fill : '#fff'}
      />
      <Path
        d="M11.375.125A4.507 4.507 0 008 1.7 4.507 4.507 0 004.625.125h-.118A4.066 4.066 0 00.5 4.25c.007.79.198 1.568.557 2.272h4.224l1.372 2.066 2.516-5.885 2.034 3.747h3.753v.048a5.083 5.083 0 00.544-2.244v-.119a4.066 4.066 0 00-4.125-4.01z"
        fill={props.fill ? props.fill : '#fff'}
      />
    </Svg>
  );
}

export default SvgComponent;
