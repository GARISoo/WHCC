/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect, useRef, useState } from 'react';
import './styles.scss';
import '../../styles.scss';

const WHSelect = ({
  placeholder = 'Izvēlēties',
  required = false,
  options = [],
  label,
  value,
  width,
  disabled,
  name,
  onChange: passChanges,
  className = '',
}) => {
  const [showingSelection, setShowingSelection] = useState(false);
  const selectRef = useRef(null);

  const toggleSelection = (e) => {
    e.stopPropagation();
    setShowingSelection(!showingSelection);
  };

  const selectedItem = options.find((option) => option.value === value);
  const selectedName = (selectedItem ? (selectedItem?.name || selectedItem?.title) : '') || placeholder;

  const handleOptionSelection = (targetValue) => {
    const event = {
      target: {
        name,
        value: null,
      },
    };

    const alreadySelected = value === targetValue;

    if (!alreadySelected) {
      event.target.value = targetValue;
    } else {
      event.target.value = '';
    }

    setShowingSelection(false);
    passChanges(event);
  };

  const handleClickOutside = (e) => {
    const autoCompleteWrapper = selectRef?.current;

    if (autoCompleteWrapper && !autoCompleteWrapper?.contains(e.target)) {
      setShowingSelection(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const formElement = selectRef?.current?.closest('form');
  const formValidated = formElement ? formElement?.classList?.contains('was-validated') : false;
  const hasValue = value && value.length;

  return (
    <div
      className={`wh-select-container ${className}`}
      style={width ? { flex: `1 0 ${width}` } : {}}
      ref={selectRef}
    >
      {label ? (
        <label htmlFor={label} className={`wh-select-label wh-text-gray ${required ? 'required-input' : ''}`}>
          {label}
        </label>
      ) : null}
      <button
        onClick={toggleSelection}
        className={`
        ${required ? `wh-form-control-overwrite ${formValidated ? (hasValue ? 'custom-form-control-valid' : 'custom-form-control-invalid') : ''}` : ''}
        wh-select-open-btn ${showingSelection ? 'rotate-arrow' : ''}
        `}
        type="button"
        value={value}
        disabled={disabled}
        id={label}
        required={required}
      >
        {selectedName}
      </button>
      <div className={`wh-select-option-wrapper ${showingSelection ? 'showing-selection' : 'not-showing-selection'}`}>
        {options.map((option, index) => {
          const hasDescription = !!option?.description;
          const optionName = option?.title || option?.name;
          const selected = value === option.value;
          const key = `${index.toString()} ${option.value} ${name} ${optionName}`;

          return (
            <div
              className={`wh-select-option ${selected ? 'option-selected' : ''}`}
              onClick={() => handleOptionSelection(option.value)}
              key={key}
            >
              <span className="wh-select-option-name">
                {optionName}
              </span>
              {hasDescription ? (
                <span className="wh-select-option-desc">
                  {option.description}
                </span>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WHSelect;
