import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function SvgComponent(props) {
  return (
    <Svg
      width={40}
      height={40}
      viewBox="0 0 34 34"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M9.347 23.2H26V6.4a2.5 2.5 0 0 0-.65-1.697A2.142 2.142 0 0 0 23.777 4H9.333C7.993 4 6 4.959 6 7.6v16.8C6 27.041 7.993 28 9.333 28H26v-2.4H9.347c-.514-.014-1.125-.234-1.125-1.2s.611-1.186 1.125-1.2Zm2.209-14.4h10v2.4h-10V8.8Z"
        fill="#8493AE"
      />
    </Svg>
  );
}

export default SvgComponent;
