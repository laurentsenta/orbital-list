import React from 'react'
import OrbitalWrapper from './OrbitalWrapper'
import Dial from './Dial'
// import styles from './styles.module.css'

interface Item {
  type: 'person'
  timezoneOffset: string
  color: string
}

interface IProps {
  items: Item[]
}

const TimezoneClock = ({ items }: IProps) => {
  // TODO: deal with element resizings.

  return (
    <OrbitalWrapper>
      <Dial
        style={{
          width: '10%',
          height: '10%',
          backgroundColor: 'pink',
          borderRadius: '50%'
        }}
      />
      {items.map((item, i) => {
        return (
          <div key={i} style={{ backgroundColor: item.color }}>
            hello
          </div>
        )
      })}
    </OrbitalWrapper>
  )
}

export default TimezoneClock
