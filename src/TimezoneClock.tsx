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
  { angle: -90, label: '00' },
  { angle: 0, label: '06' },
  { angle: 90, label: '12' },
  { angle: 180, label: '18' }
]

import { useState, useEffect, useRef } from 'react'
import Hand from './Hand'

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

const TimezoneClock = ({ items }: IProps) => {
  // TODO: deal with element resizings.
  const time = useDatetime()

  const seconds = time.getSeconds()
  const hoursMinutes =
    (time.getHours() / 24) * 360 + ((time.getMinutes() / 60) * 360) / 24 - 90
  const UTCHoursMinutes =
    (time.getUTCHours() / 24) * 360 +
    ((time.getUTCHours() / 60) * 360) / 24 -
    90

  return (
    <OrbitalList>
      <Dial className='Dial' radius={1} color='orange' />
      <Dial className='Dial' radius={0.1} color='red' />
      {TICKS.map(({ angle, label }) => {
        return (
          <Label angle={angle} distance={0.8}>
            {label}
          </Label>
        )
      })}
      <Hand
        angle={(seconds / 60) * 360 - 90}
        color='white'
        width={2}
        length={0.7}
      />
      <Hand angle={hoursMinutes} color='red' width={5} length={0.7} />
      <Hand angle={UTCHoursMinutes} color='pink' width={5} length={0.7} />
      {items.map((item) => {
        const offsetAngle =
          (-item.timezoneOffset / (24 * 60)) * 360 + UTCHoursMinutes

        return (
          <Planet
            key={item.id}
            style={{ backgroundColor: item.color }}
            angle={offsetAngle}
            radius={0.1}
            distance={0.5}
          >
            {item.id}
          </Planet>
        )
      })}
    </OrbitalList>
  )
}

export default TimezoneClock
