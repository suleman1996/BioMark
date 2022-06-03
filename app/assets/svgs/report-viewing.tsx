import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function SvgComponent(props) {
  return (
    <Svg
      width={18}
      height={17}
      viewBox="0 0 31 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        id="Path_45"
        data-name="Path 45"
        d="M15.789,98.725c-6.033,0-11.5,3.3-15.542,8.662a1.25,1.25,0,0,0,0,1.492c4.037,5.368,9.509,8.669,15.542,8.669s11.5-3.3,15.542-8.662a1.25,1.25,0,0,0,0-1.492C27.294,102.026,21.822,98.725,15.789,98.725Zm.433,16.039a6.642,6.642,0,1,1,6.195-6.195A6.646,6.646,0,0,1,16.222,114.764Zm-.2-3.062a3.576,3.576,0,1,1,3.34-3.34A3.57,3.57,0,0,1,16.022,111.7Z"
        transform="translate(0 -98.725)"
        fill="#fff"
      />
    </Svg>
  );
}

export default SvgComponent;
