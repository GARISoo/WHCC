/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import Checkmark from './checkmark.svg';
import './styles.scss';
import '../../styles.scss';

const WHCheckbox = ({
  label,
  checked,
  onChange,
  disabled,
  name,
  width,
  value = '',
  position,
  className = '',
  scale = 1,
}) => (
  <label
    className={`wh-checkbox-container wh-text-small wh-text-dark-o ${disabled ? 'wh-checkbox-container-disabled' : ''} ${className}`}
    style={{
      flex: `1 0 ${width}`,
      justifyContent: position,
      whiteSpace: 'nowrap',
    }}
  >
    <input
      type="checkbox"
      checked={checked}
      onChange={onChange}
      name={name}
      disabled={disabled}
      value={value}
      className="wh-checkbox-input"
      style={{ transform: `scale(${scale})` }}
    />
    <img
      src={Checkmark}
      alt="checkmark"
      className={`wh-checkbox-checkmark ${disabled ? 'wh-checkbox-checkmark-disabled' : ''}`}
      style={{ transform: `scale(${scale})` }}
    />
    {label}
  </label>
);

export default WHCheckbox;
