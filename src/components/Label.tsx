import React, { CSSProperties } from 'react';
import Place from './Place';

// TODO: Implement a start / end system (donuts).
interface IProps {
  className?: string;
  style?: CSSProperties;
  color?: string;

  distance?: number;
  angle: number;
}

const Label: React.FC<IProps> = props => {
  const { distance, angle, children, color } = props;

  const style = {
    ...props.style,
    ...(color ? { color } : {}),
  };

  return (
    <Place
      angle={angle}
      distance={distance || 1}
      className="Label"
      style={style}
    >
      {children}
    </Place>
  );
};

export default Label;
