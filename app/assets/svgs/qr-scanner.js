import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props) {
  return (
    <Svg
      width={20}
      height={20}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M12 0h6v5h-2V2h-4V0zM6 0v2H2v3H0V0h6zm6 18v-2h4v-3h2v5h-6zm-6 0H0v-5h2v3h4v2zM0 8h18v2H0V8z"
        fill="#1B96D8"
      />
    </Svg>
  )
}

export default SvgComponent
