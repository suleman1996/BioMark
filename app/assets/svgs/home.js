import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function SvgComponent(props) {
  return (
    <Svg
      width={31}
      height={30}
      viewBox="0 0 31 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M26.119 14.588L16.053 3.935a.78.78 0 00-.253-.18.743.743 0 00-.852.18L4.883 14.588a1.71 1.71 0 00-.46 1.172c0 .914.702 1.657 1.564 1.657h1.06v7.601c0 .458.35.828.783.828h6.107V20.05h2.737v5.797h6.498c.432 0 .781-.37.781-.828v-7.601h1.061c.416 0 .814-.174 1.107-.487a1.728 1.728 0 00-.002-2.342z"
        fill={props.fill}
      />
    </Svg>
  );
}

export default SvgComponent;
