import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function SvgComponent(props) {
  return (
    <Svg
      width={16}
      height={14}
      viewBox="0 0 16 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M12.5 11.25h1.125v2.25H12.5v-2.25zm-12 0h11.25v2.25H.5v-2.25zM11.023 6.9H9.875c-.765 0-1.387-.735-1.387-1.5s.622-1.313 1.387-1.313V2.962a2.513 2.513 0 000 5.025h1.148c.787 0 1.477.555 1.477 1.538v.975h1.125V9.27c0-1.358-1.2-2.37-2.602-2.37zm3.352 4.35H15.5v2.25h-1.125v-2.25zm-1.238-6.203c.465-.457.75-1.087.75-1.785A2.513 2.513 0 0011.375.75v1.125a1.39 1.39 0 011.387 1.387 1.39 1.39 0 01-1.387 1.388v1.125c1.68 0 3 1.372 3 3.052V10.5H15.5V8.82c0-1.665-.96-3.105-2.363-3.773z"
        fill={props.fill ? props.fill : '#fff'}
      />
    </Svg>
  );
}

export default SvgComponent;
