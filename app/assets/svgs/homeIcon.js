import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props) {
  return (
    <Svg
      width={23}
      height={23}
      viewBox="0 0 23 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M22.118 11.588L12.053.935a.78.78 0 00-.254-.18.742.742 0 00-.85.18L.882 11.588a1.71 1.71 0 00-.46 1.172c0 .914.701 1.657 1.564 1.657h1.06v7.601c0 .458.35.828.783.828h6.106V17.05h2.738v5.797h6.497c.433 0 .782-.37.782-.828v-7.601h1.06c.416 0 .815-.174 1.108-.487a1.728 1.728 0 00-.003-2.342z"
        fill="#1B96D8"
      />
    </Svg>
  )
}

export default SvgComponent
