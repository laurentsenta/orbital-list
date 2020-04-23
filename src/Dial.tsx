import React, { CSSProperties } from 'react'
import Planet from './Planet'

interface IProps {
  style?: CSSProperties
  className?: string
  color?: string
  radius?: number
}
const Dial: React.FC<IProps> = ({ style, className, color, radius }) => {
  const p = {
    ...(style ? { style } : {}),
    ...(className ? { className } : {}),
    ...(color ? { color } : {})
  }
  return <Planet distance={0} angle={0} radius={radius || 1} {...p} />
}

export default Dial
