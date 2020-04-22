import React, { useContext } from 'react'
import { orbitalContext } from './OrbitalWrapper'

interface IProps {
  angle: number
  distance: number
}

const Place: React.FC<IProps> = ({ angle, children, distance }) => {
  const context = useContext(orbitalContext)

  if (!context) {
    // TODO: handle this
    throw 'invalid context'
  }

  const { radius } = context
  const radAngle = angle * (Math.PI / 180)
  const d = distance * radius
  const x = d * Math.cos(radAngle)
  const y = d * Math.sin(radAngle)

  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        transform: 'translate(-50%, -50%)'
      }}
    >
      {angle}
      {children}
    </div>
  )
}

export default Place
