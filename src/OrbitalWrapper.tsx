import React, {
  createContext,
  useRef,
  useState,
  useLayoutEffect,
  useCallback
} from 'react'
import { useEventListener } from './utils'

interface IOrbitalContext {
  radius: number
  centerX: number
  centerY: number
}

export const orbitalContext = createContext<IOrbitalContext | null>(null)

const OrbitalWrapper: React.FC<{}> = ({ children }) => {
  const ref = useRef<HTMLDivElement>()
  const [size, setSize] = useState({ width: 0, height: 0, squareSize: 0 })

  const onResize = useCallback(() => {
    if (!ref.current) {
      return
    }

    const width = ref.current.offsetWidth
    const height = ref.current.offsetHeight
    const squareSize = Math.min(width, height)
    setSize({ width, height, squareSize })
  }, [ref])

  useLayoutEffect(onResize, [ref])

  useEventListener('resize', onResize)

  const squareSize = size.squareSize

  const context = {
    radius: squareSize / 2,
    centerX: squareSize / 2,
    centerY: squareSize / 2
  }

  return (
    <div
      // this div wraps the whole orbital system so we can get the size we are given.
      style={{ width: '100%', height: '100%', backgroundColor: 'gray' }}
      ref={ref as React.RefObject<HTMLDivElement>}
    >
      <div
        // here is the actual square space of the orbital system
        style={{
          width: `${size.squareSize}px`,
          height: `${size.squareSize}px`,
          border: '1px solid red',
          margin: 'auto',
          position: 'relative'
        }}
      >
        <div
          // here is the coordinate system, we set our 0, 0 at the center of the system.
          style={{
            width: '100%',
            height: '100%',
            overflow: 'visible',
            transform: 'translate(50%, 50%)'
          }}
        >
          <orbitalContext.Provider value={context}>
            {children}
          </orbitalContext.Provider>
        </div>
      </div>
    </div>
  )
}

export default OrbitalWrapper
