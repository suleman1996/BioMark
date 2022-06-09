import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function SvgComponent(props) {
  return (
    <Svg
      width={10}
      height={16}
      viewBox="0 0 10 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M6.283.736L4.965 7.031a.26.26 0 00.279.235h3.581c.214 0 .348.194.244.35L4.922 15.38c-.14.212-.523.128-.523-.115V9.251a.26.26 0 00-.28-.236H.905c-.211 0-.346-.19-.247-.347l5.1-8.043c.136-.216.525-.134.525.111z"
        fill={props.fill ? props.fill : '#fff'}
      />
    </Svg>
  );
}

export default SvgComponent;
