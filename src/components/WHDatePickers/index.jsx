/* eslint-disable jsx-a11y/no-static-element-interactions */
import moment from 'moment';
import React, { useState, useRef, useEffect } from 'react';
import determineInitialMonth from './helpers/determineInitialMonth';
import generateCurrentMonthData from './helpers/generateCurrentMonthData';
import SelectedValue from './components/SelectedValue';
import './styles.scss';
import '../../styles.scss';

const WHDatePicker = ({
  label,
  name,
  locale = 'lv',
  value,
  disabled,
  required = false,
  dateFormat = 'DD.MM.YYYY',
  placeholder = '',
  onChange: passChanges,
  className = '',
}) => {
  moment.locale('lv');

  const [showingCalendar, setShowingCalendar] = useState(false);
  const [currentMonth, setCurrentMonth] = useState('');
  const [currentMonthData, setCurrentMonthData] = useState([]);
  const calendarRef = useRef(null);

  const translations = {
    lv: {
      weekDayNames: ['Pr', 'Ot', 'Tr', 'Ce', 'Pk', 'Se', 'Sv'],
      previousYear: "Iepriekšējais gads",
      previousMonth: "Iepriekšējais mēnesis",
      nextYear: "Nākamais gads",
      nextMonth: "Nākošais mēnesis",
      today: "Šodien",
      clear: "Notīrīt",
      close: "Aizvērt",
    },
    en: {
      weekDayNames: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      previousYear: "Previous year",
      previousMonth: "Previous month",
      nextYear: "Next year",
      nextMonth: "Next month",
      today: "Today",
      clear: "Clear",
      close: "Close",
    },
    ru: {
      weekDayNames: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
      previousYear: "Предыдущий год",
      previousMonth: "Предыдущий месяц",
      nextYear: "Следующий год",
      nextMonth: "Следующий месяц",
      today: "Сегодня",
      clear: "Очистить",
      close: "Закрыть"
    }
  }

  const weekDayNames = translations[locale || 'lv'].weekDayNames
  const previousYear = translations[locale || 'lv'].previousYear
  const previousMonth = translations[locale || 'lv'].previousMonth
  const nextYear = translations[locale || 'lv'].nextYear
  const nextMonth = translations[locale || 'lv'].nextMonth
  const today = translations[locale || 'lv'].today
  const clear = translations[locale || 'lv'].clear
  const close = translations[locale || 'lv'].close

  const toggleCalendar = (e) => {
    e.stopPropagation();
    setShowingCalendar(!showingCalendar);
  };

  const clearValue = () => {
    const multiselect = Array.isArray(value);

    const event = {
      target: {
        name,
        value: multiselect ? [] : '',
      },
    };

    passChanges(event);
  };

  const handleClickOutside = (e) => {
    const datePickerWrapper = calendarRef?.current;

    if (datePickerWrapper && !datePickerWrapper?.contains(e.target)) {
      setShowingCalendar(false);
    }
  };

  const handleDateSelection = (date) => {
    if (!date) {
      return;
    }

    const event = {
      target: {
        name,
        value: null,
      },
    };

    const multiselect = Array.isArray(value);

    if (multiselect) {
      const valueIndex = value.indexOf(date);
      const alreadySelected = valueIndex !== -1;
      const valuesCopy = [...value];

      if (alreadySelected) {
        valuesCopy.splice(valueIndex, 1);
      } else {
        valuesCopy.push(date);
      }

      event.target.value = valuesCopy;
      passChanges(event);
    } else {
      const alreadySelected = value === date;

      if (alreadySelected) {
        event.target.value = '';
      } else {
        event.target.value = date;
      }

      setShowingCalendar(false);
      passChanges(event);
    }
  };

  const handlePreviousMonth = () => {
    const previousMonth = moment(currentMonth).startOf('month').subtract(1, 'month').format(dateFormat);
    setCurrentMonth(previousMonth);
  };

  const handlePreviousYear = () => {
    const previousYearMonth = moment(currentMonth).startOf('month').subtract(1, 'year').format(dateFormat);
    setCurrentMonth(previousYearMonth);
  };

  const handleNextMonth = () => {
    const nextMonth = moment(currentMonth).startOf('month').add(1, 'month').format(dateFormat);
    setCurrentMonth(nextMonth);
  };

  const handleNextYear = () => {
    const nextYearMonth = moment(currentMonth).startOf('month').add(1, 'year').format(dateFormat);
    setCurrentMonth(nextYearMonth);
  };

  const selectToday = () => {
    const today = moment().format(dateFormat);

    handleDateSelection(today);
  };

  const initializeCalendar = () => {
    const initialMonth = determineInitialMonth(value, dateFormat);
    setCurrentMonth(initialMonth);
  };

  useEffect(() => {
    initializeCalendar();
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (currentMonth) {
      const generatedData = generateCurrentMonthData(currentMonth, dateFormat);
      setCurrentMonthData(generatedData);
    }
  }, [currentMonth]);

  const formattedCurrentYear = moment(currentMonth, dateFormat).format('YYYY');
  const formattedCurrentMonth = moment(currentMonth, dateFormat).format('MMMM');
  const invalidDate = formattedCurrentYear === 'Invalid date' || formattedCurrentMonth === 'Invalid date';

  const formElement = calendarRef?.current?.closest('form');
  const formValidated = formElement ? formElement?.classList?.contains('was-validated') : false;
  const hasValue = value && value.length;

  return (
    <div className={`wh-date-picker-container ${className}`} ref={calendarRef}>
      <label htmlFor={label} className={`wh-date-picker-label wh-text-gray ${required ? 'required-input' : ''}`}>
        {label}
      </label>
      <button
        onClick={toggleCalendar}
        className={`
        ${required ? `wh-form-control-overwrite ${formValidated ? (hasValue ? 'custom-form-control-valid' : 'custom-form-control-invalid') : ''}` : ''}
        wh-date-picker-open-btn ${showingCalendar ? 'wh-date-picker-opened-btn' : ''}
        `}
        type="button"
        value={value}
        disabled={disabled}
        id={label}
        required={required}
      >
        <i className={`fa-regular fa-calendar wh-date-picker-icon wh-text-gray ${disabled ? 'wh-date-picker-icon-disabled' : ''}`} />
        {placeholder ? (
          <span className="wh-date-picker-placeholder wh-text-gray">
            {placeholder}
          </span>
        ) : null}
        <SelectedValue value={value} dateFormat={dateFormat} />
      </button>
      <table className={`wh-date-picker-calendar ${showingCalendar ? 'showing-calendar' : 'not-showing-calendar'}`}>
        <thead className="wh-date-picker-calendar-header">
          <tr>
            <th colSpan={1}>
              {!invalidDate ? (
                <button
                  onClick={handlePreviousYear}
                  title={previousYear}
                  className="wh-date-picker-nav-btn"
                  type="button"
                >
                  <i className="fa fa-angles-left white" />
                </button>
              ) : ''}
            </th>
            <th colSpan={5} className="wh-date-picker-calendar-header-title">
              {invalidDate ? 'Date Format Error' : formattedCurrentYear}
            </th>
            <th colSpan={1}>
              {!invalidDate ? (
                <button
                  onClick={handleNextYear}
                  title={nextYear}
                  className="wh-date-picker-nav-btn"
                  type="button"
                >
                  <i className="fa fa-angles-right white" />
                </button>
              ) : ''}
            </th>
          </tr>
          <tr className="wh-date-picker-month-row">
            <th colSpan={1}>
              {!invalidDate ? (
                <button
                  onClick={handlePreviousMonth}
                  title={previousMonth}
                  className="wh-date-picker-nav-btn-month"
                  type="button"
                >
                  <i className="fa fa-angle-left white" />
                </button>
              ) : ''}
            </th>
            <th colSpan={5} className="wh-date-picker-calendar-header-month">
              {invalidDate ? 'Date Format Error' : formattedCurrentMonth}
            </th>
            <th colSpan={1}>
              {!invalidDate ? (
                <button
                  onClick={handleNextMonth}
                  title={nextMonth}
                  className="wh-date-picker-nav-btn-month"
                  type="button"
                >
                  <i className="fa fa-angle-right white" />
                </button>
              ) : ''}
            </th>
          </tr>
          <tr>
            {!invalidDate ? (
              weekDayNames?.map((dayName) => (
                <th className="wh-date-picker-heading" key={dayName} colSpan={1}>{dayName}</th>
              ))
            ) : null}
          </tr>
        </thead>
        <tbody className="wh-date-picker-calendar-body">
          {currentMonthData?.map((week, weekIndex) => {
            const weekKey = `week ${weekIndex} ${name}`;

            return (
              <tr key={weekKey}>
                {week?.map((day, dayIndex) => {
                  const dayKey = `day ${dayIndex} ${day} ${name}`;
                  const formattedDate = day ? moment(day, dateFormat).format('DD') : '';
                  const isSelected = day && value.includes(day);

                  return (
                    <td key={dayKey} colSpan="1">
                      <button
                        type="button"
                        onClick={() => handleDateSelection(day)}
                        className={
                          isSelected ? 'wh-date-picker-calendar-date-selected' : (
                            formattedDate ? 'wh-date-picker-calendar-date' : ''
                          )
                        }
                      >
                        {formattedDate}
                      </button>
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="7">
              <div className="wh-date-picker-actions">
                <button type="button" className="wh-date-picker-action-btn" onClick={selectToday}>
                  <i className="fa fa-thumbtack" />
                  <span>
                    {today}
                  </span>
                </button>
                <button type="button" className="wh-date-picker-action-btn" onClick={clearValue}>
                  <i className="fa fa-minus" />
                  <span>
                    {clear}
                  </span>
                </button>
                <button type="button" className="wh-date-picker-action-btn" onClick={toggleCalendar}>
                  <i className="fa fa-xmark" />
                  <span>
                    {close}
                  </span>
                </button>
              </div>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default WHDatePicker;
