import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function SvgComponent(props) {
  return (
    <Svg
      width={45}
      height={45}
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      viewBox="0 0 35.9 35.9"
      xmlSpace="preserve"
      enableBackground="new 0 0 35.9 35.9"
      {...props}
    >
      <Path
        d="M9.9 6.5v8.1H7.6V25h2.3v4.6h18.4V12.2l-5.8-5.8H9.9zm2.3 2.3h9.2v4.6H26v1.2H12.2V8.8zm-2.3 8h1.7c1 0 1.7.8 1.7 1.7s-.8 1.7-1.7 1.7H11v2.3H9.9v-5.7zm10.4 0h3.5V18h-2.3v1.2h1.8v1.2h-1.8v2.3h-1.2v-5.9zm-5.8 0h1.9c1.8 0 2.7 1.1 2.7 2.4v.9c0 1.3-.9 2.4-2.7 2.4h-1.9v-5.7zM11.1 18v1.2h.6c.3 0 .6-.3.6-.6s-.3-.6-.7-.6h-.5zm4.6 0v3.4h.7c.7 0 1.6-.2 1.6-1.3v-.9c0-1.1-.9-1.3-1.6-1.3h-.7zm-3.5 6.9H26v2.3H12.2v-2.3z"
        fill={props.fill ? props.fill : '#2CBDFC'}
      />
    </Svg>
  );
}

export default SvgComponent;
