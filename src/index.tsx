import React, { useLayoutEffect, useRef, useState, CSSProperties, createContext, useContext } from 'react'
// import styles from './styles.module.css'

interface Item {
  type: 'person'
  timezoneOffset: string
  color: string
}

interface IProps {
  items: Item[]
}

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

interface IPropsItem {
  angle: number;
  distance: number;
}

export const Item: React.FC<IPropsItem> = ({ angle, children, distance }) => {
  const context = useContext(orbitalContext);

  if (!context) {
    // TODO: handle this
    throw 'invalid context'
  }

  const {radius} = context;
  const radAngle = angle * (Math.PI / 180)
  const d = distance * radius;
  const x = d * Math.cos(radAngle);
  const y = d * Math.sin(radAngle);

  return (
    <div style={{
      position: 'absolute',
      left: x ,
      top: y,
      transform: 'translate(-50%, -50%)'
    }}>
      {angle}
      {children}
    </div>
  )
}

interface IOrbitalContext {
  radius: number;
  centerX: number;
  centerY: number;
}

const orbitalContext = createContext<IOrbitalContext | null>(null);

const OrbitalWrapper: React.FC<{}> = ({ children }) => {
  const ref = useRef<HTMLDivElement>()
  const [size, setSize] = useState({ width: 0, height: 0, squareSize: 0 })

  useLayoutEffect(() => {
    if (!ref.current) {
      return
    }

    const width = ref.current.offsetWidth
    const height = ref.current.offsetHeight
    const squareSize = Math.min(width, height)

    setSize({ width, height, squareSize })
  }, [ref])

  const squareSize = size.squareSize;

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

        }}>
        <orbitalContext.Provider value={context}>
        {children}
        </orbitalContext.Provider>
          </div>
      </div>
    </div>
  )
}

export const TimezoneClock = ({ items }: IProps) => {
  // TODO: deal with element resizings.

  return (
    <OrbitalWrapper>
      <Dial
        style={{
          width: '10%',
          height: '10%',
          backgroundColor: 'pink',
          borderRadius: '50%'
        }}
      />
      {items.map((item, i) => {
        return (
          <div key={i} style={{ backgroundColor: item.color }}>
            hello
          </div>
        )
      })}
    </OrbitalWrapper>
  )
}

export const AngularList: React.FC<IProps> = ({ children }) => {
  return (
      <OrbitalWrapper>
      {children}
      </OrbitalWrapper>
  )
}

