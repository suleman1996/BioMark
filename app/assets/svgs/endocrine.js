import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function SvgComponent(props) {
  return (
    <Svg
      width={32}
      height={32}
      viewBox="0 0 32 34"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M24 19.652C24 24.266 20.422 28 16 28c-4.422 0-8-3.734-8-8.348 0-1.647.484-3.18 1.266-4.484.796-1.304 4.14-5.722 5.406-10.125C14.875 4.343 15.5 4 16 4c.5 0 1.14.342 1.328 1.043 1.266 4.403 4.61 8.821 5.406 10.125A8.573 8.573 0 0 1 24 19.652Z"
        fill={props.color}
      />
    </Svg>
  );
}

export default SvgComponent;
