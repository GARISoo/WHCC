/* eslint-disable jsx-a11y/no-autofocus */
import React from 'react';
import './styles.scss';
import '../../styles.scss';

const WHInput = ({
  type,
  name,
  icon,
  label,
  value,
  width,
  onChange,
  disabled,
  placeholder,
  autoFocus = false,
  addedText = '',
  required = false,
  handleClear = null,
  className = '',
}) => (
  <div className={`wh-input-container-v ${className}`} style={{ flex: `1 0 ${width}` }}>
    {label ? (
      <label htmlFor={name} className={`wh-input-label-v wh-text-gray ${required ? 'required-input' : ''}`}>
        {label}
      </label>
    ) : null}
    {icon ? (
      <i className={`${icon} wh-input-icon`} />
    ) : null}
    {addedText ? (
      <span className="wh-input-added-text">{addedText}</span>
    ) : null}
    <input
      placeholder={placeholder || ''}
      name={name}
      type={type || 'text'}
      id={name || ''}
      value={value || ''}
      onChange={onChange}
      autoFocus={autoFocus}
      disabled={disabled}
      required={required}
      className={
        `${required ? 'form-control wh-form-control-overwrite' : ''}
        ${handleClear && value ? 'wh-input-field-w-clear' : ''}
        wh-input-field-v
        ${icon ? 'wh-input-field-w-icon' : ''}
        ${addedText ? 'wh-input-field-w-addedText' : ''}
        `
      }
      autoComplete="off"
    />
    {handleClear && value ? (
      <button type="button" className="wh-input-clear-btn" onClick={handleClear} disabled={disabled}>
        notīrīt
      </button>
    ) : null}
  </div>
);

export default WHInput;
