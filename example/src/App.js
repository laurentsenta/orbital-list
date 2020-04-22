import React from 'react'

import { TimezoneClock, OrbitalList, Place } from 'timezone-clock'
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
        </OrbitalList>
      </div>
    </div>
  )
}

export default App
