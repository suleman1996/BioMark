import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function SvgComponent(props) {
  return (
    <Svg
      width={31}
      height={30}
      viewBox="0 0 31 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M26.577 13.539h-3.692V4.923a1.23 1.23 0 00-1.231-1.23H4.424a1.23 1.23 0 00-1.232 1.23v17.23a3.697 3.697 0 003.693 3.693h17.23a3.697 3.697 0 003.693-3.692v-7.385a1.23 1.23 0 00-1.231-1.23zM6.885 23.385a1.23 1.23 0 01-1.231-1.231v-16h14.77v16c0 .432.074.847.21 1.23H6.884zm18.461-1.231a1.23 1.23 0 11-2.461 0V16h2.461v6.154z"
        fill={props.fill}
      />
      <Path
        d="M8.116 8.615h9.846v2.462H8.116V8.615zm0 4.924h9.846V16H8.116V13.54zm6.154 4.923h3.692v2.461H14.27v-2.461z"
        fill={props.fill}
      />
    </Svg>
  );
}

export default SvgComponent;
