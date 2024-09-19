/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, {
  useEffect, useState, useRef, useMemo,
} from 'react';
import { WHInput } from 'whcc';
import determineSelectedItems from './helpers/determineSelectedItems';
import SelectedItems from './components/SelectedItems';
import './styles.scss';
import '../../styles.scss';

const translations = {
  lv: {
    placeholder: 'Izvēlēties',
    search: 'Meklēt',
    selected: 'Izvēlēti',
    clear: 'Notīrīt',
    noOptions: 'Nav ierakstu'
  },
  en: {
    placeholder: 'Select',
    search: 'Search',
    selected: 'Selected',
    clear: 'Clear',
    noOptions: 'No options'
  },
  ru: {
    placeholder: 'Выбирать',
    search: 'Искать',
    selected: 'Выбрано',
    selected: 'Очистить',
    noOptions: 'Нет вариантов'
  },
};

const WHAutoComplete = ({
  placeholder = '',
  locale = 'lv',
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
  const [showingSelection, setShowingSelection] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const autoCompleteRef = useRef(null);
  const optionRefs = useRef([]);

  const translatedPlaceholder = placeholder || translations[locale].placeholder

  const selectedItems = determineSelectedItems({
    placeholder: translatedPlaceholder,
    value,
    options,
    multiselect,
  });

  // Memoized filtering of options based on search input
  const filteredOptions = useMemo(() => options.filter((option) => {
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

    return titleMatch || descMatch;
  }), [options, searchValue]);

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

  const toggleSelection = (e) => {
    e.stopPropagation();
    setHighlightedIndex(-1);

    if (!showingSelection) {
      setShowingSelection((prev) => !prev);
    } else {
      const clickedOnTextBubble = e?.target?.className?.includes('selection-remove-option');

      if (!clickedOnTextBubble) {
        setShowingSelection((prev) => !prev);
      }
    }
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

  const scrollIntoView = (index) => {
    const option = optionRefs.current[index];
    if (option) {
      window.requestAnimationFrame(() => {
        option.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      });
    }
  };

  const reorderedOptions = useMemo(() => (selectedItems && selectedItems.length ? [
    ...selectedItems,
    ...filteredOptions.filter((option) => (
      !selectedItems.some((item) => item.value === option.value))),
  ] : filteredOptions), [selectedItems, filteredOptions]);

  const handleKeyDown = (e) => {
    if (!showingSelection) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex((prevIndex) => (prevIndex + 1) % reorderedOptions.length);
        scrollIntoView((highlightedIndex + 1) % reorderedOptions.length);
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex((prevIndex) => (
          (prevIndex - 1 + reorderedOptions.length) % reorderedOptions.length
        ));
        scrollIntoView((highlightedIndex - 1 + reorderedOptions.length) % reorderedOptions.length);
        break;
      case 'Enter':
        e.preventDefault();
        if (highlightedIndex >= 0 && highlightedIndex < reorderedOptions.length) {
          handleOptionSelection(reorderedOptions[highlightedIndex].value);
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

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [showingSelection, handleKeyDown]); // Attach handleKeyDown as a dependency

  const formElement = autoCompleteRef?.current?.closest('form');
  const formValidated = formElement ? formElement?.classList?.contains('was-validated') : false;
  const hasValue = value && value.length;

  return (
    <div
      className={`wh-autocomplete-container ${className}`}
      style={width ? { flex: `1 0 ${width}` } : {}}
      ref={autoCompleteRef}
    >
      {label && (
        <label htmlFor={label} className={`wh-autocomplete-label wh-text-gray ${required ? 'required-input' : ''}`}>
          {label}
        </label>
      )}
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
          placeholder={translatedPlaceholder}
          text={translations[locale || 'lv'].selected}
          showingSelection={showingSelection}
          handleUnselect={handleBubbleUnselect}
        />
      </button>
      <div className={`wh-autocomplete-selection ${showingSelection ? 'showing-selection' : 'not-showing-selection'}`}>
        {showingSelection && (
          <WHInput
            placeholder={translations[locale || 'lv'].search}
            autoFocus
            locale={locale || 'lv'}
            icon="fa-solid fa-search"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            handleClear={() => setSearchValue('')}
          />
        )}
        <div className="wh-autocomplete-option-wrapper">
          {reorderedOptions.length ? (
            reorderedOptions.map((option, index) => {
              const hasDescription = !!option?.description;
              const optionName = option?.title || option?.name;
              const highlighted = index === highlightedIndex;
              const selected = multiselect ? value.includes(option.value) : value === option.value;
              const key = `${index.toString()} ${option.value} ${name} ${optionName}`;

              return (
                <div
                  className={`wh-autocomplete-option ${selected ? 'option-selected' : ''} ${highlighted ? 'option-highlighted' : ''}`}
                  onClick={() => handleOptionSelection(option.value)}
                  key={key}
                  ref={(el) => { optionRefs.current[index] = el; }}
                >
                  <span className="wh-autocomplete-option-name">{optionName}</span>
                  {hasDescription && <span className="wh-autocomplete-option-desc">{option?.description}</span>}
                </div>
              );
            })
          ) : (
            <span className="wh-autocomplete-option-name no-results">{translations[locale].noOptions}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default WHAutoComplete;
