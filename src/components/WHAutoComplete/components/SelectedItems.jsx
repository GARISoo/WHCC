import React from 'react';
import ItemsWrapper from './ItemsWrapper';

const SelectedItems = ({
  items, name, handleUnselect, placeholder, showingSelection,
}) => {
  if (!items) {
    return (
      <div className="wh-autocomplete-text-wrapper">
        <span className="wh-autocomplete-selected-single-text">
          {placeholder}
        </span>
      </div>
    );
  }

  const isArray = Array.isArray(items);

  if (isArray) {
    return (
      <ItemsWrapper
        items={items}
        name={name}
        handleUnselect={handleUnselect}
        showingSelection={showingSelection}
      />
    );
  }

  const item = items;
  const selectedText = item?.name || item?.title;

  return (
    <div className="wh-autocomplete-text-wrapper">
      <span className="wh-autocomplete-selected-single-text">
        {selectedText}
      </span>
    </div>
  );
};

export default SelectedItems;
