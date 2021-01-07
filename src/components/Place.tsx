import React, { CSSProperties, useContext, useCallback } from 'react';
import { orbitalContext } from '../OrbitalWrapper';

interface IProps {
  style?: CSSProperties;
  angle: number;
  distance?: number;
  className?: string;
  onHover?: (hover: boolean) => any;
  onClick?: React.MouseEventHandler;
}

const Place: React.FC<IProps> = ({
  angle,
  children,
  distance,
  style,
  className,
  onHover,
  onClick,
}) => {
  const context = useContext(orbitalContext);

  if (!context) {
    throw new Error('invalid context');
  }

  const { radius } = context;
  const radAngle = angle * (Math.PI / 180);
  const d = (distance || 0) * radius;
  const x = d * Math.cos(radAngle);
  const y = d * Math.sin(radAngle);

  const params = className ? { className } : {};

  const onEnter = useCallback(() => {
    if (onHover) {
      onHover(true);
    }
  }, [onHover]);

  const onLeave = useCallback(() => {
    if (onHover) {
      onHover(false);
    }
  }, [onHover]);

  return (
    <div
      {...params}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      style={{
        ...style,
        position: 'absolute',
        left: x,
        top: y,
        transform: 'translate(-50%, -50%)',
      }}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Place;
