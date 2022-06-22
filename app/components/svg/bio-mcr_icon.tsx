import React from 'react';
import { SvgXml } from 'react-native-svg';

const xml = `
<svg xmlns="http://www.w3.org/2000/svg" width="29.695" height="29.725" viewBox="0 0 29.695 29.725"><g transform="translate(9.85 0)"><path d="M187.465,2.291a7.85,7.85,0,0,0-11.086,0l-6.463,6.463,7.338,7.338a8.576,8.576,0,0,1,8.956-1.343l1.255-1.372A7.849,7.849,0,0,0,187.465,2.291Z" transform="translate(-169.915 0.001)"/></g><g transform="translate(0 9.986)"><path d="M16.229,179.356l-7.348-7.348L2.555,178.34A7.88,7.88,0,0,0,13.7,189.484l1.282-1.289a8.573,8.573,0,0,1,1.247-8.84Z" transform="translate(-0.263 -172.008)"/></g><g transform="translate(15.759 15.877)"><path d="M271.7,280.358a6.945,6.945,0,0,0,6.1,6.88v-13.76A6.945,6.945,0,0,0,271.7,280.358Z" transform="translate(-271.703 -273.478)"/></g><g transform="translate(23.598 15.877)"><path d="M406.722,273.478v13.76a6.93,6.93,0,0,0,0-13.76Z" transform="translate(-406.722 -273.478)"/></g></svg>
`;

export default () => <SvgXml xml={xml} width={20} height={20} fill="#1B96D8" />;
