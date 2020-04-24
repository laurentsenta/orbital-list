import { tz } from 'moment-timezone'
import {
  Dial,
  Hand,
  Label,
  Orbit,
  OrbitalList,
  Place,
  Planet,
  Slice,
  TimezoneClock
} from 'orbital-list'
import 'orbital-list/dist/index.css'
import React from 'react'
import USERS from './users'

const now = new Date()
const cityToOffset = (city) => tz.zone(city).utcOffset(now)

const App = () => {
  return (
    <div>
      <h1>Timezone Clock</h1>
      <div style={{ width: '100%', height: '80vh' }}>
        <TimezoneClock
          items={USERS.map((u) => ({
            type: 'person',
            timezoneOffset: cityToOffset(u.city),
            color: 'white',
            style: {
              backgroundImage: `url(${u.img})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center center'
            },
            id: u.name
          }))}

          //   [
          //   { type: 'person', timezoneOffset: +60, color: 'red', id: 'b' },
          //   { type: 'person', timezoneOffset: +60, color: 'orange', id: 'c' },
          //   { type: 'person', timezoneOffset: +60, color: 'pink', id: 'd' },
          //   { type: 'person', timezoneOffset: -120, color: 'gray', id: 'e' },
          //   { type: 'person', timezoneOffset: +240, color: 'gray', id: 'g' },
          //   { type: 'person', timezoneOffset: 0, color: 'green', id: 'UTCBoy' }
          // ]}
        />
      </div>

      <h1>Orbital List</h1>
      <div style={{ width: '100%', height: '80vh' }}>
        <OrbitalList>
          <Dial color='#444' />
          <Dial color='#AAA' radius={0.05} />
          <Slice
            color='rgba(255, 255, 55, 0.2)'
            length={0.5}
            angleStart={0}
            angleEnd={90 / 4}
          />
          <Slice
            color='rgba(255, 0, 255, 0.2)'
            length={0.6}
            angleStart={90 / 4}
            angleEnd={90}
          />
          <Slice
            color='rgba(255, 0, 255, 0.2)'
            length={0.7}
            angleStart={(90 / 4) * 2}
            angleEnd={90}
          />
          <Slice
            color='rgba(255, 0, 255, 0.2)'
            length={0.8}
            angleStart={(90 / 4) * 2}
            angleEnd={270}
          />
          <Place angle={0} distance={0.5}>
            <span>Hello</span>
          </Place>
          <Place angle={90} distance={0.5}>
            <span>World</span>
          </Place>
          <Place angle={180} distance={0.5}>
            <span>This</span>
          </Place>
          <Place angle={270} distance={0.5}>
            <span>Is</span>
          </Place>
          <Place angle={360} distance={0.75}>
            <span>Working</span>
          </Place>
          <Place angle={720} distance={0.95}>
            <span>I think</span>
          </Place>
          <Planet angle={50} color='blue' radius={0.1} distance={0.2} />
          <Hand width={1} angle={0} length={1} color='red' />
          <Hand width={2} angle={95} end={0.9} color='#333' />
          <Hand width={2} angle={5} start={0.2} end={0.9} color='orange' />
          <Orbit color='#997700' radius={0.5} />
          <Orbit color='#997700' radius={0.9} />
          <Label angle={0} distance={0.7}>
            01
          </Label>
          <Label angle={90} distance={0.8}>
            02
          </Label>
          <Label angle={135} distance={0.9}>
            02.5
          </Label>
        </OrbitalList>
      </div>
    </div>
  )
}

export default App
