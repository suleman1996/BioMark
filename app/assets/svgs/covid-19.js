import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function SvgComponent(props) {
  return (
    <Svg
      width={30}
      height={30}
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M30.115 21.6a2.794 2.794 0 005.088-1.6 2.794 2.794 0 00-5.088-1.6h-1.312c0-2.512-.8-4.8-2.24-6.704l2.144-2.144a2.85 2.85 0 002.496-.752c1.072-1.104 1.072-2.88 0-4-1.104-1.072-2.88-1.072-4 0a2.85 2.85 0 00-.752 2.496L24.307 9.44a11.064 11.064 0 00-5.104-2.112v-2.24A2.794 2.794 0 0017.603 0a2.794 2.794 0 00-1.6 5.088v2.24c-1.44.208-2.784.672-4 1.376L10.227 6.16c.304-.832.224-1.792-.32-2.56a2.8 2.8 0 00-3.904-.688A2.78 2.78 0 005.315 6.8 2.775 2.775 0 007.603 8l1.888 2.688c-.688.688-1.232 1.456-1.696 2.304a2.817 2.817 0 00-2.992.608 2.89 2.89 0 000 4 3.234 3.234 0 001.6.8c0 .865.112 1.697.288 2.497l-2.096.56c-.673-.56-1.6-.8-2.529-.56a2.802 2.802 0 101.472 5.408 2.78 2.78 0 001.889-1.76l2.416-.656a12.1 12.1 0 002.8 3.312l-1.76 3.2c-.88.128-1.68.624-2.144 1.472a2.8 2.8 0 004.928 2.656 2.77 2.77 0 00.032-2.576L13.41 28.8c1.296.512 2.704.8 4.192.8h.288c-.208.416-.288.896-.288 1.408A2.82 2.82 0 0020.61 33.6c1.536-.112 2.704-1.472 2.592-3.008a2.822 2.822 0 00-1.04-1.968 11.601 11.601 0 002.144-1.264l3.744 3.744a2.85 2.85 0 00.752 2.496 2.89 2.89 0 004 0c1.12-1.072 1.072-2.88 0-4a2.85 2.85 0 00-2.496-.752l-3.744-3.744A11.142 11.142 0 0028.34 21.6h1.776zm-14.912-3.2a2.397 2.397 0 01-2.4-2.4c0-1.328 1.072-2.4 2.4-2.4 1.328 0 2.4 1.072 2.4 2.4 0 1.328-1.072 2.4-2.4 2.4zm5.6 4.8c-.88 0-1.6-.72-1.6-1.6 0-.88.72-1.6 1.6-1.6.88 0 1.6.72 1.6 1.6 0 .88-.72 1.6-1.6 1.6z"
        fill="#1B96D8"
      />
    </Svg>
  );
}

export default SvgComponent;
