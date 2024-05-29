import React from 'react';
import { addMonths, subMonths, isValid } from 'date-fns';
import css from './CalendarPagination.module.css';
import { useTranslation } from 'react-i18next';

export default function CalendarPagination({
  selectedDate,
  setSelectedDate,
  isStatisticsOpen,
}) {
  const { t } = useTranslation();
  const date = new Date(selectedDate);

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
        {selectedDate &&
          isValid(selectedDate) &&
          t('calendar.pagination', { date })}
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
