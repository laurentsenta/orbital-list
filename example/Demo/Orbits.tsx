import React from 'react'
import { Orbit } from "../../.";

export const OrbitsDoc: React.FC = () => (
    <>
        <h3>Orbit</h3>
        <p>
            A single orbit, or a circle, takes a radius and a color.
        </p>
    </>
)

export const Orbits = () => (
    <>
        <Orbit color='rgba(244, 205, 205, 1)' radius={0.15} />
        <Orbit color='rgba(244, 205, 205, 1)' radius={0.16} />
        <Orbit color='rgba(244, 205, 205, 1)' radius={0.17} />
        <Orbit color='rgba(244, 205, 205, 1)' radius={0.18} width={2} />
        <Orbit color='rgba(244, 205, 205, 1)' radius={0.2} width={2} />
        <Orbit color='rgba(244, 205, 205, 1)' radius={0.22} width={2} />
        <Orbit color='rgba(244, 205, 205, 1)' radius={0.24} width={3} />
        <Orbit color='rgba(244, 205, 205, 1)' radius={0.28} width={4} />
    </>

)