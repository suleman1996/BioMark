import * as React from 'react';
import Svg, { Ellipse } from 'react-native-svg';

function SvgComponent(props) {
  return (
    <Svg
      width={27}
      height={28}
      viewBox="0 0 27 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Ellipse cx={13.5} cy={14} rx={13.5} ry={14} fill="#1B96D8" />
    </Svg>
  );
}

export default SvgComponent;
