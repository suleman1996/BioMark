import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function SvgComponent(props) {
  return (
    <Svg
      width={32}
      height={32}
      viewBox="0 0 32 34"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M22.868 21.03a11.473 11.473 0 0 1-10.67-15.689.25.25 0 0 0-.332-.32 11.473 11.473 0 1 0 14.77 15.827.249.249 0 0 0-.294-.354 11.46 11.46 0 0 1-3.474.536Z"
        fill={props.color}
      />
    </Svg>
  );
}

export default SvgComponent;
