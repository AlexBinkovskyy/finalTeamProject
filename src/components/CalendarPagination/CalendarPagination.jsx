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
      <button className={css.button} onClick={handlePrevMonth}>
        &lt;
      </button>
      <span className={css.date}>
        {currentDate &&
          isValid(currentDate) &&
          format(currentDate, 'MMMM, yyyy')}
      </span>
      <button className={css.button} onClick={handleNextMonth}>
        &gt;
      </button>
    </div>
  );
}
