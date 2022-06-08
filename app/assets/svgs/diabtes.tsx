import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function SvgComponent(props) {
  return (
    <Svg
      width={12}
      height={16}
      viewBox="0 0 12 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M6.243.629A.274.274 0 005.77.64c-.388.701-.813 1.38-1.275 2.035A43.334 43.334 0 001.41 7.444c-1.017 1.904-2.902 6.891 3.884 8 .237.038.477.057.717.056.24 0 .48-.018.718-.056 6.786-1.108 4.9-6.096 3.884-8a43.264 43.264 0 00-3.082-4.762l-.008-.013L6.243.63z"
        fill={props.fill ? props.fill : '#fff'}
      />
    </Svg>
  );
}

export default SvgComponent;
