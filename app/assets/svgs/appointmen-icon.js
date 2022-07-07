import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function SvgComponent(props) {
  return (
    <Svg
      width={23}
      height={24}
      viewBox="0 0 23 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17.864 13.2h-6.068v6h6.068v-6zM16.65 0v2.4H6.942V0H4.515v2.4H3.302A2.402 2.402 0 00.887 4.8L.875 21.6c0 1.32 1.08 2.4 2.427 2.4h16.989c1.335 0 2.427-1.08 2.427-2.4V4.8c0-1.32-1.092-2.4-2.427-2.4h-1.214V0H16.65zm3.64 21.6H3.303V8.4h16.989v13.2z"
        fill={props.fill}
      />
    </Svg>
  );
}

export default SvgComponent;
