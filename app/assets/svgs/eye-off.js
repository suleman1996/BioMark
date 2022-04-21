import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function SvgComponent(props) {
  return (
    <Svg
      width={21}
      height={20}
      viewBox="0 0 21 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M6.073 10.194L2.212 6.333C.692 7.99.116 9.65.106 9.684L0 10l.105.316C.127 10.383 2.421 17 10.054 17c.929 0 1.775-.102 2.552-.273L9.86 13.981a3.987 3.987 0 01-3.787-3.787zM10.054 3c-1.855 0-3.375.404-4.642.998L1.707.293.293 1.707l18 18 1.414-1.414-3.298-3.298c2.638-1.953 3.579-4.637 3.593-4.679l.105-.316-.105-.316C19.98 9.617 17.687 3 10.054 3zm1.906 7.546c.187-.677.028-1.439-.492-1.96-.52-.521-1.283-.679-1.96-.492L8 6.586A3.955 3.955 0 0110.054 6c2.206 0 4 1.794 4 4a3.94 3.94 0 01-.587 2.053l-1.507-1.507z"
        fill="#06599E"
      />
    </Svg>
  );
}

export default SvgComponent;
