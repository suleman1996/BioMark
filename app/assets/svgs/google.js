import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function SvgComponent(props) {
  return (
    <Svg
      width={21}
      height={22}
      viewBox="0 0 21 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        transform="translate(.109 .678)"
        fill="#fff"
        d="M0 0H20.8696V20.8696H0z"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20.143 11.34c0-.709-.063-1.39-.181-2.045h-9.419v3.868h5.382a4.6 4.6 0 01-1.995 3.018v2.51h3.232c1.89-1.742 2.981-4.305 2.981-7.35z"
        fill="#4285F4"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.543 21.113c2.7 0 4.964-.895 6.619-2.423l-3.232-2.509c-.896.6-2.041.955-3.387.955-2.604 0-4.809-1.76-5.595-4.123H1.607v2.59a9.996 9.996 0 008.936 5.51z"
        fill="#34A853"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.948 13.013c-.2-.6-.314-1.24-.314-1.9 0-.66.114-1.3.314-1.9v-2.59H1.607a9.996 9.996 0 00-1.064 4.49c0 1.614.387 3.14 1.064 4.49l3.34-2.59z"
        fill="#FBBC05"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.543 5.09c1.469 0 2.787.505 3.823 1.496l2.868-2.868c-1.732-1.614-3.995-2.605-6.69-2.605a9.996 9.996 0 00-8.937 5.51l3.34 2.59C5.735 6.849 7.94 5.09 10.544 5.09z"
        fill="#EA4335"
      />
    </Svg>
  );
}

export default SvgComponent;
