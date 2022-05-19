import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function SvgComponent(props) {
  return (
    <Svg
      width={25}
      height={25}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.813 8.906a1.406 1.406 0 00-2.813 0v23.438c0 .776.63 1.406 1.406 1.406h27.188a1.406 1.406 0 000-2.813H7.812V8.907zm26.774 4.744a1.406 1.406 0 00-1.987-1.988l-8.85 8.85-4.631-4.63a1.406 1.406 0 00-1.988 0l-6.094 6.093a1.406 1.406 0 001.988 1.987l5.1-5.1 4.631 4.632a1.406 1.406 0 001.988 0l9.843-9.844z"
        fill="#1B96D8"
      />
    </Svg>
  );
}

export default SvgComponent;
