import React from 'react'
import {
  TimezoneClock,
  OrbitalList,
  Place,
  Planet,
  Dial,
  Hand
} from 'timezone-clock'
import 'timezone-clock/dist/index.css'

const App = () => {
  return (
    <div>
      <h1>Timezone Clock</h1>
      <div style={{ width: '500x', height: '500px' }}>
        <TimezoneClock
          items={[
            { type: 'person', timezoneOffset: '+00:00', color: 'blue' },
            { type: 'person', timezoneOffset: '+01:00', color: 'blue' },
            { type: 'person', timezoneOffset: '+01:00', color: 'blue' }
          ]}
        />
      </div>

      <h1>Angular List</h1>
      <div style={{ width: '500x', height: '500px' }}>
        <OrbitalList>
          <Dial color='#444' />
          <Dial color='#AAA' radius={0.05} />
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
          {/* <Hand width={1} angle={90} length={1} color='#EFFEFE' />
          <Hand width={2} angle={95} end={0.9} color='#333' /> */}
          <Hand width={2} angle={5} start={0.2} end={0.9} color='#333' />
        </OrbitalList>
      </div>
    </div>
  )
}

export default App
