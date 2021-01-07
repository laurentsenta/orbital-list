import React, { useState } from 'react'
import Demo from './Demo'
import { Components } from './Demo/Demo'
import { DialsDoc } from './Demo/Dials'
import { Hands1Doc, Hands2Doc } from './Demo/Hands'
import { LabelsDoc } from './Demo/Labels'
import { OrbitsDoc } from './Demo/Orbits'
import { PlaceDoc } from './Demo/Places'
import { PlanetsDoc } from './Demo/Planet'
import { SliceDoc } from './Demo/Slices'

const App = () => {
  const [active, setActive] = useState<Components>(Components.All)

  const Item: React.FC<{ name: string, value: Components }> = ({ name, value }) => {
    return <li className={`${active === value ? 'is-active' : ''}`} onClick={() => setActive(value)}>
      <a>
        <span>{name}</span>
      </a>
    </li>
  }

  return (
    <>
      <div className="columns is-centered is-vcentered">
        <div className="column is-8">
          <Demo active={active} />
        </div>
      </div>
      <div className="box">
        <div className="tabs is-centered is-toggle">
          <ul>
            <Item name="Basics" value={Components.All} />
            <Item name="Dial" value={Components.Dial} />
            <Item name="Slice" value={Components.Slice} />
            <Item name="Place" value={Components.Place} />
            <Item name="Orbit" value={Components.Orbit} />
            <Item name="Label" value={Components.Label} />
            <Item name="Hand1" value={Components.Hand1} />
            <Item name="Hand2" value={Components.Hand2} />
            <Item name="Planet" value={Components.Planet} />
          </ul>
        </div>
        <div className="content">
          {active === Components.All ? <>
            <h3>Basics:</h3>
            <ul>
              <li>Position all items in a "orbital context",</li>
              <li>Use raw HTML and CSS pretty much everywhere,</li>
              <li>Coordinates are angles in degrees (between 0 and 360) and distance to center (between 0 and 1)</li>
              <li>The clock resizes depending on the space it's given. You might need to force an height on its container.</li>
              <li>It's all HTML you can use colors, styles configuration, forms elements, etc.</li>
            </ul>
          </> : null}
          {active === Components.Dial ? <DialsDoc /> : null}
          {active === Components.Slice ? <SliceDoc /> : null}
          {active === Components.Place ? <PlaceDoc /> : null}
          {active === Components.Orbit ? <OrbitsDoc /> : null}
          {active === Components.Planet ? <PlanetsDoc /> : null}
          {active === Components.Label ? <LabelsDoc /> : null}
          {active === Components.Hand1 ? <Hands1Doc /> : null}
          {active === Components.Hand2 ? <Hands2Doc /> : null}
        </div>
      </div>
    </>
  )
}

export default App
