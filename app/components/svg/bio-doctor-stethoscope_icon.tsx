import React from 'react';
import { SvgXml } from 'react-native-svg';

const xml = `
<svg xmlns="http://www.w3.org/2000/svg" width="32.477" height="39.752" viewBox="0 0 32.477 39.752">
  <g transform="translate(-18.422)">
    <circle class="a" cx="1.991" cy="1.991" r="1.991" transform="translate(31.669 0)"/>
    <circle class="a" cx="1.991" cy="1.991" r="1.991" transform="translate(42.217 0)"/>
    <path class="a"
          d="M50.14,7.881a5.539,5.539,0,0,0-4.846-2.8V7.058A3.622,3.622,0,0,1,48.43,12.49L42.088,23.475a3.622,3.622,0,0,1-6.273,0L29.473,12.49a3.622,3.622,0,0,1,3.136-5.432V5.083a5.6,5.6,0,0,0-4.846,8.394l6.342,10.985a5.528,5.528,0,0,0,3.859,2.71v5.3c0,5.175-3.055,9.386-6.81,9.386s-6.81-4.21-6.81-9.386V26.163a4.934,4.934,0,1,0-1.975,0v6.308c0,6.264,3.941,11.36,8.785,11.36s8.785-5.1,8.785-11.36v-5.3a5.528,5.528,0,0,0,3.859-2.71L50.14,13.477A5.538,5.538,0,0,0,50.14,7.881Z"
          transform="translate(0 -4.079)"/>
  </g>
</svg>

`;

export default () => <SvgXml xml={xml} width={20} height={20} fill="#1B96D8" />;
