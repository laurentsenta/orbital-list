import React, { useContext, CSSProperties } from 'react'
import { orbitalContext } from './OrbitalWrapper'
import Place from './Place'

interface IProps {
  angle: number
  distance?: number
  radius: number
  color?: string
  style?: CSSProperties
  className?: string
}

const Planet: React.FC<IProps> = ({
  angle,
  children,
  distance,
  radius,
  color,
  style,
  className
}) => {
  const context = useContext(orbitalContext)

  if (!context) {
    throw new Error('invalid context')
  }

  const size = `${radius * 2 * context.radius}px`

  // TODO: find a better way to implement this pattern.
  const s = {
    width: size,
    height: size,
    borderRadius: '50%',
    ...(color ? { backgroundColor: color } : {}),
    ...style
  }

  const params = className ? { className } : {}

  return (
    <Place {...params} angle={angle} distance={distance || 0} style={s}>
      {children}
    </Place>
  )
}

export default Planet
