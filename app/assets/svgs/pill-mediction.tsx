import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import LinearGradient from 'react-native-linear-gradient';

function SvgComponent(props) {
  return (
    <LinearGradient
      start={{ x: 0, y: 0.75 }}
      end={{ x: 1, y: 0.25 }}
      colors={['#2C6CFC', '#2CBDFC']}
      style={{ borderRadius: 30, height: 60, width: 60 }}
    >
      <Svg
        height={30}
        width={30}
        id="Layer_1"
        style={{
          position: 'absolute',
          alignSelf: 'center',
          top: 13,
        }}
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        viewBox="0 0 45 45"
        xmlSpace="preserve"
        enableBackground="new 0 0 45 45"
        {...props}
      >
        <Path
          d="M31.2.6c-3.4 0-6.7 1.3-9.3 3.8L4.5 22c-5.1 5.1-5.1 13.4 0 18.5 2.6 2.6 5.9 3.8 9.3 3.8s6.7-1.3 9.3-3.8L40.5 23c5.1-5.1 5.1-13.4 0-18.5C38 1.9 34.6.6 31.2.6zm0 4.4c2.2 0 4.5.9 6.2 2.6 3.4 3.4 3.4 8.9 0 12.4l-8.2 8.2-12.3-12.4 8.2-8.2C26.8 5.8 29 5 31.2 5z"
          fill="white"
        />
      </Svg>
    </LinearGradient>
  );
}

export default SvgComponent;
