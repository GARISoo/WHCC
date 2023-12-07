import React from 'react';
import './styles.scss';

const WHLoader = ({
  size,
  white,
  className = '',
}) => {
  const validSize = size ? Number(size) : 1;

  return (
    <div className={`wh-loader-new-container ${className}`}>
      <div
        className={
          `wh-loader-new ${white ? 'loader-white' : ''}`
        }
        style={{
          transform: `scale(${validSize})`,
        }}
      >
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
      </div>
    </div>
  );
};

export default WHLoader;
