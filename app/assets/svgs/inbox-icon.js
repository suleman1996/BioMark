import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function SvgComponent(props) {
  return (
    <Svg
      width={25}
      height={23}
      viewBox="0 0 25 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M23.577 10.539h-3.693V1.923a1.23 1.23 0 00-1.23-1.23H1.423a1.23 1.23 0 00-1.23 1.23v17.23a3.697 3.697 0 003.691 3.693h17.231a3.697 3.697 0 003.693-3.692v-7.385a1.23 1.23 0 00-1.231-1.23zM3.884 20.385a1.23 1.23 0 01-1.23-1.231v-16h14.769v16c0 .432.075.847.21 1.23H3.884zm18.462-1.231a1.23 1.23 0 01-2.462 0V13h2.462v6.154z"
        fill={props.fill}
      />
    </Svg>
  );
}

export default SvgComponent;
