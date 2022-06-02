import * as React from 'react';
import Svg, { G, Path } from 'react-native-svg';

function SvgComponent(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={29}
      height={29}
      viewBox="0 0 29 29"
      {...props}
    >
      <G data-name="success (1)">
        <Path
          data-name="Path 341"
          d="M14.5 0A14.5 14.5 0 1029 14.5 14.516 14.516 0 0014.5 0zm8.084 9.664L13.661 19.7a1.116 1.116 0 01-1.531.13l-5.577-4.459a1.116 1.116 0 011.394-1.742l4.75 3.8 8.22-9.247a1.116 1.116 0 011.667 1.483z"
          transform="translate(-191.568 36) translate(191.568 -36)"
          fill="#fff"
        />
      </G>
    </Svg>
  );
}

export default SvgComponent;
