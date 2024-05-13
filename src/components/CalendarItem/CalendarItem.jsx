// CalendarItem.js
import React from 'react';
import css from './CalendarItem.module.css';
import { isSameDay, format } from 'date-fns';

const CalendarItem = ({
  day,
  waterPercentage,
  isFullWater,
  setSelectedDate,
  selectedDate,
}) => {
  const isCurrentDay = isSameDay(new Date(), day);
  const isActive = isSameDay(selectedDate, day);

  const handleClick = () => {
    setSelectedDate(day);
  };

  return (
    <div
      className={`
    ${css.day}
    ${isCurrentDay ? css.currentDay : ''}`}
    >
      <button
        type="button"
        onClick={handleClick}
        className={`
        ${css.dayNumber}
        ${isCurrentDay ? css.selected : ''}
        ${isActive ? css.active : css.inactive}
        ${isFullWater ? css.fullWater : ''}`}
      >
        {format(day, 'd')}
      </button>

      <div className={css.waterPercentage}>{waterPercentage}%</div>
    </div>
  );
};

export default CalendarItem;
