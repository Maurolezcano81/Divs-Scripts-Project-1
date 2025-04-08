import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const StarSVG = (props: SvgProps) => (
  <Svg fill="none" {...props} viewBox="0 0 48 49" height={48} width={48}>
    <Path
      fill={props.fill}
      d="m23 0 .823 3.367c1.286 5.262 1.929 7.892 3.3 10.015a15 15 0 0 0 4.732 4.632c2.152 1.326 4.796 1.912 10.084 3.085L46 22l-4.061.9c-5.288 1.174-7.932 1.76-10.084 3.086a15 15 0 0 0-4.732 4.632c-1.371 2.123-2.014 4.753-3.3 10.015L23 44l-.823-3.367c-1.286-5.262-1.929-7.892-3.3-10.015a15 15 0 0 0-4.732-4.632c-2.152-1.326-4.796-1.912-10.084-3.085L0 22l4.061-.9c5.288-1.174 7.932-1.76 10.084-3.086a15 15 0 0 0 4.732-4.632c1.371-2.123 2.014-4.753 3.3-10.015L23 0Z"
    />
  </Svg>
)
export default StarSVG
