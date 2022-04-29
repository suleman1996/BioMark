import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function SvgComponent(props) {
  return (
    <Svg
      width={32}
      height={32}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M30.234 32c.975 0 1.766-.79 1.766-1.766V1.766C32 .791 31.209 0 30.234 0H1.766C.79 0 0 .79 0 1.766v28.468C0 31.209.79 32 1.766 32h28.468z"
        fill="#395185"
      />
      <Path
        d="M22.08 32V19.608h4.159l.623-4.83h-4.783v-3.083c0-1.398.389-2.351 2.394-2.351l2.557-.001v-4.32c-.442-.058-1.96-.19-3.726-.19-3.688 0-6.212 2.25-6.212 6.384v3.561h-4.17v4.83h4.17V32h4.987z"
        fill="#fff"
      />
    </Svg>
  );
}

export default SvgComponent;
