import React from 'react'

import { TimezoneClock, AngularList, Item } from 'timezone-clock'
import 'timezone-clock/dist/index.css'

const App = () => {
  return <div>
    <h1>Timezone Clock</h1>
    <div style={{width: '500x', height: '500px'}}>
    <TimezoneClock items={([
      {type: 'person', timezoneOffset: "+00:00", color: 'blue'  },
      {type: 'person', timezoneOffset: "+01:00", color: 'blue'  },
      {type: 'person', timezoneOffset: "+01:00", color: 'blue'  }
    ])}/>
</div>      

    <h1>Angular List</h1>
    <div style={{width: '500x', height: '500px'}}>
    <AngularList>
      <Item angle={0} distance={0.5}>
        <span>Hello</span>
      </Item>
      <Item angle={90} distance={0.5}>
        <span>World</span>
      </Item>
      <Item angle={180} distance={0.5}>
        <span>This</span>
      </Item>
      <Item angle={270} distance={0.5}>
        <span>Is</span>
      </Item>
      <Item angle={360} distance={0.75}> 
        <span>Working</span>
      </Item>
      <Item angle={720} distance={0.95}>
        <span>I think</span>
      </Item>
      </AngularList>
</div>      
  </div>
}

export default App
