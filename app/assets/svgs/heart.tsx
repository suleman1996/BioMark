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
        d="M8 13.925l-1.05-1.05C3.05 9.428.5 7.1.5 4.25A4.066 4.066 0 014.625.125 4.507 4.507 0 018 1.7 4.507 4.507 0 0111.375.125 4.066 4.066 0 0115.5 4.25c0 2.85-2.55 5.175-6.45 8.625L8 13.925z"
        fill={props?.fill ? props?.fill : '#fff'}
      />
    </Svg>
  );
}

export default SvgComponent;
