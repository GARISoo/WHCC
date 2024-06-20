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
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const selectRef = useRef(null);
  const optionRefs = useRef([]);

  const toggleSelection = (e) => {
    e.stopPropagation();
    setShowingSelection((prev) => !prev);
    setHighlightedIndex(-1); // Reset highlighted index when toggling
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

  const scrollIntoView = (index) => {
    const option = optionRefs.current[index];
    if (option) {
    // Use requestAnimationFrame to ensure smooth scrolling
      window.requestAnimationFrame(() => {
        option.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      });
    }
  };

  const handleKeyDown = (e) => {
    if (!showingSelection) return;

    switch (e.key) {
    case 'ArrowDown':
      e.preventDefault();
      setHighlightedIndex((prevIndex) => (prevIndex + 1) % options.length);
      scrollIntoView((highlightedIndex + 1) % options.length);
      break;
    case 'ArrowUp':
      e.preventDefault();
      setHighlightedIndex((prevIndex) => (
        (prevIndex - 1 + options.length) % options.length
      ));
      scrollIntoView((highlightedIndex - 1 + options.length) % options.length);
      break;
    case 'Enter':
      e.preventDefault();
      if (highlightedIndex >= 0 && highlightedIndex < options.length) {
        handleOptionSelection(options[highlightedIndex].value);
      }
      break;
    case 'Escape':
    case 'Tab':
      e.preventDefault();
      setShowingSelection(false);
      break;
    default:
      break;
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [showingSelection, highlightedIndex, options]);

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
        {options?.length ? (
          options.map((option, index) => {
            const hasDescription = !!option?.description;
            const optionName = option?.title || option?.name;
            const selected = value === option.value;
            const highlighted = index === highlightedIndex;
            const key = `${index.toString()} ${option.value} ${name} ${optionName}`;

            return (
              <div
                className={
                  `
                wh-select-option 
                ${selected ? 'option-selected' : ''} 
                ${highlighted ? 'option-highlighted' : ''}
                `
                }
                onClick={() => handleOptionSelection(option.value)}
                key={key}
                ref={(el) => {
                  optionRefs.current[index] = el;
                }}
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
          })
        ) : (
          <span className="wh-select-option-name no-results">Nav ierakstu</span>
        )}
      </div>
    </div>
  );
};

export default WHSelect;
