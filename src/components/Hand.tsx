import React, { CSSProperties, useContext } from 'react'
import { orbitalContext } from '../OrbitalWrapper'

interface IProps {
  angle: number
  color?: string
  className?: string
  style?: CSSProperties
  width?: number

  // TODO: this is a union type, implement a more precise type
  // you should use something like (start?, end?) | (length?)
  start?: number
  end?: number
  length?: number
}

const Hand: React.FC<IProps> = (props) => {
  const context = useContext(orbitalContext)

  if (!context) {
    // TODO: handle this
    throw 'invalid context'
  }

  const { angle, children, color, width } = props
  const { radius } = context

  let actualLength = 1
  let baseDistance = 0

  if (props.start !== undefined || props.end !== undefined) {
    const start = props.start || 0
    const end = props.end || 1
    actualLength = radius * (end - start)
    baseDistance = radius * start
  } else {
    const length = props.length || 1
    actualLength = radius * length
    baseDistance = 0
  }

  const style: CSSProperties = {
    ...(color ? { backgroundColor: color } : {}),
    ...props.style,
    position: 'absolute',
    transform: `rotate(${angle}deg) translate(${baseDistance}px, 0)`,
    transformOrigin: `center left`,
    left: 0,
    top: 0,
    width: actualLength,
    height: width || 1
  }

  return (
    <div
      className={`${props.className || ''} Hand`}
      style={{
        ...style
      }}
    >
      {children}
    </div>
  )
}

export default Hand
