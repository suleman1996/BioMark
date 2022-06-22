import React from 'react';
import { SvgXml } from 'react-native-svg';

const xml = `
<svg id="Layer_19" data-name="Layer 19" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 314.33 204">
  <title>bio-trend_icon</title>
  <g id="Group_566" data-name="Group 566">
    <polygon points="23.57 204 117.87 109.54 180.74 172.41 314.33 22.16 292.17 0 180.74 125.26 117.87 62.39 0 180.43 23.57 204"/>
  </g>
</svg>
`;

export default () => <SvgXml xml={xml} width={30} height={30} fill="#1B96D8" />;
