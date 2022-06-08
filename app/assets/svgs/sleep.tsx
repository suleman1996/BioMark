import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function SvgComponent(props) {
  return (
    <Svg
      width={14}
      height={14}
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M11.293 10.144A7.17 7.17 0 014.623.338a.156.156 0 00-.207-.2 7.17 7.17 0 109.232 9.892.156.156 0 00-.184-.222 7.16 7.16 0 01-2.171.336z"
        fill={props.fill ? props.fill : '#fff'}
      />
    </Svg>
  );
}

export default SvgComponent;
