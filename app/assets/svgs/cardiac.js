import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function SvgComponent(props) {
  return (
    <Svg
      width={32}
      height={32}
      viewBox="0 0 32 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="m20.41 16.315-2.412-4.445-3.924 9.178-3.067-4.614H5.57c1.735 2.714 4.812 5.482 8.75 8.966L16 27.08l1.68-1.68c3.996-3.533 7.105-6.333 8.825-9.086H20.41Z"
        fill={props.color}
      />
      <Path
        d="M21.4 5A7.21 7.21 0 0 0 16 7.52 7.212 7.212 0 0 0 10.6 5h-.189a6.506 6.506 0 0 0-6.41 6.6 8.15 8.15 0 0 0 .89 3.636h6.759l2.195 3.305 4.026-9.416 3.254 5.995h6.004v.077A8.132 8.132 0 0 0 28 11.606v-.19a6.505 6.505 0 0 0-6.6-6.415Z"
        fill={props.color}
      />
    </Svg>
  );
}

export default SvgComponent;
