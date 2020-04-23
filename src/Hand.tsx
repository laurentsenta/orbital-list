import React, { useContext, CSSProperties } from 'react'
import { orbitalContext } from './OrbitalWrapper'

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
  const length = radius

  const style: CSSProperties = {
    ...(color ? { backgroundColor: color } : {}),
    ...props.style,
    position: 'absolute',
    transform: `rotate(${angle}deg)`,
    transformOrigin: '0 50%',
    left: 0,
    top: 0,
    width: length,
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
