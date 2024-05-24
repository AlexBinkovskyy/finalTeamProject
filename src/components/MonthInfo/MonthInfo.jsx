// MonthInfo.js
import css from './MonthInfo.module.css';
import IconPieChart from '../../image/sprite.svg';
import Calendar from '../Calendar/Calendar';
import CalendarPagination from '../CalendarPagination/CalendarPagination';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function MonthInfo({ selectedDate, setSelectedDate }) {
  const { t } = useTranslation();
  const [showCalendar, setShowCalendar] = useState(true);
  const handleButtonClick = () => {
    setShowCalendar(!showCalendar);
  };

  return (
    <div className={css.monthInfo}>
      <div className={css.monthInfo__wrapper}>
        <h1 className={css.title}>
          {showCalendar ? t('calendar.month') : t('calendar.statistics')}
        </h1>
        <div className={css.paginationIcon__wrapper}>
          <CalendarPagination
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
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

      <Calendar
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        showCalendar={showCalendar}
      />
    </div>
  );
}
