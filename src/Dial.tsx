import React, { CSSProperties } from 'react'

const Dial: React.FC<{ style?: CSSProperties }> = ({ style }) => {
  return (
    <div
      style={{
        ...{
          position: 'absolute',
          left: '0%',
          top: '0%',
          transform: 'translate(-50%, -50%)'
        },
        ...(style || {})
      }}
    >
      Dial
    </div>
  )
}

export default Dial
