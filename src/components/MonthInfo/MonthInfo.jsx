import React, { useEffect, useState } from 'react';
import CalendarPagination from '../CalendarPagination/CalendarPagination';
import css from './MonthInfo.module.css';
import Calendar from '../Calendar/Calendar';
import IconPieChart from '../../image/sprite.svg';
import { format } from 'date-fns';

import DailyInfo from 'components/DailyInfo/DailyInfo';
import { useDispatch } from 'react-redux';
import { fetchMonthlyConsumption } from '../../redux/water/operations';

export default function MonthInfo() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const initialMonth = format(selectedDate, 'MM.yyyy');

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMonthlyConsumption(initialMonth));
  }, [dispatch, initialMonth]);

  const handleDateChange = date => {
    setSelectedDate(date);
  };

  return (
    <div className={css.monthInfo}>
      <DailyInfo selectedDate={selectedDate} />
      <div className={css.monthInfo__wrapper}>
        <h1 className={css.title}>Month</h1>
        <div className={css.paginationIcon__wrapper}>
          <CalendarPagination
            currentDate={selectedDate}
            setCurrentDate={setSelectedDate}
          />
          <svg className={css.icon}>
            <use href={`${IconPieChart}#IconPieChart02`}></use>
          </svg>
        </div>
      </div>
      <Calendar
        selectedDate={selectedDate}
        setSelectedDate={handleDateChange}
      />
    </div>
  );
}
