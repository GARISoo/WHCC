const determineSelectedItems = ({
  value, options, multiselect,
}) => {
  const noSelectedValue = !multiselect && !value;
  const noSelectedValues = multiselect && !value?.length;

  if (noSelectedValue || noSelectedValues) {
    return null;
  }

  const isArray = Array.isArray(value);

  const validSingleSelect = !multiselect && !isArray;

  if (validSingleSelect) {
    const noSelection = !value;

    if (noSelection) {
      return null;
    }

    const foundOption = options.find((option) => option.value === value);

    if (!foundOption) {
      return null;
    }

    return foundOption;
  }

  const validMultiselect = multiselect && isArray;

  if (validMultiselect) {
    const selectedValues = value;
    const noOneSelected = !selectedValues.length;

    if (noOneSelected) {
      return null;
    }

    const selectedItems = selectedValues.map((el) => {
      const foundOption = options.find((option) => option.value === el);

      if (!foundOption) {
        return null;
      }

      return foundOption;
    }).filter(Boolean);

    return selectedItems;
  }

  return null;
};

export default determineSelectedItems;
