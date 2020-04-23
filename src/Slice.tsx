import React, { useContext, CSSProperties } from 'react'
import { orbitalContext } from './OrbitalWrapper'

// TODO: Implement a start / end system (donuts).
interface IProps {
  color?: string
  className?: string
  style?: CSSProperties
  width?: number
  angleStart: number
  angleEnd: number
  length?: number
}

const Slice: React.FC<IProps> = (props) => {
  const context = useContext(orbitalContext)

  if (!context) {
    // TODO: handle this
    throw 'invalid context'
  }

  const { children, color, length } = props
  const { radius } = context

  const angleStart = props.angleStart % 360
  const angleEnd = props.angleEnd % 360

  let actualLength = 1

  let squareSize = 0

  actualLength = (length || 1) * radius
  squareSize = actualLength * 2

  const squareRadius = squareSize / 2 // when looking for the center of the square.

  const actualAngle = angleEnd - angleStart
  const radAngle = actualAngle * (Math.PI / 180)

  const points = [
    `${squareRadius}px ${squareRadius}px`, // center
    `${squareRadius * 2}px ${squareRadius}px`, // center ---> right
    `${squareRadius * 2}px ${squareRadius * 2}px` // right vvvv bottom right
  ]

  if (actualAngle > 90) {
    points.push(
      `${0}px ${squareRadius * 2}px` // bottom left <--- bottom right
    )
  }
  if (actualAngle > 180) {
    points.push(
      `${0}px ${0}px` // bottom left ^^^ top left
    )
  }
  if (actualAngle > 180) {
    points.push(
      `${0}px ${0}px` // bottom left ^^^ top left
    )
  }
  if (actualAngle > 270) {
    points.push(
      `${squareRadius * 2}px ${0}px` // top left ---> top right
    )
  }

  const x = squareRadius + squareRadius * Math.cos(radAngle)
  const y = squareRadius + squareRadius * Math.sin(radAngle)
  points.push(`${x}px ${y}px`)

  const clipPath = `polygon(${points.join(',')})`

  // We draw a big circle, clip it and rotate it.
  const style: CSSProperties = {
    ...(color ? { backgroundColor: color } : {}),
    ...props.style,
    position: 'absolute',
    transform: `translate(-${squareSize / 2}px, -${
      squareSize / 2
    }px) rotate(${angleStart}deg)`,
    clipPath,
    left: 0,
    top: 0,
    width: `${squareSize}px`,
    height: `${squareSize}px`,
    borderRadius: '50%'
  }

  return (
    <div
      className={`${props.className || ''} Slice`}
      style={{
        ...style
      }}
    >
      {children}
    </div>
  )
}

export default Slice
