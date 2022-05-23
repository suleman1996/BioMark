import * as React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';
import LinearGradient from 'react-native-linear-gradient';

function SvgComponent(props) {
  return (
    <LinearGradient
      start={{ x: 0, y: 0.75 }}
      end={{ x: 1, y: 0.25 }}
      colors={['#2C6CFC', '#2CBDFC']}
      style={{ borderRadius: 40 }}
    >
      <Svg
        width={65}
        height={65}
        id="Layer_1"
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        viewBox="0 0 57.8 57.8"
        xmlSpace="preserve"
        enableBackground="new 0 0 57.8 57.8"
        {...props}
      >
        <Circle cx={28.9} cy={29.4} r={27} fill="none" />
        <Path
          d="M28.9 12.9c-8.8 0-15.9 6.8-15.9 15.2 0 4.5 2 8.5 5.3 11.3v6.5l6.4-3.2c1.3.3 2.7.6 4.2.6 8.8 0 15.9-6.8 15.9-15.2s-7.1-15.2-15.9-15.2zm-1.5 11l3.9 3.9 7-3.9-7.9 8.5-3.8-4.1-7.2 4 8-8.4z"
          fill="#fff"
        />
      </Svg>
    </LinearGradient>
  );
}

export default SvgComponent;
