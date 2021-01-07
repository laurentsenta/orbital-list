import React from 'react';
import React from 'react'
import { Label } from "../../.";

export const LabelsDoc: React.FC = () => (
    <>
        <h3>Label</h3>
        <p>
            A piece of text. Takes an angle, a distance, and some style.
        </p>
    </>
)

export const Labels: React.FC<{ timeDelta: number }> = ({ timeDelta }) => (
    <>
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((x) => (
            <Label
                key={`label-${x}`}
                angle={(timeDelta * 2) + x * 5}
                distance={0.7}
                style={{
                    color: 'white',
                    fontSize: '1.2rem',
                    fontWeight: 'bold'
                }}
            >
                {x}
            </Label>
        ))}
        )
    </>
)