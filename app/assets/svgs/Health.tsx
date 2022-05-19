import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function SvgComponent(props) {
  return (
    <Svg
      width={35}
      height={35}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path d="M13.75 21.563H20v3.125h-6.25v-3.125z" fill="#1B96D8" />
      <Path
        d="M32.5 10.625h-1.563V7.5H15.313v3.125h-3.124v1.953l-.938 1.172H9.062v2.734L7.5 18.437V32.5h18.75l6.25-7.813V10.626zm-21.875 4.688h12.5v3.124h-12.5v-3.125zm14.063 15.624H9.063V20h15.624v10.938zm1.562-12.5h-1.563V13.75H13.75v-1.563h12.5v6.25zm3.125-3.906l-1.563 1.953v-5.859H16.876V9.062h12.5v5.47z"
        fill="#1B96D8"
      />
    </Svg>
  );
}

export default SvgComponent;
