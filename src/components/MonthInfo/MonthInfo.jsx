import React, { useState } from 'react';
import CalendarPagination from '../CalendarPagination/CalendarPagination';
import css from './MonthInfo.module.css';
import Calendar from '../Calendar/Calendar';
import IconPieChart from '../../image/sprite.svg';
export default function MonthInfo() {
  const [selectedDate, setSelectedDate] = useState(new Date());


  const handleDateChange = date => {
    setSelectedDate(date);
  };

  return (
    <div className={css.monthInfo}>
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
