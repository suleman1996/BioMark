import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function SvgComponent(props) {
  return (
    <Svg
      width={23}
      height={23}
      viewBox="0 0 23 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M5.27.692a.692.692 0 01.692.693v.692h11.076v-.692a.692.692 0 111.385 0v.692h1.385a2.77 2.77 0 012.769 2.77v15.23a2.77 2.77 0 01-2.77 2.77H3.193a2.769 2.769 0 01-2.769-2.77V4.847a2.77 2.77 0 012.77-2.77h1.384v-.692a.692.692 0 01.692-.693zM1.807 6.231v13.846a1.385 1.385 0 001.384 1.385h16.616a1.385 1.385 0 001.384-1.385V6.231H1.808z"
        fill="#8493AE"
      />
    </Svg>
  );
}

export default SvgComponent;
