import React, { CSSProperties, useContext } from 'react'
import { orbitalContext } from '../OrbitalWrapper'

interface IProps {
  style?: CSSProperties
  angle: number
  distance?: number
  className?: string
}

const Place: React.FC<IProps> = ({
  angle,
  children,
  distance,
  style,
  className
}) => {
  const context = useContext(orbitalContext)

  if (!context) {
    // TODO: handle this
    throw 'invalid context'
  }

  const { radius } = context
  const radAngle = angle * (Math.PI / 180)
  const d = (distance || 0) * radius
  const x = d * Math.cos(radAngle)
  const y = d * Math.sin(radAngle)

  const params = className ? { className } : {}

  return (
    <div
      {...params}
      style={{
        ...style,
        position: 'absolute',
        left: x,
        top: y,
        transform: 'translate(-50%, -50%)'
      }}
    >
      {children}
    </div>
  )
}

export default Place
