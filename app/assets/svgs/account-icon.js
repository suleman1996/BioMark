import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function SvgComponent(props) {
  return (
    <Svg
      width={21}
      height={21}
      viewBox="0 0 23 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M11.5.692C5.386.692.423 5.655.423 11.77c0 6.115 4.963 11.077 11.077 11.077s11.077-4.962 11.077-11.077C22.577 5.655 17.614.692 11.5.692zm0 3.323a3.319 3.319 0 013.323 3.324 3.319 3.319 0 01-3.323 3.323 3.319 3.319 0 01-3.323-3.323A3.319 3.319 0 0111.5 4.015zm0 15.73a7.976 7.976 0 01-6.646-3.567c.033-2.204 4.43-3.412 6.646-3.412 2.204 0 6.613 1.208 6.646 3.412a7.975 7.975 0 01-6.646 3.567z"
        fill={props.fill}
      />
    </Svg>
  );
}

export default SvgComponent;
