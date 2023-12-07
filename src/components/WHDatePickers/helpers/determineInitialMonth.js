import moment from 'moment';

const determineInitialMonth = (value, dateFormat) => {
  let initialMonth = moment().format(dateFormat);
  const hasInitialValue = value && value?.length;

  if (!hasInitialValue) {
    return initialMonth;
  }

  const hasMultipleValues = Array.isArray(value);

  if (hasMultipleValues) {
    const sortedValues = value.sort((a, b) => {
      const dateA = moment(a, dateFormat);
      const dateB = moment(b, dateFormat);

      if (dateA.isBefore(dateB)) {
        return -1;
      } if (dateA.isAfter(dateB)) {
        return 1;
      }

      return 0;
    });

    // eslint-disable-next-line prefer-destructuring
    initialMonth = sortedValues[0];

    return initialMonth;
  }

  initialMonth = value;

  return initialMonth;
};

export default determineInitialMonth;
