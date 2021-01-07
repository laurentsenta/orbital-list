import React from 'react';
import { Hand } from "../../.";

export const Hands1Doc: React.FC = () => (
    <>
        <h3>Hands (1)</h3>
        <p>
            A single line, takes a width, an angle, a length and a color.
        </p>
    </>
)

export const Hands2Doc: React.FC = () => (
    <>
        <h3>Hands (2)</h3>
        <p>
            A single line, takes a width, an angle, a start and end distance, and a color.
        </p>
    </>
)

export const Hands1 = () => (
    <>
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
    </>
)

export const Hands2 = () => (
    <>
        <>
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
        </>
        <>
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
        </>
    </>
)