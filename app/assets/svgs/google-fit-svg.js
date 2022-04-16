import * as React from "react"
import Svg, { Path, Defs, LinearGradient, Stop } from "react-native-svg"

function SvgComponent(props) {
  return (
    <Svg
      width={335}
      height={160}
      viewBox="0 0 335 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path fill="url(#paint0_linear_5756_37769)" d="M0 0H335V160H0z" />
      <Defs>
        <LinearGradient
          id="paint0_linear_5756_37769"
          x1={167.5}
          y1={0}
          x2={167.5}
          y2={160}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#fff" stopOpacity={0.5} />
          <Stop offset={0.354167} stopColor="#fff" stopOpacity={0.8} />
        </LinearGradient>
      </Defs>
    </Svg>
  )
}

export default SvgComponent
