// MonthInfo.js
import React, { useEffect, useState } from 'react';
import CalendarPagination from '../CalendarPagination/CalendarPagination';
import css from './MonthInfo.module.css';
import Calendar from '../Calendar/Calendar';
import IconPieChart from '../../image/sprite.svg';
import { format } from 'date-fns';

import DailyInfo from 'components/DailyInfo/DailyInfo';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMonthlyConsumption } from '../../redux/water/operations';

import Statistics from 'components/Statistics/Statistics';
import { selectMonth } from '../../redux/water/selectors';

export default function MonthInfo() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const initialMonth = format(selectedDate, 'MM.yyyy');
  const [showCalendar, setShowCalendar] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMonthlyConsumption(initialMonth));
  }, [dispatch, initialMonth]);

  const handleDateChange = date => {
    setSelectedDate(date);
  };

  const handleButtonClick = () => {
    setShowCalendar(!showCalendar);
  };

  const monthlyConsumption = useSelector(selectMonth);

  return (
    <div className={css.monthInfo}>
      <DailyInfo selectedDate={selectedDate} />
      <div className={css.monthInfo__wrapper}>
        <h1 className={css.title}>{showCalendar ? 'Month' : 'Statistics'}</h1>
        <div className={css.paginationIcon__wrapper}>
          <CalendarPagination
            currentDate={selectedDate}
            setCurrentDate={setSelectedDate}
            isStatisticsOpen={!showCalendar}
          />
          <button
            className={css.buttonIcon}
            data-tut="reactour__statistic"
            onClick={handleButtonClick}
          >
            <svg className={css.icon}>
              <use href={`${IconPieChart}#IconPieChart02`}></use>
            </svg>
          </button>
        </div>
      </div>
      {showCalendar ? (
        <Calendar
          selectedDate={selectedDate}
          setSelectedDate={handleDateChange}
        />
      ) : (
        <Statistics data={monthlyConsumption} />
      )}
    </div>
  );
}
