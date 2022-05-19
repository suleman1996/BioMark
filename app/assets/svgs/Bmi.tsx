import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function SvgComponent(props) {
  return (
    <Svg
      width={13}
      height={16}
      viewBox="0 0 13 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M6.84 3.78a1.64 1.64 0 100-3.28 1.64 1.64 0 000 3.28zM12.14 4.248H1.54a.79.79 0 100 1.581h2.984c.202 0 .439.09.573.44.157.404.08 1.186-.017 1.792l-.126.716a.012.012 0 01-.004.01L3.937 14.55a.803.803 0 00.96.922.793.793 0 00.609-.646l.7-4.005s.224-.951.634-.951c.417 0 .637.951.637.951l.7 4.009a.797.797 0 101.57-.281L8.734 8.786a.013.013 0 00-.004-.01l-.126-.716c-.097-.606-.174-1.388-.017-1.793.133-.348.378-.439.564-.439h2.989a.79.79 0 100-1.581z"
        fill="#fff"
      />
    </Svg>
  );
}

export default SvgComponent;
