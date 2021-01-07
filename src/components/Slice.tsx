import React, { CSSProperties, useContext } from 'react';
import { orbitalContext } from '../OrbitalWrapper';

// TODO: Implement a start / end system (donuts).
interface IProps {
  color?: string;
  className?: string;
  style?: CSSProperties;
  width?: number;
  angleStart: number;
  angleEnd: number;
  length?: number;
}

const Slice: React.FC<IProps> = props => {
  const context = useContext(orbitalContext);

  if (!context) {
    throw new Error('invalid context');
  }

  const { children, color } = props;

  const angleStart = props.angleStart % 360;
  const angleEnd = props.angleEnd % 360;

  const angle = angleEnd - angleStart;
  const radAngle = angle * (Math.PI / 180);

  const radius = (props.length || 1) * context.radius;

  // We render as a box with a border-radius: 50%
  const squareSize = radius * 2;

  const middle = `${squareSize / 2}px`;
  const left = '0px';
  const right = `${squareSize}px`;
  const top = '0px';
  const bottom = `${squareSize}px`;

  const at = (x: string, y: string): string => `${x} ${y}`;

  /*
   * We render a box with a border-radius so it shows as a circle.
   * to clip the box to display a given angle we move around the box (0 -> 1 -> 2 -> 3 -> 4 -> 5)
   *
   * 4-----+-----5
   * |     .     |
   * |     .     |
   * + ... 0 ... 1
   * |     .     |
   * |     .     |
   * 3-----+-----2
   *
   * When we're in the correct cadrant (depends on the angle),
   * we close the polygon.
   *
   * .           .
   * +-----------0-----------1
   * |         / .           |
   * ||      /   .          ||
   * | |   /     .         | |
   * |  'X       .      __'  |
   * |  / --___  . ___--     |
   * 3-----+-----+-----------2
   *
   */
  const points = [
    at(middle, middle), // 0
    at(right, middle), // 0 --> 1
    at(right, bottom), // 1 --> 2
  ];

  if (angle > 90) {
    points.push(at(left, bottom)); // 2 --> 3
  }
  if (angle > 180) {
    points.push(at(left, top)); // 3 --> 4
  }
  if (angle > 270) {
    points.push(at(right, top)); // 4 --> 5
  }

  // --> X (middle + trigonometry)
  const x = radius + radius * Math.cos(radAngle);
  const y = radius + radius * Math.sin(radAngle);
  points.push(at(x + 'px', y + 'px'));

  const clipPath = `polygon(${points.join(',')})`;

  // We draw a big circle, clip it and rotate it.
  const style: CSSProperties = {
    ...(color ? { backgroundColor: color } : {}),
    ...props.style,
    position: 'absolute',
    transform: `translate(-${radius}px, -${radius}px) rotate(${angleStart}deg)`,
    clipPath,
    WebkitClipPath: clipPath,
    left: 0,
    top: 0,
    width: `${squareSize}px`,
    height: `${squareSize}px`,
    borderRadius: '50%',
  };

  return (
    <div
      className={`${props.className || ''} Slice`}
      style={{
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export default Slice;
