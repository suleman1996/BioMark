import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function SvgComponent(props) {
  return (
    <Svg
      width={22}
      height={16}
      viewBox="0 0 22 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M.5 11C.5 5.15 5.15.5 11 .5S21.5 5.15 21.5 11H20c0-4.95-4.05-9-9-9s-9 4.05-9 9H.5zm6 0c0-2.55 1.95-4.5 4.5-4.5s4.5 1.95 4.5 4.5-1.95 4.5-4.5 4.5-4.5-1.95-4.5-4.5zM8 11c0 1.65 1.35 3 3 3s3-1.35 3-3-1.35-3-3-3-3 1.35-3 3z"
        fill="#06599E"
      />
    </Svg>
  );
}

export default SvgComponent;
