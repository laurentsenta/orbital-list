import React, { useCallback } from 'react'
import OrbitalList from './OrbitalList'
import Dial from './Dial'
import Label from './Label'
import Planet from './Planet'
// import styles from './styles.module.css'

interface Item {
  type: 'person'
  timezoneOffset: number
  color: string
  id: string
}

interface IProps {
  items: Item[]
}

const TICKS = [
  { label: '00', hour: 0 },
  { label: '03', hour: 3 },
  { label: '06', hour: 6 },
  { label: '10', hour: 10 },
  { label: '12', hour: 12 },
  { label: '15', hour: 15 },
  { label: '18', hour: 18 },
  { label: '21', hour: 21 }
]

import { useState, useEffect, useRef } from 'react'
import Hand from './Hand'
import Slice from './Slice'
import Orbit from './Orbit'

const useDatetime = () => {
  const ref = useRef<NodeJS.Timeout>()
  const [datetime, setDatetime] = useState(new Date())

  const ticker = useCallback(
    () =>
      setInterval(() => {
        setDatetime(new Date())
      }, 1000),
    []
  )

  useEffect(() => {
    if (!ref.current) {
      ref.current = ticker()
    }
    return () => clearInterval(ref.current!)
  }, [])

  return datetime
}

function uniq<T>(xs: T[]): T[] {
  const s = new Set<T>(xs)
  const r: T[] = []
  s.forEach((x) => r.push(x))
  return r
}

const ANGLE_DELTA = 90 // turn so that 12:00 is at the top.

const asAngle = (hours: number, minutes: number = 0) => {
  return (hours / 24) * 360 + (minutes / 60) * (360 / 24) + ANGLE_DELTA
}

const TimezoneClock = ({ items }: IProps) => {
  // TODO: deal with element resizings.
  const time = useDatetime()

  const angleSeconds = (time.getSeconds() / 60) * 360

  const itemsWithTime = items.map((item) => {
    const minutes =
      time.getUTCHours() * 60 - item.timezoneOffset + time.getUTCMinutes()

    return {
      ...item,
      hour: Math.floor(minutes / 60) % 24,
      minute: minutes % 60
    }
  })

  const activeHours: number[] = uniq(itemsWithTime.map((x) => x.hour))

  const forbiddenDistances = {}
  const itemsWithTimeAndDistance = itemsWithTime.map((item) => {
    const { hour } = item
    const distance =
      forbiddenDistances[hour] !== undefined ? forbiddenDistances[hour] + 1 : 0
    forbiddenDistances[hour] = Math.max(distance, forbiddenDistances[hour] | 0)
    forbiddenDistances[hour + (1 % 24)] = Math.max(
      distance,
      forbiddenDistances[hour + (1 % 24)] | 0
    )
    forbiddenDistances[hour - 1 + (24 % 24)] = Math.max(
      distance,
      forbiddenDistances[hour - 1 + (24 % 24)] | 0
    )
    return { ...item, distance }
  })
  const maxDistance = Math.max(
    ...itemsWithTimeAndDistance.map((x) => x.distance)
  )
  const distanceRatio = maxDistance === 0 ? 1 : 1 / maxDistance

  const itemDistance = (distance: number, min: number, max: number): number =>
    (max - min) * ((maxDistance - distance) * distanceRatio) + min

  return (
    <OrbitalList>
      <Dial className='Dial' radius={1} color='orange' />
      <Slice
        angleStart={asAngle(18)}
        angleEnd={asAngle(6)}
        color='rgba(0, 0, 255, 1)'
      />
      {activeHours.map((hour) => (
        <Slice
          key={hour}
          angleStart={asAngle(hour) + 0.5}
          angleEnd={asAngle(hour + 1) - 0.5}
          color='rgba(255, 255, 255, 0.1)'
        />
      ))}
      {TICKS.map(({ label, hour }) => {
        return (
          <React.Fragment>
            <Label angle={asAngle(hour)} distance={0.9}>
              {label}
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
      <Orbit color='rgba(255, 255, 255, 0.2)' width={2} radius={0.7} />
      <Orbit color='rgba(255, 255, 255, 0.2)' width={2} radius={0.45} />
      <Orbit color='rgba(255, 255, 255, 0.2)' width={2} radius={0.2} />
      <Hand
        angle={asAngle(time.getHours(), time.getMinutes())}
        color='red'
        width={5}
        length={0.8}
      />
      <Hand
        angle={asAngle(time.getHours(), time.getMinutes()) + 180}
        color='red'
        width={5}
        length={0.15}
      />
      <Hand
        angle={angleSeconds + ANGLE_DELTA}
        // TODO: figure out how to use transitions with angle and modulos:
        // style={{transitionDuration: '0.2s'}}
        color='white'
        width={2}
        length={0.7}
      />
      <Dial className='Dial' radius={0.08} color='red' />
      {itemsWithTimeAndDistance.map(({ id, color, hour, minute, distance }) => {
        return (
          <Planet
            key={id}
            style={{ backgroundColor: color }}
            angle={asAngle(hour, minute)}
            radius={0.1}
            distance={itemDistance(distance, 0.2, 0.7)}
          >
            {id}
          </Planet>
        )
      })}
    </OrbitalList>
  )
}

export default TimezoneClock
