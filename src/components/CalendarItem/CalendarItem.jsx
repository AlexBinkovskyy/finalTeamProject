import React from 'react';
import css from './CalendarItem.module.css';
import { isSameDay, format } from 'date-fns';
import { useSelector } from 'react-redux';
import { selectGoal } from '../../redux/auth/selectors';

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

const CalendarItem = ({
  day,
  setSelectedDate,
  selectedDate,
  dayWaterMonth,
}) => {
  const isCurrentDay = isSameDay(new Date(), day);
  const isActive = isSameDay(selectedDate, day);
  const DailyGoal = useSelector(selectGoal);

  const formattedDate = format(day, 'dd.MM.yyyy');

  const dataIsWater = dayWaterMonth.find(
    dayWithWater => dayWithWater.date === formattedDate
  );

  const totalAmount = () => {
    if (dataIsWater?.totalWater >= 0) {
      return dataIsWater?.totalWater;
    } else {
      return 0;
    }
  };

  const percentage = (totalAmount() / DailyGoal) * 100;
  const isFullWater = handlePercentage(percentage) === 100;

  const handleClick = () => {
    setSelectedDate(day);
  };

  const buttonClass = `
        ${css.dayNumber}
        ${isCurrentDay ? css.selected : ''}
        ${isActive ? css.active : css.inactive}
        ${isFullWater ? css.fullWater : ''}`;

  return (
    <div
      className={`${css.day}
    ${isCurrentDay ? css.currentDay : ''}`}
    >
     <button onClick={handleClick} className={buttonClass}>
        {format(day, 'd')}
      </button>
      <div className={css.waterPercentage}>{handlePercentage(percentage)}%</div>
    </div>
  );
};

export default CalendarItem;
