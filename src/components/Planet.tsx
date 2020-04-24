import React, { CSSProperties, useContext } from 'react'
import { orbitalContext } from '../OrbitalWrapper'
import Place from './Place'

interface IProps {
  angle: number
  distance?: number
  radius: number
  color?: string
  style?: CSSProperties
  className?: string
}

const Planet: React.FC<IProps> = (props) => {
  const { angle, children, distance, radius, color, className } = props
  const context = useContext(orbitalContext)

  if (!context) {
    throw new Error('invalid context')
  }

  const size = `${context.radius * radius * 2}px`

  const style = {
    width: size,
    height: size,
    borderRadius: '50%',
    ...(color ? { backgroundColor: color } : {}),
    ...props.style
  }

  const params = className ? { className } : {}

  return (
    <Place {...params} angle={angle} distance={distance || 0} style={style}>
      {children}
    </Place>
  )
}

export default Planet
