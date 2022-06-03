import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function SvgComponent(props) {
  return (
    <Svg
      width={12}
      height={20}
      viewBox="0 0 18 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        id="wait"
        d="M55.35,28.984c1.005,0,.742-1.99.742-1.99V23.939c0-3.092-1.7-5.933-4.777-8a1.734,1.734,0,0,1-.621-1.45,1.734,1.734,0,0,1,.622-1.45c3.081-2.069,4.777-4.91,4.777-8V.409s.063-.437-.681-.437-12.93-.046-14.424.017S39.5-.168,39.5.62V5.034c0,3.092,1.7,5.933,4.778,8a1.734,1.734,0,0,1,.621,1.45,1.734,1.734,0,0,1-.621,1.45c-3.081,2.069-4.777,4.91-4.777,8v3.056s-.363,1.99.742,1.99Z"
        transform="translate(-39.445 0.044)"
        fill={props.fill ? props.fill : '#fff'}
      />
    </Svg>
  );
}

export default SvgComponent;
