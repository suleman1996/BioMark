import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function SvgComponent(props) {
  return (
    <Svg
      width={18}
      height={12}
      viewBox="0 0 28 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        id="Path_156"
        data-name="Path 156"
        d="M156.51,134.238h17.272a1.4,1.4,0,0,0,1.464-1.766l-1.027-2.915a1.525,1.525,0,0,0-1.462-.955H157.54a1.525,1.525,0,0,0-1.464.955l-1.027,2.915a1.4,1.4,0,0,0,1.461,1.766Z"
        transform="translate(-45.103 0)"
        fill={props.fill ? props.fill : '#fff'}
      />

      <Path
        id="Path_2737"
        data-name="Path 2737"
        d="M212.166,225.654v0a4.221,4.221,0,1,0,4.221,4.221A4.221,4.221,0,0,0,212.166,225.656Z"
        transform="translate(-196.892 -218.814)"
        fill={props.fill ? props.fill : '#fff'}
      />
      <Path
        id="Path_2738"
        data-name="Path 2738"
        d="M132.564,161.638H107.529a3.029,3.029,0,0,0-3.029,3.029v16.354a3.029,3.029,0,0,0,3.029,3.029h25.034a3.029,3.029,0,0,0,3.029-3.029V164.667A3.029,3.029,0,0,0,132.564,161.638Zm-12.79,17.585A6.523,6.523,0,1,1,126.3,172.7,6.523,6.523,0,0,1,119.773,179.223Z"
        transform="translate(-104.5 -161.638)"
        fill={props.fill ? props.fill : '#fff'}
      />
    </Svg>
  );
}

export default SvgComponent;
