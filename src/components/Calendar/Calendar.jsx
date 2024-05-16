// Calendar.js
import React from 'react';
import CalendarItem from '../CalendarItem/CalendarItem';
import css from './Calendar.module.css';
import { startOfMonth, endOfMonth, eachDayOfInterval } from 'date-fns';

export const Calendar = ({ selectedDate, setSelectedDate }) => {
  const getDaysInMonth = () => {
    const start = startOfMonth(selectedDate);
    const end = endOfMonth(selectedDate);
    const days = eachDayOfInterval({ start, end });

    return days;
  };

  return (
    <div className={css.calendar}>
      {getDaysInMonth().map(day => (
        <CalendarItem
          key={day.toISOString()}
          day={day}
          setSelectedDate={setSelectedDate}
        />
      ))}
    </div>
  );
};

export default Calendar;
