import moment from 'moment';

const generateCurrentMonthData = (month, dateFormat) => {
  const currentDate = moment(month, dateFormat);
  const startOfMonth = currentDate.clone().startOf('month');
  const endOfMonth = currentDate.clone().endOf('month');
  const weeks = [];

  const currentWeekStart = startOfMonth.clone().startOf('isoWeek');

  while (currentWeekStart.isSameOrBefore(endOfMonth)) {
    const week = Array.from({ length: 7 }, (__, dayIndex) => {
      const currentDatePointer = currentWeekStart.clone().add(dayIndex, 'days');
      const monthStartBoundary = currentDatePointer.isSameOrAfter(startOfMonth);
      const monthEndBoundary = currentDatePointer.isSameOrBefore(endOfMonth);
      const isWithinMonthRange = monthStartBoundary && monthEndBoundary;

      if (isWithinMonthRange) {
        const formattedDate = currentDatePointer.format(dateFormat);

        return formattedDate;
      }

      return '';
    });

    weeks.push(week);
    currentWeekStart.add(1, 'week');
  }

  return weeks;
};

export default generateCurrentMonthData;
