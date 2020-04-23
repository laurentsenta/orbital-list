import React, { useCallback, useState } from 'react'
import OrbitalList from './OrbitalList'
import Dial from './Dial'
import Label from './Label'
import Planet from './Planet'
import Hand from './Hand'
import Slice from './Slice'
import Orbit from './Orbit'
import { useDatetime, uniq, toDeg } from './utils'
import DragRegion, { IDragInfo } from './DragRegion'

interface Item {
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

const ANGLE_DELTA = 90 // turn so that 12:00 is at the top.

const asAngle = (hours: number, minutes: number = 0) => {
  return (hours / 24) * 360 + (minutes / 60) * (360 / 24) + ANGLE_DELTA
}

interface AugmentedItem extends Item {
  hour: number
  minute: number
  layer: number
}

const augmentItems = (time: Date, items: Item[]): AugmentedItem[] => {
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

const TimezoneClock = (props: IProps) => {
  // TODO: deal with element resizings.
  const myTime = useDatetime()

  const [delta, setDelta] = useState(0) // unit is minutes

  const onDrag = useCallback((i: IDragInfo) => {
    const { start, current, last } = i

    if (last && !start) {
      setDelta(0)
      return
    }

    if (!start || !current) {
      return
    }

    const startAngle = Math.atan2(start.y, start.x)
    const currentAngle = Math.atan2(current.y, current.x)

    setDelta((toDeg(currentAngle - startAngle) / 360) * 24 * 60)
  }, [])

  const time = new Date(myTime)
  time.setMinutes(time.getMinutes() + delta)

  const angleSeconds = (time.getSeconds() / 60) * 360

  const items = augmentItems(time, props.items)
  const activeHours: number[] = uniq(items.map((x) => x.hour))

  const maxLayer = Math.max(...items.map((x) => x.layer))
  const layerCoeficient = maxLayer === 0 ? 1 : 1 / maxLayer

  const LAYER_MIN = 0.2
  const LAYER_MAX = 0.7
  const LAYER_RANGE = LAYER_MAX - LAYER_MIN

  const distance = (layer: number): number =>
    LAYER_MIN + layer * layerCoeficient * LAYER_RANGE

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
      <DragRegion onDrag={onDrag} />
      {items.map(({ id, color, hour, minute, layer }) => {
        return (
          <Planet
            key={id}
            style={{ backgroundColor: color }}
            angle={asAngle(hour, minute)}
            radius={0.07}
            distance={distance(layer)}
          >
            {id}
          </Planet>
        )
      })}
    </OrbitalList>
  )
}

export default TimezoneClock
