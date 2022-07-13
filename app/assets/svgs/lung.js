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
        d="M11.03 7.994c3.902.003 3.543 5.308 3.542 7.43-.002 2.708.663 8.174-1.427 10.255-2.131 2.12-6.39 3.178-8.517 1.408C2.501 25.316 6.062 7.99 11.03 7.994Zm9.967.008c-3.902-.003-3.552 5.302-3.554 7.424-.002 2.709-.677 8.173 1.41 10.257 2.128 2.124 6.384 3.188 8.515 1.422 2.13-1.766-1.404-19.099-6.371-19.103Z"
        fill={props.color}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15.35 4h1.334l-.008 9.663c-.001 1.4-.626 2.203-1.333 2.615a2.878 2.878 0 0 1-1.319.381h-.017v-1.333h-.006.003a1.56 1.56 0 0 0 .668-.2c.293-.17.669-.533.67-1.465L15.35 4Z"
        fill={props.color}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.684 4h-1.335l-.007 9.661c-.001 1.401.622 2.205 1.328 2.618.402.232.854.363 1.318.383h.018l.002-.667.001-.666h.006-.003c-.006 0-.018 0-.034-.002a1.546 1.546 0 0 1-.633-.199c-.294-.171-.67-.534-.668-1.465L16.684 4Z"
        fill={props.color}
      />
    </Svg>
  );
}

export default SvgComponent;
