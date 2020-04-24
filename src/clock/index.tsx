import React from 'react'
import Dial from '../components/Dial'
import Hand from '../components/Hand'
import Label from '../components/Label'
import Orbit from '../components/Orbit'
import Planet from '../components/Planet'
import Slice from '../components/Slice'
import { lpad, range } from '../utils'

export interface Item {
  timezoneOffset: number
  color: string
  id: string
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
      time.getUTCHours() * 60 - item.timezoneOffset + time.getUTCMinutes()
    return {
      ...item,
      hour: Math.floor(minutes / 60) % 24,
      minute: minutes % 60
    }
  })
  /*
   * set a layer for every item,
   * prevent collisions / items to close to each other.
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
    <Dial className='Dial' radius={1} color='orange' />
    <Slice
      angleStart={asAngle(18)}
      angleEnd={asAngle(6)}
      color='rgba(0, 0, 255, 1)'
    />
    <Orbit color='rgba(255, 255, 255, 0.2)' width={2} radius={0.7} />
    <Orbit color='rgba(255, 255, 255, 0.2)' width={2} radius={0.45} />
    <Orbit color='rgba(255, 255, 255, 0.2)' width={2} radius={0.2} />
  </React.Fragment>
)
const TimeHand: React.FC<{
  hours: number
  minutes: number
}> = ({ hours, minutes }) => (
  <React.Fragment>
    <Hand angle={asAngle(hours, minutes)} color='red' width={5} length={0.8} />
    <Hand
      angle={asAngle(hours, minutes) + 180}
      color='red'
      width={5}
      length={0.15}
    />
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
        color={`rgba(255, 255, 255, ${active.has(hour) ? '0.2' : '0'})`}
      />
    ))}
  </React.Fragment>
)
const Ticks: React.FC = () => (
  <React.Fragment>
    {HOURS.map((hour) => {
      return (
        <React.Fragment>
          <Label angle={asAngle(hour)} distance={0.9}>
            {lpad(hour, 2)}
          </Label>
          <Hand
            start={0.95}
            end={0.99}
            color='white'
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
    angle={(seconds / 60) * 360 + ANGLE_DELTA}
    // TODO: figure out how to use transitions with angle and modulos:
    // style={{transitionDuration: '0.2s'}}
    color='white'
    width={2}
    length={0.7}
  />
)
export const BackgroundAndHands: React.FC<{
  activeHours: Set<number>
  hours: number
  minutes: number
  seconds: number
}> = ({ activeHours, hours, minutes, seconds }) => (
  <React.Fragment>
    <Background />
    <HoursSlice active={activeHours} />
    <Ticks />
    <TimeHand hours={hours} minutes={minutes} />
    <HandSeconds seconds={seconds} />
    <Dial className='Dial' radius={0.08} color='red' />
  </React.Fragment>
)
export const Peoples: React.FC<{
  items: AugmentedItem[]
  distance: (layer: number) => number
}> = ({ items, distance }) => (
  <React.Fragment>
    {items.map(({ id, color, hour, minute, layer }) => (
      <Planet
        key={id}
        style={{ backgroundColor: color }}
        angle={asAngle(hour, minute)}
        radius={0.07}
        distance={distance(layer)}
      >
        {id}
      </Planet>
    ))}
  </React.Fragment>
)
