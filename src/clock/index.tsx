import React, { CSSProperties } from 'react'
import Dial from '../components/Dial'
import Hand from '../components/Hand'
import Label from '../components/Label'
import Orbit from '../components/Orbit'
import Planet from '../components/Planet'
import Slice from '../components/Slice'
import { lpad, range } from '../utils'

const BIG_HOURS = new Set([0, 6, 12, 18])

export interface Item {
  timezoneOffset: number
  color: string
  id: string
  style?: CSSProperties
  children?: any
}

export interface AugmentedItem extends Item {
  hour: number
  minute: number
  layer: number
}

export const HOURS = range(24)
export const ANGLE_DELTA = 90 // turn so that 12:00 is at the top.

export const asAngle = (hours: number, minutes: number = 0) => {
  return (hours / 24) * 360 + (minutes / 60) * (360 / 24) + ANGLE_DELTA
}

export const augmentItems = (time: Date, items: Item[]): AugmentedItem[] => {
  const withHoursAndMinutes = items.map((item) => {
    const minutes =
      time.getUTCHours() * 60 +
      time.getUTCMinutes() -
      item.timezoneOffset +
      24 * 60 // Make sure the value is always > 0 which prevents tricky deltas, modulos, etc.

    return {
      ...item,
      hour: Math.floor(minutes / 60) % 24,
      minute: minutes % 60
    }
  })

  /*
   * set a layer for every item,
   * prevent collisions / items to close to each other.
   * TODO: when we rotate, the order might change and the items jump between layer -> fix.
   */
  const layerUsed = {}

  const use = (hour: number, distance: number) => {
    const H = hour + (24 % 24) // prevent issues on -1 and +1
    layerUsed[H] = Math.max(layerUsed[H] | 0, distance)
  }

  const withLayer = withHoursAndMinutes.map((item) => {
    const { hour } = item
    const layer = layerUsed[hour] !== undefined ? layerUsed[hour] + 1 : 0
    use(hour, layer)
    use(hour + 1, layer)
    use(hour - 1, layer)
    return { ...item, layer }
  })

  return withLayer
}

const Background: React.FC = () => (
  <React.Fragment>
    <Dial className='Dial' radius={1} color='#F3A712' />
    <Slice angleStart={asAngle(18)} angleEnd={asAngle(6)} color='#133762' />
    <Orbit color='rgba(255, 255, 255, 0.4)' width={2} radius={0.7} />
    <Orbit color='rgba(255, 255, 255, 0.4)' width={2} radius={0.45} />
    <Orbit color='rgba(255, 255, 255, 0.4)' width={2} radius={0.2} />
  </React.Fragment>
)

const TimeHand: React.FC<{
  hours: number
  minutes: number
}> = ({ hours, minutes }) => (
  <React.Fragment>
    <Hand
      angle={asAngle(hours, minutes)}
      color='#DB2B39'
      width={7}
      length={0.51}
      style={{ borderRadius: '0.3rem' }}
    />
    <Hand
      style={{ borderRadius: '0.3rem' }}
      angle={asAngle(hours, minutes) + 180}
      color='#DB2B39'
      width={7}
      length={0.15}
    />
    <Dial className='Dial' radius={0.08} color='#DB2B39' />
  </React.Fragment>
)

const HoursSlice: React.FC<{
  active: Set<number>
}> = ({ active }) => (
  <React.Fragment>
    {HOURS.map((hour) => (
      <Slice
        key={hour}
        style={{
          transition: 'background-color 0.6s ease'
        }}
        angleStart={asAngle(hour) + 0.5}
        angleEnd={asAngle(hour + 1) - 0.5}
        color={`rgba(255, 255, 255, ${active.has(hour) ? '0.08' : '0'})`}
      />
    ))}
  </React.Fragment>
)

const Ticks: React.FC<{ active: Set<number> }> = ({ active }) => (
  <React.Fragment>
    {HOURS.map((hour) => {
      const opacity = BIG_HOURS.has(hour)
        ? '1'
        : active.has(hour)
        ? '0.7'
        : '0.1'
      const fontSize = BIG_HOURS.has(hour) ? '1.8rem' : '1.2rem'
      const color = `rgba(255, 255, 255, ${opacity})`
      // const color = `rgba(255, 255, 255, ${opacity})`

      return (
        <React.Fragment key={hour}>
          <Label
            angle={asAngle(hour)}
            distance={0.9}
            color={color}
            style={{ fontSize, fontWeight: 'bold' }}
          >
            {lpad(hour, 2)}
          </Label>
          <Hand
            start={0.95}
            end={0.99}
            color={color}
            style={{ borderRadius: '0.2rem' }}
            angle={asAngle(hour)}
            width={2}
          />
        </React.Fragment>
      )
    })}
  </React.Fragment>
)

const HandSeconds: React.FC<{
  seconds: number
}> = ({ seconds }) => (
  <Hand
    style={{ borderRadius: '0.1rem' }}
    angle={(seconds / 60) * 360 + ANGLE_DELTA}
    // TODO: figure out how to use transitions with angle and modulos:
    // style={{transitionDuration: '0.2s'}}
    color='rgba(255, 255, 255, 0.9)'
    width={2}
    length={0.73}
  />
)

export const BackgroundAndHands: React.FC<{
  activeItemHours: Set<number>
  activeTickHours: Set<number>
  hours: number
  minutes: number
  seconds: number
}> = ({ activeItemHours, activeTickHours, hours, minutes, seconds }) => (
  <React.Fragment>
    <Background />
    <HoursSlice active={activeItemHours} />
    <Ticks active={activeTickHours} />
    <HandSeconds seconds={seconds} />
    <TimeHand hours={hours} minutes={minutes} />
  </React.Fragment>
)

export const Peoples: React.FC<{
  items: AugmentedItem[]
  distance: (layer: number) => number
}> = ({ items, distance }) => (
  <React.Fragment>
    {items.map(({ id, color, hour, minute, layer, style, children }) => (
      <Planet
        key={id}
        style={{ backgroundColor: color, ...style }}
        angle={asAngle(hour, minute)}
        radius={0.09}
        distance={distance(layer)}
      >
        {children}
      </Planet>
    ))}
  </React.Fragment>
)
