import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function SvgComponent(props) {
  return (
    <Svg
      width={29}
      height={29}
      viewBox="0 0 33 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M28.125 14.667h-4V5.333A1.333 1.333 0 0022.79 4H4.125a1.333 1.333 0 00-1.333 1.333V24c0 2.205 1.794 4 4 4h18.666c2.206 0 4-1.795 4-4v-8a1.333 1.333 0 00-1.333-1.333zM6.79 25.333A1.333 1.333 0 015.458 24V6.667h16V24c0 .468.082.917.228 1.333H6.791zm20-1.333a1.333 1.333 0 01-2.666 0v-6.667h2.666V24z"
        fill={props.fill}
      />
      <Path
        d="M8.125 9.333h10.667V12H8.125V9.333zm0 5.334h10.667v2.666H8.125v-2.666zM14.792 20h4v2.667h-4V20z"
        fill={props.fill}
      />
    </Svg>
  );
}

export default SvgComponent;
