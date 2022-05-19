import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function SvgComponent(props) {
  return (
    <Svg
      width={10}
      height={14}
      viewBox="0 0 10 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M9.169 5.198V.908a.783.783 0 00-.783-.783H1.408a.783.783 0 00-.783.783v4.29a4.272 4.272 0 003.471 4.195v1.976a1.571 1.571 0 01-1.571 1.571h-.872a.486.486 0 00-.493.442.468.468 0 00.467.493h6.247a.485.485 0 00.493-.442.468.468 0 00-.467-.493h-.764a1.572 1.572 0 01-1.572-1.571v-1.95A4.273 4.273 0 009.17 5.198z"
        fill="#fff"
      />
    </Svg>
  );
}

export default SvgComponent;
