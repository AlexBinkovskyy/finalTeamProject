import CalendarPagination from 'components/CalendarPagination/CalendarPagination';
import css from './MonthInfo.module.css';
import Calendar from 'components/Calendar/Calendar';

export default function MonthInfo() {
  return (
    <>
      <h1 className={css.title}>Month</h1>
      <CalendarPagination />
      <Calendar />
    </>
  );
}
