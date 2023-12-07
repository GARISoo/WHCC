import moment from 'moment';

const isDateValidFormat = (dateString, format) => {
  let valid = true;

  if (!dateString) {
    return valid;
  }

  const isArray = Array.isArray(dateString);

  if (isArray) {
    const dateStrings = dateString;

    if (!dateStrings.length) {
      return valid;
    }

    valid = dateStrings.every((date) => moment(date, format, true).isValid());
  } else {
    valid = moment(dateString, format, true).isValid();
  }

  return valid;
};

export default isDateValidFormat;
