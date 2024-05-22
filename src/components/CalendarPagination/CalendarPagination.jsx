import React from 'react';
import { format, addMonths, subMonths, isValid } from 'date-fns';
import css from './CalendarPagination.module.css';

export default function CalendarPagination({
  selectedDate,
  setSelectedDate,
  isStatisticsOpen,
}) {
  const handlePrevMonth = () => {
    if (!isStatisticsOpen) {
      setSelectedDate(prevDate => subMonths(prevDate, 1));
    }
  };

  const handleNextMonth = () => {
    if (!isStatisticsOpen) {
      setSelectedDate(prevDate => addMonths(prevDate, 1));
    }
  };
  const buttonClass = isStatisticsOpen ? css.paginationDisabled : css.button;

  return (
    <div className={css.pagination}>
      <button
        className={buttonClass}
        onClick={handlePrevMonth}
        disabled={isStatisticsOpen}
      >
        &lt;
      </button>
      <span className={css.date}>
        {selectedDate &&
          isValid(selectedDate) &&
          format(selectedDate, 'MMMM, yyyy')}
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
