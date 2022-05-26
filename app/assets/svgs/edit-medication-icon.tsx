import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
/* SVGR has dropped some elements not supported by react-native-svg: style */

function SvgComponent(props) {
  return (
    <Svg
      height={30}
      width={30}
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      viewBox="0 0 45 45"
      xmlSpace="preserve"
      enableBackground="new 0 0 45 45"
      {...props}
    >
      <Path
        className="st0"
        d="M43.1 7.7l-5.8-5.8c-.4-.4-1-.6-1.6-.6-.6 0-1.2.2-1.6.6l-3.8 3.8 8.9 8.9 3.8-3.8c.9-.8.9-2.2.1-3.1zM2.8 34.8l-1.5 8.9 8.9-1.5-7.4-7.4z"
        fill="#3d6af3"
      />
      <Path
        transform="rotate(-45.001 20.823 24.175)"
        className="st0"
        d="M5.8 17.9H35.8V30.5H5.8z"
        fill="#3d6af3"
      />
    </Svg>
  );
}

export default SvgComponent;
