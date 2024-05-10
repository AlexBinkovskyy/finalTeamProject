// MonthInfo.jsx
import React, { useState } from 'react';
import CalendarPagination from '../CalendarPagination/CalendarPagination';
import css from './MonthInfo.module.css';
import Calendar from '../Calendar/Calendar';

export default function MonthInfo() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = date => {
    setSelectedDate(date);
  };

  return (
    <div className={css.monthInfo}>
      <h1 className={css.title}>Month</h1>
      <CalendarPagination
        currentDate={selectedDate}
        setCurrentDate={setSelectedDate}
      />
      <Calendar
        selectedDate={selectedDate}
        setSelectedDate={handleDateChange}
      />
    </div>
  );
}
