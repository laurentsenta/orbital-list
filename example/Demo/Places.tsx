import React from 'react'
import { Place } from '../../.'

export const PlaceDoc: React.FC = () => (
    <>
        <h3>Place</h3>
        <p>
            A place in the orbital list, takes an angle and a distance from the center. Can hold any HTML children.
        </p>
    </>
)

export const Places = () => (
    <>
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
            distance={0.5}
            style={{ color: '#ed254e', fontSize: '1.2rem', fontWeight: 'bold' }}
        >
            <p>Hello</p>
        </Place>
        <Place
            angle={170}
            distance={0.4}
            style={{ color: '#ed254e', fontSize: '1.2rem', fontWeight: 'bold' }}
        >
            <p>Universe</p>
        </Place>
    </>
)