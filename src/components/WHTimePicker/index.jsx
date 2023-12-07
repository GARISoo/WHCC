import React, { useState, useRef, useEffect } from 'react';
import SelectedValue from './components/SelectedValue';
import './styles.scss';
import '../../styles.scss';

const hours = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0'));
const minutes = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0'));

const WHTimePicker = ({
  label,
  name,
  value,
  disabled,
  required = false,
  placeholder = '',
  onChange: passChanges = () => {},
  className = '',
}) => {
  const [showingTimeSelection, setShowingTimeSelection] = useState(false);
  const [selectedHour, setSelectedHour] = useState('');
  const [selectedMinute, setSelectedMinute] = useState('');
  const [filteredHours, setFilteredHours] = useState([]);
  const [filteredMinutes, setFilteredMinutes] = useState([]);

  const timeRef = useRef(null);

  const commitChanges = (updatedValue) => {
    const event = {
      target: {
        name,
        value: updatedValue,
      },
    };

    passChanges(event);
  };

  const handleTimeSelection = (hour, minute) => {
    let updatedHour = selectedHour;
    let updatedMinute = selectedMinute;

    if (hour) {
      updatedHour = hour;
    }

    if (minute) {
      updatedMinute = minute;
    }

    setSelectedHour(updatedHour);
    setSelectedMinute(updatedMinute);

    if (updatedHour && updatedMinute) {
      const updatedValue = `${updatedHour}:${updatedMinute}`;
      commitChanges(updatedValue);
    }
  };

  const handleClickOutside = (e) => {
    const timeSelectionWrapper = timeRef.current;

    if (timeSelectionWrapper && !timeSelectionWrapper.contains(e.target)) {
      setShowingTimeSelection(false);
    }
  };

  const toggleTimeSelection = (e) => {
    e.stopPropagation();
    setShowingTimeSelection(!showingTimeSelection);
  };

  const getFilteredArray = (array, index) => {
    const filteredArray = [];

    for (let i = index - 2; i <= index + 2; i++) {
      const normalizedIndex = (i + array.length) % array.length;
      filteredArray.push(array[normalizedIndex]);
    }

    return filteredArray;
  };

  const incrementHourBy = (step) => {
    const currentIndex = hours.indexOf(selectedHour);
    const nextIndex = (currentIndex + step) % hours.length;
    setSelectedHour(hours[nextIndex]);
    setFilteredHours(getFilteredArray(hours, nextIndex));

    if (hours[nextIndex] && selectedMinute) {
      const updatedValue = `${hours[nextIndex]}:${selectedMinute}`;
      commitChanges(updatedValue);
    }
  };

  const decrementHourBy = (step) => {
    const currentIndex = hours.indexOf(selectedHour);
    const prevIndex = (currentIndex - step + hours.length) % hours.length;
    setSelectedHour(hours[prevIndex]);
    setFilteredHours(getFilteredArray(hours, prevIndex));

    if (hours[prevIndex] && selectedMinute) {
      const updatedValue = `${hours[prevIndex]}:${selectedMinute}`;
      commitChanges(updatedValue);
    }
  };

  const incrementMinuteBy = (step) => {
    const currentIndex = minutes.indexOf(selectedMinute);
    const nextIndex = (currentIndex + step) % minutes.length;
    setSelectedMinute(minutes[nextIndex]);
    setFilteredMinutes(getFilteredArray(minutes, nextIndex));

    if (selectedHour && minutes[nextIndex]) {
      const updatedValue = `${selectedHour}:${minutes[nextIndex]}`;
      commitChanges(updatedValue);
    }
  };

  const decrementMinuteBy = (step) => {
    const currentIndex = minutes.indexOf(selectedMinute);
    const prevIndex = (currentIndex - step + minutes.length) % minutes.length;
    setSelectedMinute(minutes[prevIndex]);
    setFilteredMinutes(getFilteredArray(minutes, prevIndex));

    if (selectedHour && minutes[prevIndex]) {
      const updatedValue = `${selectedHour}:${minutes[prevIndex]}`;
      commitChanges(updatedValue);
    }
  };

  const scrollTimer = useRef(null);

  const handleClear = (e) => {
    e?.stopPropagation();
    setSelectedMinute('');
    setSelectedHour('');
    commitChanges('');
    setShowingTimeSelection(false);
  };

  const handleWheelScroll = (e, type) => {
    const { deltaY } = e;

    const scrollingDown = deltaY > 0;
    const scrollingUp = deltaY < 0;

    const handleScroll = () => {
      if (type === 'hour') {
        if (scrollingDown) {
          incrementHourBy(1);
        } else if (scrollingUp) {
          decrementHourBy(1);
        }
      } else if (type === 'minute') {
        if (scrollingDown) {
          incrementMinuteBy(1);
        } else if (scrollingUp) {
          decrementMinuteBy(1);
        }
      }
    };

    cancelAnimationFrame(scrollTimer.current);
    scrollTimer.current = requestAnimationFrame(handleScroll);
  };

  // useEffect(() => {
  //   const initialHourIndex = hours.indexOf(initialHour);
  //   setSelectedHour(initialHour);
  //   setFilteredHours(getFilteredArray(hours, initialHourIndex));
  // }, [initialHour]);

  // useEffect(() => {
  //   const initialMinuteIndex = minutes.indexOf(initialMinute);
  //   setSelectedMinute(initialMinute);
  //   setFilteredMinutes(getFilteredArray(minutes, initialMinuteIndex));
  // }, [initialMinute]);

  useEffect(() => {
    setFilteredHours(getFilteredArray(hours, hours.indexOf(selectedHour)));
  }, [selectedHour]);

  useEffect(() => {
    setFilteredMinutes(getFilteredArray(minutes, minutes.indexOf(selectedMinute)));
  }, [selectedMinute]);

  useEffect(() => {
    if (value) {
      const parts = value.split(':');
      setSelectedHour(parts[0] || '00');
      setSelectedMinute(parts[1] || '00');
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const formElement = timeRef?.current?.closest('form');
  const formValidated = formElement ? formElement?.classList?.contains('was-validated') : false;
  const hasValue = value && value.length;

  return (
    <div className={`wh-time-picker-container ${className}`} ref={timeRef}>
      {label ? (
        <label htmlFor={label} className={`wh-time-picker-label wh-text-gray ${required ? 'required-input' : ''}`}>
          {label}
        </label>
      ) : null}
      <button
        onClick={toggleTimeSelection}
        className={`
        ${required ? `wh-form-control-overwrite ${formValidated ? (hasValue ? 'custom-form-control-valid' : 'custom-form-control-invalid') : ''}` : ''}
        wh-time-picker-open-btn ${showingTimeSelection ? 'wh-time-picker-opened-btn' : ''}
        `}
        id={label}
        type="button"
        value={value}
        disabled={disabled}
        required={required}
      >
        <i className={`fa-regular fa-clock wh-time-picker-icon wh-text-gray ${disabled ? 'wh-time-picker-icon-disabled' : ''}`} />
        {placeholder ? (
          <span className="wh-time-picker-placeholder wh-text-gray">
            {placeholder}
          </span>
        ) : null}
        <SelectedValue value={value} />
        {value ? (
          <button type="button" className="wh-time-clear-btn" onClick={handleClear} disabled={disabled}>
            notīrīt
          </button>
        ) : null}
      </button>
      <div className={`wh-time-picker-selection ${showingTimeSelection ? 'showing-time-selection' : 'not-showing-time-selection'}`}>
        <div className="wh-time-picker-descriptions">
          <span>HH</span>
          <span>MM</span>
        </div>
        <div className="wh-time-picker-time-wrapper">
          <div className="wh-time-picker-time-box">
            <button
              title="Augšup"
              className="wh-time-picker-nav-btn"
              onClick={() => decrementHourBy(1)}
              type="button"
            >
              <i className="fa fa-angle-up" />
            </button>
            <div className="wh-time-picker-hour-wrapper" onWheel={(e) => handleWheelScroll(e, 'hour')}>
              {filteredHours.map((hour, index) => {
                const selected = index === 2 && hour === selectedHour;

                return (
                  <button
                    type="button"
                    className={`wh-time-picker-selection-btn ${selected ? 'time-selected-btn' : ''}`}
                    onClick={() => handleTimeSelection(hour, null)}
                    key={`${index.toString()} hour`}
                  >
                    {hour}
                  </button>
                );
              })}
            </div>
            <button
              title="Lejup"
              className="wh-time-picker-nav-btn"
              type="button"
              onClick={() => incrementHourBy(1)}
            >
              <i className="fa fa-angle-down" />
            </button>
          </div>
          <div className="wh-time-picker-time-box">
            <button
              title="Augšup"
              className="wh-time-picker-nav-btn"
              type="button"
              onClick={() => decrementMinuteBy(1)}
            >
              <i className="fa fa-angle-up" />
            </button>
            <div className="wh-time-picker-minute-wrapper" onWheel={(e) => handleWheelScroll(e, 'minute')}>
              {filteredMinutes.map((minute, index) => {
                const selected = index === 2 && minute === selectedMinute;

                return (
                  <button
                    type="button"
                    className={`wh-time-picker-selection-btn ${selected ? 'time-selected-btn' : ''}`}
                    onClick={() => handleTimeSelection(null, minute)}
                    key={`${index.toString()} minute`}
                  >
                    {minute}
                  </button>
                );
              })}
            </div>
            <button
              title="Lejup"
              className="wh-time-picker-nav-btn"
              type="button"
              onClick={() => incrementMinuteBy(1)}
            >
              <i className="fa fa-angle-down" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WHTimePicker;
