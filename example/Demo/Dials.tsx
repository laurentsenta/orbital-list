import React from 'react'
import {
  Dial
} from '../../.'

export const DialsDoc: React.FC = () => (
  <>
    <h3>Dial</h3>
    <p>
      A simple, central, element. Takes a size and a color.
    </p>
  </>
)

export const Dials = () => (
  <Dial color='#131335' radius={0.1} />
)