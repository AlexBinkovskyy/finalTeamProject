import React from 'react';
import { format, addMonths, subMonths, isValid } from 'date-fns';
import css from './CalendarPagination.module.css';

export default function CalendarPagination({
  currentDate,
  setCurrentDate,
  isStatisticsOpen,
}) {
  const handlePrevMonth = () => {
    if (!isStatisticsOpen) {
      setCurrentDate(prevDate => subMonths(prevDate, 1));
    }
  };

  const handleNextMonth = () => {
    if (!isStatisticsOpen) {
      setCurrentDate(prevDate => addMonths(prevDate, 1));
    }
  };
  const buttonClass = isStatisticsOpen ? css.paginationDisabled : css.button;

  const paginationClass = `${css.pagination} ${
    isStatisticsOpen ? css['boxPaginationDisabled'] : ''
  }`;

  return (
    <div className={paginationClass}>
      <button
        className={buttonClass}
        onClick={handlePrevMonth}
        disabled={isStatisticsOpen}
      >
        &lt;
      </button>
      <span className={css.date}>
        {currentDate &&
          isValid(currentDate) &&
          format(currentDate, 'MMMM, yyyy')}
      </span>
      <button
        className={buttonClass}
        onClick={handleNextMonth}
        disabled={isStatisticsOpen}
      >
        &gt;
      </button>
    </div>
  );
}
