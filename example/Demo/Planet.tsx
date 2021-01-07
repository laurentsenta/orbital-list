import React from 'react';
import { Planet } from "../../.";

export const PlanetsDoc: React.FC = () => (
    <>
        <h3>Planet</h3>
        <p>
            A circular item flying around the orbital list. Takes an angle, color, radius, distance to center, and style.
        </p>
    </>
)

export const Planets = () => (
    <>
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
    </>
)