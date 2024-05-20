import React from 'react';
import css from './CalendarItem.module.css';
import { isSameDay, format } from 'date-fns';
import { useSelector } from 'react-redux';
import { selectGoal } from '../../redux/auth/selectors';
import { selectTodayTotal } from '../../redux/water/selectors';

const handlePercentage = percentage => {
  if (!isNaN(percentage)) {
    if (percentage >= 100) {
      return 100;
    } else {
      return percentage.toFixed();
    }
  } else {
    return 0;
  }
};

const CalendarItem = ({ day, setSelectedDate, selectedDate }) => {
  const isCurrentDay = isSameDay(new Date(), day);
  const isActive = isSameDay(selectedDate, day);

  const DailyGoal = useSelector(selectGoal);
  const todayTotal = useSelector(selectTodayTotal);

  const percentage = (todayTotal / DailyGoal) * 100;

  const isFullWater = todayTotal >= DailyGoal;

  const handleClick = () => {
    setSelectedDate(day);
  };

  return (
    <div
      data-tut="reactour__buttoncalendar"
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

      <div className={css.waterPercentage}>{handlePercentage(percentage)}%</div>
    </div>
  );
};

export default CalendarItem;
