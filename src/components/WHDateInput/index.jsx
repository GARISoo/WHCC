import React, { useRef } from 'react';
import './styles.scss'
import '../../styles.scss'

const WHDateInput = ({
  name = '',
  label = '',
  value = '',
  className = '',
  disabled = false,
  required = false,
  checkIfInvalid,
  onChange = () => { },
}) => {
  const yearRef = useRef(null);
  const monthRef = useRef(null);
  const dayRef = useRef(null);

  const [year, month, day] = value ? value.split('-') : ['', '', ''];

  // Handle changes in the individual day, month, and year inputs
  const handleInputChange = (nameValue, inputValueStr) => {
    const updatedValue = [year, month, day];

    const inputValue = Number(inputValueStr);

    const dayIncrement = day.length < inputValueStr.length;
    const dayDecrement = day.length > inputValueStr.length;

    const monthIncrement = month.length < inputValueStr.length;
    const monthDecrement = month.length > inputValueStr.length;

    const yearIncrement = year.length < inputValueStr.length;
    const yearDecrement = year.length > inputValueStr.length;

    switch (nameValue) {
    case 'day':
      if (dayDecrement && inputValueStr.length && !day.indexOf('0') && inputValueStr.indexOf('0') === -1) {
        return;
      }

      if (inputValue > 31) {
        updatedValue[2] = '31';
      } else if (inputValue > 0) {
        updatedValue[2] = inputValueStr;
      } else if (inputValueStr === '0' && dayIncrement) {
        updatedValue[2] = '0';
      } else if (inputValueStr === '0' && dayDecrement) {
        updatedValue[2] = '0';
      } else if (!inputValueStr) {
        updatedValue[2] = '';
      }

      if (!inputValueStr.length) {
        monthRef?.current?.focus();
      }

      break;
    case 'month':
      if (monthDecrement && inputValueStr.length && !month.indexOf('0') && inputValueStr.indexOf('0') === -1) {
        return;
      }

      if (inputValue > 12) {
        updatedValue[1] = '12';
      } else if (inputValue > 0) {
        updatedValue[1] = inputValueStr;
      } else if (inputValueStr === '0' && monthIncrement) {
        updatedValue[1] = '0';
      } else if (inputValueStr === '0' && monthDecrement) {
        updatedValue[1] = '0';
      } else if (!inputValueStr) {
        updatedValue[1] = '';
      }

      if (inputValueStr.length === 2) {
        dayRef?.current?.focus();
      } else if (!inputValueStr.length) {
        yearRef?.current?.focus();
      }

      break;
    case 'year':
      if (inputValue > 2100) {
        updatedValue[0] = '2100';
      } else if (inputValue > 0) {
        updatedValue[0] = inputValueStr;
      } else if (inputValueStr === '0' && yearIncrement) {
        updatedValue[0] = '0';
      } else if (inputValueStr === '0' && yearDecrement) {
        updatedValue[0] = '0';
      } else if (!inputValueStr) {
        updatedValue[0] = '';
      }

      if (inputValueStr.length === 4) {
        monthRef?.current?.focus();
      }

      break;
    default:
      break;
    }

    let fullDate = updatedValue.join('-');

    if (fullDate.length < 3) {
      fullDate = '';
    }

    const event = {
      target: {
        value: fullDate,
        name,
      },
    };

    onChange(event);
  };

  return (
    <div className={`dateInputContainer ${className} ${disabled ? 'dateInputContainerDisabled' : ''}`}>
      <label htmlFor="year" className={`date-input-label ${required ? 'required-input' : ''}`}>
        {label}
      </label>
      <i className={`fa fa-calendar gray inputIcon`} />
      <input
        name={name}
        type="text"
        id={name || ''}
        disabled
        className={`
                dateInputField
                 ${checkIfInvalid && checkIfInvalid(name) ? 'custom-form-control-invalid' : ''}
                 `}
        autoComplete="off"
      />
      <span className="dateInputSpanWrapper">
        <input
          type="text"
          name="year"
          id="year"
          placeholder="yyyy"
          className="inputDate"
          maxLength={4}
          value={year}
          onChange={(e) => handleInputChange('year', e.target.value)}
          disabled={disabled}
          ref={yearRef}
        />
        <span>-</span>
        <input
          type="text"
          name="month"
          id="month"
          placeholder="mm"
          maxLength={2}
          className="inputDate"
          value={month}
          onChange={(e) => handleInputChange('month', e.target.value)}
          disabled={disabled}
          ref={monthRef}
        />
        <span>-</span>
        <input
          type="text"
          name="day"
          id="day"
          placeholder="dd"
          maxLength={2}
          className="inputDate"
          value={day}
          onChange={(e) => handleInputChange('day', e.target.value)}
          disabled={disabled}
          ref={dayRef}
        />
      </span>
    </div>
  );
};

export default WHDateInput;
