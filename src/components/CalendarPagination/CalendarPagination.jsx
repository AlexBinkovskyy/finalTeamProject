import React, { useState } from 'react';
import { format, addMonths, subMonths, isValid } from 'date-fns';
import css from './CalendarPagination.module.css';

export default function CalendarPagination({ currentDate, setCurrentDate }) {
  const handlePrevMonth = () => {
    setCurrentDate(prevDate => subMonths(prevDate, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(prevDate => addMonths(prevDate, 1));
  };

  return (
    <div className={css.pagination}>
      <button onClick={handlePrevMonth}>&lt;</button>
      <span>
        {currentDate &&
          isValid(currentDate) &&
          format(currentDate, 'MMMM, yyyy')}
      </span>
      <button onClick={handleNextMonth}>&gt;</button>
    </div>
  );
}
