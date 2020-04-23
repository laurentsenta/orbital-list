import React, { CSSProperties } from 'react'
import Planet from './Planet'

// TODO: Implement a start / end system (donuts).
interface IProps {
  color: string
  className?: string
  style?: CSSProperties

  width?: number
  radius?: number
}

const Orbit: React.FC<IProps> = (props) => {
  const { style, color, width, radius } = props

  return (
    <Planet
      angle={0}
      distance={0}
      radius={radius || 1}
      className='Orbit'
      style={{ border: `${width || 1}px solid ${color}`, ...style }}
    />
  )
}

export default Orbit
