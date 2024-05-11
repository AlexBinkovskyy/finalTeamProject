
// CalendarItem.js
import React from 'react';
import css from './CalendarItem.module.css';
import { isSameDay, format } from 'date-fns';

const CalendarItem = ({ day, waterPercentage, isFullWater }) => {
  const isCurrentDay = isSameDay(new Date(), day);

  return (
    <div className={`${css.day} ${isCurrentDay ? css.currentDay : ''}`}>
      <div
        className={`${css.dayNumber}
        ${isCurrentDay ? css.currentDay : ''}
        ${isFullWater ? css.fullWater : ''}`}
      >
        {format(day, 'd')}
      </div>
      <div className={css.waterPercentage}>{waterPercentage}%</div>
    </div>
  );
};

export default CalendarItem;
