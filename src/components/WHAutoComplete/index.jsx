/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect, useState, useRef } from 'react';
import WHInput from '../WHInput';
import determineSelectedItems from './helpers/determineSelectedItems';
import SelectedItems from './components/SelectedItems';
import './styles.scss';
import '../../styles.scss';

const WHAutoComplete = ({
  placeholder = 'Izvēlies',
  multiselect = false,
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
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [showingSelection, setShowingSelection] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const autoCompleteRef = useRef(null);

  const toggleSelection = (e) => {
    e.stopPropagation();

    if (!showingSelection) {
      setShowingSelection(true);
    } else {
      const clickedOnTextBubble = e?.target?.className?.includes('selection-remove-option');

      if (!clickedOnTextBubble) {
        setShowingSelection(false);
      }
    }
  };

  const selectedItems = determineSelectedItems({
    placeholder,
    value,
    options,
    multiselect,
  });

  const filterOptions = () => {
    const optionsCopy = [...options];

    const filteredOptionsCopy = optionsCopy.filter((option) => {
      const title = option?.title || option?.name;
      const description = option?.description || option?.desc;
      const searchInput = searchValue
        .toString()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^\w\s]/g, '')
        .toLowerCase();

      let titleMatch = false;
      let descMatch = false;

      if (title) {
        const normalized = title.toString().normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
        titleMatch = normalized.includes(searchInput);
      }

      if (description) {
        const normalized = description.toString().normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
        descMatch = normalized.includes(searchInput);
      }

      const match = titleMatch || descMatch;

      return match;
    });

    setFilteredOptions(filteredOptionsCopy);
  };

  const handleOptionSelection = (targetValue) => {
    const event = {
      target: {
        name,
        value: null,
      },
    };

    if (!multiselect) {
      const alreadySelected = value === targetValue;

      if (!alreadySelected) {
        event.target.value = targetValue;
      } else {
        event.target.value = '';
      }

      setShowingSelection(false);
      passChanges(event);
    } else {
      const valueIndex = value.indexOf(targetValue);
      const alreadySelected = valueIndex !== -1;
      const valuesCopy = [...value];

      if (alreadySelected) {
        valuesCopy.splice(valueIndex, 1);
      } else {
        valuesCopy.push(targetValue);
      }

      event.target.value = valuesCopy;
      passChanges(event);
    }
  };

  const handleBubbleUnselect = (targetValues) => {
    const updatedValues = value.filter((el) => !targetValues.includes(el));

    const event = {
      target: {
        name,
        value: updatedValues,
      },
    };

    passChanges(event);
  };

  const handleClickOutside = (e) => {
    const autoCompleteWrapper = autoCompleteRef?.current;
    const validClassName = typeof e?.target?.className === 'string';

    if (!autoCompleteWrapper || !validClassName) {
      return;
    }

    const clickedOnTextBubble = e.target.className.includes('selection-remove-option');

    if (autoCompleteWrapper && !autoCompleteWrapper?.contains(e.target) && !clickedOnTextBubble) {
      setShowingSelection(false);
    }
  };

  useEffect(() => {
    filterOptions();

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [searchValue]);

  useEffect(() => {
    if (!searchValue) {
      setFilteredOptions(options);
    }
  }, [options]);

  const formElement = autoCompleteRef?.current?.closest('form');
  const formValidated = formElement ? formElement?.classList?.contains('was-validated') : false;
  const hasValue = value && value.length;

  return (
    <div
      className={`wh-autocomplete-container ${className}`}
      style={width ? { flex: `1 0 ${width}` } : {}}
      ref={autoCompleteRef}
    >
      {label ? (
        <label htmlFor={label} className={`wh-autocomplete-label wh-text-gray ${required ? 'required-input' : ''}`}>
          {label}
        </label>
      ) : null}
      <button
        onClick={toggleSelection}
        className={`
        wh-autocomplete-open-btn ${showingSelection ? 'rotate-arrow' : ''}
         ${required ? `wh-form-control-overwrite ${formValidated ? (hasValue ? 'custom-form-control-valid' : 'custom-form-control-invalid') : ''}` : ''}
        `}
        type="button"
        value={value}
        id={label}
        disabled={disabled}
        required={required}
      >
        <SelectedItems
          name={name}
          items={selectedItems}
          placeholder={placeholder}
          showingSelection={showingSelection}
          handleUnselect={handleBubbleUnselect}
        />
      </button>
      <div className={`wh-autocomplete-selection ${showingSelection ? 'showing-selection' : 'not-showing-selection'}`}>
        {showingSelection ? (
          <WHInput
            placeholder="Meklēt"
            icon="fa-solid fa-search"
            value={searchValue}
            autoFocus
            onChange={(e) => setSearchValue(e.target.value)}
            handleClear={() => setSearchValue('')}
          />
        ) : null}
        <div className="wh-autocomplete-option-wrapper">
          {filteredOptions.map((option, index) => {
            const hasDescription = !!option?.description;
            const optionName = option?.title || option?.name;
            const selected = multiselect ? value.includes(option.value) : value === option.value;
            const key = `${index.toString()} ${option.value} ${name} ${optionName}`;

            return (
              <div
                className={`wh-autocomplete-option ${selected ? 'option-selected' : ''}`}
                onClick={() => handleOptionSelection(option.value)}
                key={key}
              >
                <span className="wh-autocomplete-option-name">
                  {optionName}
                </span>
                {hasDescription ? (
                  <span className="wh-autocomplete-option-desc">
                    {option?.description}
                  </span>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default WHAutoComplete;
