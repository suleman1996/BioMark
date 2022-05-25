import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function SvgComponent(props) {
  return (
    <Svg
      width={16}
      height={16}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M31.625 3.522L28.478.375 16 12.853 3.522.375.375 3.522 12.853 16 .375 28.478l3.147 3.147L16 19.147l12.478 12.478 3.147-3.147L19.147 16 31.625 3.522z"
        fill="#8493AE"
      />
    </Svg>
  );
}

export default SvgComponent;
