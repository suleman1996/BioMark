import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

type Props = {
  style?: any;
};

function SvgComponent(props: Props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      viewBox="0 0 720 120"
      enableBackground="new 0 0 720 170"
      style={props.style}
      {...props}
    >
      <Path
        d="M0 170L.1 1s122.1-13.8 235.4 53.4c0 0 58.6 39.6 134.4 7.5 0 0 141.7-54.8 213.2 85 0 0 4.5 8.3 8.8 23.1"
        opacity={0.5}
        fill="#2cb9fc"
      />
      <Path
        d="M104.9 170.5S116.1 48.4 248 35.8c0 0 56.9-7.5 133.5 27.8s160.1-14.8 204.3-28.5c41.6-12.9 89.8-15.3 130.3 16.1 2.5 2 5.1 4.1 7.5 6.3C744.1 75.9 720 170 720 170"
        opacity={0.5}
        fill="#2c65fc"
      />
    </Svg>
  );
}

export default SvgComponent;
