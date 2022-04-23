import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function SvgComponent(props) {
  return (
    <Svg
      width={30}
      height={30}
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M12.003 36H24V24.002h12V11.997H24V0H12.003v11.997H0v12.005h12.003V36z"
        fill="#1B96D8"
      />
    </Svg>
  );
}

export default SvgComponent;
