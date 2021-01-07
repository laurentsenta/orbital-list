import React, { useCallback, useEffect, useState } from 'react'
import {
  Dial,
  OrbitalList
} from '../.'
import { Dials, DialsDoc } from './Demo/Dials'
import { Hands1, Hands1Doc, Hands2, Hands2Doc } from './Demo/Hands'
import { Labels, LabelsDoc } from './Demo/Labels'
import { Orbits, OrbitsDoc } from './Demo/Orbits'
import { PlaceDoc, Places } from './Demo/Places'
import { Planets, PlanetsDoc } from './Demo/Planet'
import { SliceDoc, Slices } from './Demo/Slices'

enum Tab {
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


const App = () => {
  const [active, setActive] = useState<Tab>(Tab.All)

  const Item: React.FC<{ name: string, value: Tab }> = ({ name, value }) => {
    return <li className={`${active === value ? 'is-active' : ''}`} onClick={() => setActive(value)}>
      <a>
        <span>{name}</span>
      </a>
    </li>
  }

  return (
    <>
      <main className="container">
        <div className="columns is-centered">
          <div className="column is-6 has-text-centered">
            <img className="mb-4 align-center" style={{ maxWidth: '640px' }} src="https://raw.githubusercontent.com/laurentsenta/orbital-list/master/social.png" />
          </div>
        </div>
        <h1 className="title has-text-centered">Demo:</h1>
        <div className="columns is-centered is-vcentered">
          <div className="column is-8">
            <Demo active={active} />
          </div>
        </div>
        <p className="has-text-centered my-5">
          <a target='_blank' href="http://whena.re/"><span role="img" aria-label="planet">🌎</span> Check whena.re for a live demo.</a>
        </p>

        <div className="box">
          <div className="tabs is-centered is-toggle">
            <ul>
              <Item name="Basics" value={Tab.All} />
              <Item name="Dial" value={Tab.Dial} />
              <Item name="Slice" value={Tab.Slice} />
              <Item name="Place" value={Tab.Place} />
              <Item name="Orbit" value={Tab.Orbit} />
              <Item name="Label" value={Tab.Label} />
              <Item name="Hand1" value={Tab.Hand1} />
              <Item name="Hand2" value={Tab.Hand2} />
              <Item name="Planet" value={Tab.Planet} />
            </ul>
          </div>
          <div className="content">
            {active === Tab.All ? <>
              <h3>Basics:</h3>
              <ul>
                <li>Position all items in a "orbital context",</li>
                <li>Use raw HTML and CSS pretty much everywhere,</li>
                <li>Coordinates are angles in degrees (between 0 and 360) and distance to center (between 0 and 1)</li>
                <li>The clock resizes depending on the space it's given. You might need to force an height on its container.</li>
                <li>It's all HTML you can use colors, styles configuration, forms elements, etc.</li>
              </ul>
            </> : null}
            {active === Tab.Dial ? <DialsDoc /> : null}
            {active === Tab.Slice ? <SliceDoc /> : null}
            {active === Tab.Place ? <PlaceDoc /> : null}
            {active === Tab.Orbit ? <OrbitsDoc /> : null}
            {active === Tab.Planet ? <PlanetsDoc /> : null}
            {active === Tab.Label ? <LabelsDoc /> : null}
            {active === Tab.Hand1 ? <Hands1Doc /> : null}
            {active === Tab.Hand2 ? <Hands2Doc /> : null}
          </div>
        </div>
      </main>
      <footer className="footer mt-5">
        <div className="content has-text-centered">
          <p>
            <strong>orbital-list</strong> by <a href="https://singulargarden.com">Laurent Senta</a>. The source code is licensed <a href="http://opensource.org/licenses/mit-license.php">MIT</a>. Find me on <a href="https://twitter.com/laurentsenta">Twitter</a> and <a href="https://github.com/laurentsenta">Github</a>.
    </p>
        </div>
      </footer>

    </>
  )
}

const Demo: React.FC<{ active: Tab }> = ({ active }) => {
  const currentTimeDelta = useCallback(() => {
    return Math.round((Date.now() / 1000) % 360)
  }, [])

  const [timeDelta, setTimeDelta] = useState(currentTimeDelta())

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeDelta(currentTimeDelta())
    }, 300)
    return () => clearInterval(interval)
  }, [setTimeDelta])

  const match = useCallback(value => active === Tab.All || value === active, [active])

  return (
    <div style={{ width: '100%', height: '60vh' }}>
      <OrbitalList>
        <Dial color='#1f2041' />
        {match(Tab.Slice) ? <Slices /> : null}
        {match(Tab.Orbit) ? <Orbits /> : null}
        {match(Tab.Place) ? <Places /> : null}
        {match(Tab.Planet) ? <Planets /> : null}
        {match(Tab.Hand1) ? <Hands1 /> : null}
        {match(Tab.Hand2) ? <Hands2 /> : null}
        {match(Tab.Label) ? <Labels timeDelta={timeDelta} /> : null}
        {match(Tab.Dial) ? <Dials /> : null}
      </OrbitalList>
    </div>
  )
}

export default App
