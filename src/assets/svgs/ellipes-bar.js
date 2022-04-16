import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function SvgComponent(props) {
  return (
    <Svg
      width={266}
      height={3}
      viewBox="0 0 266 3"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path fill="#C9E1F2" d="M0 0H266V3H0z" />
    </Svg>
  );
}

export default SvgComponent;
