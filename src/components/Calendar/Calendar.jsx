// Calendar.js
import React from 'react';
import CalendarItem from '../CalendarItem/CalendarItem';
import css from './Calendar.module.css';
import { startOfMonth, endOfMonth, eachDayOfInterval } from 'date-fns';

export const Calendar = ({ selectedDate }) => {
  const waterConsumption = [
    100, 40, 50, 60, 70, 80, 90, 100, 80, 70, 60, 50, 40, 30, 20, 10, 0, 20, 40,
    60, 80, 100, 90, 80, 70, 60, 50, 40, 30, 20, 0,
  ];
  const getDaysInMonth = () => {
    const start = startOfMonth(selectedDate);
    const end = endOfMonth(selectedDate);
    const days = eachDayOfInterval({ start, end });

    return days;
  };

  return (
    <div className={css.calendar}>
      {getDaysInMonth().map((day, index) => (
        <CalendarItem
          key={day.toISOString()}
          day={day}
          waterPercentage={waterConsumption[index]}
          isFullWater={waterConsumption[index] === 100}
        />
      ))}
    </div>
  );
};

export default Calendar;
