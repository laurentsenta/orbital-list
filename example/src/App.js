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

const now = new Date().getTime()
const cityToOffset = (city) => tz.zone(city).utcOffset(now)

const App = () => {
  return (
    <main>
      <h1>Timezone Clock</h1>
      <ClockDemo />

      <h1>Orbital List</h1>
      <OListDemo />
    </main>
  )
}

const ClockDemo = () => (
  <div style={{ width: '100%', height: '80vh' }}>
    <TimezoneClock
      items={USERS.map((u) => ({
        timezoneOffset: cityToOffset(u.city),
        color: 'white',
        style: {
          backgroundImage: `url(${u.img})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center center'
        },
        id: u.name
      }))}
    />
  </div>
)

const OListDemo = () => (
  <div style={{ width: '100%', height: '80vh' }}>
    <OrbitalList>
      <Dial color='#1f2041' />
      <Slice
        color='rgba(75, 63, 114, 1)'
        length={0.5}
        angleStart={180 + 22.5 * 1}
        angleEnd={180 + 22.5 * 5 - 1}
      />
      <Slice
        color='rgba(75, 63, 114, 1)'
        length={0.9}
        angleStart={180 + 22.5 * 5}
        angleEnd={180 + 22.5 * 6 - 1}
      />
      <Slice
        color='rgba(75, 63, 114, 1)'
        length={0.7}
        angleStart={180 + 22.5 * 6}
        angleEnd={180 + 22.5 * 8}
      />

      <Slice
        color='rgba(75, 63, 114, 0.5)'
        length={0.9}
        angleStart={166}
        angleEnd={182}
      />
      <Place
        angle={180}
        distance={0.8}
        style={{ color: '#ed254e', fontSize: '1.2rem', fontWeight: 'bold' }}
      >
        <button>Hello</button>
      </Place>
      <Place
        angle={170}
        distance={0.7}
        style={{ color: '#ed254e', fontSize: '1.2rem', fontWeight: 'bold' }}
      >
        <button>World</button>
      </Place>
      <Place
        angle={180}
        distance={0.6}
        style={{ color: '#ed254e', fontSize: '1.2rem', fontWeight: 'bold' }}
      >
        <ul>
          <li>Hello</li>
        </ul>
      </Place>
      <Place
        angle={170}
        distance={0.5}
        style={{ color: '#ed254e', fontSize: '1.2rem', fontWeight: 'bold' }}
      >
        <ul>
          <li>Universe</li>
        </ul>{' '}
      </Place>

      <Orbit color='rgba(244, 205, 205, 1)' radius={0.15} />
      <Orbit color='rgba(244, 205, 205, 1)' radius={0.16} />
      <Orbit color='rgba(244, 205, 205, 1)' radius={0.17} />
      <Orbit color='rgba(244, 205, 205, 1)' radius={0.18} width={2} />
      <Orbit color='rgba(244, 205, 205, 1)' radius={0.2} width={2} />
      <Orbit color='rgba(244, 205, 205, 1)' radius={0.22} width={2} />
      <Orbit color='rgba(244, 205, 205, 1)' radius={0.24} width={3} />
      <Orbit color='rgba(244, 205, 205, 1)' radius={0.28} width={4} />

      <React.Fragment>
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((x) => (
          <Planet
            key={`planet-${x}`}
            angle={60 + Math.pow(x, 1.5) * 4}
            color='#4062BB'
            radius={0.05 + Math.pow(x / 20, 2.2) * 0.6}
            distance={0.4 + x * 0.058}
          />
        ))}
        )
      </React.Fragment>
      <React.Fragment>
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((x) => (
          <Hand
            key={x}
            width={Math.pow(x + 1, 1.1) * 0.3}
            angle={Math.pow(x + 1, 1.3)}
            length={0.4 + (x + 1) / 20}
            color='orange'
            style={{ borderRadius: '0.3rem' }}
          />
        ))}
      </React.Fragment>

      <React.Fragment>
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((x) => (
          <Hand
            key={x}
            width={Math.pow(x + 1, 1.1) * 0.5}
            angle={25 + Math.pow(x + 1, 1.3)}
            start={0.8}
            end={0.9}
            color='orange'
            style={{ borderRadius: '0.3rem' }}
          />
        ))}
      </React.Fragment>
      <React.Fragment>
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((x) => (
          <Hand
            key={x}
            width={Math.pow(x + 1, 1.1) * 0.5}
            angle={30 + Math.pow(x + 1, 1.3)}
            start={0.65}
            end={0.75}
            color='orange'
            style={{ borderRadius: '0.3rem' }}
          />
        ))}
      </React.Fragment>
      <React.Fragment>
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((x) => (
          <Label
            key={`label-${x}`}
            angle={215 + x * 5}
            distance={0.7}
            style={{
              color: '#ed254e',
              fontSize: '1.2rem',
              fontWeight: 'bold'
            }}
          >
            {x}
          </Label>
        ))}
        )
      </React.Fragment>

      <Dial color='#131335' radius={0.1} />
    </OrbitalList>
  </div>
)

export default App
