import React, { useCallback, useEffect, useState } from 'react'
import {
  Dial,
  OrbitalList
} from '../../.'
import { Dials } from './Dials'
import { Hands1, Hands2 } from './Hands'
import { Labels } from './Labels'
import { Orbits } from './Orbits'
import { Places } from './Places'
import { Planets } from './Planet'
import { Slices } from './Slices'

export enum Components {
  All,
  Dial,
  Slice,
  Place,
  Orbit,
  Label,
  Hand1,
  Hand2,
  Planet
}

export const Demo: React.FC<{ active: Components }> = ({ active }) => {
  const currentTimeDelta = useCallback(() => {
    return (Date.now() / 1000)
  }, [])

  const [timeDelta, setTimeDelta] = useState(currentTimeDelta())

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeDelta(currentTimeDelta())
    }, 20)
    return () => clearInterval(interval)
  }, [setTimeDelta])

  const match = useCallback(value => active === Components.All || value === active, [active])

  return (
    <div style={{ width: '100%', height: '60vh' }}>
      <OrbitalList>
        <Dial color='#1f2041' />
        {match(Components.Slice) ? <Slices /> : null}
        {match(Components.Orbit) ? <Orbits /> : null}
        {match(Components.Place) ? <Places /> : null}
        {match(Components.Planet) ? <Planets timeDelta={timeDelta} /> : null}
        {match(Components.Hand1) ? <Hands1 /> : null}
        {match(Components.Hand2) ? <Hands2 /> : null}
        {match(Components.Label) ? <Labels timeDelta={timeDelta} /> : null}
        {match(Components.Dial) ? <Dials /> : null}
      </OrbitalList>
    </div>
  )
}