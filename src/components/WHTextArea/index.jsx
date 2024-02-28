import React from 'react';
import '../../styles.scss';
import './styles.scss';

const WHTextArea = ({
  type,
  name,
  icon,
  label,
  value,
  width,
  onChange,
  disabled,
  placeholder = 'Ievadīt',
  required = false,
  handleClear = null,
  clearText = 'notīrīt',
  className = '',
}) => (
  <div className={`wh-text-area-container ${className}`} style={{ flex: `1 0 ${width}` }}>
    <label htmlFor={name} className={`wh-text-area-label wh-text-gray ${required ? 'required-input' : ''}`}>
      {label}
    </label>
    {icon ? (
      <i className={`${icon} wh-text-area-icon`} />
    ) : null}
    <textarea
      placeholder={placeholder || ''}
      name={name}
      type={type || 'text'}
      id={name || ''}
      value={value || ''}
      onChange={onChange}
      disabled={disabled}
      required={required}
      className={
        `${required ? 'form-control wh-form-control-overwrite' : ''}
        ${icon ? 'wh-text-area-field-icon' : ''}
        ${handleClear ? 'wh-text-area-field-clear' : ''}
        wh-text-area-field`
      }
      autoComplete="off"
    />
    {handleClear ? (
      <button type="button" className="wh-text-area-clear-btn" onClick={handleClear} disabled={disabled}>
        {clearText || 'notīrīt'}
      </button>
    ) : null}
  </div>
);

export default WHTextArea;
