import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

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
        d="M20.3.4c-1.3 0-2.2.9-2.2 2.2V18H2.6c-1.3 0-2.2.9-2.2 2.2v4.4c0 1.3.9 2.2 2.2 2.2H18v15.4c0 1.3.9 2.2 2.2 2.2h4.4c1.3 0 2.2-.9 2.2-2.2V26.9h15.4c1.3 0 2.2-.9 2.2-2.2v-4.4c0-1.3-.9-2.2-2.2-2.2H26.9V2.6c0-1.3-.9-2.2-2.2-2.2h-4.4z"
        fill="#3d6af3"
      />
    </Svg>
  );
}

export default SvgComponent;
