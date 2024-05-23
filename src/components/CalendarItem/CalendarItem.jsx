import React from 'react';
import css from './CalendarItem.module.css';
import { isSameDay, format } from 'date-fns';
import { useSelector } from 'react-redux';
import { selectGoal } from '../../redux/auth/selectors';
import { selectMonth } from '../../redux/water/selectors';

// From Polina
// const todayTotal = useSelector(selectTodayTotal);
// const progress = Math.min(todayTotal / goal, 1);
// const progressProcAll = progress * 100;
// const progressProc = Math.round(progressProcAll / 10) * 10;
// console.log(progressProc);

// Formula for percentages from array
// const goal = useSelector(selectGoal);
// const todayTotal2 = [250, 3350, 450, 1550, 250, 350];
// const progress2 = todayTotal2.map(el => {
//   return Math.round(Math.min(el / goal, 1) * 10) * 10;
// });
// console.log(progress2);

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
  // console.log('CalendarItem - Test');

  const isCurrentDay = isSameDay(new Date(), day);
  const isActive = isSameDay(selectedDate, day);
  const DailyGoal = useSelector(selectGoal);

  const dayWaterMonth = useSelector(selectMonth);

  const formattedDate = format(day, 'dd.MM.yyyy');

  const dataIsWater = dayWaterMonth.find(
    dayWithWater => dayWithWater.date === formattedDate
  );

  const totalAmount = dataIsWater?.dailyCount.reduce(
    (accumulator, { amount }) => {
      return accumulator + amount;
    },
    0
  );

  const percentage = (totalAmount / DailyGoal) * 100;
  const isFullWater = totalAmount >= DailyGoal;

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
      <div onClick={handleClick} className={buttonClass}>
        {format(day, 'd')}
      </div>
      <div className={css.waterPercentage}>{handlePercentage(percentage)}%</div>
    </div>
  );
};

export default CalendarItem;
