import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function SvgComponent(props) {
  return (
    <Svg
      width={22}
      height={28}
      viewBox="0 0 22 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M11 .667a6.674 6.674 0 00-6.667 6.666v4H3A2.667 2.667 0 00.333 14v10.667A2.667 2.667 0 003 27.333h16a2.667 2.667 0 002.667-2.666V14A2.667 2.667 0 0019 11.333h-1.333v-4A6.674 6.674 0 0011 .667zM7 7.333c0-2.205 1.795-4 4-4s4 1.795 4 4v4H7v-4zm5.333 14.298v3.036H9.667V21.63a2.657 2.657 0 01.756-4.903 2.669 2.669 0 013.244 2.605 2.653 2.653 0 01-1.334 2.298z"
        fill="#1B96D8"
      />
    </Svg>
  );
}

export default SvgComponent;
