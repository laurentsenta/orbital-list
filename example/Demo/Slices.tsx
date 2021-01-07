import React from 'react'
import {
    Slice
} from '../../.'

export const SliceDoc: React.FC = () => (
    <>
        <h3>Slice</h3>
        <p>
            Takes a start, end, and a length.
        </p>
    </>
)

export const Slices: React.FC = () => (
    <>
        <Slice
            color='rgba(75, 63, 114, 1)'
            length={0.5}
            angleStart={195}
            angleEnd={235}
        />
        <Slice
            color='rgba(75, 63, 114, 1)'
            length={0.7}
            angleStart={255}
            angleEnd={285}
        />
        <Slice
            color='rgba(75, 63, 114, 0.8)'
            length={0.9}
            angleStart={295}
            angleEnd={315}
        />
        <Slice
            color='rgba(75, 63, 114, 0.5)'
            length={0.5}
            angleStart={310}
            angleEnd={355}
        />
    </>
)
