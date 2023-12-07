/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import './styles.scss';
import '../../styles.scss';

const WHSwitch = ({
  checked,
  onChange,
  small,
  large,
  name,
  className = '',
}) => {
  const color = '#EC1C24';
  const scaleBy = small ? 0.8 : (large ? 1.2 : 1);
  const id = `wh-switch-new-${name}`;

  return (
    <div className={`wh-switch-container ${className}`} style={{ transform: `scale(${scaleBy})` }}>
      <input
        checked={checked}
        onChange={onChange}
        className="wh-switch-checkbox"
        id={id}
        type="checkbox"
      />
      <label
        style={{ background: checked && color }}
        className="wh-switch-label"
        htmlFor={id}
      >
        <span className="wh-switch-button" />
      </label>
    </div>
  );
};

export default WHSwitch;
