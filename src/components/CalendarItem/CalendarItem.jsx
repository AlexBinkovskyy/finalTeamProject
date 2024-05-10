import React, { useState } from 'react';
import css from './CalendarItem.module.css';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import CalendarPagination from '../CalendarPagination/CalendarPagination'; // Шлях до вашого компонента пагінації

export default function CalendarItem() {
  const [value, onChange] = useState(new Date());

  const handleNext = () => {
    // Логіка для переходу до наступної сторінки календаря
  };

  const handlePrev = () => {
    // Логіка для переходу до попередньої сторінки календаря
  };

  return (
    <>
      <CalendarPagination onNext={handleNext} onPrev={handlePrev} />
      <Calendar
        onChange={onChange}
        value={value}
        className={css.calendar}
        next2Label={null}
      />
    </>
  );
}
