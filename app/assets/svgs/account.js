import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function SvgComponent(props) {
  return (
    <Svg
      width={31}
      height={30}
      viewBox="0 0 31 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M15.5 3.692c-6.114 0-11.077 4.963-11.077 11.077 0 6.115 4.963 11.077 11.077 11.077 6.115 0 11.077-4.962 11.077-11.077 0-6.114-4.962-11.077-11.077-11.077zm0 3.323a3.319 3.319 0 013.323 3.324 3.319 3.319 0 01-3.323 3.323 3.319 3.319 0 01-3.323-3.324A3.319 3.319 0 0115.5 7.015zm0 15.73a7.976 7.976 0 01-6.646-3.567c.033-2.204 4.43-3.412 6.646-3.412 2.205 0 6.613 1.208 6.646 3.412a7.975 7.975 0 01-6.646 3.567z"
        fill={props.fill}
      />
    </Svg>
  );
}

export default SvgComponent;
