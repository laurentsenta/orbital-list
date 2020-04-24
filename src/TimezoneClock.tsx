import React, { useCallback, useEffect, useState } from 'react'
import { augmentItems, BackgroundAndHands, Item, Peoples } from './clock'
import DragRegion, { IDragInfo } from './components/DragRegion'
import OrbitalList from './OrbitalList'
import { toDeg, useDatetime, useEasedState } from './utils'

interface IProps {
  items: Item[]
}

const TimezoneClock = (props: IProps) => {
  // TODO: deal with element resizings.
  const myTime = useDatetime()
  const [delta, setDelta, resetDelta] = useEasedState(0, 1000, 'easeOutBack') // unit is minutes
  const [, setSeconds] = useState(myTime.getSeconds())

  useEffect(() => {
    setSeconds(myTime.getSeconds())
  }, [myTime.getSeconds()])

  const onDrag = useCallback(
    (i: IDragInfo) => {
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

      resetDelta((toDeg(currentAngle - startAngle) / 360) * 24 * 60)
    },
    [setDelta, resetDelta]
  )

  const time = new Date(myTime)
  time.setMinutes(time.getMinutes() + delta)

  const items = augmentItems(time, props.items)

  const itemsHours = items.map((x) => x.hour)

  const activeItemHours = new Set([...itemsHours])
  const activeTickHours = new Set([
    ...itemsHours,
    0,
    6,
    12,
    18,
    time.getHours()
  ])

  const maxLayer = Math.max(...items.map((x) => x.layer))
  const layerCoeficient = maxLayer === 0 ? 1 : 1 / maxLayer

  const LAYER_MIN = 0.33
  const LAYER_MAX = 0.75
  const LAYER_RANGE = LAYER_MAX - LAYER_MIN

  const distance = (layer: number): number =>
    LAYER_MAX - layer * layerCoeficient * LAYER_RANGE

  return (
    <OrbitalList>
      <BackgroundAndHands
        activeItemHours={activeItemHours}
        activeTickHours={activeTickHours}
        hours={time.getHours()}
        minutes={time.getMinutes()}
        seconds={time.getSeconds()}
      />
      <DragRegion onDrag={onDrag} />
      <Peoples items={items} distance={distance} />
    </OrbitalList>
  )
}

export default TimezoneClock
