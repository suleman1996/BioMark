import * as React from 'react';
import Svg, { LinearGradient, Stop, Path } from 'react-native-svg';

function SvgComponent(props) {
  return (
    <Svg
      width={85}
      height={85}
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      viewBox="0 0 36 30.3"
      xmlSpace="preserve"
      enableBackground="new 0 0 36 30.3"
      {...props}
    >
      <LinearGradient
        id="SVGID_1_"
        gradientUnits="userSpaceOnUse"
        x1={34.3037}
        y1={13.7877}
        x2={10.1162}
        y2={13.7877}
      >
        <Stop offset={0} stopColor="#2bb3fc" />
        <Stop offset={1} stopColor="#2b74fc" />
      </LinearGradient>
      <Path
        d="M10 5.8c-4.4 4.4-4.4 11.6 0 16.1s11.6 4.4 16.1 0 4.4-11.6 0-16.1-11.7-4.5-16.1 0z"
        fill="url(#SVGID_1_)"
      />
      <Path
        d="M17.4 8.8v4.4H13v1.1h4.4v4.4h1.1v-4.4H23v-1.1h-4.4V8.8h-1.2z"
        fill="#fff"
      />
    </Svg>
  );
}

export default SvgComponent;
